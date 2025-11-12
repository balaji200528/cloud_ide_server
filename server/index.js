const http = require('http')
const express = require('express')
const {Server: SockerServer } = require('socket.io')
const pty = require('node-pty')
const fs = require('fs/promises')
const path = require('path')


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
    cwd: process.cwd()+'/user',
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

app.get('/files', async (req,res) =>{
    const fileTree = await generateFileTree('./user')
    res.json({ tree: fileTree })
})


server.listen(9000, () => console.log('DOCKER server running on the port 9000')) 


function generateFileTree(directory){
    const tree = {}

    async function BuildTree(currentDir, currentTree){
        const files = await fs.readdir(currentDir)

        for(const file of files){
            const filePath = path.join(currentDir, file)
            const stats = await fs.stat(filePath)

            if(stats.isDirectory()){
                currentTree[file] = {}
                await BuildTree(filePath, currentTree[file])
            } else {
                currentTree[file] = null
            }
        }
    }
    return BuildTree(directory, tree)
    return tree
}
