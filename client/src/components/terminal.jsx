// import {} from '@xterm/xterm'
// import { useEffect } from 'react'

// const Terminal = () => {
//     const terminalRef = useRef();
// //     useEffect(() => {
// //         const term = new Terminal(
// //             {
// //                 rows:20,
// //             }
// //         );
// //         term.open(terminalRef.current);


// //         term.onData(data=>{
// //             console.log('terminal data')
// //         })
// //     }, []);
// //     return (
// //         <div ref={terminalRef} id="terminal"></div>
// //     )
// // }
// // export default Terminal

// import { useEffect, useRef } from "react";
// import { Terminal as XTerminal } from "@xterm/xterm"; 
// import "@xterm/xterm/css/xterm.css"; // important for terminal styling
// import socket from "client\src\socker.js"


// const Terminal = () => {
//   const terminalRef = useRef(null);

//   useEffect(() => {
//     const term = new XTerminal({
//       rows: 20,
//     });

//     term.open(terminalRef.current);
//     term.writeln("Welcome to xterm.js! 👋");

//     term.onData((data) => {
//       // console.log("Terminal data:", data);
//       // term.write(data); // echoes back typed input

//       socket.emit('terminal:write', data);
//     });
//       socket.on('terminal:data', (data) => {
//         term.write(data);
//       });
//     return () => {
//       term.dispose(); // clean up when component unmounts
//     };
//   }, []);

//   return <div ref={terminalRef} id="terminal" style={{ height: "400px", width: "100%", background: "black" }} />;
// };

// export default Terminal;



import { Terminal as XTerminal } from '@xterm/xterm';
import { useEffect, useRef } from 'react';
import socket from '../socker';
import "@xterm/xterm/css/xterm.css";

const Terminal = () => {
  const terminalRef = useRef();
  const isRendered = useRef(false);

  useEffect(() => {
    if (isRendered.current) return;
    isRendered.current = true;
    const term = new XTerminal({
      rows: 20, // Number of visible rows in the terminal
    });

    term.open(terminalRef.current);

    // Capture input data
    term.onData((data) => {
      socket.emit('terminal:write', data); // Logs user input
    });
    socket.on('terminal:data', (data) => {
      term.write(data); // Write data received from server to terminal
    });
  }, []);

  return <div ref={terminalRef} id="terminal" />;
};

export default Terminal;
