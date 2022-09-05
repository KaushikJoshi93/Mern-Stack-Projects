import axios from "axios";

export const loginCall = async(userCredential , dispatch)=>{
    dispatch({type:"LOGIN_START"});
    try {
        const res = await axios.post("auth/login",userCredential);
        const {password , createdAt , updatedAt , ...other} = res.data._doc; 
        localStorage.setItem("users_session" , JSON.stringify(other));
        dispatch({type:"LOGIN_SUCCESS" , payload:other});
    } catch (err) {
        dispatch({type:"LOGIN_FAILURE", payload:err})
    }
}