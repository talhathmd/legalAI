import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { useState } from "react";
import { useUploadThing } from "@/lib/uploadthing";
import Dropzone from "react-dropzone";

const UploadButton = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [files, setFiles] = useState<File[]>([]);
  const { startUpload, isUploading } = useUploadThing("fileUploader");

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

      if (result) {
        console.log("Files successfully uploaded:", result);
        alert("Upload successful!");
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

export default UploadButton;
