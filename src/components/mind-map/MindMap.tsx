"use client";

import { ReactFlow, Background, Controls, MiniMap, Panel } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useMindMap } from "@/hooks/useMindMap";
import { useEffect, useState } from "react";
import MindMapNode from "./MindMapNode";

// Register our custom node type with React Flow
const nodeTypes = {
  mindMapNode: MindMapNode,
};

export default function MindMap() {
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    initializeMindMap,
    addChildNode,
  } = useMindMap();

  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [newNodeLabel, setNewNodeLabel] = useState("");

  // Initialize with a root node on mount
  useEffect(() => {
    initializeMindMap("Root Idea");
  }, [initializeMindMap]);

  const handleAddChild = () => {
    if (!selectedNodeId || !newNodeLabel.trim()) return;
    addChildNode(selectedNodeId, newNodeLabel);
    setNewNodeLabel(""); // clear input after adding
  };

  return (
    <div className="w-full h-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        onNodeClick={(_, node) => setSelectedNodeId(node.id)}
        fitView
        className="bg-gray-50"
      >
        <Background />
        <Controls />
        <MiniMap />

        {/* Control Panel for adding nodes */}
        <Panel position="top-left" className="bg-white p-4 rounded-lg shadow-lg space-y-3">
          <h3 className="font-bold text-gray-800">Add Child Node</h3>
          
          {selectedNodeId ? (
            <>
              <p className="text-sm text-gray-600">
                Adding to: <span className="font-medium">{nodes.find(n => n.id === selectedNodeId)?.data.label}</span>
              </p>
              <input
                type="text"
                value={newNodeLabel}
                onChange={(e) => setNewNodeLabel(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddChild()}
                placeholder="Enter node label..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
              <button
                onClick={handleAddChild}
                disabled={!newNodeLabel.trim()}
                className="w-full px-4 py-2 bg-violet-600 text-white rounded-md hover:bg-violet-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
              >
                Add Child
              </button>
            </>
          ) : (
            <p className="text-sm text-gray-500">Click a node to add a child</p>
          )}
        </Panel>
      </ReactFlow>
    </div>
  );
}