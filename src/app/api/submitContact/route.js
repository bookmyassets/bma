// app/api/submitContact/route.js
import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request) {
  try {
    const { fullName, phone, recaptchaToken } = await request.json();

    // Validate inputs
    if (!fullName || !phone) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Verify reCAPTCHA if token provided
    if (recaptchaToken && process.env.GOOGLE_CLOUD_API_KEY && process.env.RECAPTCHA_PROJECT_ID) {
      try {
        const recaptchaResponse = await axios.post(
          `https://recaptchaenterprise.googleapis.com/v1/projects/${process.env.RECAPTCHA_PROJECT_ID}/assessments`,
          {
            event: {
              token: recaptchaToken,
              siteKey: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
            },
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${process.env.GOOGLE_CLOUD_API_KEY}`,
            },
          }
        );

        const { tokenProperties } = recaptchaResponse.data;
        
        if (!tokenProperties.valid) {
          console.error('Invalid reCAPTCHA token:', tokenProperties.invalidReason);
          return NextResponse.json(
            { 
              message: 'reCAPTCHA verification failed',
              reason: tokenProperties.invalidReason 
            },
            { status: 400 }
          );
        }
      } catch (recaptchaError) {
        console.error('reCAPTCHA verification error:', recaptchaError);
        // Continue with submission as fallback
      }
    }

    // Submit to TeleCRM API
    try {
      await axios.post(
        'https://api.telecrm.in/enterprise/67a30ac2989f94384137c2ff/autoupdatelead',
        {
          fields: {
            name: fullName,
            phone: phone,
            source: "BookMyAssets",
          },
          source: "Dholera Times Website",
          tags: ["Dholera Investment", "Website Lead", "BookMyAssets"],
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TELECRM_API_KEY}`,
          },
        }
      );

      return NextResponse.json(
        { 
          success: true,
          message: 'Form submitted successfully' 
        },
        { status: 200 }
      );
    } catch (teleCRMError) {
      console.error('TeleCRM API error:', teleCRMError);
      return NextResponse.json(
        { 
          message: 'Error submitting to CRM system',
          error: teleCRMError.response?.data?.message || teleCRMError.message 
        },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('General form submission error:', error);
    return NextResponse.json(
      { 
        message: 'Server error processing your request',
        error: error.message 
      },
      { status: 500 }
    );
  }
}

// Add this to explicitly handle unsupported methods
export async function GET() {
  return NextResponse.json(
    { message: 'Method not allowed' },
    { status: 405 }
  );
}