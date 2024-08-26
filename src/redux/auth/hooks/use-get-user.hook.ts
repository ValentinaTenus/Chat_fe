import { useEffect } from "react";

import { useAppDispatch } from "../../hooks";
import { useGetUserQuery } from "../auth-api";
import { setUser } from "../auth-slice";

type UseGetUserResult = {
	isError: boolean;
	isLoading: boolean;
	refetch: () => void;
};

const useGetUser = (): UseGetUserResult => {
	const dispatch = useAppDispatch();
	const {
		data: userData,
		isError,
		isLoading,
		refetch,
	} = useGetUserQuery(undefined);

	useEffect(() => {
		if (userData) {
			dispatch(setUser(userData));
		}
	}, [userData, dispatch]);

	return { isError, isLoading, refetch };
};

export { useGetUser };
