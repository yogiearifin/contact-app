import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ContactType, PostPutBodyType } from "../../types";

export const getAllContact = createAsyncThunk('getAllContact', () => {
  return axios.get('https://contact.herokuapp.com/contact').then((res) => res.data);
});

export const deleteContact = createAsyncThunk('deleteContact', (id: string) => {
  return axios.delete(`https://contact.herokuapp.com/contact/${ id }`).then((res) => res.data);
});

export const postContact = createAsyncThunk('postContact', (body: PostPutBodyType) => {
  return axios.post('https://contact.herokuapp.com/contact', {
    ...body
  }).then((res) => res.data);
});

export const putContact = createAsyncThunk('putContact', ({ id, body }: { id: string, body: PostPutBodyType; }) => {
  return axios.put(`https://contact.herokuapp.com/contact/${ id }`, {
    ...body
  }).then((res) => res.data);
});

const initialState: ContactType = {
  data: [],
  loading: false,
  error: '',
  message: ''
};

export const ContactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
    clearError(state) {
      state.error = ''
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getAllContact.pending, (state) => {
      state.loading = true;
      state.message = '';
    });
    builder.addCase(getAllContact.fulfilled, (state, action) => {
      state.loading = false;
      state.data = [...action.payload.data];
      state.error = '';
    });
    builder.addCase(getAllContact.rejected, (state, action) => {
      state.loading = false,
        state.data = [],
        state.error = action.error.message;
      state.message = '';

    });
    builder.addCase(deleteContact.pending, (state) => {
      state.message = '';
    });
    builder.addCase(deleteContact.fulfilled, (state) => {
      state.loading = false;
      state.message = 'Contact Successfully Deleted';
      state.error = '';
    });
    builder.addCase(deleteContact.rejected, (state, action) => {
      state.loading = false,
        state.error = action.error.message;
      state.message = '';

    });
    builder.addCase(putContact.pending, (state) => {
      state.loading = true;
      state.message = '';
    });
    builder.addCase(putContact.fulfilled, (state) => {
      state.loading = false;
      state.message = 'Contact Successfully Updated';
      state.error = '';
    });
    builder.addCase(putContact.rejected, (state, action) => {
      state.loading = false,
        state.error = action.error.message;
      state.message = '';

    });
    builder.addCase(postContact.pending, (state) => {
      state.loading = true;
      state.message = '';
    });
    builder.addCase(postContact.fulfilled, (state) => {
      state.loading = false;
      state.message = 'Contact Successfully Created';
      state.error = '';
    });
    builder.addCase(postContact.rejected, (state, action) => {
      state.loading = false,
        state.error = action.error.message;
      state.message = '';
    });
  }
});

export const {clearError} = ContactSlice.actions
export default ContactSlice.reducer;