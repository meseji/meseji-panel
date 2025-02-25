"use client";
// import React, { useCallback, useState, useRef } from "react";
// import {
//   ReactFlow,
//   ReactFlowProvider,
//   addEdge,
//   useNodesState,
//   useEdgesState,
//   Controls,
//   useReactFlow,
//   Background,
// } from "@xyflow/react";

// import "@xyflow/react/dist/style.css";
// import UserInputNode from "@/components/dashboard/flows/nodes/inputnodes";
// import ListMessageNode from "@/components/dashboard/flows/nodes/listMessageNodes";
// import SingleProductNode from "@/components/dashboard/flows/nodes/singleProductNodes";
// import MultiProductNode from "@/components/dashboard/flows/nodes/multiProductNodes";
// import QuestionNode from "@/components/dashboard/flows/nodes/questionireNodes";
// import AttributesNode from "@/components/dashboard/flows/nodes/attributeNodes";
// import MessageNode from "@/components/dashboard/flows/nodes/messageNodes";
// import NodeEditorModal from "@/components/dashboard/flows/nodes/editNodesModel";
// import StartNode from "@/components/dashboard/flows/nodes/startNode";
// import { useSelector } from "react-redux";
// import RightSideModal from "@/components/dashboard/flows/models/rightside-model";
// import FlowsSidebar from "@/components/dashboard/flows/sidebar/flownavbar";

// const defaultViewport = { x: 0, y: 0, zoom: 1.5 };
// let id = 0;
// const getId = () => `dndnode_${id++}`;

// export function Dnd() {
//   const reactFlowWrapper = useRef(null);
//   const { screenToFlowPosition } = useReactFlow();
//   const [nodes, setNodes, onNodesChange] = useNodesState([
//     {
//       id: "1",
//       type: "start",
//       position: { x: 0, y: 0 },
//       data: { label: "Start Node" },
//     },
//   ]);
//   const [edges, setEdges, onEdgesChange] = useEdgesState([]);
//   const type = useSelector((state) => state.dnd.type);
//   const [isOpen, setIsOpen] = useState(false);
//   const [selectedNode, setSelectedNode] = useState(null);

//   const onConnect = useCallback(
//     (params) => setEdges((eds) => addEdge(params, eds)),
//     []
//   );

//   const onDragOver = useCallback((event) => {
//     event.preventDefault();
//     event.dataTransfer.dropEffect = "move";
//   }, []);

//   const onDrop = useCallback(
//     (event) => {
//       event.preventDefault();
//       const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
//       event.dataTransfer.getData("application/reactflow");
//       console.log("type", type);

//       if (!type) return;

//       const position = screenToFlowPosition({
//         x: event.clientX - reactFlowBounds.left,
//         y: event.clientY - reactFlowBounds.top,
//       });

//       const newNode = {
//         id: getId(),
//         type: type,
//         position,
//         data: { label: `${type} node` },
//       };

//       setNodes((nds) => nds.concat(newNode));
//     },
//     [screenToFlowPosition, type]
//   );

//   const removeNode = (id) => {
//     setNodes((nds) => nds.filter((node) => node.id !== id));
//     setEdges((eds) =>
//       eds.filter((edge) => edge.source !== id && edge.target !== id)
//     );
//   };

//   const onNodeClick = (event, node) => {
//     setSelectedNode(node);
//     setIsOpen(!isOpen);
//   };

//   const closeModal = () => {
//     setSelectedNode(null);
//     setIsOpen(false);
//   };

//   const NodeWrapper = (Component) => (props) =>
//     <Component {...props} removeNode={removeNode} />;

//   const nodeTypes = {
//     start: StartNode,
//     message: NodeWrapper(MessageNode),
//     userInput: NodeWrapper(UserInputNode),
//     multiProduct: NodeWrapper(MultiProductNode),
//     singleProduct: NodeWrapper(SingleProductNode),
//     listMessage: NodeWrapper(ListMessageNode),
//     attributes: NodeWrapper(AttributesNode),
//     question: NodeWrapper(QuestionNode),
//   };

//   return (
//     <div className="flex flex-col h-screen ">
//       <FlowsSidebar />

//       <div className="flex-grow h-full w-full overflow-x-auto" ref={reactFlowWrapper}>
//          <ReactFlow
//           nodes={nodes}
//           edges={edges}
//           onNodesChange={onNodesChange}
//           onEdgesChange={onEdgesChange}
//           onConnect={onConnect}
//           onDrop={onDrop}
//           onDragOver={onDragOver}
//           nodeTypes={nodeTypes}
//           onDoubleClick={onNodeClick}
//           minZoom={0.5}
//           fitView
//           // style={{ backgroundColor: "#F7F9FB" }}
//         >
//           <Controls />
//           <Background />
//         </ReactFlow>
//       </div>
//       {isOpen && (
//         <RightSideModal
//           isOpen={isOpen}
//           node={selectedNode}
//           closeModal={closeModal}
//         />
//       )}
//     </div>
//   );
// }

export default function Page() {
  return (
    <>Hello</>
    // <ReactFlowProvider >
    //   <Dnd />
    // </ReactFlowProvider>
  );
}
