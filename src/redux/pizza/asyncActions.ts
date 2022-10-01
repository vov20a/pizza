import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Pizza, SearchPizzaParams } from "./types";

export const fetchPizzas = createAsyncThunk<Pizza[], SearchPizzaParams>(
    'pizza/fetchPizzasStatus',
    async (params) => {
        const { sortBy, order, category, search, currentPage } = params;
        // console.log('Category', categoryId)
        const { data } = await axios.get<Pizza[]>(
            `${process.env.MONGODB_URI}?page=${currentPage}&limit=3&${category}&sortBy=${sortBy}&order=${order}${search}`,
        );
        return data;
    },
);