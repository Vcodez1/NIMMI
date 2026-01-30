"use client";

import { useState } from "react";
import { X, Copy, Check, Code, Terminal, Layers } from "lucide-react";

interface ExportModalProps {
    botId: string;
    onClose: () => void;
}

export default function ExportModal({ botId, onClose }: ExportModalProps) {
    const [copied, setCopied] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<"html" | "react" | "nextjs">("html");

    const baseUrl = typeof window !== "undefined" && !window.location.hostname.includes("localhost")
        ? window.location.origin
        : "http://192.168.1.46:3000";
    const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://192.168.1.46:8000";
    const scriptUrl = `${baseUrl}/widget.js`;

    const snippets = {
        html: `<!-- Nimmi AI Chatbot -->
<script 
  src="${scriptUrl}" 
  data-bot-id="${botId}" 
  data-api-url="${apiBase}"
  defer
></script>`,
        react: `import { useEffect } from 'react';

export default function NimmiChat() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "${scriptUrl}";
    script.setAttribute('data-bot-id', '${botId}');
    script.setAttribute('data-api-url', '${apiBase}');
    script.defer = true;
    document.body.appendChild(script);
    
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return null;
}

// Usage: <NimmiChat />`,
        nextjs: `"use client";

import Script from 'next/script';

export default function NimmiChatbot() {
  return (
    <Script
      src="${scriptUrl}"
      data-bot-id="${botId}"
      data-api-url="${apiBase}"
      strategy="afterInteractive"
    />
  );
}`
    };

    const handleCopy = (type: string, text: string) => {
        navigator.clipboard.writeText(text);
        setCopied(type);
        setTimeout(() => setCopied(null), 2000);
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-zinc-900 border border-white/10 rounded-[32px] w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
                <div className="p-6 border-b border-white/5 flex items-center justify-between bg-zinc-900/50 backdrop-blur-md sticky top-0 z-10">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-600/20 rounded-xl flex items-center justify-center border border-blue-500/20">
                            <Code size={20} className="text-blue-400" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-white">Export Chatbot</h3>
                            <p className="text-xs text-white/40">Deploy your bot to any website or app</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-white/5 rounded-full transition-colors group"
                    >
                        <X size={20} className="text-white/40 group-hover:text-white" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                    <div className="space-y-8">
                        {/* Tab Switcher */}
                        <div className="flex p-1.5 bg-white/5 rounded-2xl gap-1">
                            {[
                                { id: "html", label: "HTML Snippet", icon: Code },
                                { id: "react", label: "React / TS", icon: Terminal },
                                { id: "nextjs", label: "Next.js", icon: Layers },
                            ].map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id as any)}
                                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all ${activeTab === tab.id
                                        ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                                        : "text-white/40 hover:text-white/60"
                                        }`}
                                >
                                    <tab.icon size={14} />
                                    {tab.label}
                                </button>
                            ))}
                        </div>

                        {/* Code Display */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between mb-2">
                                <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest">
                                    {activeTab.toUpperCase()} Integration Code
                                </p>
                                <button
                                    onClick={() => handleCopy(activeTab, snippets[activeTab])}
                                    className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-[10px] font-bold hover:bg-white/10 transition-all text-white/60 hover:text-white"
                                >
                                    {copied === activeTab ? (
                                        <>
                                            <Check size={12} className="text-green-500" />
                                            Copied!
                                        </>
                                    ) : (
                                        <>
                                            <Copy size={12} />
                                            Copy Code
                                        </>
                                    )}
                                </button>
                            </div>
                            <div className="bg-black/40 border border-white/5 rounded-2xl p-6 font-mono text-sm group relative overflow-hidden">
                                <pre className="text-blue-400 overflow-x-auto whitespace-pre-wrap leading-relaxed">
                                    {snippets[activeTab]}
                                </pre>
                                <div className="absolute top-0 right-0 w-1/4 h-full bg-gradient-to-l from-zinc-900/0 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                        </div>

                        {/* Instructions */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                            <div className="p-5 bg-white/5 rounded-2xl border border-white/5 space-y-3">
                                <h4 className="text-xs font-bold text-white/60 uppercase tracking-wider">Quick Setup</h4>
                                <ul className="space-y-2">
                                    {[
                                        "Copy the code snippet above",
                                        "Paste it before the closing </body> tag",
                                        "Refresh your website to see the bot"
                                    ].map((step, i) => (
                                        <li key={i} className="text-[11px] text-white/30 flex gap-2">
                                            <span className="text-blue-500 font-bold">{i + 1}.</span> {step}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="p-5 bg-blue-600/5 rounded-2xl border border-blue-600/10 space-y-3">
                                <h4 className="text-xs font-bold text-blue-400/60 uppercase tracking-wider">Need Help?</h4>
                                <p className="text-[11px] text-white/30 leading-relaxed">
                                    If you are having trouble deploying, check our documentation or reach out to support. Your Bot ID is:
                                </p>
                                <code className="block p-2 bg-black/20 rounded-lg text-[10px] text-blue-400 font-mono text-center">
                                    {botId}
                                </code>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-6 bg-white/5 border-t border-white/5 flex items-center justify-between">
                    <p className="text-[10px] text-white/20">
                        Generated by Nimmi AI Engine • v1.0.4
                    </p>
                    <button
                        onClick={onClose}
                        className="px-6 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-bold transition-all"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}
