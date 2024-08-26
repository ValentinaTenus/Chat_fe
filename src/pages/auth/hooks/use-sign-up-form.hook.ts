import React, { useEffect, useState } from "react";
import { Control, FieldError, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

import { AppRoute } from "~/common/enums/app-routes.enum.ts";
import { type UserSignUpRequestDto } from "~/common/types/index.ts";
import { useRegisterMutation } from "~/redux/auth/auth-api.ts";
import { setTokens, setUser } from "~/redux/auth/auth-slice.ts";
import { useAppDispatch } from "~/redux/hooks.ts";

import { userSignUpValidation } from "../validation/sign-up-schema.ts";

type SignUpFormResult = {
	control: Control<UserSignUpRequestDto>;
	errors: {
		email?: FieldError;
		firstName?: FieldError;
		lastName?: FieldError;
		password?: FieldError;
	};
	handleFormSubmit: (event: React.FormEvent) => void;
	isLoading: boolean;
	serverError: string;
	setServerError: React.Dispatch<React.SetStateAction<string>>;
};

const useSignUpForm = (): SignUpFormResult => {
	const navigate = useNavigate();

	const [serverError, setServerError] = useState("");
	const [register, { data, error, isLoading, isSuccess }] =
		useRegisterMutation();

	const {
		control,
		formState: { errors },
		handleSubmit,
		reset,
	} = useForm<UserSignUpRequestDto>({
		defaultValues: {
			email: "",
			firstName: "",
			lastName: "",
			password: "",
		},
		resolver: yupResolver(userSignUpValidation),
	});
	const dispatch = useAppDispatch();
	const onSubmit = (
		formData: UserSignUpRequestDto,
	): void => {
		register(formData);
	};

	const handleFormSubmit = (event: React.FormEvent): void => {
		event.preventDefault();
		handleSubmit((data: UserSignUpRequestDto) => {
			onSubmit(data);
		})();
	};

	useEffect(() => {
		if (data) {
			dispatch(setUser(data.user));
			dispatch(setTokens(data.tokens));
		}
	}, [data, dispatch]);

	useEffect(() => {
		if (isSuccess) {
			reset();
			navigate(AppRoute.ROOT);
		} else if (error) {
			const err = (error as FetchBaseQueryError).data as Error;
			console.log(err.message, 'err')
			setServerError(err.message);
		}
	}, [isSuccess, navigate, error, reset]);

	return {
		control,
		errors,
		handleFormSubmit,
		isLoading,
		serverError,
		setServerError,
	};
};

export { useSignUpForm };
