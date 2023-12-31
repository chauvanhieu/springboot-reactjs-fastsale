import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    data: [],
  },
  reducers: {
    add: (state, action) => {
      const item = action.payload;
      if (state.data === null) {
        state.data = [
          {
            productId: item.id,
            name: item.name,
            price: item.price,
            count: 1,
            status: 1,
          },
        ];
        return;
      }

      const existingProduct = state.data.find(
        (product) => product.productId === item.id
      );
      if (existingProduct) {
        existingProduct.count += 1;
      } else {
        state.data.push({
          productId: item.id,
          name: item.name,
          price: item.price,
          count: 1,
          status: 1,
        });
      }
    },
    remove: (state, action) => {
      const productIdToRemove = action.payload;
      state.data = state.data.filter(
        (product) => product.productId !== productIdToRemove
      );
    },
    update: (state, action) => {
      const { productId, newCount } = action.payload;
      if (Number(newCount) < 1) {
        state.data.filter((product) => product.productId === productId);
        return;
      }
      const productToUpdate = state.data.find(
        (product) => product.productId === productId
      );
      if (productToUpdate) {
        productToUpdate.count = Number(newCount);
      }
    },

    clear: (state) => {
      state.data = [];
    },
  },
});

export const { add, remove, update, clear } = cartSlice.actions;

export default cartSlice.reducer;
