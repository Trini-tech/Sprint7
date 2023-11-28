import { configureStore } from '@reduxjs/toolkit';
import starshipReducer from './starshipSlice';

export const store = configureStore({
  reducer: {
    starship: starshipReducer,
  },
});
