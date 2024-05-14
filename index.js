const { Socket } = require("dgram")
const express = require("express")
const http = require("http")
const path = require("path")
const {Server} = require("socket.io")



const app = express()
const server = http.createServer(app)
const io = new Server(server)
// soket.io will handle the below lines
io.on("connection",(socket)=>{
    // console.log("a new user or clien has connected",socket.id);
    socket.on('user-message',message=>{
        // console.log("client ot server",message); 
        io.emit("message to all from client",message)
    })
    // i made the mistake in small case letter to capital case letter Socket socket   S s
    // message or (message) both will work
    // Socket.on("user-message",(message)=>{
    //     console.log("client to server",message)
    // })
})
// io.on("connection",(client)=>{
//     console.log("a new user or clien has connected",client.id);
// })


// in think express will hendle the liness below this
// all http request will be handled below
app.use(express.static(path.resolve("./public")))

app.get("/",(req,res)=>{
    res.sendFile("./public/index.js")
})

server.listen(8000,()=>{
    console.log("server is runnong at 8000");
})