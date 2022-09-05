import Rightbar from '../../components/rightbar/Rightbar';
import Sidebar from '../../components/sidebar/Sidebar';
import Feed from '../../components/feed/Feed'
import Topbar from '../../components/topbar/Topbar';
import './home.css'
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

function Home() {
  const {user} = useContext(AuthContext);
  return (
    <>
        <Topbar/>
        <div className="homeContainer">
            <Sidebar/>
            <Feed username={user.username}/>
            <Rightbar/>
        </div>
    </>
  )
}

export default Home