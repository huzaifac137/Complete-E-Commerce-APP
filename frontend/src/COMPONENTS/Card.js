import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../STORE/CartSlice";
import { useNavigate } from "react-router-dom";

function Card({ id, title, price,description, image }) {
  const { userId, token } = useSelector((store) => store.user);

  const [Amount, setAmount] = useState(1);
   
  const navigate =useNavigate();

  const handleGoToDetails=(productId , title , price ,description , image)=>{
    console.log(productId);
   navigate(`product/${productId}` , {state:{title : title , price: price , description : description, image : image}});
  }

  return (
    <div className="card">
      <img src={`${process.env.REACT_APP_SERVER_URL}${image}`} alt="" />
      <h4>{title}</h4>
      <h5 style={{ color: "green" }}>${price}</h5>

      <div
        style={{
          display: "flex",
          fontSize: "20px",
          alignItems: "center",
          justifyContent: "space-evenly",
          width: "100px",
          margin: "10px",
        }}
      >
    
      </div>
      <button className="btn" onClick={()=>handleGoToDetails(id,title , price , description, image)}>
        View Details
      </button>
    </div>
  );
}

export default Card;
