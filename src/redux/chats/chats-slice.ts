import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { type Chat } from "~/common/types";

type ChatsState = {
	chats: Chat[] | null;
};

const initialState: ChatsState = {
	chats: [],
};

const chatsSlice = createSlice({
	initialState,
	name: "chats",
	reducers: {
		setChats: (state, action: PayloadAction<Chat[]>) => {
			state.chats = action.payload;
		},
	},
});

export const { setChats } = chatsSlice.actions;
export const chatsReducer = chatsSlice.reducer;
