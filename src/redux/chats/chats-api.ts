import { HttpMethods } from "~/common/enums/http-methods.enum.ts";
import { type Chat } from "~/common/types/chat/chat.type.ts";
import { Message, type CreateNewChat, type CreateNewMessageRequestDto } from "~/common/types/index";

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
		updateChatMessage: builder.mutation<Message,{id: string, payload: Partial<Message>}>({
			query: ({ id, payload}) => ({
				body: payload,
				method: HttpMethods.PUT,
				url: `${chatMessagesApiPath.ROOT}/${id}`,
			}),
		}),
		updateChat: builder.mutation<Chat,{id: string, data: Partial<CreateNewChat>}>({
			query: ({id, data }) => ({
				body: data,
				method: HttpMethods.PUT,
				url: `${chatsApiPath.ROOT}/${id}`,
			}),
		}),
		deleteChat: builder.mutation<Chat, string>({
			query: (id) => ({
				method: HttpMethods.DELETE,
				url: `${chatsApiPath.ROOT}/${id}`,
			}),
		}),
  })
});

export const { 
	useDeleteChatMutation,
	useGetChatByIdQuery, 
	useGetChatsQuery, 
	useCreateNewChatMutation, 
	useCreateNewChatMessageMutation,
	useUpdateChatMutation,
	useUpdateChatMessageMutation
} = chatsApi;
