import { RootState } from "../store";

//сокрашяем код в useSelector()
export const selectCart = (state: RootState) => state.cart;
export const selectCartItemById = (id: string) => (state: RootState) => state.cart.items.find((obj) => obj.id === id);