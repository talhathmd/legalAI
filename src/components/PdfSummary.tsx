"use client";

import React, { useState } from "react";

interface PdfSummaryProps {
  pdfUrl: string; // Accepting the PDF URL as a prop
}

const PdfSummary: React.FC<PdfSummaryProps> = ({ pdfUrl }) => {
  console.log(`PdfSummary: ${pdfUrl}`);
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const formatSummary = (summary: string) => {
    // Replace **text** with <strong>text</strong> and add custom color and bold class
    let formatted = summary.replace(
      /\*\*(.*?)\*\*/g,
      '<strong class="font-bold text-blue-600">$1</strong>'
    );

    // Replace ### text with <h3>text</h3> and add custom color for the heading
    formatted = formatted.replace(
      /### (.*?)(?=\n|$)/g,
      '<h3 class="text-lg font-semibold text-indigo-600">$1</h3>'
    );

    // Replace - text with <li>text</li> and wrap in <ul>
    formatted = formatted.replace(/- (.*?)(?=\n|$)/g, "<li>$1</li>");
    formatted = formatted.replace(
      /(<li>.*?<\/li>)/g,
      '<ul class="list-disc pl-5">$1</ul>'
    ); // Wrap in <ul>

    return formatted;
  };

  const formattedSummary = formatSummary(summary);

  const handleSubmit = async () => {
    setLoading(true);
    setError(""); // Reset error state before fetching

    try {
      const response = await fetch("/api/pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: pdfUrl }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch summary");
      }

      const data = await response.json();
      setSummary(data.summary);
    } catch (error) {
      console.error("Error:", error);
      setError("Error fetching summary. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Scrollable area for summary */}
      <div className="flex-1 overflow-y-auto p-4">
        {summary ? (
          <div>
            {/* Main Summary Title with custom color */}
            <h2 className="text-2xl font-bold text-purple-700 mb-2">
              Summary:
            </h2>
            <div
              className="mt-2 whitespace-pre-wrap leading-relaxed text-gray-800"
              dangerouslySetInnerHTML={{ __html: formattedSummary }}
            />
          </div>
        ) : (
          <div className="flex-grow flex items-center justify-center">
            <p>No summary available yet.</p>
          </div>
        )}
        {error && <div className="mt-4 text-red-600">{error}</div>}
      </div>

      {/* Button at the bottom */}
      <div className="p-4 border-t">
        <button
          className="w-full bg-zinc-900 text-white p-2 rounded"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Analyzing..." : "Analyze"}
        </button>
      </div>
    </div>
  );
};

export default PdfSummary;
