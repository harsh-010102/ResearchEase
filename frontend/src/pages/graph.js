// // import React from "react";
// // import ReactDOM from "react-dom";
// // import Graph from "react-graph-vis";

// // // import "./styles.css";
// // // // need to import the vis network css in order to show tooltip
// // // import "./network.css";

// // function App() {
// //   const graph = {
// //     nodes: [
// //       { id: 1, label: "Node 1", title: "node 1 tootip text" },
// //       { id: 2, label: "Node 2", title: "node 2 tootip text" },
// //       { id: 3, label: "Node 3", title: "node 3 tootip text" },
// //       { id: 4, label: "Node 4", title: "node 4 tootip text" },
// //       { id: 5, label: "Node 5", title: "node 5 tootip text" }
// //     ],
// //     edges: [
// //       { from: 1, to: 2 },
// //       { from: 1, to: 3 },
// //       { from: 2, to: 4 },
// //       { from: 2, to: 5 }
// //     ]
// //   };

// //   const options = {
// //     layout: {
// //       hierarchical: true
// //     },
// //     edges: {
// //       color: "#000000"
// //     },
// //     height: "500px"
// //   };

// //   const events = {
// //     select: function(event) {
// //       var { nodes, edges } = event;
// //     }
// //   };
// //   return (
// //     <Graph
// //       graph={graph}
// //       options={options}
// //       events={events}
// //       getNetwork={network => {
// //         //  if you want access to vis.js network api you can set the state in a parent component using this property
// //       }}
// //     />
// //   );
// // }

// import React, { useEffect, useState } from 'react';
// import ForceGraph3D from 'react-force-graph-3d';

// const MyForceGraphComponent = () => {
//   const [graphData, setGraphData] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(
//           'https://raw.githubusercontent.com/vasturiano/react-force-graph/master/example/datasets/miserables.json'
//         );
//         const data = await response.json();

//         setGraphData(data);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <div style={{ height: '500px', width: '100%' }}>
//       {graphData && (
//         <ForceGraph3D
//           graphData={graphData}
//           nodeLabel="id"
//           nodeAutoColorBy="group"
//           onNodeDragEnd={(node) => {
//             node.fx = node.x;
//             node.fy = node.y;
//             node.fz = node.z;
//           }}
//         />
//       )}
//     </div>
//   );
// };

// export default MyForceGraphComponent;
//nevil
// import React, { useState, useEffect } from 'react';
// import Graph from 'react-graph-vis';
// import axios from "axios";
// import './DataGraph.css';

// const DataGraph = ({ currentItem, closePopup }) => {
//   const [graph, setGraph] = useState({
//     nodes: [],
//     edges: [],
//   });

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(`http://localhost:8080/similar_nodes/${currentItem.title}`, {
//           headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` }
//         });
//         const relatedItems = response.data;

//         const nodes = [];
//         const edges = [];
//         let nodeId = 1;
//         console.log({relatedItems:relatedItems})
//         const createNodesAndEdges = (parent, items) => {
//           for (const item of items) {
//             const node = { id: nodeId, label: item.id, title: item.title,authors:item.authors,doi:item.doi };
//             nodes.push(node);
//             edges.push({ from: parent, to: nodeId });
//             nodeId++;

//             if (item.similar_recommendations && item.similar_recommendations.length > 0) {
//               createNodesAndEdges(node.id, item.similar_recommendations);
//             }
//           }
//         };

//         nodes.push({ id: nodeId, label: currentItem.id, title: currentItem.title,shape:"circle"});
//         nodeId++;

//         createNodesAndEdges(1, relatedItems.nodes);
//         setGraph({ nodes, edges });
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, [currentItem]);

//   const options = {
//     layout: {
//       hierarchical: true
//     },
//     edges: {
//       color: "#000000"
//     },
//     layout: {},       
//     interaction: {},  
//     manipulation: {}, 
//     physics: {},      
//     clickToUse: true
//   };
//   const handleBlurNode = () => {
//     const tooltip = document.getElementById("tooltip");
//     tooltip.style.display = "none";
//   };

//   return (
//     <div className="popup-container transparent-popup">
//       <div className="popup-body">
//         {/* Graph Component */}
//         <div className="graph-container">
//           <Graph graph={graph} options={options} events={{
//             selectNode: handleNodeSelect,
//             blurNode: handleBlurNode,
//             ...events
//           }} />
//         </div>
//       </div>
//       {/* Tooltip */}
//     </div>
//   );
// };

// export default DataGraph;
