import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { useParams } from 'react-router';
import Table from '../components/Table';
import { UserInfoTable } from '../components/UserPageComponents/UserInfoTable';
import { useEstimate } from '../hooks/useEstimate';
import { useUsers } from '../hooks/useUsers';
import { UserInfo } from '../types/UserInfo';
import { LoadingPage } from './LoadingPage';
import { useQuery } from 'react-query';
import { UsersService } from '../services/users.service';

const headerData = [
	{
		header: 'Тема',
		key: 'theme',
	},
	{
		header: 'Результат',
		key: 'result',
	},
	{
		header: 'Грейд',
		key: 'grade',
	},
	{
		header: 'Дата',
		key: 'date',
	},
];

const Wrapper = styled.div``;

const Title = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 2em 0;
`;

type DataRowType = {
	theme: string;
	result: string;
	grade: string;
	date: string;
};

const UserPage = () => {
	const { id } = useParams();

	const { data: user, isLoading } = useQuery(
		['get user', id],
		() => UsersService.getOne(String(id)),
		{
			select: ({ data }) => data,
			onSuccess: async () => {},
			onError: (error: any) => {
				console.error(error.message);
			},
		}
	);
	const [tableData, setTableData] = useState<DataRowType[]>([]);

	if (isLoading) {
		return <LoadingPage />;
	}

	return (
		<Wrapper>
			<Title>
				<div>
					<h1 style={{ fontSize: '4.5em' }}>{user?.name}</h1>
					{/* {userInfo?.themes.map((theme) => (
            <Tag type={tagColors[Math.floor(Math.random() * tagColors.length)]}>
              {theme}
            </Tag>
          ))} */}
				</div>
			</Title>
			<UserInfoTable user={user} />
			<Table title='Результаты' rows={tableData} headers={headerData} />
		</Wrapper>
	);
};
export default UserPage;
