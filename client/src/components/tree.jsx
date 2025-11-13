const FileTreeNode = ({ fileName , node}) => {
    const isDir = !!node
    console.log(node);
    return (
        <div style={{ marginLeft: '20px' }}>
           <p className={isDir ? "" : "File-node"}> {fileName} </p>
            {node && <ul>
                {Object.keys(node).map((child) => (
                    <li key={child}>
                        <FileTreeNode 
                        fileName={child} 
                        node={node[child]} 
                        />
                    </li>
                ))}
                </ul>
                }
        </div>
    )
};

const fileTree =({ tree }) => {
    return <FileTreeNode fileName="/" node={tree} />;
};
export default fileTree;