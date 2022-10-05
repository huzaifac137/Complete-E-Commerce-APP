import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from "../STORE/CartSlice";

function Card({ id , title , price , image}) {


const{userId , token} =useSelector((store)=>store.user);


    const[Amount , setAmount] = useState(1);


    const dispatch = useDispatch();

    const handleAddToCart=()=>
    {
           dispatch(addToCart( { title : title , price : price , image :image , quantity : Amount , token:token}  ));
    };

    const increaseAmountHandler=()=>
    {
         setAmount((prev)=> prev+1);
    }

    const decreaseAmountHandler=()=>
    {
        if(Amount>1)
        {
            setAmount((prev)=> prev-1);
        }
    }

    return (
        <div className='card'>
             <img src={image} alt="" />
             <h4>{title}</h4>
             <h5 style={{color:"green"}}>${price}</h5>

             <div style={{ display:"flex" , fontSize:"20px" , alignItems:"center" , justifyContent:"space-evenly" 
             , width:"100px" , margin:"10px"}}>

                   <div style={{cursor:"pointer"}} onClick={increaseAmountHandler}>+</div>
                   <div style={{color:"red"}}> {Amount} </div>
                   <div style={{cursor:"pointer"}} onClick={decreaseAmountHandler}>-</div>
             </div>
             <button className='btn' onClick={handleAddToCart}> ADD TO CART </button>
        </div>
    );
}

export default Card;