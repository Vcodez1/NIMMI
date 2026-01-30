"use client";

import Link from "next/link";
import { Bot, Zap, Shield, Wand2, ArrowRight, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-blue-500/30">
      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 bg-black/50 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-2xl tracking-tighter">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
              <Bot className="text-white" size={24} />
            </div>
            Nimmi AI
          </div>
          <div className="hidden md:flex items-center gap-8 text-white/70 font-medium">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-white transition-colors">How it works</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
          </div>
          <Link href="/auth/signup" className="px-6 py-2.5 bg-white text-black rounded-full font-semibold hover:bg-gray-200 transition-colors">
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-40 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-400 text-sm font-semibold mb-6 border border-blue-500/20">
              New: Gemini 1.5 Pro Support
            </span>
            <h1 className="text-5xl md:text-8xl font-bold tracking-tight mb-8 bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent">
              Build your AI bot<br />in 5 minutes.
            </h1>
            <p className="text-xl text-white/60 max-w-2xl mx-auto mb-12">
              The ultimate platform for creating custom-trained AI chatbots.
              Upload your documents, customize the look, and embed it anywhere.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/auth/signup" className="group px-8 py-4 bg-blue-600 rounded-full font-bold text-lg hover:bg-blue-500 transition-all flex items-center gap-2">
                Start Building Now
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <button className="px-8 py-4 bg-white/5 border border-white/10 rounded-full font-bold text-lg hover:bg-white/10 transition-colors">
                View Demo
              </button>
            </div>
          </motion.div>

          {/* Floating Preview */}
          <motion.div
            className="mt-24 relative"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <div className="absolute inset-0 bg-blue-600/20 blur-[120px] rounded-full mx-auto w-[60%] h-[60%]" />
            <div className="relative border border-white/10 rounded-3xl overflow-hidden shadow-2xl bg-zinc-900/50 backdrop-blur-sm aspect-[16/9] max-w-5xl mx-auto p-4 flex gap-4">
              {/* Dashboard Mockup */}
              <div className="w-1/4 h-full bg-black/40 rounded-xl border border-white/5 p-4 flex flex-col gap-4">
                {[1, 2, 3].map(i => <div key={i} className="h-8 w-full bg-white/5 rounded-lg" />)}
              </div>
              <div className="flex-1 h-full bg-black/20 rounded-xl border border-white/5 p-8 flex flex-col gap-6">
                <div className="h-12 w-1/3 bg-white/10 rounded-xl" />
                <div className="grid grid-cols-2 gap-4 flex-1">
                  <div className="bg-white/5 rounded-2xl border border-white/5" />
                  <div className="bg-white/5 rounded-2xl border border-white/5" />
                </div>
              </div>
              {/* Widget Preview */}
              <div className="absolute bottom-12 right-12 w-72 h-96 bg-zinc-800 rounded-2xl shadow-xl border border-white/10 flex flex-col overflow-hidden animate-bounce-slow">
                <div className="bg-blue-600 p-4 font-bold flex justify-between">
                  <span>AI Assistant</span>
                  <MessageSquare size={18} />
                </div>
                <div className="flex-1 p-4 flex flex-col gap-3">
                  <div className="bg-white/10 p-2 rounded-lg text-xs w-3/4">Hello! How can I help you today?</div>
                  <div className="bg-blue-500/20 p-2 rounded-lg text-xs w-2/3 self-end text-blue-400">Can you explain the pricing?</div>
                </div>
                <div className="p-3 border-t border-white/5">
                  <div className="h-8 bg-white/5 rounded flex items-center px-3 text-[10px] text-white/40">Type a message...</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Zap, title: "Train in Seconds", desc: "Upload PDFs or link your website to instantly provide your AI with knowledge." },
              { icon: Wand2, title: "Fully Custom", desc: "Change colors, logos, and personality to match your brand's unique voice." },
              { icon: Shield, title: "Enterprise Grade", desc: "Advanced security and rate-limiting to keep your data and budget safe." },
            ].map((f, i) => (
              <div key={i} className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-blue-500/30 transition-colors">
                <div className="w-12 h-12 bg-blue-600/20 rounded-2xl flex items-center justify-center mb-6">
                  <f.icon className="text-blue-500" size={24} />
                </div>
                <h3 className="text-2xl font-bold mb-4">{f.title}</h3>
                <p className="text-white/60 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:row items-center justify-between gap-6 text-white/40">
          <div className="flex items-center gap-2 font-bold text-lg text-white">
            <Bot size={20} /> Nimmi AI
          </div>
          <p>© 2026 Nimmi AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
