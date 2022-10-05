import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from './COMPONENTS/Card';
import { AllStatuses, fetchPrdoucts } from './STORE/ProductSlice';

function Products(props) {

    const dispatch = useDispatch();
    const {data , Status} = useSelector((store)=>store.products);

    useEffect(()=>
    {
             
     dispatch(fetchPrdoucts()) ;

    } , []);

    if(Status===AllStatuses.LOADING)
    {
        return (
            <h2>LOADING.......</h2>
        )
    }

    return (
        <div className='productsWrapper'> 
        { Status!==AllStatuses.ERROR ?
             <>
             {data.map((item)=> <Card key={item.id} id={item.id} title={item.title} price={item.price} description={item.description}
             category={item.category} image={item.image} />)} </> :  <h2 style={{textAlign :"center"}}>ERROR FETCHING DATA</h2>
        }
        </div>
    );
}

export default Products;