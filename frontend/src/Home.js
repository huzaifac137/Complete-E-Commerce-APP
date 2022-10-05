import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Products from './Products';
import Login from './SIGNUP/LOGIN/Login';
import {getCart , setTotalPayment} from "./STORE/CartSlice";

function Home(props) {
     
    const dispatch = useDispatch();

    const{Status , response} = useSelector((store)=>store.cart);
    const{isLoggedIn , token} = useSelector((store)=>store.user);

    const[showSuccess ,setShowSuccess] = useState();


    useEffect(()=>
    {
        if(Status==="idle")
        {
            setShowSuccess(true);
            
        }

    },[]);

    return (
        <div style={{textAlign:"center" , marginTop :"60px"}}>

                { Status==="loading" &&  <h2>ADDING TO CART .....</h2>  }
                {showSuccess===true && <h2> {response} </h2>}
        
          { (isLoggedIn===true && token) ?  <>  <h2 className='heading'>WELCOME TO REDUX TOOLKIT STORE</h2>

            <section>
                <h3>
                    PRODUCTS
                </h3>
                
                <Products />
            </section> </> : 

            <h2 style={{margin:"100px auto" , color:"black"}}> LOGIN or SIGNUP to continue !!!!!!!! </h2> }
          
            
           
        </div>
    );
}

export default Home;