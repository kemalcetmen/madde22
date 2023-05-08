import { createSlice, PayloadAction } from "@reduxjs/toolkit"
// this project

interface FilteringState {
    types: string,
    locations: string[],
    date: number,
    search: string,
}
const initialState: FilteringState = {
    types: "",
    locations: [],
    date: 0,
    search: ""
}

const filteringSlice = createSlice({
    name: "filters",
    initialState,
    reducers: {
        typeFilter: (state, action: PayloadAction<string>) => {
            state.types = action.payload
        },
        locationFilter: (state, action: PayloadAction<string>) => {
            if (state.locations.includes(action.payload)) {
                const index = state.locations.indexOf(action.payload);
                if (index > -1) {
                    state.locations.splice(index, 1);
                }

            } else {
                state.locations = [...state.locations, action.payload]
            }
        },
        dateFilter: (state, action: PayloadAction<number>) => {
            if (state.date === action.payload) {
                state.date = 0
            } else {
                state.date = action.payload
            }
        },
        searchInput: (state, action: PayloadAction<string>) => {
            state.search = action.payload
        },
    },
})

export default filteringSlice.reducer

export const { typeFilter, locationFilter, dateFilter, searchInput } = filteringSlice.actions