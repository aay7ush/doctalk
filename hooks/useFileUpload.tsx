"use client";

import { db, storage } from "@/lib/firebase";
import { useUser } from "@clerk/nextjs";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export enum FileUploadStatus {
  UPLOADING = "Uploading file...",
  UPLOADED = "File uploaded successfully",
  SAVING = "Saving file to database...",
  GENERATING = "Generating AI Embeddings, This will only take a few seconds...",
}

export function useFileUpload() {
  const [progress, setProgress] = useState<number | null>(null);
  const [fileId, setFileId] = useState<string | null>(null);
  const [status, setStatus] = useState<FileUploadStatus | null>(null);

  const { user } = useUser();

  const uploadFile = async (file: File) => {
    if (!file || !user) return;

    const fileId = uuidv4();

    const storageRef = ref(storage, `users/${user.id}/files/${fileId}`);

    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setStatus(FileUploadStatus.UPLOADING);
        setProgress(progress);
      },
      (error) => {
        console.error("Upload failed:", error);
      },
      async () => {
        setStatus(FileUploadStatus.UPLOADED);

        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

        setStatus(FileUploadStatus.SAVING);
        const docRef = doc(db, `users/${user.id}/files/${fileId}`);
        setDoc(docRef, {
          name: file.name,
          size: file.size,
          type: file.type,
          downloadURL,
          ref: uploadTask.snapshot.ref.fullPath,
          createdAt: serverTimestamp(),
        });

        setStatus(FileUploadStatus.GENERATING);
        setFileId(fileId);
      }
    );
  };

  return { progress, fileId, status, uploadFile };
}
