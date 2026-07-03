"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FileText,
  Image,
  Archive,
  Activity,
  Clock,
  HardDrive,
  Star,
  Zap,
} from "lucide-react";
import { db } from "@/lib/firebase";
import {
  collection,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";

const quickTools = [
  {
    name: "Image to PDF",
    link: "/convert/image-to-pdf",
    icon: Image,
  },
  {
    name: "Merge PDF",
    link: "/convert/merge-pdf",
    icon: FileText,
  },
  {
    name: "Create ZIP",
    link: "/convert/create-zip",
    icon: Archive,
  },
  {
    name: "Compress PDF",
    link: "/convert/compress-pdf",
    icon: Zap,
  },
];

const favoriteTools = [
  "Image to PDF",
  "PNG to JPG",
  "JPG to PNG",
  "Compress PDF",
];

export default function DashboardPage() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const q = query(
          collection(db, "history"),
          orderBy("createdAt", "desc")
        );

        const snapshot = await getDocs(q);

        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setHistory(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchHistory();
  }, []);

  const totalStorage = (
    history.reduce(
      (acc, item) => acc + (item.fileSize || 0),
      0
    ) /
    1024 /
    1024
  ).toFixed(2);

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-[#0B0B0F] text-white relative overflow-hidden">

        {/* Grid Background */}
        <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:40px_40px]" />

        {/* Glow Effects */}
        <div className="absolute w-[500px] h-[500px] bg-blue-500/20 blur-[140px] rounded-full top-0 left-0" />
        <div className="absolute w-[500px] h-[500px] bg-purple-500/20 blur-[140px] rounded-full bottom-0 right-0" />

        <div className="relative z-10 max-w-7xl mx-auto px-8 py-16">

          {/* Header */}
          <div className="mb-14">
            <h1 className="text-5xl font-bold mb-3">
              Welcome back 👋
            </h1>

            <p className="text-gray-400 text-lg">
              Manage your files and track all your conversions.
            </p>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-4 gap-6 mb-14">
            {[
              {
                title: "Total Conversions",
                value: history.length,
                icon: Activity,
              },
              {
                title: "Storage Used",
                value: `${totalStorage} MB`,
                icon: HardDrive,
              },
              {
                title: "Downloads",
                value: history.length,
                icon: FileText,
              },
              {
                title: "Active Tools",
                value: "9",
                icon: Zap,
              },
            ].map((stat, index) => {
              const Icon = stat.icon;

              return (
                <motion.div
                  key={index}
                  whileHover={{ y: -5 }}
                  className="bg-white/[0.03] border border-white/10 backdrop-blur-xl rounded-3xl p-6"
                >
                  <Icon
                    className="text-purple-400 mb-4"
                    size={28}
                  />

                  <h2 className="text-2xl font-bold">
                    {stat.value}
                  </h2>

                  <p className="text-gray-400">
                    {stat.title}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* Quick Tools */}
          <div className="mb-14">
            <h2 className="text-3xl font-bold mb-6">
              Quick Access Tools ⚡
            </h2>

            <div className="grid md:grid-cols-4 gap-6">
              {quickTools.map((tool, index) => {
                const Icon = tool.icon;

                return (
                  <Link key={index} href={tool.link}>
                    <motion.div
                      whileHover={{ y: -5 }}
                      className="bg-white/[0.03] border border-white/10 backdrop-blur-xl rounded-3xl p-6 cursor-pointer hover:border-purple-400 transition"
                    >
                      <Icon
                        className="text-purple-400 mb-4"
                        size={28}
                      />

                      <h3 className="text-lg font-semibold">
                        {tool.name}
                      </h3>
                    </motion.div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* History + Favorites */}
          <div className="grid md:grid-cols-2 gap-8">

            {/* History */}
            <div className="bg-white/[0.03] border border-white/10 backdrop-blur-xl rounded-3xl p-6">
              <div className="flex items-center gap-3 mb-5">
                <Clock className="text-purple-400" />

                <h2 className="text-2xl font-bold">
                  Recent Conversions
                </h2>
              </div>

              <div className="space-y-4">
                {history.length > 0 ? (
                  history.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 rounded-2xl bg-white/[0.03] border border-white/10"
                    >
                      {item.toolName} → {item.fileName}
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400">
                    No conversions yet
                  </p>
                )}
              </div>
            </div>

            {/* Favorites */}
            <div className="bg-white/[0.03] border border-white/10 backdrop-blur-xl rounded-3xl p-6">
              <div className="flex items-center gap-3 mb-5">
                <Star className="text-purple-400" />

                <h2 className="text-2xl font-bold">
                  Favorite Tools
                </h2>
              </div>

              <div className="space-y-4">
                {favoriteTools.map((tool, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-2xl bg-white/[0.03] border border-white/10"
                  >
                    {tool}
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}