"use client";

import { Handle, Position } from "reactflow";
import { Calendar } from "lucide-react";

interface DatePickerNodeProps {
    data: { label: string; placeholder: string; required: boolean };
    selected: boolean;
}

export default function DatePickerNode({ data, selected }: DatePickerNodeProps) {
    return (
        <div
            className={`w-64 rounded-xl bg-zinc-800 border border-white/10 overflow-hidden shadow-lg transition-all ${selected ? "ring-2 ring-pink-500 ring-offset-2 ring-offset-[#0a0a0a]" : ""
                }`}
        >
            <Handle
                type="target"
                position={Position.Top}
                className="!w-3 !h-3 !bg-pink-500 !border-2 !border-zinc-800"
            />
            <div className="px-4 py-2 bg-pink-500/20 border-b border-white/10 flex items-center gap-2">
                <Calendar size={14} className="text-pink-400" />
                <span className="text-xs font-bold text-pink-400">{data.label}</span>
                {data.required && (
                    <span className="ml-auto text-[10px] bg-pink-500/30 text-pink-300 px-1.5 py-0.5 rounded">Required</span>
                )}
            </div>
            <div className="p-4">
                <div className="bg-white/5 rounded-lg px-3 py-2 text-sm text-white/30 border border-white/10 flex items-center gap-2">
                    <Calendar size={14} />
                    {data.placeholder}
                </div>
            </div>
            <Handle
                type="source"
                position={Position.Bottom}
                className="!w-3 !h-3 !bg-pink-500 !border-2 !border-zinc-800"
            />
        </div>
    );
}
