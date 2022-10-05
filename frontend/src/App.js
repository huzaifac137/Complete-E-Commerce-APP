import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Cart from "./Cart";
import Navbar from "./COMPONENTS/Navbar";
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "./STORE/store";
import Login from "./SIGNUP/LOGIN/Login";
import Signup from "./SIGNUP/LOGIN/Signup";
import { useCallback, useEffect, useRef, useState } from "react";
import { setUser } from "./STORE/UserSlice";
import NoRoutesFound from "./COMPONENTS/NoRoutesFound";
import {getCart , setTotalPayment} from "./STORE/CartSlice";
import StripeCheckoutComponent from "./PAYMENT/StripeCheckout";
import UserProfile from "./UserProfile";
import PaymentSuccess from "./PAYMENT/PaymentSuccess";
import PaymentFailure from "./PAYMENT/PaymentFailure";



function App() {
  const dispatch = useDispatch();

  const { isLoggedIn , token } = useSelector((store) => store.user);
  const{ Status2 ,Status , Status3} = useSelector((store)=>store.cart)


  useEffect(() => {

    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (loggedInUser !== null) 
    {
      dispatch(setUser(loggedInUser));
    }

  }, []);



  useEffect(()=>{
       
      dispatch(getCart());

  },[Status , Status3]); 

  


  return (
    
    <BrowserRouter>
      <Navbar />
      {Status2==="loading" ? <h1 style={{textAlign:"center"}}> LAODING....... </h1> : 
      <Routes>

       <Route path="/" element={ <Home />} /> 
      {(isLoggedIn && token) &&  <Route path="/cart" element={<Cart />} /> }

        {!(isLoggedIn && token) && <Route path="/login" element={<Login />}  />}

        {!(isLoggedIn && token) && <Route path="/signup" element={<Signup />} />}

        {(isLoggedIn && token) && <Route path="/user" element={ <UserProfile/> }/>}

        {(isLoggedIn && token) &&    <Route path="/payments" element={<StripeCheckoutComponent/>} /> }

    { (isLoggedIn && token) &&  <Route path="/payments/success" element={<PaymentSuccess/>} />  }

    {   (isLoggedIn && token) && <Route path="/payments/failure" element={<PaymentFailure/>} /> }

        <Route path="*" element={<NoRoutesFound/>}/>
      </Routes>

  }
    </BrowserRouter>
  );
}

export default App;
