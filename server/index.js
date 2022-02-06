const http = require('http');
const express =require('express');
const cors =require('cors');
const socketIO =require('socket.io');

const https = require('https');
const fs = require('fs');


var key = fs.readFileSync(__dirname + '/selfsigned.key');
var cert = fs.readFileSync(__dirname + '/selfsigned.crt');
var options = {
  key: key,
  cert: cert
};

const app = express();
const port = process.env.PORT || 4000 ;

const users = [{}];

app.use(cors());
app.get('/', (req, res)=>{
    res.send('Chatting Starts Here https');
})
//const server = https.createServer(options,app);
const server = http.createServer(app);

const io = socketIO(server);

io.on("connection", (socket)=>{
    console.log("Connection is on");

    socket.on('joined', ({user})=>{
        users[socket.id] = user;
        console.log(`User connected is : ${user}`);
        socket.broadcast.emit('userJoined',{user:"Admin",message:`${users[socket.id]} has joined`});
        socket.emit('welcome', {user:"Admin", message:`Welcome to mugChats, ${users[socket.id]}`});
    });

    socket.on('message',({message, id})=>{
        io.emit('sendMessage',{user:users[id],message, id})
    })

    socket.on('disconnect',({user})=>{
        socket.broadcast.emit('leave',{user:"Admin",message:`${users[socket.id]} has left`});

        console.log(`user left`);
    })

})
server.listen(port, ()=>{
    console.log(`Server running  on : ${port}`);
})

