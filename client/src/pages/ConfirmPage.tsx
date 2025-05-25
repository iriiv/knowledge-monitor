import { useNavigate, useParams } from 'react-router';
import { EstimatesService } from '../services/Estimates/estimates.service';
import { useMutation, useQuery } from 'react-query';
import { useContext, useState } from 'react';
import { AuthContext } from '../services/Auth/Auth';
import { LoadingPage } from './LoadingPage';

import {
	Tabs,
	TabList,
	Button,
	ListItem,
	UnorderedList,
	IconButton,
	NumberInput,
	Modal,
	TextArea
} from '@carbon/react';

import styled from 'styled-components';
import { Document, WatsonHealthBrushFreehand } from '@carbon/icons-react';
import { ValuesService } from '../services/values.service';
import { UsersService } from '../services/users.service';
import { useModal } from '../hooks/useModal';
import { GradesService } from '../services/grades.service';
import { sortBy } from 'lodash';
import _ from 'lodash';

const header = [
	{
		header: 'Тема',
		key: 'topic',
	},
	{
		header: '',
		key: 'result',
	},
	{
		header: 'Результат',
		key: 'expertValue',
	},
];

const Wrapper = styled.div`
	display: flex;
	justify-content: space-between;
	padding: 4em 2em;
`;
const Main = styled.div`
	width: 70%;
	padding: 0 1em 0 0;
`;

const Topic = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 1em 0;
`;

const Criteria = styled.div`
	li {
		padding: 0.3em 0;
		margin-left: 2em;
		list-style-type: disc;
	}
`;

const ConfirmPage: React.FC = () => {
	const { id } = useParams();
	const { user, refetch } = useContext(AuthContext);

	const [values, setValues] = useState<any[]>([]);
	const [comment, setComment] = useState<string>("");

	const confirmModal = useModal({
		onSubmit: async () => {
			await submitForm();
			navigate(`/me`);
		},
		title: 'Сохранить',
	});

	const navigate = useNavigate();
	const { isLoading, data: estimate } = useQuery(
		['estimates list', id],
		() => EstimatesService.getOneExpanded(String(id)),
		{
			select: ({ data }): any => data,
			enabled: !!id,
			onSuccess: data => {
				if (data.expert !== user.id) navigate('/');
				setValues(
					data.expand.values.map((val: any) => ({
						id: val.id,
						value: val.value,
					}))
				);
			},
		}
	);

	const { mutateAsync: updateValue } = useMutation(
		'update value',
		([id, data]: any) => ValuesService.update(id, data),
		{
			onSuccess: async () => {},
			onError: (error: any) => {
				console.error(error.message);
			},
		}
	);

	const { mutateAsync: updateUser } = useMutation(
		'update user',
		([id, data]: any) => UsersService.update(id, data),
		{
			onSuccess: async () => {},
			onError: (error: any) => {
				console.error(error.message);
			},
		}
	);

	const { mutateAsync: updateEstimate } = useMutation(
		'update estimate',
		([id, data]: any) => EstimatesService.update(id, data),
		{
			onSuccess: async () => {},
			onError: (error: any) => {
				console.error(error.message);
			},
		}
	);

	const { data: grades } = useQuery(
		'grades list',
		() => GradesService.getAll(),
		{
			select: ({ data }) => data.items,
		}
	);

	const data = estimate?.expand.values.map((val: any) => ({
		id: val.id,
		topic: val.expand.topic.title,
		criteria: val.expand.topic.criteria,
		result: val.value,
		expertValue: (
			<NumberInput
				//style={{ background: 'transparent' }}
				onChange={(e: any, dir: any, inputNumber: any) => {
					let t = values.filter(value => value.id !== val.id);
					setValues([
						...t,
						{
							value: dir.value,
							id: val.id,
						},
					]);
				}}
				max={4}
				min={0}
				step={1}
				value={val.value}
			/>
		),
	}));

	const submitForm = async () => {
		await Promise.all(
			values.map((val: any) =>
				updateValue([
					val.id,
					{
						value: val.value,
						verified: true,
						expert: user.id,
					},
				])
			)
		);

		await updateUser([
			user.id,
			{
				waiting: [
					...user.waiting.filter((estId: any) => estId !== estimate.id),
				],
			},
		]);

		const delta = _.sum(values.map(val => val.value));
		console.log(delta);
		const grade = String(
			grades
				.filter(
					(grade: any) =>
						grade.percentile <= (delta / (values.length * 4)) * 100
				)
				.reverse()[0].id
		);
		await updateEstimate([
			estimate.id,
			{
				confirmed: true,
				delta,
				grade,
			},
		]);

		await refetch();
	};

	if (isLoading) return <LoadingPage />;
	return (
		<Wrapper style={{ display: 'flex' }}>
			<Main>
				<Topic>
					<h2>Прикрепленный файл</h2>
					<IconButton
						align='top'
						label='Файл'
						className='cds--btn--icon-only'
						onClick={() =>
							window.open(
								`http://127.0.0.1:8090/api/files/estimates/${estimate.id}/${estimate.file}`,
								'_blank'
							)
						}
					>
						<Document size={16} />
					</IconButton>
				</Topic>
				<hr />
				{data.map((data: any) => (
					<>
						<Topic>
							<h2>{data.topic}</h2>
							<span>{data.expertValue}</span>
						</Topic>
						<Criteria
							dangerouslySetInnerHTML={{
								__html: data.criteria,
							}}
						></Criteria>
					</>
				))}
				<hr />
				<TextArea
						value={comment}
						onChange={(e: any) => setComment(e.target.value)}
						cols={150}
						id='comment'
						labelText='Напишите отзыв'
						placeholder='Отзыв'
						rows={4}
					/>
				{/* <Table headers={header} rows={data} title='' /> */}
			</Main>
			<div>
				<Topic>
					<h2>{estimate.expand.user.name}</h2>
				</Topic>
				<hr />
				<h3>{estimate.expand.theme.title}</h3>
				<h4>{new Date(estimate.created).toLocaleDateString('en-GB')}</h4>
				<hr />
				<UnorderedList style={{ fontSize: '1em', padding: '1em' }}>
					<ListItem>
						<strong>1</strong> - Теоретические знания
					</ListItem>
					<ListItem>
						<strong>2</strong> - Есть практический опыт
					</ListItem>
					<ListItem>
						<strong>3</strong> - Использовал/использую на проектах
					</ListItem>
					<ListItem>
						<strong>4</strong> - Эксперт, может обучать
					</ListItem>
				</UnorderedList>
				<Button
					renderIcon={WatsonHealthBrushFreehand}
					onClick={confirmModal.openModal}
				>
					Утвердить
				</Button>
			</div>
			<ConfModal {...confirmModal} />
		</Wrapper>
	);
};

const ConfModal = ({ closeModal, onSubmit, isOpen, title }: any) => {
	const { id } = useParams();

	const onFormSubmit = () => {
		onSubmit();
		closeModal();
	};

	return (
		<Modal
			modalHeading={title}
			primaryButtonText='Ок'
			secondaryButtonText='Отменить'
			open={isOpen}
			onRequestClose={closeModal}
			onRequestSubmit={onFormSubmit}
			passiveModal={false}
			danger={false}
		>
			<p style={{ paddingBottom: '2em' }}>Отправить результаты?</p>
		</Modal>
	);
};

export default ConfirmPage;
