// const FileTreeNode = ({ fileName , node, onSelect, path}) => {
//     const isDir = !!node
//     console.log(node);
//     return (
//         <div onClick={(e) => {
//         e.stopPropagation();
//         if (isDir) return;
//         onSelect(path);
//       }}
//         style={{ marginLeft: '20px' }}>
//            <p className={isDir ? "" : "File-node"}> {fileName} </p>
//             {node && <ul>
//                 {Object.keys(node).map((child) => (
//                     <li key={child}>
//                         <FileTreeNode 
//                         onSelect={onSelect}
//                         path={path + '/' + child}
//                         fileName={child} 
//                         node={node[child]} 
//                         />
//                     </li>
//                 ))}
//                 </ul>
//                 }
//         </div>
//     )
// };

// const fileTree =({ tree , onSelect}) => {
//     return <FileTreeNode  fileName="/" path="" node={tree} onSelect={onSelect}/>
// };
// export default fileTree;

const FileTreeNode = ({ fileName, nodes, onSelect, path }) => {
  const isDir = !!nodes;
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        if (isDir) return;
        onSelect(path);
      }}
      style={{ marginLeft: "10px" }}
    >
      <p className={isDir ? "" : "file-node"}>{fileName}</p>
      {nodes && fileName !== "node_modules" && (
        <ul>
          {Object.keys(nodes).map((child) => (
            <li key={child}>
              <FileTreeNode
                onSelect={onSelect}
                path={path + "/" + child}
                fileName={child}
                nodes={nodes[child]}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const FileTree = ({ tree, onSelect }) => {
  return <FileTreeNode onSelect={onSelect} fileName="/" path="" nodes={tree} />;
};
export default FileTree;