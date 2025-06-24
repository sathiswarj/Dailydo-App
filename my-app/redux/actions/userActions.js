import {createAsyncThunk} from '@reduxjs/toolkit';
import ApiGetRequest from '@/data/services/ApiGetRequest';

export const fetchUserData = createAsyncThunk(
  'user/fetchUserData',
    async (phoneNo, { rejectWithValue }) => {
        try {
        const response = await ApiGetRequest(`/user/${phoneNo}`);
        return response.data;
        } catch (error) {
        return rejectWithValue(error.response.data);
        }
    }
);