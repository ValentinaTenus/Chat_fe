import React, { useCallback, useEffect, useState } from "react";
import { CredentialResponse } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

import { AppRoute } from "~/common/enums/app-routes.enum.ts";
import { useAddUserGoogleMutation } from "~/redux/auth/auth-api.ts";
import { setTokens, setUser } from "~/redux/auth/auth-slice.ts";
import { useAppDispatch } from "~/redux/hooks.ts";

type GoogleLoginResult = {
	serverError: string;
	setServerError: React.Dispatch<React.SetStateAction<string>>;
  handleGoogleLoginSuccess: (credentialResponse: CredentialResponse) => void;
};

const useGoogleLogin = (): GoogleLoginResult => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const [serverError, setServerError] = useState("");

  const [
		addUser,
		{
			data,
			error,
			isError,
			isSuccess,
		},
	] = useAddUserGoogleMutation();

  useEffect(() => {
		if (isSuccess) {
			dispatch(setUser(data.user));
			dispatch(setTokens(data.tokens));
			navigate(AppRoute.ROOT)
		}
		if (isError) {
			const loadError = (error as FetchBaseQueryError).data
				? ((error as FetchBaseQueryError).data as Error)
				: { message: "Unknown error"};
			setServerError(loadError.message);
		}
	}, [
		data,
		error,
		isError,
		isSuccess,
		dispatch,
		navigate,
		setServerError,
	]);

	const handleGoogleLoginSuccess = useCallback(
		async (credentialResponse: CredentialResponse) => {
			try {
				await addUser(credentialResponse);
			} catch (error) {
				const loadError = (error as FetchBaseQueryError).data
					? ((error as FetchBaseQueryError).data as Error)
          : { message: "Unknown error"};
				setServerError(loadError.message);
			}
		},
		[addUser, setServerError],
	);

	return {
		serverError,
		setServerError,
    handleGoogleLoginSuccess
	};
};

export { useGoogleLogin };
