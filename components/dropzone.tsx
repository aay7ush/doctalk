"use client";

import { useFileUpload } from "@/hooks/useFileUpload";
import { CloudUploadIcon, Rocket } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";

export default function Dropzone() {
  const { progress, fileId, status, uploadFile } = useFileUpload();
  const router = useRouter();

  useEffect(() => {
    if (fileId) {
      router.push(`/dashboard/files/${fileId}`);
    }
  }, [fileId, router]);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];

      if (file) {
        await uploadFile(file);
        console.log("File uploaded successfully");
      }
    },
    [uploadFile]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
    accept: {
      "application/pdf": [".pdf"],
    },
  });

  const isFileUploading = progress !== null && progress > 0 && progress < 100;

  return (
    <>
      {isFileUploading ? (
        <div
          className={`relative flex h-64 w-full flex-col items-center justify-center rounded-lg border-2 border-dashed transition-colors max-w-2xl mx-auto mt-10 border-primary bg-primary-foreground/10`}
        >
          <div className="space-y-4 text-center">
            <CloudUploadIcon className="h-12 w-12 text-muted-foreground mx-auto" />
            <h3 className="text-xl font-semibold">{status}</h3>
          </div>
        </div>
      ) : (
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
      )}
    </>
  );
}
