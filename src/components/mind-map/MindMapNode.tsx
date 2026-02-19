import { Handle, Position, NodeProps } from "@xyflow/react";
import { MindMapNode as MindMapNodeType } from "@/types/mind-map";

type Props = NodeProps<MindMapNodeType>;

export default function MindMapNode({ data, isConnectable }: Props) {
  return (
    <div
      className={`
        px-4 py-2 rounded-xl border-2 shadow-md text-sm font-medium
        ${data.isRoot
          ? "bg-violet-600 text-white border-violet-700 text-base font-bold"
          : "bg-white text-gray-800 border-gray-200"
        }
      `}
    >
      {/* TARGET handle — where incoming edges land (left side) */}
      <Handle
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
        className="!bg-gray-400"
      />

      {/* The actual text content of the node */}
      <span>{data.label}</span>

      {/* SOURCE handle — where outgoing edges start (right side) */}
      <Handle
        type="source"
        position={Position.Right}
        isConnectable={isConnectable}
        className="!bg-violet-400"
      />
    </div>
  );
}
