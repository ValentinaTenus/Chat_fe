import {
	BaseQueryFn,
	FetchArgs,
	FetchBaseQueryError,
	createApi,
	fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

import { HttpMethods, HttpStatusCode } from "~/common/enums/index.ts";
import { type AuthTokenResponse } from "~/common/types/index.ts";

import { logout, setTokens } from "./auth/auth-slice.ts";
import { authApiPath } from "./auth/constants.ts";
import { RootState } from "./store.ts";

const baseQuery = fetchBaseQuery({
	baseUrl: `${import.meta.env.VITE_BASE_URL}`,
	mode: "cors",
	prepareHeaders: (headers, { getState }) => {
		const state = getState() as RootState;
		const token = state.auth.accessToken;

		if (token) headers.set("authorization", `Bearer ${token}`);

		return headers;
	},
});

const baseQueryWithReauth: BaseQueryFn<
	FetchArgs | string,
	unknown,
	FetchBaseQueryError
> = async (args, api, extraOptions) => {
	const state = api.getState() as RootState;
	const { refreshToken } = state.auth;

	try {
		let result = await baseQuery(args, api, extraOptions);

		if (
			result.error &&
			result.error.status === HttpStatusCode.UNAUTHORIZED &&
			refreshToken
		) {
			const refreshResult = await baseQuery(
				{
					body: { refreshToken },
					method: HttpMethods.POST,
					url: authApiPath.TOKENS,
				},
				api,
				extraOptions,
			);

			if (refreshResult.data) {
				const data = refreshResult.data as AuthTokenResponse;
				api.dispatch(setTokens(data));
				result = await baseQuery(args, api, extraOptions);
			} else {
				api.dispatch(logout());
			}
		}

		return result;
	} catch (error) {
		return { error: error as FetchBaseQueryError };
	}
};

export const api = createApi({
	baseQuery: baseQueryWithReauth,
	endpoints: () => ({}),
	reducerPath: "api",
	tagTypes: ["User"],
});
