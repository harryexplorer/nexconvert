"use client";

import { useState } from "react";
import { saveConversion } from "@/lib/history";
import { auth } from "@/lib/firebase";

export default function WEBPtoJPG() {
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

        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.drawImage(img, 0, 0);

        const jpgData = canvas.toDataURL("image/jpeg", 0.95);

        await saveConversion(
          auth.currentUser?.uid,
          "WEBP to JPG",
          file.name,
          file.size
        );

        setConvertedUrl(jpgData);
      };
    };

    reader.readAsDataURL(file);
  };

  return (
    <div>
      <h1>WEBP to JPG</h1>
    </div>
  );
}