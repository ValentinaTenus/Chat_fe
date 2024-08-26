import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";

import { useAppSelector } from "./redux/hooks";
import { type RootState } from "./redux/store";

import { useGetUser } from "./redux/auth/hooks/index";

const App: React.FC = () => {
	const { refetch } = useGetUser();
	const user = useAppSelector((state: RootState) => state.auth.user);

	useEffect(() => {
		if (!user) {
			refetch();
		}
	}, [user, refetch]);

	return (
		<>
			<Outlet />
		</>
	);
};

export { App };
