"use client";

import { useState, useEffect } from "react";
import { Node } from "reactflow";
import { X, Trash2 } from "lucide-react";

interface PropertiesPanelProps {
    node: Node | null;
    onUpdate: (nodeId: string, data: any) => void;
    onDelete: (nodeId: string) => void;
    onClose: () => void;
}

export default function PropertiesPanel({ node, onUpdate, onDelete, onClose }: PropertiesPanelProps) {
    const [formData, setFormData] = useState<any>({});

    useEffect(() => {
        if (node) {
            setFormData(node.data);
        }
    }, [node]);

    if (!node) return null;

    const handleChange = (key: string, value: any) => {
        const newData = { ...formData, [key]: value };
        setFormData(newData);
        onUpdate(node.id, newData);
    };

    const handleOptionsChange = (index: number, value: string) => {
        const newOptions = [...(formData.options || [])];
        newOptions[index] = value;
        handleChange("options", newOptions);
    };

    const addOption = () => {
        const newOptions = [...(formData.options || []), `Option ${(formData.options?.length || 0) + 1}`];
        handleChange("options", newOptions);
    };

    const removeOption = (index: number) => {
        const newOptions = (formData.options || []).filter((_: string, i: number) => i !== index);
        handleChange("options", newOptions);
    };

    const renderFields = () => {
        switch (node.type) {
            case "start":
                return (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-white/50 mb-2">Label</label>
                            <input
                                type="text"
                                value={formData.label || ""}
                                onChange={(e) => handleChange("label", e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm outline-none focus:border-green-500"
                            />
                        </div>
                    </div>
                );

            case "message":
                return (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-white/50 mb-2">Label</label>
                            <input
                                type="text"
                                value={formData.label || ""}
                                onChange={(e) => handleChange("label", e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-white/50 mb-2">Message</label>
                            <textarea
                                rows={4}
                                value={formData.message || ""}
                                onChange={(e) => handleChange("message", e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-500 resize-none"
                            />
                        </div>
                    </div>
                );

            case "textInput":
            case "emailInput":
            case "datePicker":
            case "numberInput":
                const focusColor = node.type === "numberInput" ? "focus:border-orange-500" : "focus:border-purple-500";
                const toggleBg = node.type === "numberInput" ? "bg-orange-500" : "bg-purple-500";

                return (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-white/50 mb-2">Label</label>
                            <input
                                type="text"
                                value={formData.label || ""}
                                onChange={(e) => handleChange("label", e.target.value)}
                                className={`w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm outline-none ${focusColor}`}
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-white/50 mb-2">Placeholder</label>
                            <input
                                type="text"
                                value={formData.placeholder || ""}
                                onChange={(e) => handleChange("placeholder", e.target.value)}
                                className={`w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm outline-none ${focusColor}`}
                            />
                        </div>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => handleChange("required", !formData.required)}
                                className={`w-10 h-6 rounded-full transition-colors ${formData.required ? toggleBg : "bg-white/10"}`}
                            >
                                <div className={`w-4 h-4 bg-white rounded-full transition-transform ${formData.required ? "translate-x-5" : "translate-x-1"}`} />
                            </button>
                            <span className="text-xs text-white/50">Required field</span>
                        </div>
                    </div>
                );

            case "multipleChoice":
                return (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-white/50 mb-2">Label</label>
                            <input
                                type="text"
                                value={formData.label || ""}
                                onChange={(e) => handleChange("label", e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm outline-none focus:border-amber-500"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-white/50 mb-2">Options</label>
                            <div className="space-y-2">
                                {(formData.options || []).map((option: string, index: number) => (
                                    <div key={index} className="flex gap-2">
                                        <input
                                            type="text"
                                            value={option}
                                            onChange={(e) => handleOptionsChange(index, e.target.value)}
                                            className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm outline-none focus:border-amber-500"
                                        />
                                        <button
                                            onClick={() => removeOption(index)}
                                            className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg"
                                        >
                                            <X size={14} />
                                        </button>
                                    </div>
                                ))}
                                <button
                                    onClick={addOption}
                                    className="w-full py-2 bg-amber-500/20 text-amber-400 rounded-lg text-xs font-bold hover:bg-amber-500/30"
                                >
                                    + Add Option
                                </button>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => handleChange("required", !formData.required)}
                                className={`w-10 h-6 rounded-full transition-colors ${formData.required ? "bg-amber-500" : "bg-white/10"}`}
                            >
                                <div className={`w-4 h-4 bg-white rounded-full transition-transform ${formData.required ? "translate-x-5" : "translate-x-1"}`} />
                            </button>
                            <span className="text-xs text-white/50">Required field</span>
                        </div>
                    </div>
                );

            case "condition":
                return (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-white/50 mb-2">Label</label>
                            <input
                                type="text"
                                value={formData.label || ""}
                                onChange={(e) => handleChange("label", e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm outline-none focus:border-purple-500"
                            />
                        </div>
                        <div className="pt-2 border-t border-white/5">
                            <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-4">Logic Configuration</p>
                            <div className="space-y-3">
                                <div>
                                    <label className="block text-[10px] font-bold text-white/40 mb-1 tracking-wider uppercase">On Variable</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. name, age, product"
                                        value={formData.variable || ""}
                                        onChange={(e) => handleChange("variable", e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm outline-none focus:border-purple-500 font-mono"
                                    />
                                    <p className="text-[10px] text-white/20 mt-1 italic">Uses the label of a previous input node</p>
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold text-white/40 mb-1 tracking-wider uppercase">Operator</label>
                                    <select
                                        value={formData.operator || "equals"}
                                        onChange={(e) => handleChange("operator", e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm outline-none focus:border-purple-500 appearance-none cursor-pointer text-white"
                                    >
                                        <option value="equals" className="bg-zinc-900">Equals</option>
                                        <option value="contains" className="bg-zinc-900">Contains</option>
                                        <option value="greater_than" className="bg-zinc-900">Greater Than</option>
                                        <option value="less_than" className="bg-zinc-900">Less Than</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold text-white/40 mb-1 tracking-wider uppercase">Target Value</label>
                                    <input
                                        type="text"
                                        value={formData.value || ""}
                                        onChange={(e) => handleChange("value", e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm outline-none focus:border-purple-500"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case "end":
                return (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-white/50 mb-2">Label</label>
                            <input
                                type="text"
                                value={formData.label || ""}
                                onChange={(e) => handleChange("label", e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm outline-none focus:border-red-500"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-white/50 mb-2">Thank You Message</label>
                            <textarea
                                rows={3}
                                value={formData.message || ""}
                                onChange={(e) => handleChange("message", e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm outline-none focus:border-red-500 resize-none"
                            />
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="bg-zinc-900 border border-white/10 rounded-xl p-4 space-y-4 h-full overflow-y-auto custom-scrollbar">
            <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold">Element Properties</h3>
                <button onClick={onClose} className="p-1 hover:bg-white/10 rounded-lg">
                    <X size={16} className="text-white/40" />
                </button>
            </div>

            <div className="h-px bg-white/5" />

            {renderFields()}

            {node.type !== "start" && (
                <>
                    <div className="h-px bg-white/5" />
                    <button
                        onClick={() => onDelete(node.id)}
                        className="w-full flex items-center justify-center gap-2 py-2 bg-red-500/20 text-red-400 rounded-lg text-sm font-bold hover:bg-red-500/30"
                    >
                        <Trash2 size={14} /> Delete Element
                    </button>
                </>
            )}
        </div>
    );
}
