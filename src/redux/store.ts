import { configureStore } from '@reduxjs/toolkit';
import filterReducer from './filter/slice';
import cartReducer from './cart/slice';
import pizzaReducer from './pizza/slice';
import { useDispatch } from 'react-redux';

export const store = configureStore({
  reducer: { filter: filterReducer, cart: cartReducer, pizza: pizzaReducer },
});
//тип для RootState
export type RootState = ReturnType<typeof store.getState>

//тип для  useDispatch()
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
