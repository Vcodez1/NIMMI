"use client";

import { Handle, Position } from "reactflow";
import { GitBranch } from "lucide-react";

interface ConditionNodeProps {
    data: {
        label: string;
        variable: string;
        operator: "equals" | "contains" | "greater_than" | "less_than";
        value: string;
    };
    selected: boolean;
}

export default function ConditionNode({ data, selected }: ConditionNodeProps) {
    return (
        <div
            className={`w-64 rounded-xl bg-zinc-800 border border-white/10 overflow-hidden shadow-lg transition-all ${selected ? "ring-2 ring-purple-500 ring-offset-2 ring-offset-[#0a0a0a]" : ""
                }`}
        >
            <Handle
                type="target"
                position={Position.Top}
                className="!w-3 !h-3 !bg-purple-500 !border-2 !border-zinc-800"
            />
            <div className="px-4 py-2 bg-purple-500/20 border-b border-white/10 flex items-center gap-2">
                <GitBranch size={14} className="text-purple-400" />
                <span className="text-xs font-bold text-purple-400">{data.label}</span>
            </div>
            <div className="p-3">
                <div className="bg-black/20 rounded-lg p-2 border border-white/5">
                    <p className="text-[10px] text-white/40 uppercase font-bold mb-1">If</p>
                    <p className="text-xs text-white/70 truncate">
                        <span className="text-purple-400 font-mono">{data.variable || "variable"}</span>{" "}
                        <span className="text-white/40">{data.operator || "=="}</span>{" "}
                        <span className="text-amber-400">{data.value || "value"}</span>
                    </p>
                </div>
            </div>

            <div className="flex justify-between px-4 pb-2">
                <div className="relative">
                    <Handle
                        type="source"
                        position={Position.Bottom}
                        id="true"
                        className="!w-3 !h-3 !bg-green-500 !border-2 !border-zinc-800 !left-[-12px]"
                    />
                    <span className="text-[10px] font-bold text-green-500 uppercase">True</span>
                </div>
                <div className="relative">
                    <Handle
                        type="source"
                        position={Position.Bottom}
                        id="false"
                        className="!w-3 !h-3 !bg-red-500 !border-2 !border-zinc-800 !right-[-12px] !left-auto"
                    />
                    <span className="text-[10px] font-bold text-red-500 uppercase">False</span>
                </div>
            </div>
        </div>
    );
}
