import { createSlice } from "@reduxjs/toolkit";

// Define the initial state of the user reducer
const initialState = {
  username: null,
  authToken: null,
  isAuthenticated: false,
};

// Load user details from local storage
const loadUserFromLocalStorage = () => {
  const userData = localStorage.getItem("user");
  if (userData) {
    return JSON.parse(userData);
  }
  return initialState;
};

// Create the user slice using Redux Toolkit's createSlice function
const userSlice = createSlice({
  name: "user",
  initialState: loadUserFromLocalStorage(),
  reducers: {
    // Action to log in a user
    loginUser: (state, action) => {
      const { username, authToken } = action.payload;
      state.username = username;

      state.authToken = authToken;
      state.isAuthenticated = true;

      // Store user details in local storage
      localStorage.setItem("user", JSON.stringify(state));
    },
    // Action to log out a user
    logoutUser: (state) => {
      state.username = null;
      state.authToken = null;
      state.isAuthenticated = false;

      // Clear user details from local storage
      localStorage.removeItem("user");
    },
  },
});

// Export the actions for use in other components
export const { loginUser, logoutUser } = userSlice.actions;

// Export the reducer for integration into the Redux store
export default userSlice.reducer;
