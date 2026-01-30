"use client";

import { DragEvent } from "react";
import { Play, MessageSquare, Type, Mail, List, Calendar, Square, GripVertical, GitBranch, Hash } from "lucide-react";

const elements = [
    {
        type: "message",
        label: "Message",
        description: "Display bot message",
        icon: MessageSquare,
        color: "blue",
    },
    {
        type: "textInput",
        label: "Text Input",
        description: "Collect text response",
        icon: Type,
        color: "purple",
    },
    {
        type: "emailInput",
        label: "Email Input",
        description: "Validate email address",
        icon: Mail,
        color: "cyan",
    },
    {
        type: "multipleChoice",
        label: "Multiple Choice",
        description: "Option buttons/radio",
        icon: List,
        color: "amber",
    },
    {
        type: "datePicker",
        label: "Date Picker",
        description: "Calendar selection",
        icon: Calendar,
        color: "pink",
    },
    {
        type: "numberInput",
        label: "Number Input",
        description: "Numerical response",
        icon: Hash,
        color: "orange",
    },
    {
        type: "condition",
        label: "If Condition",
        description: "Branch based on input",
        icon: GitBranch,
        color: "purple",
    },
    {
        type: "end",
        label: "End",
        description: "Terminate conversation",
        icon: Square,
        color: "red",
    },
];

const colorClasses: Record<string, { bg: string; text: string; border: string }> = {
    green: { bg: "bg-green-500/20", text: "text-green-400", border: "border-green-500/30" },
    blue: { bg: "bg-blue-500/20", text: "text-blue-400", border: "border-blue-500/30" },
    purple: { bg: "bg-purple-500/20", text: "text-purple-400", border: "border-purple-500/30" },
    cyan: { bg: "bg-cyan-500/20", text: "text-cyan-400", border: "border-cyan-500/30" },
    amber: { bg: "bg-amber-500/20", text: "text-amber-400", border: "border-amber-500/30" },
    pink: { bg: "bg-pink-500/20", text: "text-pink-400", border: "border-pink-500/30" },
    red: { bg: "bg-red-500/20", text: "text-red-400", border: "border-red-500/30" },
    orange: { bg: "bg-orange-500/20", text: "text-orange-400", border: "border-orange-500/30" },
};

export default function ElementsSidebar() {
    const onDragStart = (event: DragEvent, nodeType: string) => {
        event.dataTransfer.setData("application/reactflow", nodeType);
        event.dataTransfer.effectAllowed = "move";
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                    <Play size={14} className="text-green-400" fill="currentColor" />
                </div>
                <div>
                    <p className="text-xs font-bold text-white/50">Start Node</p>
                    <p className="text-[10px] text-white/30">Already on canvas</p>
                </div>
            </div>

            <div className="h-px bg-white/5" />

            <h4 className="text-[10px] font-bold text-white/30 uppercase tracking-widest">
                Drag Elements to Canvas
            </h4>

            <div className="space-y-2">
                {elements.map(({ type, label, description, icon: Icon, color }) => {
                    const colors = colorClasses[color];
                    return (
                        <div
                            key={type}
                            draggable
                            onDragStart={(e) => onDragStart(e, type)}
                            className={`flex items-center gap-3 p-3 rounded-xl border ${colors.border} ${colors.bg} cursor-grab hover:scale-[1.02] transition-transform active:scale-95 active:cursor-grabbing`}
                        >
                            <GripVertical size={14} className="text-white/20" />
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${colors.bg}`}>
                                <Icon size={14} className={colors.text} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className={`text-xs font-bold ${colors.text}`}>{label}</p>
                                <p className="text-[10px] text-white/30 truncate">{description}</p>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="h-px bg-white/5 mt-4" />

            <p className="text-[10px] text-white/20 leading-relaxed">
                Drag elements onto the canvas and connect them to build your conversation flow.
            </p>
        </div>
    );
}
