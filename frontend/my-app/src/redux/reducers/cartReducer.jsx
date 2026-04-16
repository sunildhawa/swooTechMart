import { createSlice } from '@reduxjs/toolkit'

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        data: [],
        original_total: 0,
        final_total: 0
    },
    reducers: {
        addToCart: (current_state, { payload }) => {
            current_state.data.push({ ...payload, qty: 1 });
            current_state.original_total += payload.original_price;
            current_state.final_total += payload.final_price;
            localStorage.setItem("cart", JSON.stringify(current_state));
        },

        changeQuantity: (current_state, { payload }) => {
            const findCartItem = current_state.data.find((item) => item.id == payload.id);

            if (payload.flag == 1) {
                findCartItem.qty++
                current_state.original_total += payload.original_price;
                current_state.final_total += payload.final_price;

            } else {
                findCartItem.qty--
                current_state.original_total -= payload.original_price;
                current_state.final_total -= payload.final_price;

            }
            localStorage.setItem("cart", JSON.stringify(current_state));

        }, removeToCart: (state) => {

        },
        lsToCart: (current_state) => {
            const lsCart = JSON.parse(localStorage.getItem("cart"));
            if (lsCart) {
                current_state.data = lsCart.data;
                current_state.final_total = lsCart.final_total;
                current_state.original_total = lsCart.original_total;

            }
        }

    },
})


export const { addToCart, removeToCart, changeQuantity, lsToCart } = cartSlice.actions

export default cartSlice.reducer