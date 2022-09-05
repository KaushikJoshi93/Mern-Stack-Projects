import axios from 'axios';
import { useEffect, useState } from 'react'
import './conversation.css'


function Conversation({conversation,currentuser}) {
  const [user ,setUser] = useState(null);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  useEffect(()=>{
    const friendId = conversation.members.find(m=>m!==currentuser._id);
    const getUser = async()=>{
      try {
        const res = await axios.get("/users?userId="+friendId);
        console.log("I am here-->" + JSON.stringify(res.data._doc))
        setUser(res.data._doc);
      } catch (err) {
        console.log(err)
      }
    }

    getUser();

  },[conversation , currentuser]);
  return (
    <div className="conversation">
        <img src={user?.profilePicture !== "" ? user?.profilePicture : "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"} alt="" className='conversationImg' />
        <span className="conversationName">{user?.username}</span>
    </div>
  )
}

export default Conversation