import { createSlice } from "@reduxjs/toolkit";



let userFromLocalStorage = null;
try {
  userFromLocalStorage = JSON.parse(localStorage.getItem("user"));
} catch (error) {
  console.log(error)
}

let initialState = userFromLocalStorage || {
  name: null,
  email: null,
  photo: null,
};



let userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserLogInDetails(state, action) {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.photo = action.payload.photo;
      try {
        localStorage.setItem("user", state);
      } catch (error) {
        "Failed to save user to local Store", error;
      }
    },
    setSignOutState(state) {
      state.name = null;
      state.email = null;
      state.photo = null;
      try {
        localStorage.clear("user");
      } catch (error) {
        "Failed to clear user from local Store", error;
      }
    },
  },
});

export const { setUserLogInDetails, setSignOutState } = userSlice.actions;

export default userSlice.reducer;
