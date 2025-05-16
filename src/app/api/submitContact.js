// pages/api/submitContact.js
import axios from 'axios';

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { fullName, phone, recaptchaToken } = req.body;

    // Validate inputs
    if (!fullName || !phone) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // If recaptchaToken is provided, verify it
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
  
        // Check if the token is valid
        const { tokenProperties } = recaptchaResponse.data;
        
        if (!tokenProperties.valid) {
          console.error('Invalid reCAPTCHA token:', tokenProperties.invalidReason);
          return res.status(400).json({ 
            message: 'reCAPTCHA verification failed', 
            reason: tokenProperties.invalidReason 
          });
        }
      } catch (recaptchaError) {
        // Log error but continue with form submission as fallback
        console.error('reCAPTCHA verification error:', recaptchaError);
        // Optionally, you can reject the submission here if you want stricter validation
        // return res.status(400).json({ message: 'reCAPTCHA verification failed' });
      }
    }

    // Submit to TeleCRM API
    try {
      await axios.post(
        'https://api.telecrm.in/',
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

      // Return success response
      return res.status(200).json({ 
        success: true,
        message: 'Form submitted successfully' 
      });
    } catch (teleCRMError) {
      console.error('TeleCRM API error:', teleCRMError);
      return res.status(500).json({ 
        message: 'Error submitting to CRM system',
        error: teleCRMError.response?.data?.message || teleCRMError.message 
      });
    }

  } catch (error) {
    console.error('General form submission error:', error);
    
    return res.status(500).json({ 
      message: 'Server error processing your request',
      error: error.message 
    });
  }
}