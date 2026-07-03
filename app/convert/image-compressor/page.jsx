"use client";

import { useState } from "react";
import { saveConversion } from "@/lib/history";
import { auth } from "@/lib/firebase";

export default function ImageCompressor() {
  const [file, setFile] = useState(null);
  const [compressedUrl, setCompressedUrl] = useState(null);
  const [quality, setQuality] = useState(80);

  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };

  const compressImage = () => {
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e) => {
      const img = new window.Image();
      img.src = e.target.result;

      img.onload = async () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        canvas.width = img.width;
        canvas.height = img.height;

        ctx.drawImage(img, 0, 0);

        const compressed = canvas.toDataURL(
          "image/jpeg",
          quality / 100
        );

        await saveConversion(
          auth.currentUser?.uid,
          "Image Compressor",
          file.name,
          file.size
        );

        setCompressedUrl(compressed);
      };
    };

    reader.readAsDataURL(file);
  };

  return (
    <div>
      <h1>Image Compressor</h1>
    </div>
  );
}