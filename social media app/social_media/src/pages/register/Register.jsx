import { useRef } from 'react';
import './register.css'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

function Register() {
    const username = useRef();
    const email = useRef();
    const password = useRef();
    const passwordAgain = useRef();

    const navigate = useNavigate();
    const handleClick = async(e)=>{
        e.preventDefault();
        if(passwordAgain.current.value !== password.current.value){
            password.current.setCustomValidity("Password don't match!!");
        }
        else{
            const user = {
                username:username.current.value,
                email:email.current.value,
                password: password.current.value
            }
            try {
                const res = await axios.post('/auth/register' , user);
                (res) ? navigate("/login") : console.log("Some Error Occured...");
            } catch (err) {
                console.log(err)
            }
        }

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
                <form className="loginBox" onSubmit={handleClick}>
                    <input type="text" className="loginInput" placeholder='Username' ref={username} required/>
                    <input type="email" className="loginInput" placeholder='Email' ref={email} required/>
                    <input type="password" className="loginInput" placeholder='Password' ref={password} minLength="6" required/>
                    <input type="password" className="loginInput" placeholder='Password Again' ref={passwordAgain} minLength="6" required/>
                    <button className="loginButton">Sign Up</button>
                    <button className="loginRegisterButton">Login to your account</button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Register