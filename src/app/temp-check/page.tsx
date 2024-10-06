// app/pdf-summary/page.tsx
"use client";

import React, { useState } from "react";

const PdfSummaryPage = () => {
  const [pdfUrl, setPdfUrl] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

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
      setSummary("Error fetching summary.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Legal Document PDF Summarizer</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={pdfUrl}
          onChange={(e) => setPdfUrl(e.target.value)}
          placeholder="Enter PDF URL"
          className="border rounded p-2 mb-4 w-full"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded"
          disabled={loading}
        >
          {loading ? "Summarizing..." : "Submit"}
        </button>
      </form>

      {summary && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold">Summary:</h2>
          <p className="mt-2 whitespace-pre-wrap">{summary}</p>
        </div>
      )}
    </div>
  );
};

export default PdfSummaryPage;
