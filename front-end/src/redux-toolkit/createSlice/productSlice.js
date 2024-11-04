import { createSlice } from '@reduxjs/toolkit';
import { getAllProducts,getProductById } from '../createAsyncThunk/productThunk';  // Import thunks


const productsSlice = createSlice({
  name: 'products',
  initialState: { 
    products: [], 
    currentProduct: null,
    status: 'idle', 
    error: null 
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(getAllProducts.fulfilled, (state, action) => {
      state.products = action.payload;
    })
      .addCase(getProductById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getProductById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentProduct = action.payload;
      })
      .addCase(getProductById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  }
});

export default productsSlice.reducer;