import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../config/axios';
import { message } from 'antd';

export const getAllProducts = createAsyncThunk(
  'products/getAllproducts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/api/users/product', {headers:{'Authorization':localStorage.getItem('token')}});
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getProductById = createAsyncThunk(
  'products/getProductById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/users/product/${id}`, {
        headers: {'Authorization': localStorage.getItem('token')}
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


export const addProducts = createAsyncThunk(
  'products/addProducts',
  async (reqObj, { rejectWithValue }) => {
    try {
      await axios.post('/api/users/product', {headers:{'Authorization':localStorage.getItem('token')}}, reqObj);
      message.success('New Product added successfully');
      setTimeout(() => {
        window.location.href = '/admin';
      }, 500);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Similar thunks for editCar, deleteCar, etc.
