import React from 'react';
import { useLocation } from 'react-router-dom';


function PaymentMessage(props) {

    const location = useLocation();
    let message , explained;

    if(location.state)
    {
            message  = location.state.message;
            explained = location.state.explained;
    }

    return (

        <div style={{display:"flex" , flexDirection:"column", alignItems:"center" , justifyContent:"center" , marginTop:"100px"}}>
            <h2 style={{color:"green" }}> {message} </h2> 
            <h3>{explained}</h3>
        </div>
    );
}

export default PaymentMessage;