import axios from 'axios';
import { useContext, useEffect, useState } from 'react'
import Share from '../../components/share/Share'
import { AuthContext } from '../../context/AuthContext';
import Post from '../post/Post'
import './feed.css'
// import {Posts} from '../../dummyData'

function Feed({username}) {
  const [posts , setPosts] = useState([]);
  const {user} = useContext(AuthContext);

  useEffect(()=>{
      const fetchPosts = async()=>{
        try {
          const res = username ? await axios.get("/posts/profile/"+username) : await axios.get("/posts/timeline/"+user._id)
          setPosts(res.data.sort((p1,p2)=>{
            return new Date(p2.createdAt) - new Date(p1.createdAt);
          }));
        } catch (err) {
          console.log("Error---->"+err);
        }
      }
      fetchPosts();
  } , [username,user._id])
  return (
    <div className='feed'> 
        <div className="feedWrapper">
          {username === user.username &&
            <Share/>}
            {posts.map(p=>{
              return <Post post={p}  key={p._id}/>
            })}
        </div>
    </div>
  )
}

export default Feed