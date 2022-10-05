import React from 'react';
import { useSelector } from 'react-redux';

function UserProfile(props) {
      const{username , email} = useSelector((store)=>store.user);
      const{cartArray} = useSelector((store)=>store.cart);
    return (
        <div className='profile'>
            <h2> {username}</h2>
            <h3> {email} </h3> 
             <h4> CURRENT ITEMS IN CART : {cartArray.length} </h4>
        </div>
    );
}

export default UserProfile;