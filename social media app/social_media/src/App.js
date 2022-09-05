import Home from "./pages/home/Home";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Profile from './pages/profile/Profile'
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Messenger from "./pages/messenger/Messenger";


function App() {

  const {user} = useContext(AuthContext);

  
  return (
    <Router>
    <Routes>
        <Route exact path="/" element={user ? <Home /> : <Register/>} />
        <Route exact path="/login" element={user ? <Navigate to="/" />: <Login />} />
        <Route exact path="/register" element={user ? <Navigate to="/" />: <Register />} />
        <Route exact path="/messenger" element={user ? <Messenger/>: <Register />} />
        <Route exact path="/profile/:username" element={<Profile />} />
        <Route exact path="*" element={<Navigate to="/" />} />

    </Routes>
  </Router>
  );
}

export default App;
