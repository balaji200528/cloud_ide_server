const http = require('http')
const express = require('express')
const {Server: SockerServer } = require('socket.io')
const pty = require('node-pty')


// const ptyProcess = pty.spawn('bash', [],{
//     name: 'xterm-color',
//     cols: 80,
//     rows :30,
//     cwd: process.env.INIT_CWD,
//     env: process.env
// });
const shell = 'C:\\Windows\\System32\\cmd.exe'; // or powershell.exe
// const shell = 'C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\powershell.exe';

const ptyProcess = require('node-pty').spawn(shell, [], {
    name: 'xterm-color',
    cols: 80,
    rows: 30,
    cwd: process.cwd(),
    env: process.env
});


const app = express()
const server = http.createServer(app)
const io = new SockerServer({
    cors: '*'
})

io.attach(server);

ptyProcess.onData(data =>{
    io.emit('terminal:data', data)
})


io.on('connection',(socket) => {
    console.log('Socket connected', socket.id)

    socket.on('terminal:write', (data)=>{
        ptyProcess.write(data);
    })
})



server.listen(9000, () => console.log('DOCKER server running on the port 9000')) 



