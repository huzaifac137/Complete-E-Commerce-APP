import React from "react";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";


const cartSlice = createSlice({
    name :"cart" ,

    initialState : {

        totalPayment : 0 ,
        // addtoCart
        cartArray : [] ,
       
        Status : null ,
        response:  null ,

        //getCart
        Status2 :"null",
        responseMessage2 :null ,

        //remove from cart
        Status3 : null,
        responseMessage3 :null,
    } ,

    reducers : {
            
        setTotalPayment : (state ,action)=>{

                let total=0;
                for( var i=0; i<state.cartArray.length ; i++)
                {
                  total = total + (state.cartArray[i].price * state.cartArray[i].quantity);
                }
        
                state.totalPayment  = total;

            } ,

            resetStatus: (state,action)=>{
                state.Status="idle";
                state.response="";
            }
    } , 

    extraReducers : (builder)=>{

       builder.addCase(addToCart.pending , (state , action)=>{
         state.Status = "loading";

       }) .addCase(addToCart.fulfilled , (state , action)=>{
        state.Status = "idle"
        state.response = action.payload;
        

       }).addCase(addToCart.rejected , (state , action)=>{
        state.Status="error";
        state.response=action.payload;
        
       }) 

       .addCase(getCart.pending , (state , action)=>{
             state.Status2="loading";

       }).addCase(getCart.fulfilled, (state, action)=>{
           state.Status2="idle" ; 
           state.cartArray = action.payload.array;
           state.responseMessage2 = action.payload.message;
           console.log(action.payload);


       }) .addCase(getCart.rejected , (state , action)=>{
             state.Status2="error";
             state.responseMessage2 = action.payload;
             console.log(action.payload);
       }) 

       .addCase(removeFromCart.pending , (state ,action)=>{
             state.Status3="loading";

       }).addCase(removeFromCart.fulfilled , (state ,action)=>{

        state.Status3="idle";
        state.responseMessage3 = action.payload;

    }).addCase(removeFromCart.rejected , (state ,action)=>{

        state.Status3 = "error";
        state.responseMessage3=action.payload;
    })

    }

}) ;

export const{setTotalPayment , resetStatus} = cartSlice.actions;



export const getCart= createAsyncThunk("cart/get", async(_ ,{ fulfillWithValue , rejectWithValue })=>{

    const obj = JSON.parse(localStorage.getItem("loggedInUser"));
    const token = (obj.token);
    
    let responseData;

    try {
        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}api/products` ,{
            headers : {
                'Authorization' : `bearer---${token}`
            }
        }

        );

         responseData = await response.json();
          
        if(response.status===200)
        {
        return  fulfillWithValue( {array : responseData.products , message : "" });
        
        }
    
        throw new Error();
    }

       catch(err)
       {
        return {message : responseData.message , array : [] };
       }
        
       
});

export const addToCart = createAsyncThunk("cart/add" , async({title , price , image , quantity , token} , 
    {fulfillWithValue })=>{

    let responseData;

    try
    {

    const response = await fetch(`${process.env.REACT_APP_SERVER_URL}api/products/add` ,{
        method :"POST" ,
        headers : {
            "Content-Type" :"application/json" 
        } ,

        body : JSON.stringify({
            title : title ,
            price : price ,
            image : image ,
            quantity : quantity,
            token : token
        })
    });

    responseData = await response.json();

    if(response.status===201)
    {
       return fulfillWithValue(responseData.message);
    }
       
    throw new Error("");
}
    catch(err)
    {
       return (responseData.message);
    }

});


export const removeFromCart = createAsyncThunk("product/remove" , async({productId , token} , {fulfillWithValue })=>{
     
    console.log(token);
    console.log(productId);
   let responseData;
   try
   {
    const response = await fetch(`${process.env.REACT_APP_SERVER_URL}api/products/remove` , {
        method :"DELETE" ,

        headers : {

            "Authorization" : `bearer---${token}` ,
            "xproductid" : productId
        } 
    });

     responseData = await response.json();

     if(response.status===201)
     {
        return fulfillWithValue(responseData.message);
     }
          
     throw new Error("");
   }

   catch(err)
   {
    return (responseData.message);
   }



})

export default cartSlice.reducer;