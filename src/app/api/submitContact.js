// pages/api/submit-contact.js
import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { fullName, phone, recaptchaToken } = req.body;

    // Validate inputs
    if (!fullName || !phone || !recaptchaToken) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // 1. Verify the reCAPTCHA token with Google
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

    // 2. Check if the token is valid and the score is acceptable
    const { tokenProperties, riskAnalysis } = recaptchaResponse.data;
    
    if (!tokenProperties.valid) {
      return res.status(400).json({ 
        message: 'reCAPTCHA verification failed', 
        reason: tokenProperties.invalidReason 
      });
    }

    // For additional security you can check the score
    // Enterprise reCAPTCHA provides a score from 0.0 to 1.0
    if (riskAnalysis && riskAnalysis.score < 0.5) {
      return res.status(400).json({ 
        message: 'reCAPTCHA score too low. Please try again.' 
      });
    }

    // 3. If verification passed, submit to TeleCRM
    const teleResponse = await axios.post(
      'https://api.telecrm.in/enterprise/67a30ac2989f94384137c2ff/autoupdatelead',
      {
        fields: {
          name: fullName,
          phone: phone,
          source: "BookMyAssets Get in touch",
        },
        source: "Dholera Times Website",
        tags: ["Dholera Investment", "Website Lead", "BookMyAssets"],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.TELECRM_API_KEY}`,
        },
      }
    );

    return res.status(200).json({ 
      success: true,
      message: 'Form submitted successfully' 
    });

  } catch (error) {
    console.error('Error processing form submission:', error);
    
    return res.status(500).json({ 
      message: 'Server error processing your request',
      error: error.response?.data?.message || error.message 
    });
  }
}