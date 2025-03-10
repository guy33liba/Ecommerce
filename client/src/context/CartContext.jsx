import React, { Children, createContext, useContext, useReducer } from "react";
const CartContext = createContext();
const initialState = {
 items: [],
};
const cartReducer = (state, action) => {
 switch (action.type) {
  case "ADD_TO_CART":
   return {
    ...state,
    items: [...state.items, action.payload],
   };
  case "REMOVE_FROM_CART":
   return {
    ...state,
    items: state.items.filter((item) => item.id !== action.payload),
   };
  case "CLEAR_CART":
   return { ...state, items: [] };
  default:
   return state;
 }
};
export const CartProvider = ({ children }) => {
 const [state, dispatch] = useReducer(cartReducer, initialState);
 return <CartContext.Provider value={{ state, dispatch }}>{children}</CartContext.Provider>;
};
export const useCart = () => useContext(CartContext);
