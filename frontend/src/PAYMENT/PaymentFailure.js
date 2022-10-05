import React from 'react';
import { useLocation } from 'react-router-dom';

function PaymentFailure(props) {


    return (

        <div style={{display:"flex" , flexDirection:"column", alignItems:"center" , justifyContent:"center" , marginTop:"100px"}}>
            <h2 style={{color:"green" }}>PAYMENT FAILED </h2> 
            <h3> UNFORTUNATELY THIS PAGE IS NOT FOUND </h3>
        </div>
    );
}

export default PaymentFailure;