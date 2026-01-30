"use client";

import { Handle, Position } from "reactflow";
import { List } from "lucide-react";

interface MultipleChoiceNodeProps {
    data: { label: string; options: string[]; required: boolean };
    selected: boolean;
}

export default function MultipleChoiceNode({ data, selected }: MultipleChoiceNodeProps) {
    return (
        <div
            className={`w-64 rounded-xl bg-zinc-800 border border-white/10 overflow-hidden shadow-lg transition-all ${selected ? "ring-2 ring-amber-500 ring-offset-2 ring-offset-[#0a0a0a]" : ""
                }`}
        >
            <Handle
                type="target"
                position={Position.Top}
                className="!w-3 !h-3 !bg-amber-500 !border-2 !border-zinc-800"
            />
            <div className="px-4 py-2 bg-amber-500/20 border-b border-white/10 flex items-center gap-2">
                <List size={14} className="text-amber-400" />
                <span className="text-xs font-bold text-amber-400">{data.label}</span>
                {data.required && (
                    <span className="ml-auto text-[10px] bg-amber-500/30 text-amber-300 px-1.5 py-0.5 rounded">Required</span>
                )}
            </div>
            <div className="p-3 space-y-2">
                {data.options.slice(0, 3).map((option, i) => (
                    <div key={i} className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full border-2 border-amber-500/50" />
                        <span className="text-xs text-white/60">{option}</span>
                    </div>
                ))}
                {data.options.length > 3 && (
                    <span className="text-[10px] text-white/30">+{data.options.length - 3} more</span>
                )}
            </div>
            <Handle
                type="source"
                position={Position.Bottom}
                className="!w-3 !h-3 !bg-amber-500 !border-2 !border-zinc-800"
            />
        </div>
    );
}
