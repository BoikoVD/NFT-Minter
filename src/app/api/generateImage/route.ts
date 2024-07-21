import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const data = await request.json();
        
        const resp = await axios.post(`${process.env.NEXT_PUBLIC_FIREBASE_LIMEWIRE_URL}/image/generation`, 
            {
                prompt: data.prompt,
                aspect_ratio: '1:1',
                quality: "LOW",
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'X-Api-Version': 'v1',
                    Accept: 'application/json',
                    Authorization: `Bearer ${process.env.NEXT_PUBLIC_FIREBASE_LIMEWIRE_API_KEY}`,
                }
            }
        );

        return NextResponse.json({
            success: true,
            message: 'Data received and API call successful',
            apiResponse: resp.data,
        });
    } catch (error) {
        console.error('Error processing request:', error);
        return NextResponse.json({
            success: false,
            message: 'Error processing request',
            error: error,
        });
    }
}