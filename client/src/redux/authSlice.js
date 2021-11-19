import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AuthAPI from "../api/AuthAPI";

export const login = createAsyncThunk(
    'auth/login',
    async (userCredentials) => {
        return await AuthAPI.login(userCredentials);
    }
);

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: null,
        refreshToken: null,
        username: null,
        userId: null,
        profilePicture: null,
        followers: [],
        followings: [],
        loading: false,
        error: null
    },
    reducers: {
        logout: (state) => {
            state = {};
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                const { payload } = action;
                if (payload.success) {
                    const auth = payload.data;
                    state.token = auth.accessToken;
                    state.refreshToken = auth.refreshToken;
                    state.username = auth.username;
                    state.userId = auth.userId;
                }
                state.loading = false;
            })
    }
})

export const selectAuth = (state) => {
    return {
        token: state.auth.token,
        refreshToken: state.auth.refreshToken,
    }
};
export const selectUser = (state) => {
    return {
        username: state.auth.username,
        _id: state.auth.userId,
        profilePicture: state.auth.profilePicture,
        followings: state.auth.followings,
        followers: state.auth.followers
    }
};
export const { logout } = authSlice.actions;
export default authSlice.reducer;
