"use client";

import { useState } from "react";
import { useDropzone } from "react-dropzone";
import JSZip from "jszip";
import { saveConversion } from "@/lib/history";
import { auth } from "@/lib/firebase";

export default function CreateZIP() {
  const [files, setFiles] = useState([]);
  const [zipBlob, setZipBlob] = useState(null);

  const onDrop = (acceptedFiles) => {
    setFiles((prev) => [...prev, ...acceptedFiles]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    multiple: true,
    onDrop,
  });

  const createZIP = async () => {
    const zip = new JSZip();

    files.forEach((file) => {
      zip.file(file.name, file);
    });

    const content = await zip.generateAsync({
      type: "blob",
    });

    await saveConversion(
      auth.currentUser?.uid,
      "Create ZIP",
      files.map((f) => f.name).join(", "),
      files.reduce((acc, f) => acc + f.size, 0)
    );

    setZipBlob(content);
  };

  return (
    <div>
      <h1>Create ZIP</h1>
    </div>
  );
}