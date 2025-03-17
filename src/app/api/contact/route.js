import { client } from '@/sanity/lib/client';  // Adjust this import path based on your project structure
import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
      const body = await request.json();
      const now = new Date().toISOString();
      
      const doc = {
        _type: 'contact',
        name: body.name,
        email: body.email,
        subject: body.subject,
        message: body.message,
        status: 'pending', // Set initial status
        statusUpdateDate: now,
        statusNotes: 'New submission',
        submittedAt: now
      };
  
      const result = await client.create(doc);
  
      return NextResponse.json({
        success: true,
        message: 'Form submitted successfully',
        id: result._id
      });
    } catch (error) {
      console.error('Submission error:', error);
      return NextResponse.json(
        { 
          success: false, 
          message: 'Failed to submit form' 
        }, 
        { 
          status: 500 
        }
      );
    }
  }