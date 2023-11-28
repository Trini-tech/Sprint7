import { createSlice } from '@reduxjs/toolkit';
import { Starship } from '../interfaces/interfaces';

const initialState: Starship = {
  name: ' ',
  model: ' ',
  cost: ' ',
  speed: ' ',
  manufacturer: ' ',
  length: ' ',
  crew: ' ',
};

export const starshipSlice = createSlice({
  name: 'starship',
  initialState,
  reducers: {
    addStarship: (state, action) => {
      const { name, model, cost, speed, manufacturer, length, crew } = action.payload;
      state = { name, model, cost, speed, manufacturer, length, crew };
    },
  },
});

export const { addStarship } = starshipSlice.actions;
export default starshipSlice.reducer;
