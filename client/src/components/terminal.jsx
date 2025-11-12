// import {} from '@xterm/xterm'
// import { useEffect } from 'react'

// const Terminal = () => {
//     const terminalRef = useRef();
//     useEffect(() => {
//         const term = new Terminal(
//             {
//                 rows:20,
//             }
//         );
//         term.open(terminalRef.current);


//         term.onData(data=>{
//             console.log('terminal data')
//         })
//     }, []);
//     return (
//         <div ref={terminalRef} id="terminal"></div>
//     )
// }
// export default Terminal

import { useEffect, useRef } from "react";
import { Terminal as XTerminal } from "@xterm/xterm"; 
import "@xterm/xterm/css/xterm.css"; // important for terminal styling

const Terminal = () => {
  const terminalRef = useRef(null);

  useEffect(() => {
    const term = new XTerminal({
      rows: 20,
    });

    term.open(terminalRef.current);
    term.writeln("Welcome to xterm.js! 👋");

    term.onData((data) => {
      console.log("Terminal data:", data);
      term.write(data); // echoes back typed input
    });

    return () => {
      term.dispose(); // clean up when component unmounts
    };
  }, []);

  return <div ref={terminalRef} id="terminal" style={{ height: "400px", width: "100%", background: "black" }} />;
};

export default Terminal;
