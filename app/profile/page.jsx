"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import {
  collection,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";
import { motion } from "framer-motion";
import {
  User,
  Activity,
  HardDrive,
  Download,
  FileText,
  Mail,
} from "lucide-react";

export default function ProfilePage() {
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

  const user = auth.currentUser;

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

        {/* Grid */}
        <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:40px_40px]" />

        {/* Glow */}
        <div className="absolute w-[500px] h-[500px] bg-blue-500/20 blur-[140px] rounded-full top-0 left-0" />
        <div className="absolute w-[500px] h-[500px] bg-purple-500/20 blur-[140px] rounded-full bottom-0 right-0" />

        <div className="relative z-10 max-w-6xl mx-auto px-8 py-16">

          {/* Profile Header */}
          <div className="flex items-center gap-6 mb-14">
            <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center">
              <User size={40} />
            </div>

            <div>
              <h1 className="text-4xl font-bold">
                {user?.displayName || "NexConvert User"}
              </h1>

              <p className="text-gray-400 flex items-center gap-2 mt-2">
                <Mail size={16} />
                {user?.email}
              </p>
            </div>
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
                icon: Download,
              },
              {
                title: "Processed Files",
                value: history.length,
                icon: FileText,
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

          {/* Conversion History */}
          <div className="bg-white/[0.03] border border-white/10 backdrop-blur-xl rounded-3xl p-6">
            <h2 className="text-2xl font-bold mb-6">
              Conversion History
            </h2>

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

        </div>
      </div>
    </ProtectedRoute>
  );
}