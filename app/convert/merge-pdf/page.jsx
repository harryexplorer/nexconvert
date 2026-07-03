"use client";

import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { PDFDocument } from "pdf-lib";
import { saveConversion } from "@/lib/history";
import { auth } from "@/lib/firebase";

export default function MergePDF() {
  const [files, setFiles] = useState([]);
  const [mergedBlob, setMergedBlob] = useState(null);

  const onDrop = (acceptedFiles) => {
    setFiles((prev) => [...prev, ...acceptedFiles]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "application/pdf": [] },
    multiple: true,
    onDrop,
  });

  const mergePDFs = async () => {
    const mergedPdf = await PDFDocument.create();

    for (const file of files) {
      const bytes = await file.arrayBuffer();
      const pdf = await PDFDocument.load(bytes);

      const copiedPages = await mergedPdf.copyPages(
        pdf,
        pdf.getPageIndices()
      );

      copiedPages.forEach((page) =>
        mergedPdf.addPage(page)
      );
    }

    const mergedBytes = await mergedPdf.save();

    await saveConversion(
      auth.currentUser?.uid,
      "Merge PDF",
      files.map((f) => f.name).join(", "),
      files.reduce((acc, f) => acc + f.size, 0)
    );

    setMergedBlob(
      new Blob([mergedBytes], {
        type: "application/pdf",
      })
    );
  };

  return (
    <div>
      <h1>Merge PDF</h1>
    </div>
  );
}