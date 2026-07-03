"use client";

import { useState } from "react";
import { saveConversion } from "@/lib/history";
import { auth } from "@/lib/firebase";

export default function WEBPtoPNG() {
  const [file, setFile] = useState(null);
  const [convertedUrl, setConvertedUrl] = useState(null);

  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };

  const convert = () => {
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

        const pngData = canvas.toDataURL("image/png");

        await saveConversion(
          auth.currentUser?.uid,
          "WEBP to PNG",
          file.name,
          file.size
        );

        setConvertedUrl(pngData);
      };
    };

    reader.readAsDataURL(file);
  };

  return (
    <div>
      <h1>WEBP to PNG</h1>
    </div>
  );
}