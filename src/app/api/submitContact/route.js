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

    // reCAPTCHA token validation
    if (!recaptchaToken) {
      return NextResponse.json(
        { message: 'reCAPTCHA verification required' },
        { status: 400 }
      );
    }

    // Verify the reCAPTCHA token with the standard verification endpoint
    try {
      const secretKey = process.env.RECAPTCHA_SECRET_KEY;
      
      if (!secretKey) {
        console.error('RECAPTCHA_SECRET_KEY not configured');
        return NextResponse.json(
          { message: 'Server configuration error' },
          { status: 500 }
        );
      }

      // Use URLSearchParams format for reCAPTCHA verification
      const params = new URLSearchParams();
      params.append('secret', secretKey);
      params.append('response', recaptchaToken);

      const recaptchaResponse = await axios.post(
        'https://www.google.com/recaptcha/api/siteverify',
        params.toString(),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      );

      if (!recaptchaResponse.data.success) {
        console.error('reCAPTCHA verification failed:', recaptchaResponse.data);
        return NextResponse.json(
          { message: 'reCAPTCHA verification failed, please try again' },
          { status: 400 }
        );
      }

    } catch (recaptchaError) {
      console.error('reCAPTCHA verification error:', recaptchaError);
      return NextResponse.json(
        { message: 'Error verifying reCAPTCHA' },
        { status: 500 }
      );
    }

    // TeleCRM API submission
    try {
      const teleCrmApiKey = process.env.NEXT_PUBLIC_TELECRM_API_KEY;
      
      if (!teleCrmApiKey) {
        console.error('TELECRM_API_KEY not configured');
        return NextResponse.json(
          { message: 'Server configuration error' },
          { status: 500 }
        );
      }

      // Replace with your actual TeleCRM API endpoint
      const TELECRM_API_ENDPOINT = 'https://api.telecrm.in/enterprise/67a30ac2989f94384137c2ff/autoupdatelead';

      await axios.post(
        TELECRM_API_ENDPOINT,
        {
          fields: {
            name: fullName,
            phone: phone,
            source: "BookMyAssets Website",
          },
          source: "Dholera Times Website",
          tags: ["Dholera Investment", "Website Lead", "BookMyAssets"],
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${teleCrmApiKey}`,
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
      
      // Log the detailed error for debugging
      console.error('Response:', teleCRMError.response?.data);
      
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

// Handle unsupported methods
export async function GET() {
  return NextResponse.json(
    { message: 'Method not allowed' },
    { status: 405 }
);
}

export async function PUT() {
  return NextResponse.json(
    { message: 'Method not allowed' },
    { status: 405 }
  );
}

export async function DELETE() {
  return NextResponse.json(
    { message: 'Method not allowed' },
    { status: 405 }
  );
}