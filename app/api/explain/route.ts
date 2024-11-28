import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { originalText, rewrittenText } = await request.json();

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful writing assistant that explains the improvements made in rewritten text."
        },
        {
          role: "user",
          content: `Explain how the rewritten version improves upon the original:\n\nOriginal: "${originalText}"\nRewritten: "${rewrittenText}"`
        }
      ],
    });

    return NextResponse.json({
      explanation: completion.choices[0].message.content
    });

  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
} 