"use client";

import { CloudUploadIcon, Rocket } from "lucide-react";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

export default function Dropzone() {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    console.log(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });

  return (
    <div
      {...getRootProps()}
      className={`relative flex h-64 w-full flex-col items-center justify-center rounded-lg border-2 border-dashed transition-colors max-w-2xl mx-auto mt-10 ${
        isDragActive
          ? "border-primary bg-primary-foreground/10"
          : "border-text-muted hover:border-primary"
      }`}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <div className="space-y-4 text-center">
          <Rocket className="h-12 w-12 text-muted-foreground mx-auto animate-ping" />
          <h3 className="text-xl font-semibold">Drop the files here...</h3>
        </div>
      ) : (
        <div className="space-y-4 text-center">
          <CloudUploadIcon className="h-12 w-12 text-muted-foreground mx-auto" />
          <h3 className="text-xl font-semibold">Upload a PDF file</h3>
          <p className="text-muted-foreground">
            Drag and drop your file here or click to select a file from your
            computer.
          </p>
        </div>
      )}
    </div>
  );
}
