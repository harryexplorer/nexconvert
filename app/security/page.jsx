"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Shield,
  Lock,
  Unlock,
  FileKey,
  FileLock2,
  Stamp,
  Download,
  Upload,
  X,
  Check,
  ChevronRight,
} from "lucide-react";

const SECURITY_TOOLS = [
  {
    id: "add-password",
    name: "Add Password",
    desc: "Protect your file with a secure password",
    icon: Lock,
  },
  {
    id: "remove-password",
    name: "Remove Password",
    desc: "Remove existing file password",
    icon: Unlock,
  },
  {
    id: "encrypt",
    name: "Encrypt File",
    desc: "Encrypt file with strong security",
    icon: FileKey,
  },
  {
    id: "watermark",
    name: "Watermark PDF",
    desc: "Add visible watermark to documents",
    icon: Stamp,
  },
  {
    id: "lock-file",
    name: "Lock File",
    desc: "Restrict edits and modifications",
    icon: FileLock2,
  },
  {
    id: "secure-compress",
    name: "Secure Compress",
    desc: "Compress while maintaining protection",
    icon: Shield,
  },
];

function formatBytes(bytes) {
  if (!bytes) return "0 KB";
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(0)} KB`;
  return `${(kb / 1024).toFixed(1)} MB`;
}

export default function SecurityPage() {
  const [activeTool, setActiveTool] = useState(SECURITY_TOOLS[0]);
  const [file, setFile] = useState(null);
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("idle");
  const [progress, setProgress] = useState(0);
  const [eta, setEta] = useState(0);

  const inputRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    return () => clearInterval(timerRef.current);
  }, []);

  const handleFiles = (fileList) => {
    const f = fileList?.[0];
    if (!f) return;
    if (f.size > 100 * 1024 * 1024) return;

    setFile(f);
    setStatus("idle");
    setProgress(0);
  };

  const runSecurityTool = () => {
    if (!file) return;

    console.log("Sending file to backend security API...");

    setStatus("processing");
    setEta(Math.floor(Math.random() * 10) + 5);
    setProgress(0);

    clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.random() * 15 + 8;

        if (next >= 100) {
          clearInterval(timerRef.current);
          setStatus("done");
          return 100;
        }

        return next;
      });

      setEta((prev) => (prev > 0 ? prev - 1 : 0));
    }, 250);
  };

  return (
    <div className="min-h-screen bg-[#0B0B0F] text-white relative overflow-hidden">

      {/* Grid Background */}
      <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* Glow blobs */}
      <div className="absolute w-[450px] h-[450px] bg-blue-500/30 blur-[140px] rounded-full top-10 left-10" />
      <div className="absolute w-[450px] h-[450px] bg-purple-500/30 blur-[140px] bottom-20 right-10" />
      <div className="absolute w-[500px] h-[500px] bg-pink-500/20 blur-[150px] rounded-full top-1/3 left-1/4 animate-pulse" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold mb-3">
            Security{" "}
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Tools
            </span>
          </h1>
          <p className="text-gray-400 max-w-xl">
            Secure, protect, and control your files with advanced encryption and locking.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1.7fr_0.8fr] gap-8">

          {/* Left Side */}
          <div className="space-y-8">

            {/* Tool Cards */}
            <div className="grid sm:grid-cols-2 gap-4">
              {SECURITY_TOOLS.map((tool) => {
                const Icon = tool.icon;
                const active = activeTool.id === tool.id;

                return (
                  <button
                    key={tool.id}
                    onClick={() => setActiveTool(tool)}
                    className={`p-5 rounded-2xl border text-left transition hover:scale-[1.02]
                      ${
                        active
                          ? "bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 border-purple-400/40"
                          : "bg-white/[0.03] border-white/10 hover:bg-white/[0.05]"
                      }`}
                  >
                    <Icon className="w-5 h-5 mb-3 text-purple-300" />
                    <p className="font-medium">{tool.name}</p>
                    <p className="text-sm text-gray-500 mt-1">{tool.desc}</p>
                  </button>
                );
              })}
            </div>

            {/* Upload Workspace */}
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-6">
              {!file ? (
                <div
                  onClick={() => inputRef.current?.click()}
                  className="border-2 border-dashed border-white/10 rounded-3xl p-10 text-center cursor-pointer hover:bg-white/[0.03]"
                >
                  <input
                    ref={inputRef}
                    type="file"
                    className="hidden"
                    onChange={(e) => handleFiles(e.target.files)}
                  />
                  <Upload className="mx-auto mb-4 text-purple-300" />
                  <p>Upload your secure file</p>
                </div>
              ) : (
                <div>
                  <div className="flex justify-between items-center mb-5">
                    <div>
                      <p>{file.name}</p>
                      <p className="text-sm text-gray-500">
                        {formatBytes(file.size)}
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        setFile(null);
                        setStatus("idle");
                        setProgress(0);
                      }}
                    >
                      <X />
                    </button>
                  </div>

                  {(activeTool.id === "add-password" ||
                    activeTool.id === "encrypt") && (
                    <input
                      type="password"
                      placeholder="Enter password..."
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full mb-5 px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 outline-none"
                    />
                  )}

                  <button
                    onClick={runSecurityTool}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
                  >
                    Apply {activeTool.name}
                  </button>

                  {status === "processing" && (
                    <div className="mt-5">
                      <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
                          style={{ width: `${progress}%` }}
                        />
                      </div>

                      <p className="text-xs text-gray-500 mt-2">
                        Estimated time: {eta}s remaining
                      </p>
                    </div>
                  )}

                  {status === "done" && (
                    <div className="mt-6 rounded-2xl border border-green-400/20 bg-green-500/[0.05] p-5">
                      <div className="flex items-center gap-2 text-green-400 mb-3">
                        <Check size={16} />
                        Security Applied Successfully
                      </div>

                      <button className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 flex justify-center items-center gap-2">
                        <Download size={16} />
                        Download Secure File
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-6 h-fit">
            <h3 className="text-lg font-semibold mb-5">Recent Security Tasks</h3>

            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="flex justify-between items-center py-3 border-b border-white/5"
              >
                <div>
                  <p className="text-sm">Encrypt File</p>
                  <p className="text-xs text-gray-500">5 mins ago</p>
                </div>
                <ChevronRight size={14} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}