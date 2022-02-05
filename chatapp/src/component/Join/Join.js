import React, { useState } from 'react';
import "./Join.css";
import {Link} from "react-router-dom";

let user;

const sendUser = () =>{
    user = document.getElementById('joinInput').value;
    console.log('the dream user is: ',user);
    document.getElementById('joinInput').value="";
}

const Join = () => {
    const [name, setname] = useState("");

    return <div className="JoinPage">
        <div className="JoinContainer">
            <h1>mugChats</h1>
            <input onChange={(e)=>setname(e.target.value)} type="text" id="joinInput" placeholder='Username'/>
            <Link onClick={(event)=> !name ? event.preventDefault():null} to="/Chat"><button onClick={sendUser} className='joinbtn'>Login</button></Link>
        </div>
    </div>;
};

export default Join;
export {user};

