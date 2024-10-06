import PdfSummary from "@/components/PdfSummary";
import PdfRenderer from "@/components/PdfRenderer";
import { fetchReport } from "@/lib/actions/report.actions"; // Import your fetchReport function

interface PageProps {
  params: {
    fileid: string;
  };
}

const Page = async ({ params }: PageProps) => {
  const { fileid } = params;

  // Fetch the report using the fileid
  const report = await fetchReport(fileid);

  // Check if the report is found, and if not, you can handle it (e.g., show an error message)
  if (!report) {
    return (
      <div className="flex-1 justify-between flex flex-col h-[calc(100vh-3.5rem)]">
        <div className="mx-auto w-full max-w-8xl grow lg:flex xl:px-2">
          <div className="flex-1 xl:flex">
            <div className="px-4 py-6 sm:px-6 lg:pl-8 xl:flex-1 xl:pl-6">
              <p>Report not found</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 justify-between flex flex-col h-[calc(100vh-3.5rem)]">
      <div className="mx-auto w-full max-w-8xl grow lg:flex xl:px-2">
        {/* Left sidebar & main wrapper */}
        <div className="flex-1 xl:flex">
          <div className="px-4 py-6 sm:px-6 lg:pl-8 xl:flex-1 xl:pl-6">
            {/* Main area */}
            <PdfRenderer url={report.fileUrl} />{" "}
            {/* Pass the fileUrl to PdfRenderer */}
          </div>
        </div>

        <div className="shrink-0 flex-[0.75] border-t border-gray-200 lg:w-96 lg:border-l lg:border-t-0">
          {/* TODO: You can add additional details or a sidebar here */}
        {/* Scrollable container for PdfSummary */}
        <div className="shrink-0 flex-[0.75] h-[calc(100vh-3.5rem)] border-t border-gray-200 lg:w-96 lg:border-l lg:border-t-0">
          <div className="h-full">
            <PdfSummary pdfUrl={file.url} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
