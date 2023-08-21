import { useContext, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import Table, { TableWithoutTool } from '../components/Table';
import { LoadingPage } from './LoadingPage';

import '@carbon/charts/styles.css';

import { useMutation, useQuery } from 'react-query';
import { EstimatesService } from '../services/estimates.service';
import { GradesService } from '../services/grades.service';
import { groupBy } from 'lodash';
import { ThemesService } from '../services/themes.service';
import { AreaChart, GroupedBarChart } from '@carbon/charts-react';
import { ThemeContext } from '../services/Themes/Theme';
import _ from 'lodash';

const Wrapper = styled.div`
	padding: 4em 0;
	width: 100%;
	display: flex;
	justify-content: space-between;
`;

const Main = styled.div`
	width: 90%;
`;
const RadarWrapper = styled.div`
	width: fit-content;
`;

const InfoPage: React.FC = () => {
	const [estimates, setEstimates] = useState<any[]>([]);

	const { isLoading: isGroupsLoading, data: themes } = useQuery(
		'themes list',
		() => ThemesService.getAllExpanded(),
		{
			//select: ({ data }): any => data.items,
		}
	);

	const { isLoading: isGradesLoading, data: grades } = useQuery(
		'grades list',
		() => GradesService.getAll(),
		{
			select: ({ data }) => data.items,
		}
	);

	const { mutateAsync: getEstimates, isLoading } = useMutation(
		'get estimates',
		(page: number) => EstimatesService.getAllByPage(page),
		{
			onSuccess(data, variables, context) {
				console.log(data);
			},
			onError: (error: any) => {
				console.error(error.message);
			},
		}
	);

	useEffect(() => {
		getAllData();
	}, []);

	const getAllData = async () => {
		let estimates2 = [];
		const { data } = await getEstimates(0);
		estimates2 = [...data.items];
		if (data.totalPages > 1) {
			for (let i = 1; i <= data.totalPages; i++) {
				const { data } = await getEstimates(i);
				estimates2 = [...estimates2, ...data.items];
			}
		}
		estimates2 = estimates2.map((data: any) => ({
			...data,
			sum: _.sum(
				data.expand.values.map(
					(val: any) => val.value * val.expand.topic.weight
				)
			),
			user: data.expand.user.name,
			theme: data.expand.theme.title,
			grade: data.expand.grade?.name,
			date: new Date(data.created).toLocaleDateString('en-GB'),
		}));

		setEstimates(estimates2);
	};

	const estimateResults = groupBy(estimates, 'expand.theme.title');
	const keys = Object.keys(estimateResults);
	keys.forEach((key: string) => {
		const sum = estimateResults[key].reduce((a, b) => a + b.sum, 0);
		const avg = sum / estimateResults[key].length || 0;
		//estimateResults[key] = estimateResults[key][0].delta;
		estimateResults[key] = avg.toFixed(1) as any;
	});

	const data2 = [
		{
			group: '2022',
			value: 15,
			key: 'Angular',
		},
		{
			group: '2023',
			value: parseFloat(estimateResults['Angular'] as unknown as string),
			key: 'Angular',
		},

		{
			group: '2022',
			value: 15,
			key: 'QA',
		},
		{
			group: '2023',
			value: parseFloat(estimateResults['QA'] as unknown as string),
			key: 'QA',
		},

		{
			group: '2022',
			value: 25,
			key: '.NET',
		},
		{
			group: '2023',
			value: parseFloat(estimateResults['.NET'] as unknown as string),
			key: '.NET',
		},
		{
			group: '2022',
			value: 18,
			key: 'React',
		},
		{
			group: '2023',
			value: parseFloat(estimateResults['React'] as unknown as string),
			key: 'React',
		},
		{
			group: '2022',
			value: 10,
			key: 'Svelte',
		},
		{
			group: '2023',
			value: parseFloat(estimateResults['Svelte'] as unknown as string),
			key: 'Svelte',
		},
	];
	const data = [
		{
			group: '.NET',
			date: '2022-12-31T21:00:00.000Z',
			value: 15,
		},
		{
			group: '.NET',
			date: '2023-03-04T21:00:00.000Z',
			value: 24,
		},
		{
			group: '.NET',
			date: '2023-04-07T21:00:00.000Z',
			value: 19,
		},
		{
			group: '.NET',
			date: '2023-05-12T21:00:00.000Z',
			value: 20,
		},
		{
			group: '.NET',
			date: '2023-06-16T21:00:00.000Z',
			value: estimateResults['.NET'],
		},
		{
			group: 'QA',
			date: '2022-12-31T21:00:00.000Z',
			value: 22,
		},
		{
			group: 'QA',
			date: '2023-03-04T21:00:00.000Z',
			value: 10,
		},
		{
			group: 'QA',
			date: '2023-04-07T21:00:00.000Z',
			value: 14.4,
		},
		{
			group: 'QA',
			date: '2023-05-12T21:00:00.000Z',
			value: 24.1,
		},
		{
			group: 'QA',
			date: '2023-06-16T21:00:00.000Z',
			value: 12,
		},
		{
			group: 'Angular',
			date: '2022-12-31T21:00:00.000Z',
			value: 20.1,
		},
		{
			group: 'Angular',
			date: '2023-03-04T21:00:00.000Z',
			value: 19.6,
		},
		{
			group: 'Angular',
			date: '2023-04-07T21:00:00.000Z',
			value: 18,
		},
		{
			group: 'Angular',
			date: '2023-05-12T21:00:00.000Z',
			value: 21,
		},
		{
			group: 'Angular',
			date: '2023-06-16T21:00:00.000Z',
			value: estimateResults['Angular'],
		},

		{
			group: 'React',
			date: '2022-12-31T21:00:00.000Z',
			value: 10,
		},
		{
			group: 'React',
			date: '2023-03-04T21:00:00.000Z',
			value: 15,
		},
		{
			group: 'React',
			date: '2023-04-07T21:00:00.000Z',
			value: 16,
		},
		{
			group: 'React',
			date: '2023-05-12T21:00:00.000Z',
			value: 12,
		},
		{
			group: 'React',
			date: '2023-06-16T21:00:00.000Z',
			value: estimateResults['React'],
		},

		{
			group: 'Svelte',
			date: '2022-12-31T21:00:00.000Z',
			value: 15,
		},
		{
			group: 'Svelte',
			date: '2023-03-04T21:00:00.000Z',
			value: 16,
		},
		{
			group: 'Svelte',
			date: '2023-04-07T21:00:00.000Z',
			value: 12,
		},
		{
			group: 'Svelte',
			date: '2023-05-12T21:00:00.000Z',
			value: 18,
		},
		{
			group: 'Svelte',
			date: '2023-06-16T21:00:00.000Z',
			value: estimateResults['Svelte'],
		},
	];

	const Cliick = async () => {
		var est = await EstimatesService.getAll();
		var est2 = est.data.items;
		est2.forEach(async (el: any) => {
			await EstimatesService.update(el.id, {
				confirmed: true,
			});
			new Promise(resolve => setTimeout(resolve, 100));
		});
		// for (let i = 0; i < 100; i++) {
		// 	const users2 = await UsersService.getAll();
		// 	let users = users2.data.items;

		// 	var user = users[Math.floor(Math.random() * users.length)];
		// 	var theme = themes[Math.floor(Math.random() * themes.length)];
		// 	const del = Math.random() * 24;

		// 	let g = 'gxuaasr0wstmq7x';
		// 	if (del > 5) {
		// 		g = 'fugy80wabejy0ic';
		// 	}
		// 	if (del > 10) {
		// 		g = '6hk0a0112g6gell';
		// 	}
		// 	if (del > 20) {
		// 		g = '9p8wzsb48c6371f';
		// 	}
		// 	await EstimatesService.create({
		// 		user: user.id,
		// 		theme: theme.id,
		// 		expert: 'kntje3ve6bizo3x',
		// 		done: true,
		// 		verified: true,
		// 		delta: del.toFixed(0),
		// 		grade: g,
		// 	});
		// 	new Promise(resolve => setTimeout(resolve, 100));
		// }
	};

	const { isLightTheme } = useContext(ThemeContext);
	const options = {
		title: 'Значения по компетенциям',
		theme: isLightTheme ? 'g10' : 'g90',
		axes: {
			bottom: {
				title: 'Дата',
				mapsTo: 'date',
				scaleType: 'time',
			},
			left: {
				mapsTo: 'value',
				scaleType: 'linear',
			},
		},
		curve: 'curveNatural',
		height: '400px',
	};
	const options2 = {
		title: 'Сравнение годовых показателей',
		theme: isLightTheme ? 'g10' : 'g90',
		axes: {
			left: {
				mapsTo: 'value',
			},
			bottom: {
				scaleType: 'labels',
				mapsTo: 'key',
			},
		},
		height: '400px',
	};
	if (estimates.length == 0 || isGradesLoading || isGroupsLoading)
		return <LoadingPage />;
	return (
		<Wrapper>
			<Main>
				<h1>Отчет</h1>
				{/* <button onClick={Cliick}>Asd</button> */}
				<Table
					download={true}
					title='Таблица специализаций'
					rows={estimates}
					rowsCount={estimates.length}
					fileName='Отчет по сотрудникам'
					headers={[
						{ header: 'ФИО', key: 'user' },
						{ header: 'Компетенция', key: 'theme' },
						{ header: 'Баллы', key: 'sum' },
						{ header: 'Квалификация', key: 'grade' },
						{ header: 'Дата', key: 'date' },
						// ...themes.map((group: any) => ({
						// 	header: group.title,
						// 	key: group.title,
						// })),
					]}
				/>

				<Table
					download={true}
					title='Матрица компетенций - Angular'
					rows={estimates
						.filter(est => est.theme === 'Angular')
						.map(est => {
							let a = est.expand.values.map((val: any) => ({
								[val.expand.topic.id]: val.value,
							}));

							a = a.reduce(function (result: any, item: any) {
								var key = Object.keys(item)[0]; //first property: a, b, c
								result[key] = item[key];
								return result;
							}, {});
							return {
								...est,
								...a,
							};
						})}
					fileName='Отчет по сотрудникам'
					headers={[
						{ header: 'ФИО', key: 'user' },
						...themes?.data.items[0].expand.topics.map((top: any) => ({
							header: top.title,
							key: top.id,
						})),
						{ header: 'Сумма с учетом весов', key: 'sum' },
					]}
				/>

				<TableWithoutTool
					title='Средние значения по компетенциям'
					rows={[estimateResults]}
					headers={[
						...themes?.data.items.map((group: any) => ({
							header: group.title,
							key: group.title,
						})),
					]}
				/>
				{/* <AreaChart data={data as any} options={options as any}></AreaChart> */}

				<GroupedBarChart
					data={data2}
					options={options2 as any}
				></GroupedBarChart>
			</Main>

			{/* <RadarWrapper>
				<Radar
					data={reportData.map(d => ({
						product: 'AVG',
						feature: d.name,
						score: d.score,
					}))}
				/>
			</RadarWrapper> */}
			{/* <OrderedList style={{ fontSize: '1.5em', padding: '1em' }}>
				{grades.map((grade: any) => (
					<ListItem>
						<strong>{grade.percentile}%</strong> {grade.name}
					</ListItem>
				))}
			</OrderedList> */}
		</Wrapper>
	);
};

export default InfoPage;
