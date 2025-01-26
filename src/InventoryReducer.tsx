import { createSlice } from "@reduxjs/toolkit";
import { inventoryData } from "./data";


const inventorySlice=createSlice({
    name:"inventory",
    initialState: inventoryData ,
    reducers:{
        addItem: (state, action) => {
            // console.log(action);
            state.push(action.payload);   
        },
        editItem: (state, action) => {
            // console.log(action);
            const {id, formData} = action.payload;
            const updateItem = state.find(item => item.id === id);
            if(updateItem){
                updateItem.name = formData.name;
                updateItem.category = formData.category;
                updateItem.quantity = formData.quantity;
            }
            
        },
        deleteItem: (state, action) => {
            const {id} = action.payload;
            const deleteItem = state.find(item => item.id === id);
            if(deleteItem){
                return state.filter(item => item.id !== id);
            }
        }
    }
})

export const {addItem , editItem , deleteItem} = inventorySlice.actions;
export default inventorySlice.reducer;