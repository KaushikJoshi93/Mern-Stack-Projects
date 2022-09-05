import {MoreVert} from "@mui/icons-material"
import './post.css'
import { useState , useEffect, useContext } from "react"
import axios from 'axios'
import {format} from 'timeago.js'
import { Link } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"

function Post({post}) {
    const [like , setLike] = useState(post.likes.length);
    const [isliked , setIsLiked] = useState(false);
    const [user , setUser] = useState({});
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const {user:currentUser} = useContext(AuthContext);

    useEffect(()=>{
        setIsLiked(post.likes.includes(currentUser._id))
    },[currentUser._id , post.likes])


    useEffect(()=>{
        const fetchUser = async()=>{
          const res = await axios.get(`/users?userId=${post.userId}`);
          setUser(res.data._doc);
        }
        fetchUser();
    } , [post.userId])

    const likeHandler = async()=>{
        try {
            await axios.put("/posts/"+post._id+"/like" , {userId: currentUser._id})
        } catch (err) {
            console.log(err);
        }
        setLike(isliked?like-1:like+1);
        setIsLiked(!isliked); 
    }

  return (
    <div className="post">
        <div className="postWrapper">
            <div className="postTop">
                <div className="postTopLeft">
                    <Link to={`/profile/${user.username}`} style={{textDecoration:'none'}}>
                    <img src={user.profilePicture ? PF+ user.profilePicture : PF + "hero.png"} alt="" className='postProfileImg'/>
                    </Link>
                    <span className="postUsername">{user.username}</span>
                    <span className="postDate">{format(post.createdAt)}</span>
                </div>
                <div className="postTopRight">
                    <MoreVert/>
                </div>
            </div>
            <div className="postCenter">
                <span className="postText">{post?.desc}</span>
                <img src={PF+post.img} alt="" className="postImg"/>
            </div>
            <div className="postBottom">
                <div className="postBottomLeft">
                    <img src={PF + "like.png"} alt="" width="50px" className="likeIcon" onClick={likeHandler}/>
                    <img src={PF + "heart.png"} alt="" width="50px" height="40px" className="heartIcon" onClick={likeHandler}/>
                    <span className="postLikeCounter">{like}</span>
                </div>
                <div className="postBottomRight">
                    <span className="postCommentText">{post.comment}</span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Post