import React from "react";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const Statuses = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading",
});

const productSlice = createSlice({
  name: "products",

  initialState: {
    data: [],
    Status: Statuses.IDLE,
  },

  reducers: {
    getProducts: (state, action) => {
      state.data = action.payload;
    },

    setStatus: (state, action) => {
      state.Status = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchPrdoucts.pending, (state, action) => {
        state.Status = Statuses.LOADING;
      })
      .addCase(fetchPrdoucts.fulfilled, (state, action) => {
        state.data = action.payload;
        state.Status = Statuses.IDLE;
      })
      .addCase(fetchPrdoucts.rejected, (state, action) => {
        state.Status = Statuses.ERROR;
      });
  },
});

//export const{getProducts , setStatus} = productSlice.actions;
export const AllStatuses = Statuses;

export const fetchPrdoucts = createAsyncThunk("products/fetch", async () => {
  const response = await fetch(
    `${process.env.REACT_APP_SERVER_URL}api/products/getads`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  const data = await response.json();

  const productss = data.products;

  return productss;
});

export default productSlice.reducer;
