import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../config/axios';
import { message } from 'antd';

// Async thunk to book a product
export const bookProduct = createAsyncThunk(
  'bookings/bookProduct',
  async (reqObj, { rejectWithValue }) => {
      try {
          const response = await axios.post('/api/createBooking', reqObj, {headers: {'Authorization': localStorage.getItem('token') }});
          // console.log(response);
          
          return response.data; // Return the response if needed
      } catch (error) {
          message.error('Something went wrong, please try later');
          return rejectWithValue(error.response.data);
      }
  }
);


// Async thunk to get all bookings
export const getAllBookings = createAsyncThunk(
  'bookings/getAllBookings',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/api/showBooking', {
        headers: { 'Authorization': localStorage.getItem('token') },
      });
      console.log('API Response:', response.data);
      return Array.isArray(response.data) ? response.data : response.data.bookings;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
