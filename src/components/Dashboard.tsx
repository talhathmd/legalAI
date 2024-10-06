"use client";

import UploadButton from "./UploadButton";
import { withAuthInfo, WithAuthInfoProps } from "@propelauth/react";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

interface Report {
  summary: string;
  filename: string;
  fileUrl: string;
  fileId: string; // Assuming you have fileId in your report data
}

const Dashboard = (props: WithAuthInfoProps) => {
  const userEmail = props.user?.email;

  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    // Fetch reports if user is logged in and userEmail is available
    if (props.isLoggedIn && userEmail) {
      fetchReports(userEmail);
    } else {
      setLoading(false); // Stop loading if the user is not logged in
    }
  }, [props.isLoggedIn, userEmail]);

  const fetchReports = async (email: string) => {
    try {
      const response = await fetch(
        `/api/reports/get-user-reports?email=${email}`
      );

      if (response.ok) {
        const data = await response.json();
        setReports(data.reports); // Ensure this is an array of reports
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Failed to fetch reports");
      }
    } catch (error) {
      setError("An error occurred while fetching reports.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading reports...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <main className="mx-auto max-w-7xl md:p-10">
      {/* Header Section */}
      <div className="mt-8 flex flex-col items-start justify-between gap-4 border-b border-gray-200 pb-5 sm:flex-row sm:items-center sm:gap-0">
        <h1 className="mb-3 text-5xl font-bold text-gray-900">My Files</h1>
        <UploadButton />
      </div>

      {/* Background Blobs for Digital Aesthetic */}
      <div className="relative isolate">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-[calc(50%-13rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#60a5fa] opacity-30 sm:left-[calc(50%-36rem)] sm:w-[72.1875rem]"
          />
        </div>
      </div>

      {/* Render Reports */}
      <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 z-20">
        {reports.length > 0 ? (
          reports.map((report) => (
            <div
              key={report.filename}
              className="rounded-lg border border-gray-200 bg-white p-6 shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out"
            >
              <h2 className="text-xl font-semibold text-gray-900">
                {report.filename}
              </h2>
              <p className="text-gray-600">
                Summary: {report.summary || "No summary available"}
              </p>
              <a href={`/dashboard/${report.fileId}`} rel="noopener noreferrer">
                <Button className="mt-4 w-full py-2 bg-slate-800 text-white rounded-lg shadow-md hover:bg-slate-500 transition duration-300 ease-in-out">
                  View Report
                </Button>
              </a>
            </div>
          ))
        ) : (
          <div>No reports found.</div> // Show a message if there are no reports
        )}
      </div>
    </main>
  );
};

export default withAuthInfo(Dashboard);
