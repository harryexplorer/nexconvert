"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import {
  Upload,
  Shield,
  Sparkles,
  FileText,
  Lock,
  Zap,
} from "lucide-react";

const quickTools = [
  { name: "Image → PDF", link: "/convert/image-to-pdf" },
  { name: "Merge PDF", link: "/convert/merge-pdf" },
  { name: "Compress PDF", link: "/convert/compress-pdf" },
  { name: "JPG → PNG", link: "/convert/jpg-to-png" },
  { name: "PNG → JPG", link: "/convert/png-to-jpg" },
  { name: "WEBP → JPG", link: "/convert/webp-to-jpg" },
];

const features = [
  {
    icon: Upload,
    title: "Universal Conversion",
    desc: "Convert files between dozens of formats instantly.",
  },
  {
    icon: Shield,
    title: "Secure Processing",
    desc: "Your files stay protected with encrypted handling.",
  },
  {
    icon: Sparkles,
    title: "AI Enhancements",
    desc: "Smart tools for compression, cleanup, and optimization.",
  },
  {
    icon: FileText,
    title: "Document Tools",
    desc: "Merge, split, compress, and transform documents.",
  },
  {
    icon: Lock,
    title: "Privacy First",
    desc: "Files auto-delete after processing.",
  },
  {
    icon: Zap,
    title: "Fast Engine",
    desc: "Lightning-fast conversion powered by NexConvert.",
  },
];

export default function HomePage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#0B0B0F] text-white relative overflow-hidden pt-28">
        {/* Grid Background */}
        <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:40px_40px]" />

        {/* Glow Effects */}
        <div className="absolute w-[500px] h-[500px] bg-blue-500/20 blur-[140px] rounded-full top-0 left-0" />
        <div className="absolute w-[500px] h-[500px] bg-purple-500/20 blur-[140px] rounded-full bottom-0 right-0" />

        {/* Hero Section */}
        <section className="relative z-10 max-w-7xl mx-auto px-8 text-center py-20">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-bold leading-tight"
          >
            Convert Any File.
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Upgrade Any File.
            </span>
            <br />
            Protect Any File.
          </motion.h1>

          <p className="text-gray-400 text-xl mt-8 max-w-3xl mx-auto">
            The smartest AI-powered universal file toolkit built for creators,
            students, developers, and professionals.
          </p>

          {/* FIXED BUTTON */}
          <div className="flex justify-center gap-5 mt-10">
            <Link
              href="/convert"
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 font-medium hover:scale-105 transition"
            >
              Start Converting
            </Link>

            <Link
              href="/ai-tools"
              className="px-8 py-4 rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/10 transition"
            >
              Explore AI Tools
            </Link>
          </div>
        </section>

        {/* Quick Tools */}
        <section className="relative z-10 max-w-6xl mx-auto px-8 py-10">
          <div className="bg-white/[0.03] border border-white/10 backdrop-blur-xl rounded-3xl p-8">
            <h2 className="text-3xl font-bold mb-6 text-center">
              Quick Convert Tools ⚡
            </h2>

            <div className="grid md:grid-cols-3 gap-4">
              {quickTools.map((tool, index) => (
                <Link
                  key={index}
                  href={tool.link}
                  className="p-4 rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/10 transition text-center"
                >
                  {tool.name}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="relative z-10 max-w-7xl mx-auto px-8 py-20">
          <h2 className="text-4xl font-bold text-center mb-14">
            Why Choose NexConvert?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <motion.div
                  key={index}
                  whileHover={{ y: -6 }}
                  className="bg-white/[0.03] border border-white/10 backdrop-blur-xl rounded-3xl p-6"
                >
                  <Icon className="text-purple-400 mb-4" size={32} />
                  <h3 className="text-xl font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400">{feature.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </section>
      </main>
    </>
  );
}