import { NextResponse } from 'next/server';
import { PdfReader } from 'pdfreader';
import OpenAI from "openai";

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,  // Ensure your OpenAI key is set in environment variables
});

export async function POST(req: Request) {
  try {
    const { url } = await req.json();  // Get the PDF URL from request body

    // Fetch the PDF document from the URL
    const response = await fetch(url);
    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to fetch PDF' }, { status: 400 });
    }

    const arrayBuffer = await response.arrayBuffer();
    const pdfBuffer = Buffer.from(arrayBuffer);

    // Extract text from PDF using pdfreader
    let extractedText = '';
    await new Promise((resolve, reject) => {
      new PdfReader().parseBuffer(pdfBuffer, (err, item) => {
        if (err) {
          reject(err);
        } else if (!item) {
          resolve(null);
        } else if (item.text) {
          extractedText += item.text + ' ';
        }
      });
    });

    if (!extractedText) {
      return NextResponse.json({ summary: 'No text found in the PDF' }, { status: 400 });
    }

    // Check if document is legal by looking for legal keywords
    // const legalKeywords = ["agreement", "contract", "liability", "terms", "termination", "confidentiality", "payment"];
    // const containsLegalTerms = legalKeywords.some(keyword => extractedText.toLowerCase().includes(keyword));

    // // If the document does not contain legal terms, return early with a specific message
    // if (!containsLegalTerms) {
    //   return NextResponse.json({ summary: 'The document does not appear to be a legal document' }, { status: 400 });
    // }

    // Call OpenAI API to analyze and summarize only the required sections with specific metrics
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are an lawyer analyzing legal documents. Provide specific metrics (Dates, Amount, Percentages, etc..) related to important terms and give suggestions on things to look after. Explain in easy terms, Be specific, highlight critical terms (e.g., liabilities, penalties, payment period, termination notice), and flag any potential issues.`
        },
        {
          role: "user",
          content: `
          The following is the extracted text from a legal document. Summarize the key points by focusing only on the following sections:
          1. Overall Summary
          2. Liabilities and Risks
          3. Termination Clauses
          4. Payment Terms
          5. Confidentiality and Intellectual Property
          6. Dispute Resolution
          7. Obligations and Responsibilities
          8. Warranties and Guarantees

          At the end, provide a short suggestion on whether the document's terms are satisfactory or need revision.

          Extracted text: ${extractedText}`
        }
      ],
    });

    const summary = completion.choices[0].message.content;

    // Return the specific summary
    return NextResponse.json({ summary });
    
  } catch (error) {
    console.error("Error processing PDF:", error);
    return NextResponse.json({ error: 'Failed to parse or summarize PDF' }, { status: 500 });
  }
}
