"use client";

import { useState, useCallback, useMemo, useRef, DragEvent } from "react";
import ReactFlow, {
    Node,
    Edge,
    Controls,
    Background,
    useNodesState,
    useEdgesState,
    addEdge,
    Connection,
    ConnectionMode,
    Panel,
    MarkerType,
    ReactFlowProvider,
    useReactFlow,
} from "reactflow";
import "reactflow/dist/style.css";
import { Play, Save, Trash2 } from "lucide-react";

// Custom node types
import StartNode from "./nodes/StartNode";
import MessageNode from "./nodes/MessageNode";
import TextInputNode from "./nodes/TextInputNode";
import EmailInputNode from "./nodes/EmailInputNode";
import MultipleChoiceNode from "./nodes/MultipleChoiceNode";
import DatePickerNode from "./nodes/DatePickerNode";
import ConditionNode from "./nodes/ConditionNode";
import NumberInputNode from "./nodes/NumberInputNode";
import EndNode from "./nodes/EndNode";

interface FlowBuilderProps {
    botId: string;
    initialNodes?: Node[];
    initialEdges?: Edge[];
    onSave: (nodes: Node[], edges: Edge[]) => void;
    onNodeSelect: (node: Node | null) => void;
}

function FlowBuilderInner({
    botId,
    initialNodes = [],
    initialEdges = [],
    onSave,
    onNodeSelect,
}: FlowBuilderProps) {
    const reactFlowWrapper = useRef<HTMLDivElement>(null);
    const { screenToFlowPosition } = useReactFlow();

    const nodeTypes = useMemo(
        () => ({
            start: StartNode,
            message: MessageNode,
            textInput: TextInputNode,
            emailInput: EmailInputNode,
            multipleChoice: MultipleChoiceNode,
            datePicker: DatePickerNode,
            condition: ConditionNode,
            numberInput: NumberInputNode,
            end: EndNode,
        }),
        []
    );

    const defaultNodes: Node[] = initialNodes.length > 0 ? initialNodes : [
        {
            id: "start-1",
            type: "start",
            position: { x: 250, y: 50 },
            data: { label: "Start" },
        },
    ];

    const [nodes, setNodes, onNodesChange] = useNodesState(defaultNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const [selectedNode, setSelectedNode] = useState<Node | null>(null);

    const onConnect = useCallback(
        (params: Connection) => {
            setEdges((eds) =>
                addEdge(
                    {
                        ...params,
                        type: "smoothstep",
                        animated: true,
                        style: { stroke: "#3b82f6", strokeWidth: 2 },
                        markerEnd: {
                            type: MarkerType.ArrowClosed,
                            color: "#3b82f6",
                        },
                    },
                    eds
                )
            );
        },
        [setEdges]
    );

    const onNodeClick = useCallback(
        (_: React.MouseEvent, node: Node) => {
            setSelectedNode(node);
            onNodeSelect(node);
        },
        [onNodeSelect]
    );

    const onPaneClick = useCallback(() => {
        setSelectedNode(null);
        onNodeSelect(null);
    }, [onNodeSelect]);

    const onDragOver = useCallback((event: DragEvent) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
    }, []);

    const onDrop = useCallback(
        (event: DragEvent) => {
            event.preventDefault();

            const type = event.dataTransfer.getData("application/reactflow");
            if (!type) return;

            // Convert screen coordinates to flow coordinates
            const position = screenToFlowPosition({
                x: event.clientX,
                y: event.clientY,
            });

            const newNode: Node = {
                id: `${type}-${Date.now()}`,
                type,
                position,
                data: getDefaultNodeData(type),
            };

            setNodes((nds) => nds.concat(newNode));
        },
        [screenToFlowPosition, setNodes]
    );

    const handleSave = () => {
        onSave(nodes, edges);
    };

    const handleDeleteSelected = () => {
        if (selectedNode) {
            setNodes((nds) => nds.filter((n) => n.id !== selectedNode.id));
            setEdges((eds) =>
                eds.filter(
                    (e) => e.source !== selectedNode.id && e.target !== selectedNode.id
                )
            );
            setSelectedNode(null);
            onNodeSelect(null);
        }
    };

    return (
        <div ref={reactFlowWrapper} className="w-full h-full bg-[#0a0a0a] rounded-2xl overflow-hidden border border-white/10">
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onNodeClick={onNodeClick}
                onPaneClick={onPaneClick}
                onDragOver={onDragOver}
                onDrop={onDrop}
                nodeTypes={nodeTypes}
                connectionMode={ConnectionMode.Loose}
                fitView
                fitViewOptions={{ padding: 0.2 }}
                className="bg-[#0a0a0a]"
            >
                <Background color="#ffffff10" gap={20} />
                <Controls
                    className="!bg-zinc-900 !border-white/10 !rounded-xl overflow-hidden"
                    showInteractive={false}
                />
                <Panel position="top-right" className="flex gap-2">
                    {selectedNode && selectedNode.type !== "start" && (
                        <button
                            onClick={handleDeleteSelected}
                            className="flex items-center gap-2 px-4 py-2 bg-red-500/20 text-red-400 rounded-lg text-sm font-bold hover:bg-red-500/30 transition-colors"
                        >
                            <Trash2 size={16} /> Delete
                        </button>
                    )}
                    <button
                        onClick={handleSave}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 rounded-lg text-sm font-bold hover:bg-blue-500 transition-colors"
                    >
                        <Save size={16} /> Save Flow
                    </button>
                </Panel>
            </ReactFlow>
        </div>
    );
}

// Wrap with provider to use useReactFlow hook
export default function FlowBuilder(props: FlowBuilderProps) {
    return (
        <ReactFlowProvider>
            <FlowBuilderInner {...props} />
        </ReactFlowProvider>
    );
}

function getDefaultNodeData(type: string) {
    switch (type) {
        case "start":
            return { label: "Start" };
        case "message":
            return { label: "Bot Message", message: "Hello! How can I help you?" };
        case "textInput":
            return { label: "Text Input", placeholder: "Enter your response...", required: true };
        case "emailInput":
            return { label: "Email Input", placeholder: "Enter your email...", required: true };
        case "multipleChoice":
            return { label: "Multiple Choice", options: ["Option 1", "Option 2", "Option 3"], required: true };
        case "datePicker":
            return { label: "Date Picker", placeholder: "Select a date...", required: false };
        case "condition":
            return { label: "If Condition", variable: "", operator: "equals", value: "" };
        case "numberInput":
            return { label: "Number Input", placeholder: "Enter a number...", required: false };
        case "end":
            return { label: "End", message: "Thank you for your response!" };
        default:
            return { label: "Node" };
    }
}
