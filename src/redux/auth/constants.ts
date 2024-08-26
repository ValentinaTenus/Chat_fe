const authApiPath = {
	GOOGLE: "/oauth/google",
	TOKENS: "/auth/tokens",
	SIGN_IN: "/auth/login",
	SIGN_UP: "/auth/register",
} as const;

const userApiPath = {
	USER: "/users/current",
} as const;

export { authApiPath, userApiPath };
