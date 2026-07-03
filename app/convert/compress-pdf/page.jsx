"use client";

import { useState } from "react";
import { saveConversion } from "@/lib/history";
import { auth } from "@/lib/firebase";

export default function CompressPDF() {
  const [file, setFile] = useState(null);
  const [compressedBlob, setCompressedBlob] = useState(null);

  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };

  const compressPDF = async () => {
    if (!file) return;

    const arrayBuffer = await file.arrayBuffer();

    const blob = new Blob([arrayBuffer], {
      type: "application/pdf",
    });

    await saveConversion(
      auth.currentUser?.uid,
      "Compress PDF",
      file.name,
      file.size
    );

    setCompressedBlob(blob);
  };

  return (
    <div>
      <h1>Compress PDF</h1>
    </div>
  );
}