import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: JSON.parse(localStorage.getItem("userInfo")) || null,
    isLoggedIn: !!localStorage.getItem("userInfo"), // Automatically set based on `userInfo`
    error: null,
  },
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.userInfo = action.payload;
      state.error = null;

      // Persist user info to localStorage
      try {
        localStorage.setItem("userInfo", JSON.stringify(action.payload));
      } catch (error) {
        console.error("Failed to save user info:", error);
        state.error = "Unable to save user information.";
      }
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.userInfo = null;
      state.error = null;

      // Clear user info from localStorage
      try {
        localStorage.removeItem("userInfo");
      } catch (error) {
        console.error("Failed to clear user info:", error);
        state.error = "Unable to clear user information.";
      }
    },
    updateUser: (state, action) => {
      state.userInfo = { ...state.userInfo, ...action.payload };

      // Update localStorage with new user info
      try {
        localStorage.setItem("userInfo", JSON.stringify(state.userInfo));
      } catch (error) {
        console.error("Failed to update user info:", error);
        state.error = "Unable to update user information.";
      }
    },
    setError: (state, action) => {
      state.error = action.payload; // Handle and store error messages
    },
  },
});

export const { login, logout, updateUser, setError } = userSlice.actions;
export default userSlice.reducer;
