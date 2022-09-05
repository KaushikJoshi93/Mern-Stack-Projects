import { useContext, useEffect, useRef, useState } from 'react'
import ChatOnline from '../../components/chatOnline/ChatOnline'
import Conversation from '../../components/conversations/Conversation'
import Message from '../../components/message/Message'
import Topbar from '../../components/topbar/Topbar'
import { AuthContext } from '../../context/AuthContext'
import './messenger.css'
import axios from 'axios'
import {io} from "socket.io-client"

function Messenger() {
    const [conversations , setConversations] = useState([]);
    const [currentChat , setCurrentchat] = useState([]);
    const [messages , setMessages ] = useState([]);
    const [newMessages , setNewMessages ] = useState([]);
    const [arrivalMessage , setArrivalMessage] = useState("");
    const [onlineUsers , setOnlineUsers] = useState([]);
    const {user} = useContext(AuthContext);
    const scrollref = useRef();
    const socket = useRef(io("ws://localhost:8900"));

    useEffect(()=>{
        scrollref.current?.scrollIntoView({behavior: 'smooth'});
    } , [messages , arrivalMessage])

    useEffect(()=>{
        socket.current = io("ws://localhost:8900");
        socket.current.on("getMessage" , data=>{
            setArrivalMessage({
                sender: data.senderId,
                text : data.text,
                createdAt: Date.now()
            });
        })
    },[]);

    useEffect(()=>{
        arrivalMessage && currentChat?.members.includes(arrivalMessage.sender) &&
        setMessages(prev=>[...prev , arrivalMessage])
    },[arrivalMessage , currentChat]);

   useEffect(()=>{
    socket.current.emit("addUser" , user._id);
    socket.current.on("getUsers",users=>{
        setOnlineUsers(user.following.filter(f=>users.some(u=>u.userId === f)));
    });
   },[user])

    useEffect(()=>{
        const getConversations = async()=>{
            try {
                const res = await axios.get("/conversations/"+user._id);
                setConversations(res.data);
            } catch (err) {
                console.log(err)
            }
        }
        getConversations();
    },[])

useEffect(()=>{
    const getMessages = async()=>{
        try {
            const res = await axios.get("/messages/"+currentChat?._id);
            setMessages(res.data);
           
        } catch (err) {
            console.log(err)
        }
    }

    getMessages();
} , [currentChat])

// useEffect(()=>{
//     scrollref.current.scrollIntoView({behavior:"smooth"})
// },[messages]);





const handleSubmit = async(e)=>{
    e.preventDefault();
    const message = {
        sender: user._id,
        text: newMessages,
        conversationId: currentChat._id
    };

    const receiverId = currentChat.members.find(member=> member !== user._id);

    socket.current.emit("sendMessage" , {
        senderId: user._id,
        receiverId,
        text : newMessages

    })

    try {
        const res = await axios.post("/messages" , message);
        setMessages([...messages , res.data]);
        setNewMessages("")
    } catch (err) {
        console.log(err);
    }
}

  return (
    <>
        <Topbar/>
        <div className="messenger">
            <div className="chatMenu">
                <div className="chatMenuWrapper">
                    <input type="text" placeholder='Search for friends..' className='chatMenuInput'/>
                    {conversations.map(c=>{
                        return (
                            <div onClick={()=>{setCurrentchat(c)}}>
                            <Conversation conversation={c} currentuser={user} key={c._id}/>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className="chatBox"  >
                <div className="chatBoxWrapper" >
                    {
                        currentChat.length !== 0 ? 
                    <>
                    <div className="chatBoxTop">
                        {messages.map(m=>{
                            return (
                                <div key={m._id}>
                                <Message own={m.sender===user._id} message={m}/>
                                </div>
                            )
                        })}

                        <div ref={scrollref}/>
                        
                    </div>
                    <div className="chatBoxBottom">
                        <textarea className='chatMessageInput' placeholder='Write Message....' onChange={e=>setNewMessages(e.target.value)} value={newMessages}></textarea>
                        <button className="chatSubmitButton" onClick={handleSubmit}>Send</button>
                    </div>
                    </> : <span className='noConversationText' >Open a Conversation to Start a Chat</span>}
                </div>

            </div>
            <div className="chatOnline">
                <div className="chatOnlineWrapper">
                    <ChatOnline onlineUsers ={onlineUsers} currentId={user._id} setCurrentChat={setCurrentchat}/>
                </div>
            </div>
        </div>
    </>
  )
}

export default Messenger