import PdfRenderer from "@/components/PdfRenderer";

interface PageProps {
  params: {
    fileid: string;
  };
}

const Page = async ({ params }: PageProps) => {
  // TODO: THIS IS HARDCODED TO TEST. GET FROM DB
  const file = {
    id: "j3fYkfXO4qbffxtGxSCe6vq5FobKhMWLy3fxaIJun207DU1V",
    url: "https://utfs.io/f/j3fYkfXO4qbfpU5EWfXqEhjJMIcxs3f5HZOyB7o9bGnmvgPu",
  };

  return (
    <div className="flex-1 justify-between flex flex-col h-[calc(100vh-3.5rem)]">
      <div className="mx-auto w-full max-w-8xl grow lg:flex xl:px-2">
        {/* Left sidebar & main wrapper */}
        <div className="flex-1 xl:flex">
          <div className="px-4 py-6 sm:px-6 lg:pl-8 xl:flex-1 xl:pl-6">
            {/* Main area */}
            <PdfRenderer url={file.url} />
          </div>
        </div>

        <div className="shrink-0 flex-[0.75] border-t border-gray-200 lg:w-96 lg:border-l lg:border-t-0">
          {/* TODO */}
        </div>
      </div>
    </div>
  );
};

export default Page;
