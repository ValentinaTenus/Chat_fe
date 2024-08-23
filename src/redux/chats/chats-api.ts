import { HttpMethods } from "../../common/enums/http-methods.enum.ts";
import { type Chat } from "../../common/types/chat.type.ts";
import { Message, type CreateNewChat, type CreateNewMessageRequestDto } from "../../common/types/index";

import { api } from "../services.ts";
import { chatsApiPath, chatMessagesApiPath } from "./constants.ts";

export const chatsApi = api.injectEndpoints({
	endpoints: (builder) => ({
		getChatById: builder.query<Chat, string | undefined>({
			query: (id) => ({
				method: HttpMethods.GET,
				url: chatsApiPath.ROOT + `/${id}`,
			}),
		}),
		getChats: builder.query<Chat[], string | undefined>({
			query: (searchTerm) => ({
				method: HttpMethods.GET,
				url: chatsApiPath.ROOT,
				params: { search: searchTerm },
			}),
		}),
		createNewChat: builder.mutation<Chat, CreateNewChat>({
			query: (body) => ({
				body,
				method: HttpMethods.POST,
				url: chatsApiPath.ROOT,
			}),
		}),
		createNewChatMessage: builder.mutation<Message,CreateNewMessageRequestDto>({
			query: (body) => ({
				body,
				method: HttpMethods.POST,
				url: chatMessagesApiPath.ROOT,
			}),
		}),
  })
});

export const { 
	useGetChatByIdQuery, 
	useGetChatsQuery, 
	useCreateNewChatMutation, 
	useCreateNewChatMessageMutation 
} = chatsApi;
