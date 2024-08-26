import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { type AuthTokenResponse,  type User } from "~/common/types/index";

type AuthState = {
	accessToken: null | string;
	refreshToken: null | string;
	user: User | null;
};

const initialState: AuthState = {
	accessToken: null,
	refreshToken: null,
	user: null,
};

const authSlice = createSlice({
	initialState,
	name: "auth",
	reducers: {
		logout: (state) => {
			state.user = null;
			state.accessToken = null;
			state.refreshToken = null;
		},
		setTokens: (state, action: PayloadAction<AuthTokenResponse>) => {
			state.accessToken = action.payload.accessToken;
			state.refreshToken = action.payload.refreshToken;
		},
		setUser: (state, action: PayloadAction<User>) => {
			state.user = action.payload;
		},
	},
});

export const { logout, setTokens, setUser } = authSlice.actions;
export const authReducer = authSlice.reducer;
