import { configureStore } from '@reduxjs/toolkit';
import userReducer from '@/redux/slice/userSlice';
// This is the Redux store configuration file.
// It sets up the store with the necessary reducers and middleware.

export const store = configureStore({
  reducer: {
    user: userReducer, // Add your user slice reducer here
  },
  devTools: true
});


export type RootState = ReturnType<typeof store.getState>; 
export type AppDispatch = typeof store.dispatch;

// The store is now configured with Redux Toolkit.
// You can add slices to the reducer object as needed.
// For example, if you have a user slice, you can import it and add it like this:
// import userReducer from './slices/userSlice';
// export const store = configureStore({
//   reducer: {
//     user: userReducer,
//   }
// });
// This store can be used in your React application with the Provider component from react-redux.
