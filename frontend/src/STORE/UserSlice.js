import { createSlice } from "@reduxjs/toolkit";


const userSlice = createSlice({

    name :"user" ,
    initialState : {
        username : null ,
        email : null ,
        userId : null ,
        isLoggedIn : null ,
        token : null
       
    } ,

    reducers : {
          setUser : (state , action)=>
          {
            state.username = action.payload.username;
            state.email = action.payload.email;
            state.userId = action.payload.userId;
            state.isLoggedIn = action.payload.isLoggedIn;
            state.token = action.payload.token;

            localStorage.setItem("loggedInUser" , JSON.stringify({
                username : state.username ,
                userId : state.userId ,
                email : state.email ,
                token :state.token,
                isLoggedIn : state.isLoggedIn
            }));

          } ,

          logoutUser : (state ,action)=>
          {
            state.isLoggedIn =null;
            state.token=null;
          }
    }

});

export const {setUser , logoutUser} = userSlice.actions;

export default userSlice.reducer;