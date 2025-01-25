import { configureStore } from "@reduxjs/toolkit";
import inventoryReducer from "./InventoryReducer";

export const store = configureStore({
    reducer: {
      inventory: inventoryReducer
    },
  })
