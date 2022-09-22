import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentuser: null,
  loading:false,
  error:false
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers:{
        loginStart: (state)=>{
            state.loading = true;
        },
        loginSuccess: (state , action)=>{
            state.loading = false;
            state.currentuser = action.payload;
        },
        loginFailed: (state)=>{
            state.loading = false;
            state.error = true;
        },
        logout:(state)=>{
            state.currentuser = null;
            state.loading = false;
            state.error  = false;
        },
        subscription:(state , action)=>{
            if(state.currentuser.subscribedUsers.includes(action.payload)){
                state.currentuser.subscribedUsers.splice(state.currentuser.subscribedUsers.findIndex(channelId=>channelId===action.payload) , 1);
            }
            else{
                state.currentuser.subscribedUsers.push(action.payload);
            }
        }
    }
})

export const {loginStart , loginSuccess , loginFailed , logout , subscription} = userSlice.actions;
export default userSlice.reducer;