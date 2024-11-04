import { createSlice } from '@reduxjs/toolkit';
import { getAllBookings, bookProduct } from '../createAsyncThunk/bookingThunk';

const initialState = {
  bookings: [],
  loading: false,
  error: null,
};

const bookingsSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handling bookProduct thunk
      .addCase(bookProduct.pending, (state) => {
        state.loading = true
      })
      .addCase(bookProduct.fulfilled, (state) => {
        state.loading = false
      })
      .addCase(bookProduct.rejected, (state, action) => {
        state.loading = false; // Reset loading on error
        state.error = action.payload; // Store the error for further handling
      })

      // Handling getAllBookings thunk
      .addCase(getAllBookings.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllBookings.fulfilled, (state, action) => {
        console.log('Bookings in Redux:', action.payload)
        state.bookings = action.payload
        state.loading = false;
      })
      .addCase(getAllBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default bookingsSlice.reducer;
