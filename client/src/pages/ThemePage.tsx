import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import styled from 'styled-components';
import { LoadingPage } from './LoadingPage';

import { Edit, Play, TrashCan } from '@carbon/icons-react';
import {
	Accordion,
	AccordionItem,
	Button,
	IconButton,
	Link,
	ListItem,
	UnorderedList,
} from '@carbon/react';
import { FilesTableComponent } from '../components/FilesTableComponent';
import { DeleteModal } from '../components/modals/DeleteModal';
import { FileUploadModal } from '../components/modals/FileUploadModal';
import { ThemeModal } from '../components/modals/ThemeModal';
import { useFiles } from '../hooks/useFiles';
import { useFireStorage } from '../hooks/useFireStorage';
import { useModal } from '../hooks/useModal';
import { useThemes } from '../hooks/useThemes';
import { FirebaseDataContext } from '../services/Firebase/FirebaseData';
import { FirebaseFile, KMFile } from '../types/KMFile';
import { AddThemeModel, Theme, ThemeDTO } from '../types/Theme';
import { useMutation, useQuery } from 'react-query';
import { ThemesService } from '../services/themes.service';
import Table, { TableWithoutTool } from '../components/Table';
import { TopicsService } from '../services/topics.service';

const Wrapper = styled.div``;

const Info = styled.div`
	display: flex;
	flex-direction: column;
	gap: 2em;
	max-width: 70%;
`;

const Title = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 2em 0;
`;

const ButtonWrapper = styled.div`
	padding: 2em 0.5em;
`;

const Input = styled.input`
	padding: 1em 0;
	color: black;
	border: none;
	background: transparent;
`;

const ThemePage = () => {
	const navigate = useNavigate();

	const { deleteStorageFiles, uploadFile } = useFireStorage();
	const { getFilesByThemeId } = useFiles();

	const { id } = useParams();

	const { isLoading, data, refetch } = useQuery(
		['themes list', id],
		() => ThemesService.getOne(String(id)),
		{
			select: ({ data }): any => data,
			enabled: !!id,
		}
	);

	const { mutateAsync: deleteTheme } = useMutation(
		'delete theme',
		(id: string) => ThemesService.delete(id),
		{
			onSuccess: async () => {
				navigate('/');
			},
			onError: (error: any) => {
				console.error(error.message);
			},
		}
	);

	const { mutateAsync: updateTheme } = useMutation(
		'update theme',
		([id, data]: [string, any]) => ThemesService.update(id, data),
		{
			onSuccess: async () => {
				await refetch();
			},
			onError: (error: any) => {
				console.error(error.message);
			},
		}
	);

	const { mutateAsync: updateTopic } = useMutation(
		'update topic',
		([id, data]: [string, any]) => TopicsService.update(id, data),
		{
			onSuccess: async () => {},
			onError: (error: any) => {
				console.error(error.message);
			},
		}
	);

	const [files, setFiles] = useState<FirebaseFile[]>([]);

	const getFiles = async () => {
		if (!id) return;
		const data = await getFilesByThemeId(id);
		setFiles(data);
	};

	const deleteHandler = async (files: any) => {
		await deleteStorageFiles(files);
		await getFiles();
	};

	const editModal = useModal({
		title: 'Изменить тему',
		onSubmit: async (theme: AddThemeModel) => {
			const themeDto = {
				description: theme.description,
				group: theme.group,
				link: theme.link,
				icon: theme.icon,
				title: theme.title,
			};

			await updateTheme([String(id), themeDto]);
			await refetch();
		},
	});

	const deleteModal = useModal({
		title: 'Удалить тему',
		onSubmit: async () => {
			await deleteTheme(String(id));
		},
	});

	const fileModal = useModal({
		title: 'Добавить файл',
		onSubmit: async (file: KMFile) => {
			await uploadFile(file);
			await getFiles();
		},
	});

	useEffect(() => {
		getFiles();
	}, [id]);

	const [weights, setWeights] = useState<any[]>([]);

	const onWeightSave = async () => {
		weights.forEach(async weight => {
			await updateTopic([weight.id, { weight: weight.weight }]);
		});
	};

	const onWeightChange = (e: any, topic: any) => {
		setWeights([
			...weights.filter(weight => weight.id != topic.id),
			{ id: topic.id, weight: e.target.value },
		]);
	};

	if (!data) {
		return <h1>Not Found 404</h1>;
	}

	return (
		<Wrapper>
			<Title>
				<Link target='_blank' rel='noopener noreferrer' href={data.link}>
					<h1>{data.title}</h1>
				</Link>
				<ButtonWrapper>
					<Button
						renderIcon={Edit}
						kind='secondary'
						onClick={editModal.openModal}
					>
						Изменить тему
					</Button>
					<IconButton
						kind='danger'
						size='lg'
						align='top'
						label='Delete'
						onClick={deleteModal.openModal}
						className='cds--btn--icon-only'
					>
						<TrashCan size={16} />
					</IconButton>
					<Button
						disabled={data.topics.length > 0 ? false : true}
						renderIcon={Play}
						kind='primary'
						onClick={() => navigate('/estimate/' + id)}
					>
						Начать
					</Button>
				</ButtonWrapper>
			</Title>
			<Info>
				<p>{data.description}</p>
				<Accordion align='start' size='lg'>
					<AccordionItem title='Навыки' open={false}>
						<UnorderedList>
							{data.expand?.topics?.map((topic: any) => (
								<ListItem>{topic.title}</ListItem>
							))}
						</UnorderedList>
					</AccordionItem>
					<AccordionItem
						title='Материалы и ресурсы'
						open={false}
						style={{ position: 'relative' }}
					>
						<FilesTableComponent
							files={files}
							onDelete={deleteHandler}
							onAddClick={fileModal.openModal}
						/>
					</AccordionItem>
					<AccordionItem
						title='Весовые коэффициенты'
						open={false}
						style={{ position: 'relative' }}
					>
						<TableWithoutTool
							headers={[
								{
									header: 'Компетенция',
									key: 'title',
								},
								{
									header: 'Вес',
									key: 'weight',
								},
							]}
							rows={data.expand?.topics.map((topic: any) => ({
								...topic,
								weight: (
									<Input
										step={0.1}
										defaultValue={topic.weight}
										onChange={(e: any) => onWeightChange(e, topic)}
										type='number'
										key={topic.id}
									/>
								),
							}))}
							title='Весовые коэффициенты'
						/>
						<Button onClick={onWeightSave}>Сохранить</Button>
					</AccordionItem>
				</Accordion>
			</Info>
			<ThemeModal {...editModal} data={data} />
			<DeleteModal {...deleteModal} />
			<FileUploadModal {...fileModal} />
		</Wrapper>
	);
};
export default ThemePage;
