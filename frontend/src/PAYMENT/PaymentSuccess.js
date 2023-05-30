import React from "react";
import { useLocation } from "react-router-dom";

function PaymentSuccess(props) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "100px",
      }}
    >
      <h2 style={{ color: "green" }}> PAYMENT SUCCESSFULLY MADE </h2>
      <h3> YOUR ORDER HAS BEEN PLACED </h3>
    </div>
  );
}

export default PaymentSuccess;
