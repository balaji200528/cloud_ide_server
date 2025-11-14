// Your code goes here


const express= require('express')
const app = express()
app.get('/',(req,res) => res.json({msg : 'hey from my own server'}))

app.listen(8000,()=>console.log(`server started on port${8000}`));