import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "./COMPONENTS/Card";
import { AllStatuses, fetchPrdoucts } from "./STORE/ProductSlice";

function Products(props) {
  const dispatch = useDispatch();
  const { data, Status } = useSelector((store) => store.products);

  useEffect(() => {
    dispatch(fetchPrdoucts());
  }, []);

  if (Status === AllStatuses.LOADING) {
    return <p>LOADING.......</p>;
  }

  return (
    <div className="productsWrapper">
      {Status !== AllStatuses.ERROR ? (
        <>
          {data.length !== 0 ? (
            data.map((item) => (
              <Card
                key={item.id}
                id={item.id}
                title={item.title}
                price={item.price}
                description={item.description}
                category={"empty"}
                image={item.image}
              />
            ))
          ) : (
            <p style={{ marginLeft: "530px" }}>No Items uploaded by admin!</p>
          )}{" "}
        </>
      ) : (
        <p style={{ textAlign: "center" }}>ERROR FETCHING DATA</p>
      )}
    </div>
  );
}

export default Products;
