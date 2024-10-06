import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { useState } from "react";
import Dropzone from "react-dropzone";

const UploadButton = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [files, setFiles] = useState<File[]>([]);

  const handleDrop = (acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
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
        <Dropzone onDrop={handleDrop} accept={{ "application/pdf": [] }}>
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
              <p>Drag and drop your PDF files here, or click to select files</p>
            </div>
          )}
        </Dropzone>

        {/* Show uploaded files */}
        {files.length > 0 && (
          <div>
            <h4>Uploaded Files:</h4>
            <ul>
              {files.map((file, index) => (
                <li key={index}>{file.name}</li>
              ))}
            </ul>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default UploadButton;
