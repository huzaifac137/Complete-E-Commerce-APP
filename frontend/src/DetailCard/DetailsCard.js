import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./DetailsCard.css";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, resetStatus } from "../STORE/CartSlice";
import { AllStatuses } from "../STORE/ProductSlice";

function DetailsCard() {

  const {  token } = useSelector((store) => store.user);
  const { Status, response } = useSelector((store) => store.cart);
  const [Amount, setAmount] = useState(1);

  const dispatch = useDispatch();

useEffect(()=>{
    
    resetStatus();
    return ()=> {
        dispatch(resetStatus());
    }
},[]);

  const location = useLocation();
  const { title, price, description, image } = location.state;


  const handleAddToCart = () => {
    dispatch(
      addToCart({
        title: title,
        price: price,
        image: image,
        quantity: Amount,
        token: token,
      }),
    );
  };

  const increaseAmountHandler = () => {
    setAmount((prev) => prev + 1);
  };

  const decreaseAmountHandler = () => {
    if (Amount > 1) {
      setAmount((prev) => prev - 1);
    }
  };
  return (
    <div className="cardDetails">
      <img
        src={`${process.env.REACT_APP_SERVER_URL}${image}`}
        alt={`${title}`}
      />
      <div className="cardDetails-text">
        <h3>{title}</h3>
        <h4 style={{ color: "green" }}>${price}</h4>
        <p>{description}</p>

        <div className="quantity">
        <div style={{ cursor: "pointer" }} onClick={increaseAmountHandler}>
          +
        </div>
        <div style={{ color: "red" }}> {Amount} </div>
        <div style={{ cursor: "pointer" }} onClick={decreaseAmountHandler}>
          -
        </div>
        </div>
          <button className="btn" onClick={handleAddToCart}>Add to Cart</button>

          {Status===AllStatuses.LOADING ? <p style={{marginTop:"30px"}}>Adding....</p> : response!=="null" ?<p style={{marginTop:"30px"}}>{response}</p> : null}
      </div>
      
    </div>
  );
}

export default DetailsCard;
