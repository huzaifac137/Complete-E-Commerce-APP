import { useStripe } from '@stripe/react-stripe-js';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import StripeCheckout from "react-stripe-checkout";
import useInput from '../CUSTOM-HOOKS/useInput';
import { setTotalPayment } from '../STORE/CartSlice';

function StripeCheckoutComponent(props) {

    const[ERROR , setERROR] = useState(null);

    const{value : EMAIL , valueChangeHandler : emailChangehandler , isValid : emailIsValid} = useInput(val=>val.trim().length>10 && val.includes("@") , "");

    const{cartArray , totalPayment} = useSelector((store)=>store.cart);

    const navigate = useNavigate();
    
     const dispatch = useDispatch();
     dispatch(setTotalPayment());

     //STRIPE 
     const stripe = useStripe();

    const handleCheckoutApiForm =async(e)=>{

        e.preventDefault();
        
        const line_items = cartArray.map((item)=> {

            return {
                quantity : item.quantity ,
                price_data : {
                    currency :"usd" ,
                    unit_amount : item.price * 100 ,

                    product_data : {
                        name : item.title ,
                        description : item.description ,
                        images : [item.image]
                    }
                }
            }
        });
        

        let response , responseData , sessionId;

        try
        {
         response = await fetch(`${process.env.REACT_APP_SERVER_URL}api/payments` , {
            method :"POST" ,

            headers:{
                "Content-Type" :"application/json" 
            } ,

            body : JSON.stringify({
                   line_items : line_items ,
                   customer_email : EMAIL
            }) 
        });

       responseData = await response.json();
          
      if(response.status===200)
      { 
          sessionId = responseData.sessionId;
      }
      
       await stripe.redirectToCheckout({
        sessionId : sessionId 
      });

     
    }

    catch(err)
    {
        setERROR(err.message);
    }

    }



    return (
        <div className='checkout'>
            { ERROR ? <h2> {ERROR } </h2> : <>
            <h2 style={{textAlign:"center"}}> CHECKOUT SUMMARY </h2>
              <h3>TOTAL ITEMS : {cartArray.length} </h3>
              <h3>AMOUNT TO PAY : <span style={{color:"green"}}>  ${totalPayment}  </span> </h3>

              <form onSubmit={handleCheckoutApiForm} >
               <div>
               <input type="text" value={EMAIL} placeholder="EMAIL" onChange={emailChangehandler} />
               </div>
              
                <button className='btn-danger'> CHECKOUT </button>
              

              </form>
 </> }
        </div>
    );
}

export default StripeCheckoutComponent;