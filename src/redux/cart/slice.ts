import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { calkTotalPrice } from '../../utils/calkTotalPrice';
import { getCartFromLS } from '../../utils/getCartFromLS';
import { CartItem, CartSliceState } from './types';




const { items, totalPrice } = getCartFromLS()

const initialState: CartSliceState = {
  totalPrice,
  items,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state: CartSliceState, action: PayloadAction<CartItem>) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);
      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({ ...action.payload, count: 1 });
      }
      // state.totalPrice = state.items.reduce((sum, obj) => {
      //   return obj.price * obj.count + sum;
      // }, 0);
      state.totalPrice = calkTotalPrice(state.items);
    },

    minusItem(state: CartSliceState, action: PayloadAction<string>) {
      const findItem = state.items.find((obj) => obj.id === action.payload);
      if (findItem) {
        findItem.count--;
      }
      state.totalPrice = calkTotalPrice(state.items);
    },
    removeItem(state: CartSliceState, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
      state.totalPrice = calkTotalPrice(state.items);
    },
    clearItems(state: CartSliceState) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});


export const { addItem, removeItem, minusItem, clearItems } = cartSlice.actions;
export default cartSlice.reducer;
