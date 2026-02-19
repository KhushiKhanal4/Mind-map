import { useCallback } from "react";
import { useNodesState, useEdgesState, addEdge, Connection } from "@xyflow/react";
import { MindMapNode, MindMapEdge } from "@/types/mind-map";

export function useMindMap() {
  // These hooks manage nodes and edges state with React Flow helpers
  const [nodes, setNodes, onNodesChange] = useNodesState<MindMapNode>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<MindMapEdge>([]);

  // Initialize the mind map with a root node
  const initializeMindMap = useCallback((rootLabel: string) => {
    const rootNode: MindMapNode = {
      id: "root",
      type: "mindMapNode",
      position: { x: 250, y: 250 },
      data: { label: rootLabel, isRoot: true },
    };
    setNodes([rootNode]);
    setEdges([]);
  }, [setNodes, setEdges]);

  // Add a child node connected to a parent
  const addChildNode = useCallback(
    (parentId: string, label: string) => {
      const newNodeId = `node-${Date.now()}`;

      // Calculate position — offset from parent
      const parentNode = nodes.find((n) => n.id === parentId);
      if (!parentNode) return;

      const newNode: MindMapNode = {
        id: newNodeId,
        type: "mindMapNode",
        position: {
          x: parentNode.position.x + 200,
          y: parentNode.position.y + Math.random() * 100 - 50, // slight vertical offset
        },
        data: { label },
      };

      const newEdge: MindMapEdge = {
        id: `edge-${parentId}-${newNodeId}`,
        source: parentId,
        target: newNodeId,
        type: "smoothstep",
      };

      setNodes((nds) => [...nds, newNode]);
      setEdges((eds) => [...eds, newEdge]);
    },
    [nodes, setNodes, setEdges]
  );

  // Handle manual edge connections (when user drags from handle to handle)
  const onConnect = useCallback(
    (connection: Connection) => {
      setEdges((eds) => addEdge(connection, eds));
    },
    [setEdges]
  );

  return {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    initializeMindMap,
    addChildNode,
  };
}