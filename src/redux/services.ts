import {
	createApi,
	fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
	baseUrl: `${import.meta.env.VITE_BASE_URL}`,
	mode: "cors",
	prepareHeaders: (headers) => {
		return headers;
	},
});


export const api = createApi({
	baseQuery: baseQuery,
	endpoints: () => ({}),
	reducerPath: "api",
});
