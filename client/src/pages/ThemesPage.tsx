import { Add } from '@carbon/icons-react';
import { Button } from '@carbon/react';
import _ from 'lodash';
import styled from 'styled-components';
import { TileComponent } from '../components/TileComponent';

import { ThemeModal } from '../components/modals/ThemeModal';
import { useModal } from '../hooks/useModal';
import { LoadingPage } from './LoadingPage';
import { usePBThemes } from '../hooks/usePBThemes';
import { useMutation, useQuery } from 'react-query';
import { GroupsService } from '../services/groups.service';
import { ThemesService } from '../services/Themes/themes.service';

const Wrapper = styled.div`
	max-width: 90%;
`;

const ButtonWrapper = styled.div`
	padding: 2em 10%;
	position: fixed;
	right: 2em;
`;

const Title = styled.div`
	display: flex;
	justify-content: space-between;
	padding: 2em 0;
`;

const TilesWrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 5px;
`;

const ThemesePage = () => {
	const { isLoading, themes, refetch } = usePBThemes();

	const { data: groups } = useQuery('groups list', () =>
		GroupsService.getAll()
	);

	const { mutateAsync } = useMutation(
		'create theme',
		(data: any) => ThemesService.create(data),
		{
			onSuccess: async () => {
				await refetch();
			},
			onError: (error: any) => {
				console.error(error.message);
			},
		}
	);

	const addModal = useModal({
		title: 'Добавить тему',
		onSubmit: async formValue => {
			await mutateAsync(formValue);
		},
	});

	if (isLoading) {
		return <LoadingPage />;
	}

	return (
		<Wrapper>
			<ButtonWrapper>
				<Button renderIcon={Add} kind='secondary' onClick={addModal.openModal}>
					Добавить тему
				</Button>
			</ButtonWrapper>
			{groups?.data?.items?.map((group: any) => (
				<>
					<Title>
						<h1>{group.name}</h1>
					</Title>
					<TilesWrapper>
						{themes?.data?.items
							.filter((theme: any) => theme.group === group.id)
							.map((d: any) => (
								<TileComponent {...d} />
							))}
					</TilesWrapper>
				</>
			))}
			<ThemeModal {...addModal} />
		</Wrapper>
	);
};
export default ThemesePage;
