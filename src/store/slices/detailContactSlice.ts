import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { DetailContactType } from "../../types";


export const getContactDetail = createAsyncThunk('getContactDetail', async (id: string) => {
  return await axios.get(`https://contact.herokuapp.com/contact/${ id }`).then((res) => res.data);
});

const initialState: DetailContactType = {
  data: {
    age: '',
    firstName: '',
    id: '',
    lastName: '',
    photo: '',
  },
  loading: false,
  error: ''
};

export const DetailContactSlice = createSlice({
  name: 'detail contact',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getContactDetail.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getContactDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.data = {...action.payload.data};
      state.error = '';
    });
    builder.addCase(getContactDetail.rejected, (state, action) => {
      state.loading = false,
        state.data = {
          age: '',
          firstName: '',
          id: '',
          lastName: '',
          photo: ''
        },
        state.error = action.error.message;
    });
  }
});


export default DetailContactSlice.reducer;