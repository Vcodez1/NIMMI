"use client";

import { Handle, Position } from "reactflow";
import { Mail } from "lucide-react";

interface EmailInputNodeProps {
    data: { label: string; placeholder: string; required: boolean };
    selected: boolean;
}

export default function EmailInputNode({ data, selected }: EmailInputNodeProps) {
    return (
        <div
            className={`w-64 rounded-xl bg-zinc-800 border border-white/10 overflow-hidden shadow-lg transition-all ${selected ? "ring-2 ring-cyan-500 ring-offset-2 ring-offset-[#0a0a0a]" : ""
                }`}
        >
            <Handle
                type="target"
                position={Position.Top}
                className="!w-3 !h-3 !bg-cyan-500 !border-2 !border-zinc-800"
            />
            <div className="px-4 py-2 bg-cyan-500/20 border-b border-white/10 flex items-center gap-2">
                <Mail size={14} className="text-cyan-400" />
                <span className="text-xs font-bold text-cyan-400">{data.label}</span>
                {data.required && (
                    <span className="ml-auto text-[10px] bg-cyan-500/30 text-cyan-300 px-1.5 py-0.5 rounded">Required</span>
                )}
            </div>
            <div className="p-4">
                <div className="bg-white/5 rounded-lg px-3 py-2 text-sm text-white/30 border border-white/10">
                    {data.placeholder}
                </div>
            </div>
            <Handle
                type="source"
                position={Position.Bottom}
                className="!w-3 !h-3 !bg-cyan-500 !border-2 !border-zinc-800"
            />
        </div>
    );
}
