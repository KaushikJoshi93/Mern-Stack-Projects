import './rightbar.css'
import { Users } from '../../dummyData'
import Online from '../online/Online'
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import {Add, Remove} from '@mui/icons-material'

function Rightbar({ u }) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [friends, setFriends] = useState([]);
    const {user:currentuser , dispatch} = useContext(AuthContext);
    const [followed , setFollowed] = useState(currentuser ? currentuser.following.includes(u?._id) : false);

    useEffect(()=>{
        localStorage.removeItem("users_session")
        localStorage.setItem("users_session" , JSON.stringify(currentuser));
        console.log("i am here..." + JSON.stringify(currentuser))
    },[currentuser])

    useEffect(()=>{
        setFollowed(currentuser ? currentuser.following.includes(u?._id) : false);

    } , [currentuser , u])

    useEffect(() => {
        const getFriends = async () => {
            try {
                const friendList = await axios.get("/users/friends/" + u._id);
                setFriends(friendList.data);
            } catch (err) {
                console.log("Error: " + err);
            }
        }
        
        (u)?getFriends():console.log("function skipped....");
    }, [u])

    const followHandler = async()=>{
        try {
            if(followed){
                await axios.put("/users/"+u._id+"/unfollow" , {
                    userId : currentuser._id
                });
                await dispatch({type:"UNFOLLOW" , payload:u._id})
                
            }
            else{
                await axios.put("/users/"+u._id+"/follow",{
                    userId:currentuser._id
                })
                await dispatch({type:"FOLLOW" , payload:u._id})
            }
        } catch (err) {
            console.log(err)
        }
        setFollowed(!followed);
        
    }

    const HomeRightBar = () => {
        return (
            <>
                <div className="birthdayContainer">
                    <img src={PF + "birthday.jpg"} alt="" className='birthdayImg' />
                    <span className="birthdayText"><b>Amit</b> and <b>3 other friends</b> have a birthday today</span>
                </div>
                <img src={PF + "ad.jpg"} alt="" className='rightbarAd' />
                <h4 className="rightbarTitle">Online Friends</h4>
                <ul className="rightbarFriendList">
                    {Users.map(u => {
                        return <Online key={u.id} user={u} />
                    })}
                </ul>
            </>
        )
    }

    const ProfileRightBar = () => {
        return (
            <>
                {u.username !== currentuser.username && (
                    <button className="rightbarFollowButton" onClick={followHandler}>
                        {followed ? "Unfollow" : "Follow"}
                        {followed ? <Remove/> : <Add/>}
                    </button>
                )}
                <h4 className='rightbarTitle'> User information</h4>
                <div className="rightbarInfo">
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">City:</span>
                        <span className="rightbarInfoValue">{u.city}</span>
                    </div>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">From:</span>
                        <span className="rightbarInfoValue">{u.from}</span>
                    </div>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">Relationship:</span>
                        <span className="rightbarInfoValue">{(u.relationship === 1) ? "Single" : (u.relationship === 2) ? "Married" : ""}</span>
                    </div>
                </div>
                <h4 className='rightbarTitle'> User friends</h4>
                <div className="rightbarfollowings">
                    {friends.map(friend => {
                        return (
                            <Link to={"/profile/" + friend.username} style={{ textDecoration: "none" }} key={friend._id}>
                                <div className="rightbarfollowing">
                                    <img src={friend.profilePicture ? friend.profilePicture : PF + "hero.png"} alt="" className="rightbarfollowingImg" />
                                    <span className="rightbarFollowingName">{friend.username}</span>
                                </div>
                            </Link>
                        )
                    })}

                </div>
            </>
        )
    }
    return (
        <div className="rightbar">
            <div className="rightbarWrapper">
                {u ? <ProfileRightBar /> : <HomeRightBar />}
            </div>
        </div>
    )
}

export default Rightbar