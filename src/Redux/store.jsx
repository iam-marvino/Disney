import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import userSlice from './userSlice';
import movieSlice from './movie/movieData';
import thunk from 'redux-thunk';

const store = configureStore({
  reducer: {
    user: userSlice,
    movies: movieSlice,
  },
  middleware: [...getDefaultMiddleware(), thunk],
});

export default store;
