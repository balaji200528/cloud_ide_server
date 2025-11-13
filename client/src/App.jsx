
import './App.css'
import React, { useState, useEffect } from 'react';
import Terminal from './components/terminal'
import FileTree from './components/tree';
import socket from './socker';
function App() {

  const [fileTree ,setFileTree] = useState({});
  
  
  const getFileTree = async () => {
    const response = await fetch('http://localhost:9000/files');
    const data = await response.json();
    setFileTree(data.tree);
  }

  // useEffect(() => {
  //   getFileTree();
  // },[])

  useEffect(() => {
    socket.on("file:refresh", getFileTree);
    return () => {
      socket.off("file:refresh", getFileTree);
    };
  }, []);


  return (
  <div className="playground-container">
    <div className='editor-container'>
      <div className='file'>
        <FileTree tree={fileTree} />
      </div>
      <div className='editor'></div>
    </div>
      <div className='terminal-container'>
        <Terminal />
      </div>
    </div> 
)
}

export default App
