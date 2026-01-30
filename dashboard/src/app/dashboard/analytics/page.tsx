"use client";

import Analytics from "@/components/Analytics";
import { Bot, LayoutDashboard, BarChart2, Database, Settings } from "lucide-react";
import Link from "next/link";

export default function AnalyticsPage() {
    return (
        <div className="flex min-h-screen bg-[#050505] text-white">
            {/* Sidebar */}
            <aside className="w-64 border-r border-white/5 p-6 flex flex-col gap-8">
                <div className="flex items-center gap-2 font-bold text-xl">
                    <Bot className="text-blue-500" />
                    Nimmi AI
                </div>

                <nav className="flex-1 flex flex-col gap-2">
                    <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 text-white/50 hover:bg-white/5 rounded-xl transition-colors">
                        <LayoutDashboard size={20} /> Dashboard
                    </Link>
                    <Link href="/dashboard/analytics" className="flex items-center gap-3 px-4 py-3 bg-white/10 rounded-xl text-white">
                        <BarChart2 size={20} /> Analytics
                    </Link>
                    <Link href="#" className="flex items-center gap-3 px-4 py-3 text-white/50 hover:bg-white/5 rounded-xl transition-colors">
                        <Database size={20} /> Knowledge Base
                    </Link>
                    <Link href="#" className="flex items-center gap-3 px-4 py-3 text-white/50 hover:bg-white/5 rounded-xl transition-colors">
                        <Settings size={20} /> Settings
                    </Link>
                </nav>
            </aside>

            <main className="flex-1 p-10">
                <Analytics />
            </main>
        </div>
    );
}
