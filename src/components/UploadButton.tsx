import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { useState, useEffect } from "react";
import { useUploadThing } from "@/lib/uploadthing";
import Dropzone from "react-dropzone";
import { useRouter } from "next/navigation"; // Import useRouter from Next.js
import { withAuthInfo, WithAuthInfoProps } from "@propelauth/react";
import { createReport } from "@/lib/actions/report.actions";

const UploadButton = (props: WithAuthInfoProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [files, setFiles] = useState<File[]>([]);
  const { startUpload, isUploading } = useUploadThing("fileUploader");
  const [isMounted, setIsMounted] = useState(false); // Track if the component is mounted
  const router = useRouter(); // Initialize useRouter hook

  const userEmail = props.user?.email; // Get the user's email from the props
  console.log("User email:", userEmail);

  // Ensure the component is mounted in the browser
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMounted(true); // Only set isMounted to true in the client-side
    }
  }, []);

  // Handle files dropped or selected in the dropzone
  const handleDrop = (acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
  };

  // Upload the files using UploadThing
  const handleUpload = async () => {
    if (files.length === 0) {
      return alert("Please select a file to upload.");
    }

    try {
      const result = await startUpload(files);

      if (result && result.length > 0) {
        console.log("Files successfully uploaded:", result[0]);
        alert("Upload successful!");

        const fileId = result[0].key; // Assuming result[0] contains the uploaded file and has a fileId

        // Assuming summary is an empty string for now
        const summary = "";

        // Call createReport to store the report in MongoDB
        await createReport({
          summary,
          author: userEmail || "unknown", // Use the user email as the author, default to "unknown" if undefined
          filename: files[0].name, // Filename of the uploaded file
          fileUrl: fileId, // The uploaded file's key from UploadThing
        });

        // Push to the new route using the fileId, only if the component is mounted
        if (isMounted) {
          router.push(`/dashboard/${fileId}`);
        }

        setFiles([]); // Clear the files after successful upload
        setIsOpen(false); // Close the dialog after a successful upload
      }
    } catch (error) {
      console.error("Error uploading files:", error);
      alert("Failed to upload files.");
    }
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(v) => {
        if (!v) {
          setIsOpen(v);
        }
      }}
    >
      <DialogTrigger onClick={() => setIsOpen(true)} asChild>
        <Button>Upload PDF</Button>
      </DialogTrigger>

      <DialogContent>
        {/* Dropzone area for drag-and-drop file selection */}
        <Dropzone
          onDrop={handleDrop}
          accept={{ "application/pdf": [] }}
          multiple={false} // Set to true if multiple file uploads are needed
        >
          {({ getRootProps, getInputProps }) => (
            <div
              {...getRootProps()}
              style={{
                border: "2px dashed #cccccc",
                borderRadius: "5px",
                padding: "20px",
                textAlign: "center",
                cursor: "pointer",
              }}
            >
              <input {...getInputProps()} />
              <p>Drag and drop your PDF file here, or click to select a file</p>
            </div>
          )}
        </Dropzone>

        {/* Display the selected file */}
        {files.length > 0 && (
          <div>
            <h4>Selected File:</h4>
            <ul>
              {files.map((file, index) => (
                <li key={index}>{file.name}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Upload button */}
        <Button onClick={handleUpload} disabled={isUploading}>
          {isUploading ? "Uploading..." : "Upload"}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

// Wrap UploadButton with withAuthInfo
export default withAuthInfo(UploadButton);
