import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        name: ''
    },
    reducers: {
        update: (state, action) => {
            state.name = action.payload.name;
        }
    }
})

export const { update } = userSlice.actions;
export default userSlice.reducer;
