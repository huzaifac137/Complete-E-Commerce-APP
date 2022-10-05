import {configureStore} from "@reduxjs/toolkit";
import cartReducer from "./CartSlice.js";
import productReducer from "./ProductSlice";
import UserReducer from "./UserSlice.js";

const store = configureStore({
    reducer : {
        cart :  cartReducer ,
        products : productReducer,
        user : UserReducer
    }
});

export default store;