import PdfSummary from "@/components/PdfSummary";
import PdfRenderer from "@/components/PdfRenderer";
import { fetchReport, fetchAllReportIds } from "@/lib/actions/report.actions"; // Import your fetch functions

interface PageProps {
  params: {
    fileid: string;
  };
}

export async function generateStaticParams() {
  // Fetch all the report IDs that you want to pre-generate static pages for
  const reportIds = await fetchAllReportIds();

  // Return an array of params, each containing a report ID
  return reportIds.map((id) => ({
    fileid: id,
  }));
}

const Page = async ({ params }: PageProps) => {
  const { fileid } = params;

  // Fetch the report using the fileid
  const report = await fetchReport(fileid);

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
    <div className="flex flex-1 h-[calc(100vh-3.5rem)]">
      <div className="mx-auto w-full max-w-8xl grow lg:flex xl:px-2">
        <div className="flex-1 xl:flex">
          <div className="px-4 py-6 sm:px-6 lg:pl-8 xl:flex-1 xl:pl-6 flex flex-col">
            <div className="flex-1 h-full overflow-hidden">
              <PdfRenderer url={report.fileUrl} />
            </div>
          </div>
        </div>
        <div className="shrink-0 flex-[0.75] h-full border-t border-gray-200 lg:w-96 lg:border-l lg:border-t-0">
          <div className="h-full flex flex-col">
            <PdfSummary pdfUrl={report.fileUrl} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
