"use client";
import React, { useState, useRef, useEffect } from "react";
import {
  Upload, FileText, ScanText, Brain, Languages, ListChecks,
  NotebookPen, HelpCircle, ImageIcon, ScanLine, Sparkles,
  Copy, Download, Bookmark, X, Check, Loader2, Clock, ChevronRight
} from "lucide-react";

const SECTIONS = [
  {
    id: "pdf-intelligence",
    title: "PDF Intelligence",
    subtitle: "Understand any document in seconds",
    accent: "from-blue-500/20 via-purple-500/20 to-pink-500/20",
    tools: [
      { id: "summarize", name: "Summarize PDF", icon: FileText },
      { id: "explain", name: "Explain PDF", icon: Brain },
      { id: "translate", name: "Translate PDF", icon: Languages },
      { id: "keypoints", name: "Extract Key Points", icon: ListChecks },
      { id: "notes", name: "Generate Notes", icon: NotebookPen },
      { id: "quiz", name: "Generate Quiz", icon: HelpCircle },
    ],
  },
  {
    id: "ocr-tools",
    title: "OCR Tools",
    subtitle: "Turn images into text",
    accent: "from-purple-500/20 via-pink-500/20 to-blue-500/20",
    tools: [
      { id: "ocr-pdf", name: "OCR PDF", icon: ScanText },
      { id: "ocr-image", name: "OCR Image", icon: ImageIcon },
    ],
  },
  {
    id: "smart-analysis",
    title: "Smart Analysis",
    subtitle: "Deep AI document analysis",
    accent: "from-pink-500/20 via-blue-500/20 to-purple-500/20",
    tools: [
      { id: "analyzer", name: "Smart File Analyzer", icon: ScanLine },
      { id: "classify", name: "Content Classifier", icon: Sparkles },
    ],
  },
];

const ALL_TOOLS = SECTIONS.flatMap((s) => s.tools);

const SAMPLE_RESULTS = {
  summarize: "Summary generated successfully...",
  explain: "Document explained successfully...",
  translate: "Translation completed...",
  keypoints: "Key points extracted...",
  notes: "Study notes generated...",
  quiz: "Quiz generated...",
  "ocr-pdf": "OCR completed...",
  "ocr-image": "Image OCR extracted...",
  analyzer: "Smart analysis completed...",
  classify: "Classification complete..."
};

function GlowCard({ children, className = "", glow = false }) {
  return (
    <div
      className={`relative rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl overflow-hidden ${className}`}
    >
      {glow && (
        <>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 animate-pulse" />
          <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-20 blur-xl" />
        </>
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );
}

export default function AiToolsPage() {
  const [activeTool, setActiveTool] = useState(ALL_TOOLS[0]);
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("idle");
  const [progress, setProgress] = useState(0);
  const [eta, setEta] = useState(0);
  const [result, setResult] = useState("");

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
    setResult("");
  };

  const runTool = () => {
    if (!file) return;

    console.log("Sending AI request to backend...");

    setStatus("processing");
    setEta(Math.floor(Math.random() * 8) + 4);
    setProgress(0);

    clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.random() * 15 + 5;

        if (next >= 100) {
          clearInterval(timerRef.current);
          setStatus("done");
          setResult(SAMPLE_RESULTS[activeTool.id]);
          return 100;
        }

        return next;
      });

      setEta((prev) => (prev > 0 ? prev - 1 : 0));
    }, 250);
  };

  return (
    <div className="min-h-screen bg-[#0B0B0F] text-white relative overflow-hidden px-6 py-20">

      {/* Grid Background */}
      <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* Dynamic Blobs */}
      <div className="absolute w-[450px] h-[450px] bg-blue-500/40 blur-[120px] rounded-full top-10 left-10 mix-blend-screen" />
      <div className="absolute w-[400px] h-[400px] bg-purple-500/40 blur-[120px] rounded-full bottom-20 right-10 mix-blend-screen" />
      <div className="absolute w-[500px] h-[500px] bg-pink-500/20 blur-[150px] rounded-full top-1/3 left-1/4 animate-pulse" />

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold mb-3">
            AI <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Tools
            </span>
          </h1>
          <p className="text-gray-400 max-w-xl">
            Let AI analyze, summarize, extract, and transform your files instantly.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1.7fr_0.8fr] gap-8">

          {/* Left Side */}
          <div className="space-y-10">
            {SECTIONS.map((section) => (
              <div key={section.id}>
                <h2 className="text-xl font-semibold mb-1">{section.title}</h2>
                <p className="text-sm text-gray-500 mb-4">{section.subtitle}</p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {section.tools.map((tool) => {
                    const Icon = tool.icon;
                    const active = activeTool.id === tool.id;

                    return (
                      <button
                        key={tool.id}
                        onClick={() => setActiveTool(tool)}
                        className={`rounded-2xl p-4 border transition-all hover:scale-[1.02]
                        ${
                          active
                            ? `bg-gradient-to-br ${section.accent} border-purple-400/40`
                            : "bg-white/[0.03] border-white/10 hover:bg-gradient-to-br hover:from-blue-500/10 hover:via-purple-500/10 hover:to-pink-500/10"
                        }`}
                      >
                        <Icon className="w-5 h-5 mb-3 text-purple-300" />
                        <p className="text-sm font-medium">{tool.name}</p>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* Workspace */}
            <GlowCard glow className="p-6">
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
                  <p>Upload your file</p>
                </div>
              ) : (
                <div>
                  <div className="flex justify-between items-center mb-5">
                    <div>
                      <p>{file.name}</p>
                      <p className="text-sm text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>

                    <button onClick={() => setFile(null)}>
                      <X />
                    </button>
                  </div>

                  {file.type.startsWith("image/") && (
                    <img
                      src={URL.createObjectURL(file)}
                      alt="preview"
                      className="w-28 h-28 rounded-xl object-cover mb-5"
                    />
                  )}

                  <button
                    onClick={runTool}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 font-medium"
                  >
                    Run {activeTool.name}
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
                    <div className="mt-6 relative rounded-2xl border border-purple-400/30 bg-purple-500/[0.05] p-5 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse" />

                      <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-3 text-green-400">
                          <Check size={16} />
                          Result Ready
                        </div>

                        <p className="text-sm text-gray-300 mb-4">{result}</p>

                        <div className="flex gap-3">
                          <button className="flex-1 py-2 rounded-xl border border-white/10 flex justify-center items-center gap-2">
                            <Copy size={14} /> Copy
                          </button>
                          <button className="flex-1 py-2 rounded-xl border border-white/10 flex justify-center items-center gap-2">
                            <Bookmark size={14} /> Save
                          </button>
                          <button className="flex-1 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 flex justify-center items-center gap-2">
                            <Download size={14} /> Download
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </GlowCard>
          </div>

          {/* Sidebar */}
          <GlowCard className="p-6 h-fit">
            <h3 className="text-lg font-semibold mb-5">Recent AI Activity</h3>

            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="flex justify-between items-center py-3 border-b border-white/5"
              >
                <div>
                  <p className="text-sm">Summarize PDF</p>
                  <p className="text-xs text-gray-500">2 mins ago</p>
                </div>
                <ChevronRight size={14} />
              </div>
            ))}
          </GlowCard>
        </div>
      </div>
    </div>
  );
}