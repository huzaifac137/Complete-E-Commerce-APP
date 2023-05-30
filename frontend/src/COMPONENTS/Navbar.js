import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { logoutUser } from "../STORE/UserSlice";

function Navbar(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector((store) => store.cart.cartArray);
  const { isLoggedIn, token } = useSelector((store) => store.user);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    dispatch(logoutUser());
    navigate("/");
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-evenly",
      }}
    >
      <span className="logo" style={{ fontWeight: "normal" }}>
        E-Store
      </span>

      {!(isLoggedIn && token) && (
        <div className="navlinks">
          <NavLink to="/login"> LOGIN </NavLink>
          <NavLink to="/signup"> SIGNUP </NavLink>
        </div>
      )}

      <div className="navlinks">
        {isLoggedIn && token && <NavLink to="/user"> USER PROFILE </NavLink>}
      </div>

      <div className="navlinks">
        <NavLink to="/" end>
          {" "}
          HOME{" "}
        </NavLink>

        {isLoggedIn && token && (
          <>
            {" "}
            <NavLink to="/cart"> CART </NavLink>
            <span className="cartCount">
              {" "}
              CART ITEMS : {cartItems && cartItems.length}{" "}
            </span>{" "}
          </>
        )}
      </div>

      {isLoggedIn === true && token && (
        <button className="btn-danger" onClick={handleLogout}>
          {" "}
          LOGOUT{" "}
        </button>
      )}
    </div>
  );
}

export default Navbar;
