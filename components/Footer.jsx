"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Zap, Mail, Shield, FileText } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/30 backdrop-blur-2xl mt-20">
      <div className="max-w-7xl mx-auto px-8 py-12">

        {/* Top */}
        <div className="grid md:grid-cols-4 gap-10">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <motion.div
                whileHover={{ rotate: 10 }}
                className="w-10 h-10 rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center"
              >
                <Zap size={22} />
              </motion.div>

              <span className="text-2xl font-bold text-white">
                NexConvert
              </span>
            </div>

            <p className="text-gray-400 text-sm leading-6">
              Fast, secure, and smart file conversion tools
              built for creators, developers, and students.
            </p>
          </div>

          {/* Tools */}
          <div>
            <h3 className="text-white font-semibold mb-4">
              Tools
            </h3>

            <div className="space-y-3 text-gray-400">
              <Link href="/convert/image-to-pdf" className="block hover:text-white">
                Image to PDF
              </Link>
              <Link href="/convert/merge-pdf" className="block hover:text-white">
                Merge PDF
              </Link>
              <Link href="/convert/compress-pdf" className="block hover:text-white">
                Compress PDF
              </Link>
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold mb-4">
              Company
            </h3>

            <div className="space-y-3 text-gray-400">
              <Link href="/" className="block hover:text-white">
                Home
              </Link>
              <Link href="/dashboard" className="block hover:text-white">
                Dashboard
              </Link>
              <Link href="/profile" className="block hover:text-white">
                Profile
              </Link>
            </div>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-semibold mb-4">
              Legal
            </h3>

            <div className="space-y-3 text-gray-400">
              <Link href="/privacy" className="flex items-center gap-2 hover:text-white">
                <Shield size={16} />
                Privacy Policy
              </Link>

              <Link href="/terms" className="flex items-center gap-2 hover:text-white">
                <FileText size={16} />
                Terms of Service
              </Link>

              <Link href="/contact" className="flex items-center gap-2 hover:text-white">
                <Mail size={16} />
                Contact
              </Link>
            </div>
          </div>

        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © 2026 NexConvert. All rights reserved.
          </p>

          <p className="text-gray-500 text-sm">
            Built with speed, privacy & simplicity.
          </p>
        </div>

      </div>
    </footer>
  );
}