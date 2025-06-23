import { createSlice } from '@reduxjs/toolkit'
import getData from '../actions/getUserDetailsaction'

const userSlice = createSlice({
    name: 'userDetails',
    initialState: {
        userDetails: {},
        loading: false,
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(getData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getData.fulfilled, (state, action) => {
                state.loading = false;
                state.userDetails = action.payload;
            })
            .addCase(getData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
})

export default userSlice.reducer;