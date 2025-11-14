
import './App.css'
import React, { useState, useEffect } from 'react';
import Terminal from './components/terminal'
import FileTree from './components/tree';
import socket from './socker';
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";

function App() {

  const [fileTree ,setFileTree] = useState({});
  const [selectedFile, setSelectedFile] = useState("");
  const [code, setCode] = useState("// Your code goes here");
  
  
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

  useEffect(() => {
    if(code) {
      const timer = setTimeout(() => {
         socker.emit("file:change",{
          path: selectedFile,
          content: code
         })
    },5*1000)
    return () => {
      clearTimeout(timer)
    }
  }
},[code])
  return (
  <div className="playground-container">
    <div className='editor-container'>
      <div className='files'>
        <FileTree 
        onSelect={(path) => setSelectedFile(path)}
         tree={fileTree} />
      </div>
      <div className='editor'>
        {selectedFile && <p>{selectedFile.replaceAll("/", " > ")}</p>}
        <AceEditor 
          value={code}
          onChange={(e) => setCode(e)}
        
        />
      </div>
    </div>
      <div className='terminal-container'>
        <Terminal />
      </div>
    </div> 
)
}

export default App
