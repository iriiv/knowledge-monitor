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
import { Task, TaskAddModel, TaskEditModel } from '../types/Task';

export const useTasks = () => {
	const [isLoading, setIsLoading] = useState(false);
	const db = getFirestore(app);

	const getThemeTasks = async (themeId: string) => {
		const q = query(collection(db, 'tasks'), where('themeId', '==', themeId));
		const taskRef = await getDocs(q);
		const tasks = taskRef.docs.map(t => t.data()) as Task[];
		return tasks;
	};

	const getTasks = async () => {
		setIsLoading(true);
		const tasksRef = await getDocs(collection(db, 'tasks'));
		const tasks = tasksRef.docs.map(t => t.data()) as Task[];

		setIsLoading(false);
		return tasks;
	};

	const addTask = async (task: TaskAddModel) => {
		setIsLoading(true);
		const taskRef = await addDoc(collection(db, 'tasks'), task);
		await updateDoc(taskRef, {
			id: taskRef.id,
		});
		setIsLoading(false);
	};

	const updateTask = async (task: TaskEditModel) => {
		const q = query(collection(db, 'tasks'), where('id', '==', task.id));
		const taskRef = await getDocs(q);

		await updateDoc(taskRef.docs.map(d => d.ref)[0], task);
	};

	return { isLoading, getTasks, addTask, getThemeTasks, updateTask };
};
