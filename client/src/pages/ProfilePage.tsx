import { useContext, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { AuthContext } from '../services/Auth/Auth';
import { Edit } from '@carbon/icons-react';
import { Button, Tag, TextInput } from '@carbon/react';

import { Link, useNavigate } from 'react-router-dom';
import { UserInfoTable } from '../components/UserPageComponents/UserInfoTable';
import { UserModal } from '../components/modals/UserModal';
import { useModal } from '../hooks/useModal';
import { LoadingPage } from './LoadingPage';
import Table from '../components/Table';
import { useQuery } from 'react-query';
import { EstimatesService } from '../services/Estimates/estimates.service';
import _ from 'lodash';

const Wrapper = styled.div``;
const TableWrapper = styled.div`
	padding: 2em 0;
`;

const Title = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 2em 0;
`;

type DataRowType = {
	theme: any;
	result: any;
	grade: string;
	date: string;
};

const headerData = [
	{
		header: 'Специализация',
		key: 'theme',
	},
	{
		header: 'Результат',
		key: 'sum',
	},
	{
		header: 'Квалификация',
		key: 'grade',
	},
	{
		header: 'Дата',
		key: 'date',
	},
];

const estimatesToVerify = [
	{
		header: 'Пользователь',
		key: 'user',
	},
	{
		header: 'Результат',
		key: 'result',
	},
	{
		header: 'Тема',
		key: 'theme',
	},
	{
		header: 'Дата',
		key: 'date',
	},
];

const ProfilePage = () => {
	const { user } = useContext(AuthContext);

	const { isLoading, data: estimates } = useQuery(
		'estimates list',
		() => EstimatesService.getAllByUserId(user.id),
		{
			select: ({ data }): any =>
				data.items.map((estimate: any) => ({
					id: estimate.id,
					theme: estimate.expand.theme.title,
					sum: _.sum(
						estimate.expand.values.map(
							(val: any) => val.value * val.expand.topic.weight
						)
					),
					result: estimate.done ? (
						estimate.confirmed ? (
							estimate.delta
						) : (
							'Не подтвержден'
						)
					) : (
						<Link to={`/result/${estimate.id}`}>Продолжить</Link>
					),
					grade: estimate.expand.grade.name,
					date: new Date(estimate.created).toLocaleDateString('en-GB'),
				})),
		}
	);

	console.log(estimates);
	const navigate = useNavigate();
	const waiting = user.expand?.waiting?.map((estimate: any) => ({
		id: estimate.id,
		user: estimate.expand.user.name,
		theme: estimate.expand.theme.title,
		result: <Link to={`/confirm/${estimate.id}`}>Проверить</Link>,
		date: new Date(estimate.created).toLocaleDateString('en-GB'),
	}));

	const userModal = useModal({
		title: 'Редактировать профиль',
		onSubmit: async (data: any) => {},
	});

	if (!user || isLoading) {
		return <LoadingPage />;
	}

	return (
		<Wrapper>
			<Title>
				<div>
					<h1 style={{ fontSize: '4.5em' }}>{user?.name}</h1>
					{user?.expand?.expert.map((theme: any) => (
						<Tag type='red'>{theme.title}</Tag>
					))}
				</div>
				<Button
					renderIcon={Edit}
					kind='secondary'
					onClick={userModal.openModal}
				>
					Редактировать профиль
				</Button>
			</Title>
			<UserInfoTable user={user} />
			<Table rows={estimates ?? []} headers={headerData} title='Результаты' />
			{user.expert?.length > 0 && (
				<>
					<h1>На проверке</h1>
					<Table
						rows={waiting ?? []}
						headers={estimatesToVerify}
						title='Отчеты'
					/>
				</>
			)}
			<UserModal {...userModal} data={user} />
		</Wrapper>
	);
};

export default ProfilePage;
