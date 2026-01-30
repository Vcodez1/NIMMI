"use client";

import { Handle, Position } from "reactflow";
import { MessageSquare } from "lucide-react";

interface MessageNodeProps {
    data: { label: string; message: string };
    selected: boolean;
}

export default function MessageNode({ data, selected }: MessageNodeProps) {
    return (
        <div
            className={`w-64 rounded-xl bg-zinc-800 border border-white/10 overflow-hidden shadow-lg transition-all ${selected ? "ring-2 ring-blue-500 ring-offset-2 ring-offset-[#0a0a0a]" : ""
                }`}
        >
            <Handle
                type="target"
                position={Position.Top}
                className="!w-3 !h-3 !bg-blue-500 !border-2 !border-zinc-800"
            />
            <div className="px-4 py-2 bg-blue-500/20 border-b border-white/10 flex items-center gap-2">
                <MessageSquare size={14} className="text-blue-400" />
                <span className="text-xs font-bold text-blue-400">{data.label}</span>
            </div>
            <div className="p-4">
                <p className="text-sm text-white/70 line-clamp-3">{data.message}</p>
            </div>
            <Handle
                type="source"
                position={Position.Bottom}
                className="!w-3 !h-3 !bg-blue-500 !border-2 !border-zinc-800"
            />
        </div>
    );
}
