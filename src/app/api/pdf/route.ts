// app/api/pdf-parse/route.ts
import { NextResponse } from 'next/server';
import { PdfReader } from 'pdfreader';
import OpenAI from "openai";

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,  // Make sure to set the API key in your environment variables
});

export async function GET(req: Request) {
  try {
    // Hardcoded PDF URL
    const url = "https://utfs.io/f/j3fYkfXO4qbf6sshIfaQDCbTFaWAlre314kL7EvzIB0fO95c";
    const response = await fetch(url);

    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to fetch PDF' }, { status: 400 });
    }

    const arrayBuffer = await response.arrayBuffer();
    const pdfBuffer = Buffer.from(arrayBuffer);

    // Prepare to accumulate extracted text
    let extractedText = '';

    // Process the PDF buffer
    await new Promise((resolve, reject) => {
      new PdfReader().parseBuffer(pdfBuffer, (err, item) => {
        if (err) {
          reject(err);
        } else if (!item) {
          resolve(null);
        } else if (item.text) {
          // Accumulate text items
          extractedText += item.text + ' ';
        }
      });
    });

    // Ensure the extracted text is not empty
    if (!extractedText) {
      return NextResponse.json({ error: 'No text found in the PDF' }, { status: 400 });
    }

    // Summarize the extracted text using OpenAI API
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant that summarizes documents.",
        },
        {
          role: "user",
          content: `Summarize the following text: ${extractedText}`,
        },
      ],
    });

    const summary = completion.choices[0].message.content;

    // Return the summary as a response
    return NextResponse.json({ summary });
    
  } catch (error) {
    console.error("Error parsing or summarizing PDF:", error);
    return NextResponse.json({ error: 'Failed to parse or summarize PDF' }, { status: 500 });
  }
}
