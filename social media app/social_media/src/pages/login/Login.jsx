import { useContext, useRef } from 'react'
import './login.css'
import {loginCall} from '../../apiCalls'
import { AuthContext } from '../../context/AuthContext';
import {CircularProgress} from '@mui/material'

function Login() {
    const email = useRef();
    const password = useRef();
    const {user , isFetching , error , dispatch} = useContext(AuthContext);
    const handleClick = (e)=>{
        e.preventDefault();

        loginCall({email:email.current.value,password:password.current.value} , dispatch )
       
    }
  return (
    <div className="login">
        <div className="loginWrapper">
            <div className="loginLeft">
                <h3 className="loginLogo">KaushikSocial</h3>
                <span className="loginDesc">
                    Connect with friends and the world around you on KaushikSocial
                </span>
            </div>
            <div className="loginRight">
                <form  className="loginBox" onSubmit={handleClick}>
                    <input type="email" className="loginInput" placeholder='Email' ref={email} required/>
                    <input type="password" className="loginInput" placeholder='Password' ref={password} minLength="6" required/>
                    <button className="loginButton" disabled={isFetching}>{(isFetching)?<CircularProgress color="inherit" size="20px" />:"Log In"}</button>
                    <span className="loginForgot">Forgot Password?</span>
                    <button className="loginRegisterButton" disabled={isFetching}>{(isFetching)?<CircularProgress color="inherit" size="20px" />:"Create a New Account"}</button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Login