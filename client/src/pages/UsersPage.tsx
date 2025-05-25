import { FilterReset, Search } from '@carbon/icons-react';
import {
	Button,
	IconButton,
	MultiSelect,
	Search as SearchCarbon,
} from '@carbon/react';
import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { UserTile } from '../components/UserTile';
import { SkeletonUserTile } from '../components/skeleton/SkeletonUserTile';
import { getTags } from '../helpers/getTags';
import { useUsers } from '../hooks/useUsers';
import { FirebaseDataContext } from '../services/Firebase/FirebaseData';
import { UserInfo } from '../types/UserInfo';
import { useQuery } from 'react-query';
import { UsersService } from '../services/users.service';
import { LoadingPage } from './LoadingPage';
import { ThemesService } from '../services/Themes/themes.service';

const Wrapper = styled.div``;

const SearhOptions = styled.div`
	align-items: center;
	display: flex;
	gap: 5px;
`;

const TableOptions = styled.div`
	display: flex;
	justify-content: space-between;

	align-items: center;
`;

const UsersTable = styled.div`
	display: flex;
	flex-direction: column;
	gap: 5px;
`;

const UsersPage = () => {
	const [filteredUsers, setFilteredUsers] = useState<UserInfo[]>([]);
	const [filterValue, setFilterValue] = useState<string>('');

	const { data: users, isLoading } = useQuery(
		'users list',
		() => UsersService.getAll(),
		{
			select: ({ data }): any => data.items,
			onSuccess: data => {
				setFilteredUsers(data);
			},
		}
	);

	const { data: themes, isLoading: isLoadingTopics } = useQuery(
		'themes list',
		() => ThemesService.getAll(),
		{
			select: ({ data }): any => data.items,
		}
	);

	const onSearch = () => {
		setFilteredUsers(
			users.filter((user: any) =>
				user.name.toLowerCase().includes(filterValue.toLowerCase())
			)
		);
	};

	const onReset = () => {
		setFilteredUsers(users);
		setFilterValue('');
	};

	if (isLoading || isLoadingTopics) return <LoadingPage />;

	return (
		<Wrapper>
			<TableOptions>
				<SearhOptions>
					<div style={{ width: '700px' }}>
						<SearchCarbon
							value={filterValue}
							onChange={(e: any) => setFilterValue(e.target.value)}
							size='lg'
							placeholder='Имя'
						/>
					</div>
					<div style={{ width: '400px', height: '100px' }}>
						{/* <MultiSelect
							size='lg'
							ariaLabel='Dropdown'
							id='carbon-dropdown-example'
							items={themes.map((theme: any) => ({
								value: theme.id,
								label: theme.title,
							}))}
							titleText='Поиск по навыкам'
						/> */}
					</div>
				</SearhOptions>
				<div>
					<Button size='lg' renderIcon={Search} onClick={onSearch}>
						Поиск
					</Button>
					<IconButton
						onClick={onReset}
						kind='secondary'
						size='lg'
						align='top'
						label='Сбросить фильтр'
						className='cds--btn--icon-only'
					>
						<FilterReset size={20} />
					</IconButton>
				</div>
			</TableOptions>
			<UsersTable>
				{filteredUsers ? (
					filteredUsers.map(user => <UserTile {...user} />)
				) : (
					<SkeletonUserTile />
				)}
			</UsersTable>
		</Wrapper>
	);
};

export default UsersPage;
