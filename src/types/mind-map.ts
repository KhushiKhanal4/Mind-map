import { Node, Edge } from "@xyflow/react";

export type MindMapNodeData = {
  label: string; // the text shown on the node
  isRoot?: boolean; // optional — is this the center/root node?
};

export type MindMapNode = Node<MindMapNodeData>;

export type MindMapEdge = Edge;

export type MindMapState = {
  nodes: MindMapNode[];
  edges: MindMapEdge[];
};