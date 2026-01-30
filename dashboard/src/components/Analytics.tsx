"use client";

import { BarChart, Users, MessageCircle, Clock, ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function Analytics() {
    const stats = [
        { label: "Total Conversations", value: "1,284", change: "+12.5%", icon: MessageCircle },
        { label: "Active Visitors", value: "48", change: "+5.2%", icon: Users },
        { label: "Avg. Response Time", value: "1.2s", change: "-0.4s", icon: Clock },
        { label: "Goal Completion", value: "78%", change: "+2.1%", icon: ArrowUpRight },
    ];

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-bold">Analytics Overview</h2>
                <p className="text-white/50 mt-1">Real-time performance metrics for all your bots</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <div key={i} className="p-6 bg-zinc-900 border border-white/5 rounded-3xl">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center">
                                <stat.icon className="text-blue-500" size={20} />
                            </div>
                            <span className={`text-xs font-bold ${stat.change.startsWith('+') ? 'text-green-500' : 'text-blue-400'}`}>
                                {stat.change}
                            </span>
                        </div>
                        <p className="text-white/40 text-sm font-medium">{stat.label}</p>
                        <p className="text-2xl font-bold mt-1">{stat.value}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 p-8 bg-zinc-900 border border-white/5 rounded-3xl h-[400px] flex flex-col">
                    <h3 className="font-bold text-lg mb-6">Conversation Volume</h3>
                    <div className="flex-1 flex items-end gap-2 px-4">
                        {[40, 70, 45, 90, 65, 80, 50, 85, 100, 75, 60, 95].map((h, i) => (
                            <div
                                key={i}
                                className="flex-1 bg-blue-600/20 hover:bg-blue-600 transition-colors rounded-t-lg relative group"
                                style={{ height: `${h}%` }}
                            >
                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-black text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                    {h * 10}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between mt-4 text-[10px] text-white/20 uppercase tracking-widest font-bold px-4">
                        <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
                    </div>
                </div>

                <div className="p-8 bg-zinc-900 border border-white/5 rounded-3xl flex flex-col">
                    <h3 className="font-bold text-lg mb-6">Bot Distribution</h3>
                    <div className="flex-1 flex items-center justify-center">
                        <div className="relative w-48 h-48 rounded-full border-[15px] border-blue-600/20 flex items-center justify-center">
                            <div className="absolute inset-0 rounded-full border-[15px] border-blue-600 border-t-transparent border-r-transparent -rotate-45" />
                            <div className="text-center">
                                <p className="text-3xl font-bold">12</p>
                                <p className="text-[10px] text-white/40 uppercase font-bold">Total Bots</p>
                            </div>
                        </div>
                    </div>
                    <div className="mt-8 space-y-3">
                        <div className="flex items-center justify-between text-xs">
                            <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-blue-600" /> Active</span>
                            <span className="font-bold">9</span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                            <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-blue-600/20" /> Inactive</span>
                            <span className="font-bold">3</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
