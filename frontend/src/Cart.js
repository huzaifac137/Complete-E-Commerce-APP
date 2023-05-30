import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getCart, removeFromCart, setTotalPayment } from "./STORE/CartSlice";

function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    cartArray,
    Status2,
    responseMessage2,
    Status3,
    responseMessage3,
    totalPayment,
  } = useSelector((store) => store.cart);
  const { token } = useSelector((store) => store.user);

  if (cartArray.length === 0) {
    return <h2 style={{ textAlign: "center" }}> CART IS EMPTY !!!!!</h2>;
  }

  const totalPaymentCalculation = () => {
    dispatch(setTotalPayment());
  };

  totalPaymentCalculation();

  const handleRemoveFromCart = (productId) => {
    const remove = dispatch(removeFromCart({ productId, token }));
  };

  const navigateToCheckout = () => {
    navigate("/payments");
  };

  return (
    <div className="cartWrapper" style={{ textAlign: "center" }}>
      {(Status2 === "error" || Status2 === "idle") && (
        <h2> {responseMessage2} </h2>
      )}

      {Status3 === "loading" && <h2>REOMOVING FROM CART......</h2>}
      {Status3 === "idle" && <h2>{responseMessage3}</h2>}
      {Status3 === "error" && <h2>{responseMessage3}</h2>}

      {cartArray.map((item) => (
        <div className="cart" key={item.id}>
          <img
            src={`${process.env.REACT_APP_SERVER_URL}${item.image}`}
            alt=""
          />
          <h5>{item.title}</h5>
          <h5 style={{ color: "green" }}> ${item.price}</h5>
          <div
            style={{
              backgroundColor: "grey",
              padding: "2px",
              borderRadius: "5px",
              color: "white",
            }}
          >
            {" "}
            X{item.quantity}
          </div>
          <button className="btn" onClick={() => handleRemoveFromCart(item.id)}>
            REMOVE{" "}
          </button>
        </div>
      ))}

      <h2
        style={{
          color: "green",
          borderBottom: "2px solid grey",
          textAlign: "center",
          width: "50%",
          margin: "10px auto",
        }}
      >
        TOTAL PAYMENT : ${totalPayment.toFixed(2)}{" "}
      </h2>

      <button
        className="btn"
        style={{ margin: "30px" }}
        onClick={navigateToCheckout}
      >
        {" "}
        GO TO PAYMENT{" "}
      </button>
    </div>
  );
}

export default Cart;
