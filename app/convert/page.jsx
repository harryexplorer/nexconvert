"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  FileImage,
  FileText,
  Archive,
  Image as ImageIcon,
  Zap,
} from "lucide-react";

const tools = [
  {
    name: "Image to PDF",
    link: "/convert/image-to-pdf",
    icon: FileImage,
    desc: "Convert multiple images into one PDF file.",
  },
  {
    name: "Merge PDF",
    link: "/convert/merge-pdf",
    icon: FileText,
    desc: "Merge multiple PDFs into one document.",
  },
  {
    name: "Compress PDF",
    link: "/convert/compress-pdf",
    icon: FileText,
    desc: "Reduce PDF file size easily.",
  },
  {
    name: "Create ZIP",
    link: "/convert/create-zip",
    icon: Archive,
    desc: "Combine multiple files into one ZIP archive.",
  },
  {
    name: "Image Compressor",
    link: "/convert/image-compressor",
    icon: Zap,
    desc: "Compress images with quality control.",
  },
  {
    name: "JPG to PNG",
    link: "/convert/jpg-to-png",
    icon: ImageIcon,
    desc: "Convert JPG images into PNG format.",
  },
  {
    name: "PNG to JPG",
    link: "/convert/png-to-jpg",
    icon: ImageIcon,
    desc: "Convert PNG images into JPG format.",
  },
  {
    name: "WEBP to JPG",
    link: "/convert/webp-to-jpg",
    icon: ImageIcon,
    desc: "Convert WEBP images into JPG format.",
  },
  {
    name: "WEBP to PNG",
    link: "/convert/webp-to-png",
    icon: ImageIcon,
    desc: "Convert WEBP images into PNG format.",
  },
];

export default function ConvertHub() {
  return (
    <div className="min-h-screen bg-[#0B0B0F] text-white relative overflow-hidden">

      {/* Grid Background */}
      <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* Glow Effects */}
      <div className="absolute w-[500px] h-[500px] bg-blue-500/20 blur-[140px] rounded-full top-0 left-0" />
      <div className="absolute w-[500px] h-[500px] bg-purple-500/20 blur-[140px] rounded-full bottom-0 right-0" />
      <div className="absolute w-[500px] h-[500px] bg-pink-500/20 blur-[150px] rounded-full top-1/3 left-1/4 animate-pulse" />

      <div className="relative z-10 max-w-7xl mx-auto px-8 py-20">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-6xl font-bold mb-6">
            Choose Your{" "}
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Tool
            </span>
          </h1>

          <p className="text-gray-400 text-xl max-w-2xl mx-auto">
            Fast, secure and powerful file conversion tools.
            Only stable tools are available in this version.
          </p>
        </motion.div>

        {/* Tools Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {tools.map((tool, index) => {
            const Icon = tool.icon;

            return (
              <Link key={index} href={tool.link}>
                <motion.div
                  whileHover={{ y: -6, scale: 1.02 }}
                  className="bg-white/[0.03] border border-white/10 backdrop-blur-xl rounded-3xl p-8 hover:border-purple-400 transition cursor-pointer h-full"
                >
                  <Icon className="text-purple-400 mb-5" size={34} />

                  <h3 className="text-2xl font-bold mb-3">
                    {tool.name}
                  </h3>

                  <p className="text-gray-400">
                    {tool.desc}
                  </p>
                </motion.div>
              </Link>
            );
          })}
        </div>

      </div>
    </div>
  );
}