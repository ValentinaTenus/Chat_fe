import { CredentialResponse } from "@react-oauth/google";

import { HttpMethods } from "~/common/enums/index.ts";
import {
	type UserAuthResponseDto,
	type User,
	type UserSignInRequestDto,
	type UserSignUpRequestDto,
} from "~/common/types/index.ts"

import { api } from "../services.ts";
import { authApiPath, userApiPath } from "./constants.ts";

export const authApi = api.injectEndpoints({
	endpoints: (build) => ({
		addUserGoogle: build.mutation<UserAuthResponseDto, CredentialResponse>({
			query: (post) => ({
				body: post,
				method: HttpMethods.POST,
				url: authApiPath.GOOGLE,
			}),
		}),
		getUser: build.query<User, undefined>({
			query: () => ({
				method: HttpMethods.GET,
				url: userApiPath.USER,
			}),
		}),
		login: build.mutation<UserAuthResponseDto, UserSignInRequestDto>({
			query: (body) => ({
				body,
				method: HttpMethods.POST,
				url: authApiPath.SIGN_IN,
			}),
		}),
		register: build.mutation<UserAuthResponseDto, UserSignUpRequestDto>({
			query: (body) => ({
				body,
				method: HttpMethods.POST,
				url: authApiPath.SIGN_UP,
			}),
		}),
	}),
});

export const {
	useAddUserGoogleMutation,
	useGetUserQuery,
	useLoginMutation,
	useRegisterMutation,
} = authApi;
