import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { text, tone, length } = await request.json();

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful writing assistant that rewrites text according to specified tone and length requirements."
        },
        {
          role: "user",
          content: `Rewrite the following text in a ${tone} tone, making it ${length}: "${text}"`
        }
      ],
    });

    return NextResponse.json({
      rewrittenText: completion.choices[0].message.content
    });

  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
} 