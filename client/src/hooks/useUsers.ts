import {
	addDoc,
	collection,
	getDocs,
	getFirestore,
	query,
	updateDoc,
	where,
} from 'firebase/firestore';
import { useState } from 'react';
import app from '../base';
import { UserInfo } from '../types/UserInfo';

export const useUsers = () => {
	const [isLoading, setIsLoading] = useState(false);

	const db = getFirestore(app);

	const getUserById = async (uid: string) => {
		setIsLoading(true);
		const q = query(collection(db, 'users'), where('userId', '==', uid));
		const user = await getDocs(q);
		setIsLoading(false);
		return user.docs.map(d => d.data())[0] as UserInfo;
	};

	const getUsers = async () => {
		setIsLoading(true);
		const users = await getDocs(collection(db, 'users'));
		const data = users.docs.map(d => d.data()) as UserInfo[];
		setIsLoading(false);
		return data;
	};

	const getExperts = async (theme: string) => {
		const users = await getDocs(collection(db, 'users'));
		const data = users.docs.map(d => d.data()) as UserInfo[];
		const experts = data.filter(d => d.tags.includes(theme));
		return experts;
	};

	const setUser = async (user: UserInfo) => {
		setIsLoading(true);
		const q = query(
			collection(db, 'users'),
			where('userId', '==', user.userId)
		);
		const userRef = await getDocs(q);

		setIsLoading(false);
		await updateDoc(userRef.docs.map(d => d.ref)[0], user);
	};

	const addUser = async (user: UserInfo) => {
		setIsLoading(true);
		await addDoc(collection(db, 'users'), user);
		setIsLoading(false);
	};

	const addEstimateToVerify = async (theme: string, estimate: string) => {
		const users = await getUsers();
		const expert = users.find(user => user.tags.includes(theme));

		const q = query(
			collection(db, 'users'),
			where('userId', '==', expert?.userId)
		);
		const userRef = await getDocs(q);
		const userInfo = userRef.docs.map(d => d.data())[0];
		await updateDoc(userRef.docs.map(d => d.ref)[0], {
			estimates: [...userInfo.estimates, estimate],
		});
	};

	return {
		isLoading,
		getExperts,
		getUserById,
		getUsers,
		setUser,
		addUser,
		addEstimateToVerify,
	};
};
