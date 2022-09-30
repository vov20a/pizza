import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { fetchPizzas } from './asyncActions';
import { Pizza, PizzaSliceState, Status } from './types';




const initialState: PizzaSliceState = {
    items: [],
    status: Status.LOADING, //loading|success|error
};

const pizzaSlise = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setItems(state: PizzaSliceState, action: PayloadAction<Pizza[]>) {
            state.items = action.payload;
        },
    },
    //редюсер для получения пицц
    extraReducers: (builder) => {
        builder.addCase(fetchPizzas.pending, (state) => {
            state.status = Status.LOADING;
            state.items = [];
        });
        builder.addCase(fetchPizzas.fulfilled, (state, action) => {
            state.items = action.payload;
            state.status = Status.SUCCESS;
        });
        builder.addCase(fetchPizzas.rejected, (state) => {
            state.status = Status.ERROR;
            state.items = [];
        });
    },
    // extraReducers: {
    //   [fetchPizzas.pending]: (state) => {
    //     state.status = 'loading';
    //     state.items = [];
    //   },
    //   [fetchPizzas.fulfilled]: (state, action) => {
    //     state.items = action.payload;
    //     state.status = 'success';
    //   },
    //   [fetchPizzas.rejected]: (state) => {
    //     state.status = 'error';
    //     state.items = [];
    //   },
    // },
});



export const { setItems } = pizzaSlise.actions;
export default pizzaSlise.reducer;
