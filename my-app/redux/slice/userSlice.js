import { createSlice } from "@reduxjs/toolkit";
import { fetchUserData } from "@/redux/actions/userActions";

const initialState = {
  user: null,
    isLoading: false,
    error: null,
    isNew: false, // New property to track if the user is new
};

const userSlice = createSlice({
  name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            state.isNew = false; // Reset isNew when user is set
        },
        clearUser: (state) => {
            state.user = null;
            state.isNew = false; // Reset isNew when user is cleared
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserData.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchUserData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
                state.isNew = action.payload.isNew; // Set isNew based on the fetched user data
            })
            .addCase(fetchUserData.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || "Failed to fetch user data";
            });
    }

});
export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
// This slice manages user data, including whether the user is new or existing.
// It includes actions to set and clear user data, as well as handling asynchronous fetching of user
