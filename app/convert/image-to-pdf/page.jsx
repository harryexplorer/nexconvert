"use client";

import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { PDFDocument } from "pdf-lib";
import {
  Upload,
  FileImage,
  Download,
  X,
  Sparkles,
} from "lucide-react";
import { saveConversion } from "@/lib/history";
import { auth } from "@/lib/firebase";

export default function ImageToPDF() {
  const [files, setFiles] = useState([]);
  const [pdfBlob, setPdfBlob] = useState(null);
  const [loading, setLoading] = useState(false);

  const onDrop = (acceptedFiles) => {
    setFiles((prev) => [...prev, ...acceptedFiles]);
    setPdfBlob(null);
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "image/*": [] },
    multiple: true,
    onDrop,
  });

  const removeFile = (index) => {
    const updated = [...files];
    updated.splice(index, 1);
    setFiles(updated);
  };

  const convertToPDF = async () => {
    if (!files.length) return;

    setLoading(true);

    const pdfDoc = await PDFDocument.create();

    for (const file of files) {
      const bytes = await file.arrayBuffer();
      let image;

      if (file.type === "image/png") {
        image = await pdfDoc.embedPng(bytes);
      } else {
        image = await pdfDoc.embedJpg(bytes);
      }

      const page = pdfDoc.addPage([image.width, image.height]);

      page.drawImage(image, {
        x: 0,
        y: 0,
        width: image.width,
        height: image.height,
      });
    }

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], {
      type: "application/pdf",
    });

    await saveConversion(
      auth.currentUser?.uid,
      "Image to PDF",
      files.map((f) => f.name).join(", "),
      files.reduce((acc, f) => acc + f.size, 0)
    );

    setPdfBlob(blob);
    setLoading(false);
  };

  const downloadPDF = () => {
    const link = document.createElement("a");
    link.href = URL.createObjectURL(pdfBlob);
    link.download = "converted.pdf";
    link.click();
  };

  return (
    <div>
      <h1>Image to PDF</h1>
    </div>
  );
}