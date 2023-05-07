import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import eventsSlice from "../features/eventsSlice";
import filteringSlice from "../features/filteringSlice";

const store = configureStore({
    reducer: {
        events: eventsSlice,
        filters: filteringSlice
    }
})

export default store;

export type RootState = ReturnType<typeof store.getState> 
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = ()=> useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;