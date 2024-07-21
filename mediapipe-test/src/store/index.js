import { combineReducers, configureStore } from '@reduxjs/toolkit';
import squtReducer from './slices/squtSlice';

const rootReducer = combineReducers({
  squt: squtReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export default store;
