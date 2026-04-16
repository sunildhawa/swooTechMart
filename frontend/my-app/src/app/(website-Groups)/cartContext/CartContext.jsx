import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { axiosAPIinstance } from '@/utils/apiHealpers';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [totalPrice, setTotalPrice] = useState(0);

  const updateCartHeader = async () => {
    try {
      const res = await axiosAPIinstance.get(`/cart`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      const total = res.data.data.reduce((acc, item) => acc + (item.productId.final_price * item.qty), 0);
      setTotalPrice(total);
    } catch (err) { console.log(err); }
  };

  return (
    <CartContext.Provider value={{ totalPrice, updateCartHeader }}>
      {children}
    </CartContext.Provider>
  );
};