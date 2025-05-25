import React, { ReactElement, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { Topic } from '../../types/Topic';
import { useMutation, useQuery } from 'react-query';
import { ThemesService } from '../Themes/themes.service';
import { EstimatesService } from './estimates.service';
import { ValuesService } from '../values.service';
import { AuthContext } from '../Auth/Auth';
import { UsersService } from '../users.service';

export const EstimateContext = React.createContext<any>({});

type EstimateValue = {
	id: string;
	value: number;
};

const EstimateProvider = (props: { children: ReactElement }) => {
	const { id } = useParams();
	const { user } = useContext(AuthContext);

	const { mutateAsync: createEstimate } = useMutation(
		'create estimate',
		(data: any) => EstimatesService.create(data),
		{
			onSuccess: async () => {},
			onError: (error: any) => {
				console.error(error.message);
			},
		}
	);

	const { mutateAsync: updateUser } = useMutation(
		'update user',
		([id, data]: [string, any]) => UsersService.update(id, data),
		{
			onSuccess: async () => {},
			onError: (error: any) => {
				console.error(error.message);
			},
		}
	);

	const { mutateAsync: getUser } = useMutation(
		'get user',
		(id: string) => UsersService.getOne(id),
		{
			onSuccess: async () => {},
			onError: (error: any) => {
				console.error(error.message);
			},
		}
	);

	const { mutateAsync: createValue } = useMutation(
		'create value',
		(data: any) => ValuesService.create(data),
		{
			onSuccess: async () => {},
			onError: (error: any) => {
				console.error(error.message);
			},
		}
	);

	const { data: theme } = useQuery(
		['theme list', id],
		() => ThemesService.getOne(String(id)),
		{
			select: ({ data }): any => data,
			enabled: !!id,
		}
	);

	const [index, setIndex] = useState(0);

	const next = () => {
		const idx = index + 1;
		if (idx < theme?.expand.topics?.length) setIndex(idx);
	};

	const prev = () => {
		const idx = index - 1;
		if (idx >= 0) setIndex(idx);
	};

	const [topicValues, setTopicValues] = useLocalStorage(
		'topic-' + id,
		Array(10).fill(0)
	);

	const setEstimateValue = (value: number) => {
		const tmp = [...topicValues];
		tmp[index] = value;
		setTopicValues([...tmp]);
	};

	const submitEstimate = async (expertId: string) => {
		let valuesPromises: Promise<any>[] = theme?.expand.topics.map(
			async (topic: any, index: number) => {
				return await createValue({
					user: String(user.id),
					topic: topic.id,
					value: topicValues[index],
				});
			}
		);
		const responses = await Promise.all(valuesPromises);

		const response = await createEstimate({
			user: String(user.id),
			theme: theme.id,
			delta: topicValues.reduce((a: number, b: number): number => a + b, 0),
			confirmed: false,
			values: responses.map(res => res.data.id),
			expert: expertId,
		});

		localStorage.removeItem('topic-' + id);
		return response.data.id;
	};

	return (
		<EstimateContext.Provider
			value={{
				// currentTopicValue: topicValues[index],
				submitEstimate,
				setEstimateValue,
				setCurrentIndex: setIndex,
				currentTopic: theme?.expand?.topics[index],
				currentIndex: index,

				currentTopicValue: topicValues[index],
				theme,
				next,
				prev,
			}}
		>
			{props.children}
		</EstimateContext.Provider>
	);
};

export default EstimateProvider;
