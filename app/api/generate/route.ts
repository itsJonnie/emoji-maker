import { NextResponse } from 'next/server';
import Replicate from 'replicate';

// Initialize Replicate outside the handler
const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export async function POST(request: Request) {
  console.log('API route hit');
  console.log('API Token Status:', process.env.REPLICATE_API_TOKEN ? 'Present' : 'Missing');

  if (!process.env.REPLICATE_API_TOKEN) {
    console.error('REPLICATE_API_TOKEN is not configured');
    return NextResponse.json(
      { error: 'API configuration error' },
      { status: 500 }
    );
  }

  try {
    const { prompt } = await request.json();
    console.log('Received prompt:', prompt);

    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      );
    }

    const modelId = "fofr/sdxl-emoji:dee76b5afde21b0f01ed7925f0665b7e879c50ee718c5f78a9d38e04d523cc5e";
    console.log('Calling Replicate with model:', modelId);

    const output = await replicate.run(
      modelId,
      {
        input: {
          prompt: `A TOK emoji of ${prompt}`,
          apply_watermark: false,
        },
      }
    );

    console.log('Replicate response:', output);

    if (!output || !Array.isArray(output) || !output[0]) {
      console.error('Invalid response structure:', output);
      throw new Error('Invalid response from Replicate');
    }

    return NextResponse.json({ url: output[0] });
  } catch (error) {
    console.error('Detailed error:', error);
    
    // Check for billing error
    if (error instanceof Error && error.message.includes('402')) {
      return NextResponse.json(
        { error: 'Service temporarily unavailable. Please try again later.' },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to generate emoji' },
      { status: 500 }
    );
  }
} 