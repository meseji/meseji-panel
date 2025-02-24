import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './features/api/apiSlice';
import { authSlice } from './features/slice/authSlice';
import {dndSlice} from './features/slice/dndSlice';
export const makeStore = () => {
  return configureStore({
    reducer: {
      auth:authSlice.reducer,
      dnd: dndSlice.reducer,
      [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(apiSlice.middleware),
  });
}