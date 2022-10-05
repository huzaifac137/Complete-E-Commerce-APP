import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useInput from '../../CUSTOM-HOOKS/useInput';
import { setUser } from '../../STORE/UserSlice';

function Login(props) {

    useEffect(()=>{
         setIsLoading(true);

         setTimeout(()=>{
            setIsLoading(false)
         },300);

    },[]);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const[responseMsg , setResponseMsg] = useState(null);
    const[isLoading ,setIsLoading] = useState(false);

    const{value :  EMAIL , isValid : emailIsValid , valueChangeHandler: emailChangeHandler , clear : clearEmail} 
    = useInput(  value=>value.trim().length>10 && value.includes("@") , "");

    const{value :  PASSWORD, isValid : passwordIsValid , valueChangeHandler: passwordChangeHandler , clear : clearPassword} 
    = useInput(  value=> value.trim().length>=6  , "");

    const handleSubmit=async(e)=>{

        e.preventDefault();

        const loginData = {
            email : EMAIL ,
            password : PASSWORD
        };
           
        let responseData;
        try
        {
            setIsLoading(true);
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}api/users/login` ,{
                method :"POST" ,
                headers : {
                    "Content-Type" :"application/json"
                } ,
    
                body : JSON.stringify(loginData)
        } );

         responseData = await response.json();

        if(response.status!==200)
        {
           throw new Error(responseData.message);
           
        } 

        const loggedInUser = {
            username : responseData.username ,
            userId : responseData.userId ,
            email : responseData.email ,
            token : responseData.token ,
           isLoggedIn : true
        };

        dispatch(setUser(loggedInUser));
        navigate("/" , {replace:true});

        setResponseMsg(responseData.message);
    }

        catch(err)
        {
            setResponseMsg(err.message);
            setIsLoading(false);
        }
           
        clearEmail();
        clearPassword();
        setIsLoading(false);

    }

    return (
        <form onSubmit={handleSubmit}>

         { isLoading  ? <h2>LOADING....</h2> : <> <h3> LOGIN INTO YOUR ACCOUNT </h3>
             <input className={emailIsValid ? "input" : "invalid"} type="text"  placeholder='EMAIL' value={EMAIL} onChange={emailChangeHandler}  />
         <input className={passwordIsValid ? "input" : "invalid"} type="password" placeholder='PASSWORD' value={PASSWORD} onChange={passwordChangeHandler}  />
         <button className='btn' > SUBMIT </button>  

         <h3>{responseMsg}</h3>  </> }
      
      </form>
    );
}

export default Login;