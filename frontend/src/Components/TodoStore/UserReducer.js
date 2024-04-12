import { createSlice } from "@reduxjs/toolkit";

// Define the initial state of the user reducer
const initialState = {
  username: null,
  password: null,
  authToken: null,
  isAuthenticated: false,
};

// Create the user slice using Redux Toolkit's createSlice function
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Action to log in a user
    loginUser: (state, action) => {
      const { username, password, authToken } = action.payload;
      state.username = username;
      state.password = password;
      state.authToken = authToken;
      state.isAuthenticated = true;
    },
    // Action to log out a user
    logoutUser: (state) => {
      state.username = null;
      state.password = null;
      state.authToken = null;
      state.isAuthenticated = false;
    },
    
  },
});

// Export the actions for use in other components
export const { loginUser, logoutUser} = userSlice.actions;

// Export the reducer for integration into the Redux store
export default userSlice.reducer;
