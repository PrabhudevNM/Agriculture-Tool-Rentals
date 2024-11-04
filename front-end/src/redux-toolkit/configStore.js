import { configureStore } from '@reduxjs/toolkit';
import productsSlice from './createSlice/productSlice';  
import bookingsSlice from './createSlice/bookingSlice';

const store = configureStore({
  reducer: {
    products: productsSlice,
    bookings: bookingsSlice,
  },
  //devTools: process.env.NODE_ENV !== 'production', // Enable devTools in development mode
});

export default store;
