import { google } from "googleapis";
import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import { join } from "path";
import os from "os";
import fs from "fs";

// Debug environment variables (remove in production)
console.log('Environment Variables Loaded:', {
  CLIENT_EMAIL: !!process.env.GOOGLE_CLIENT_EMAIL,
  PRIVATE_KEY: !!process.env.GOOGLE_PRIVATE_KEY,
  SHEET_ID: !!process.env.GOOGLE_SHEET_ID,
  FOLDER_ID: !!process.env.GOOGLE_DRIVE_FOLDER_ID
});

// Validate and initialize environment variables
function getRequiredEnvVar(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

const env = {
  clientEmail: getRequiredEnvVar('GOOGLE_CLIENT_EMAIL'),
  privateKey: getRequiredEnvVar('GOOGLE_PRIVATE_KEY').replace(/\\n/g, '\n'),
  sheetId: getRequiredEnvVar('GOOGLE_SHEET_ID'),
  folderId: getRequiredEnvVar('GOOGLE_DRIVE_FOLDER_ID'),
  projectId: process.env.GOOGLE_PROJECT_ID || "bma-career"
};

// Initialize Google Auth
const googleAuth = new google.auth.GoogleAuth({
  credentials: {
    type: "service_account",
    project_id: env.projectId,
    private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID || "",
    client_email: env.clientEmail,
    private_key: env.privateKey,
    client_id: process.env.GOOGLE_CLIENT_ID || "",
    token_url: "https://oauth2.googleapis.com/token",
    universe_domain: "googleapis.com"
  },
  scopes: [
    "https://www.googleapis.com/auth/drive",
    "https://www.googleapis.com/auth/spreadsheets"
  ],
});

// Utility function for error handling
class ApplicationError extends Error {
  constructor(message, status = 500) {
    super(message);
    this.status = status;
  }
}

export async function POST(request) {
  try {
    // Validate request
    if (!request.formData) {
      throw new ApplicationError("Invalid form data", 400);
    }

    const formData = await request.formData();
    const requiredFields = [
      'firstName', 'lastName', 'email', 
      'jobTitle', 'resume'
    ];

    for (const field of requiredFields) {
      if (!formData.get(field)) {
        throw new ApplicationError(`Missing required field: ${field}`, 400);
      }
    }

    // Process form data
    const formValues = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      phone: formData.get("phone") || "",
      currentCompany: formData.get("currentCompany") || "",
      jobTitle: formData.get("jobTitle"),
      jobId: formData.get("jobId") || "",
      resumeFile: formData.get("resume"),
      experience: formData.get("experience"),
      currentCTC: formData.get("currentCTC"),
    };

    // Process resume file
    const tempFilePath = await processResumeFile(formValues.resumeFile);

    try {
      // Initialize Google APIs
      const authClient = await googleAuth.getClient();
      const drive = google.drive({ version: "v3", auth: authClient });
      const sheets = google.sheets({ version: "v4", auth: authClient });

      // Handle folder creation/retrieval
      const folderId = await getOrCreateFolder(drive, formValues.jobTitle);

      // Upload resume
      const resumeLink = await uploadResume(
        drive, 
        formValues.resumeFile, 
        tempFilePath, 
        folderId,
        `${formValues.firstName}_${formValues.lastName}`
      );

      // Save to Google Sheets
      await saveToSheet(sheets, {
        ...formValues,
        resumeLink
      });

      return NextResponse.json({ 
        success: true,
        message: "Application submitted successfully!" 
      });

    } finally {
      await cleanupTempFile(tempFilePath);
    }

  } catch (error) {
    console.error("Application Error:", error);
    return NextResponse.json(
      { 
        success: false,
        message: error.message || "Server error",
        ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
      },
      { status: error.status || 500 }
    );
  }
}

// Helper Functions
async function processResumeFile(resumeFile) {
  const bytes = await resumeFile.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const tempFilePath = join(os.tmpdir(), resumeFile.name);
  await writeFile(tempFilePath, buffer);
  return tempFilePath;
}

async function getOrCreateFolder(drive, folderName) {
  try {
    const folderRes = await drive.files.list({
      q: `'${env.folderId}' in parents and name='${folderName}' and mimeType='application/vnd.google-apps.folder'`,
      fields: "files(id, name)",
    });

    if (folderRes.data.files.length > 0) {
      return folderRes.data.files[0].id;
    }

    const newFolder = await drive.files.create({
      resource: {
        name: folderName,
        mimeType: "application/vnd.google-apps.folder",
        parents: [env.folderId],
      },
      fields: "id",
    });

    return newFolder.data.id;
  } catch (error) {
    console.error("Folder Error:", error);
    throw new ApplicationError("Failed to create application folder", 500);
  }
}

async function uploadResume(drive, resumeFile, tempFilePath, folderId, namePrefix) {
  try {
    const fileMeta = {
      name: `${namePrefix}_${resumeFile.name}`,
      parents: [folderId],
    };

    const uploaded = await drive.files.create({
      resource: fileMeta,
      media: {
        mimeType: resumeFile.type,
        body: fs.createReadStream(tempFilePath),
      },
      fields: "id, webViewLink",
    });

    return uploaded.data.webViewLink;
  } catch (error) {
    console.error("Upload Error:", error);
    throw new ApplicationError("Failed to upload resume", 500);
  }
}

async function saveToSheet(sheets, { 
  jobTitle, firstName, lastName, email, 
  phone, currentCompany, resumeLink, experience, currentCTC
}) {
  try {
    await sheets.spreadsheets.values.append({
      spreadsheetId: env.sheetId,
      range: "BMA-CAREER", // Target "Applications" sheet specifically
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [[
          new Date().toISOString(),
          jobTitle,
          firstName,
          lastName,
          email,
          phone,
          currentCompany,
          resumeLink,
          experience,
          currentCTC
        ]],
      },
    });
  } catch (error) {
    console.error("Sheets Error:", error);
    throw new ApplicationError("Failed to save application data", 500);
  }
}

async function cleanupTempFile(tempFilePath) {
  try {
    await fs.promises.unlink(tempFilePath);
  } catch (error) {
    console.error("Cleanup Error:", error);
  }
}

export async function GET() {
  return NextResponse.json(
    { 
      success: false,
      message: "This endpoint only accepts POST requests" 
    },
    { status: 405 }
  );
}