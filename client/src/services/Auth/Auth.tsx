import React, { ReactElement, useEffect } from 'react';

import { useMutation } from 'react-query';
import { AuthService } from './auth.service';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { UsersService } from '../users.service';


export const AuthContext = React.createContext<any>({});

export const AuthProvider = (props: { children: ReactElement }) => {
	const [user, setUser] = useLocalStorage('user', null);

	useEffect(() => {
		refetch();
	}, []);

	const logOut = () => {
		setUser(null);
	};

	const refetch = async () => {
		const { data } = await getUser(String(user?.id));
		setUser(data);
	};

	const { mutateAsync: getUser } = useMutation(
		'get user',
		(id: string) => UsersService.getOne(id),
		{
			onSuccess: data => {
				setUser(data.data.record);
			},
			onError: (error: any) => {
				console.error(error.message);
			},
		}
	);

	const { mutateAsync: login } = useMutation(
		'login',
		(data: any) => AuthService.login(data),
		{
			onSuccess: async data => {
				setUser(data.data.record);
			},
			onError: (error: any) => {
				console.error(error.message);
			},
		}
	);

	const { mutateAsync: register } = useMutation(
		'register',
		(data: any) => AuthService.register(data),
		{
			onSuccess: async data => {
				setUser(data.data);
			},
			onError: (error: any) => {
				console.error(error.message);
			},
		}
	);

	return (
		<AuthContext.Provider
			value={{
				user,
				login,
				register,
				logOut,
				refetch,
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
};
