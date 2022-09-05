import axios from 'axios';
import { useEffect, useState } from 'react'
import './chatOnline.css'

function ChatOnline({onlineUsers , currentId , setCurrentChat}) {
  const [friends , setFriends] = useState([]);
  const [onlineFriends , setOnlineFriends] = useState([]);

  useEffect(()=>{
    const getFriends = async()=>{
      const res = await axios.get("/users/friends/"+currentId);
      setFriends(res.data);
    }

    getFriends();
  } , [currentId])

  useEffect(()=>{
    setOnlineFriends(friends.filter(f=> onlineUsers.includes(f._id)));
  } , [friends , onlineUsers]);


  const handleClick = async(user)=>{
    try {
      const res = await axios.get(`/conversations/find/${currentId}/${user._id}`);
      setCurrentChat(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="chatOnline">
      {onlineFriends.map(o=>{
        return(
          <div className="chatOnlineFriend" onClick={()=>handleClick(o)}>
            <div className="chatOnlineImgContainer">
                <img src={o?.profilePicture ? o.profilePicture : "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"} alt="" className='chatOnlineImg'/>

                <div className="chatOnlineBadge"></div>
            </div>

            <div className="chatOnlineName">{o?.username}</div>
        </div>
          )
      })}
        
    </div>
  )
}

export default ChatOnline