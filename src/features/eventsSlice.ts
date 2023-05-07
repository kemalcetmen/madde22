import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { Event } from "@/types/event"

export const fetchEvents = createAsyncThunk("fetchUser", async () => {
    const { data } = await axios.get(`./events.json`);
    return data
})

interface EventsState {
    events: Event[],
    uniqueLocations: string[];
    uniqueTypes: string[];
    loading: boolean,
    error: string,
}

const initialState: EventsState = {
    events: [],
    uniqueLocations: [],
    uniqueTypes: [],
    loading: false,
    error: "",
}

const productsSlice = createSlice({
    name: "events",
    initialState,
    reducers: {
        changeLiked: (state, action: PayloadAction<string>) => {
            const index = state.events?.findIndex((product: Event) => product.id === action.payload)
            state.events[index] = { ...state.events[index], inCalendar: !state.events[index].inCalendar }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchEvents.pending, (state) => {
            state.loading = true;
            state.error = "";
        })
        builder.addCase(fetchEvents.fulfilled, (state, action) => {
            state.loading = false;
            state.error = "";
            const data = action.payload.data
            state.events = data

            state.uniqueLocations = data
                .map((event: Event) => event.location)
                .filter((location: string, index: number, self: any) => {
                    return self.indexOf(location) === index;
                });

            state.uniqueTypes = data
                .map((event: Event) => event.type)
                .filter((type: string, index: number, self: any) => {
                    return self.indexOf(type) === index;
                });
            })
        builder.addCase(fetchEvents.rejected, (state) => {
            state.loading = false;
            state.error = "Error fetching user data";
        })
    },
})

export default productsSlice.reducer

export const { changeLiked } = productsSlice.actions