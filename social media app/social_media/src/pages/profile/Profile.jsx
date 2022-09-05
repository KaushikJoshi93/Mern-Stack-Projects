import './profile.css'
import Topbar from '../../components/topbar/Topbar'
import Feed from '../../components/feed/Feed'
import Sidebar from '../../components/sidebar/Sidebar'
import Rightbar from '../../components/rightbar/Rightbar'
import { useEffect, useState } from 'react'
import axios from 'axios'
import {useParams} from 'react-router'

function Profile() {
    const [user , setUser] = useState({});
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const params = useParams();
    useEffect(()=>{
        const fetchUser = async()=>{
          try {
            const res = await axios.get(`/users?username=${params.username}`);
            const {password , createdAt , updatedAt , ...other} = res.data._doc; 
            setUser(other);
          } catch (err) {
            console.log("Error in Profile: "+err);
          }
        }
        fetchUser();
    } , [params.username])
    return (
        <>
            <Topbar />
            <div className="profile">
                <Sidebar />
                <div className="profileRight">
                    <div className="profileRightTop">
                        <div className="profileCover">
                            <img src={user.coverPicture? user.coverPicture : PF + "network.png"} alt="" className='profileCoverImg' />
                            <img src={user.profilePicture ? user.profilePicture : PF + "hero.png"} alt="" className='profileUserImg' />
                        </div>
                        <div className="profileInfo">
                            <h4 className='profileInfoName'>{user.username}</h4>
                            <span className='profileInfoDesc'>{user.desc}</span>
                        </div>
                    </div>
                    <div className="profileRightBottom">
                        <Feed username={user.username}/>
                        <Rightbar u={user}/>
                    </div>

                </div>

            </div>
        </>
    )
}

export default Profile