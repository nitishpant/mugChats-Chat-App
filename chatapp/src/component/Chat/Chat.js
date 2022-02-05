import React, { useEffect, useRef, useState } from 'react';
import {user} from "../Join/Join";
import socketIo from "socket.io-client";
import "./Chat.css";
import Message from "../Message/Message";
import reactScrollToBottom from "react-scroll-to-bottom";
import bigclose from "./bigclose.png";

const ENDPOINT = "https://mugchats.herokuapp.com/";

let socket;
let messageArea = document.querySelector('.chatBox');

const Chat = () => {

    const [id, setid] = useState("");

    const [messages, setmessages] = useState([]);

    
    const scrollSpan= useRef();
    useEffect(() => {
        scrollSpan.current.scrollTop = scrollSpan.current.scrollHeight;
     }, [messages]);

    console.log(messages);
    const send = () =>{
        const message = document.getElementById('chatInput').value;
        socket.emit('message',{message, id});
        document.getElementById('chatInput').value='';
    }

    useEffect(() => {
        socket = socketIo(ENDPOINT, {transports: ['websocket']});
        socket.on('connect', ()=>{ 
            console.log("connected"); 
            setid(socket.id);
        })
        
        console.log(socket);
        socket.emit('joined',{user});
        
        socket.on('welcome',(data)=>{
            setmessages([...messages,data]);
            console.log(data.user,data.message);
        })
        socket.on('userJoined',(data)=>{
            setmessages([...messages,data]);
            console.log(data.message);
        })
        
        socket.on('disconnect',(data)=>{
            setmessages([...messages,data]);
            console.log(data.message);
        })
        socket.on('leave',(data)=>{
            setmessages([...messages,data]);
            console.log(data.message);
        })

      return () => {
          socket.emit('disconnect');
          socket.off();
      };
    }, []);
    

    useEffect(() => {
      socket.on('sendMessage',(data)=>{
        setmessages([...messages,data]);
          console.log(data.user, data.message);
      });
    
      return () => {
        socket.off();
      };
    }, [messages]);

    
  return (
        <div className="chatPage">
            <div className='chatContainer'>
                <div className='header'>
                <h2>mugChats</h2>
                <a href="/"><img src={bigclose} alt="close" className="closeicon"/></a>
                </div>
                <div className='chatBox' ref={scrollSpan}>
                    {messages.map((item, i)=> <Message user={item.id===id?"":item.user} message={item.message} msgClass={item.id===id?"right":"left"} />)}
                </div> 
                <div className='inputBox'>
                    <input onKeyPress={(event)=>event.key === 'Enter'?send():null } type="text" id="chatInput" autoComplete="off"/>
                    <button onClick={send} className="sendBtn">Send</button>                    
                </div>
            </div>
        </div>
  );
};

export default Chat;
