import { MeterChart } from '@carbon/charts-react';
import { FileUploader, Button } from '@carbon/react';
import '@carbon/charts/styles.css';
import { useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import styled from 'styled-components';
import ReactTaskOne from '../components/tasks/react/ReactTaskOne';
import { LoadingPage } from './LoadingPage';
import { useMutation, useQuery } from 'react-query';
import { EstimatesService } from '../services/estimates.service';
import { UsersService } from '../services/users.service';
import { AuthContext } from '../services/Auth';

const FileUploaderWrapper = styled.div`
	padding: 1em 0;
`;

const Main = styled.div`
	display: flex;
	justify-content: space-between;
`;

const Wrapper = styled.div`
	padding: 4em 0;
	width: 100%;
`;

const ResultPage = () => {
	const { id } = useParams();
	const navigate = useNavigate();

	const { refetch } = useContext(AuthContext);

	const { isLoading, data: estimate } = useQuery(
		['themes list', id],
		() => EstimatesService.getOne(String(id)),
		{
			select: ({ data }): any => data,
			enabled: !!id,
		}
	);

	const { mutateAsync: updateEstimates } = useMutation(
		'update estimate',
		([id, file]: [string, any]) => EstimatesService.uploadFile(id, file),
		{
			onSuccess: async () => {
				navigate('/');
			},
			onError: (error: any) => {
				console.error(error.message);
			},
		}
	);

	const [file, setFile] = useState<File | undefined>();

	const handleFileUpload = (e: any) => {
		setFile(e.target.files[0] as File);
	};

	const handleRemoveFile = (e: any) => {
		setFile(undefined);
	};

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

	const onSubmitButtonClick = async () => {
		const expert = await getUser(String(estimate.expert));

		await updateUser([
			String(expert.data.id),
			{
				waiting: [...expert.data.waiting, estimate.id],
			},
		]);

		await updateEstimates([String(id), { file, done: true }]);
		await refetch();
	};

	const options = {
		title: '',
		meter: {
			peak: 15,
		},
		height: '100px',
		theme: 'g90',
	};

	if (isLoading) return <LoadingPage />;
	return (
		<Wrapper>
			<h1 style={{ fontSize: '4em' }}>{estimate.expand.theme.title}</h1>
			{/* <MeterChart
				data={[
					{
						group: estimate.grade,
						value: estimate.delta,
					},
				]}
				options={options as any}
			/> */}
			<h1 style={{ padding: '1em 0' }}>
				Ваш результат: {estimate.delta} / {estimate.values.length * 4}
			</h1>
			<Main>
				<ReactTaskOne estimate={estimate} />
				<FileUploaderWrapper>
					<FileUploader
						onChange={handleFileUpload}
						onDelete={handleRemoveFile}
						buttonKind='secondary'
						labelTitle='Загрузить'
						labelDescription='.rar/zip не более 500МБ'
						buttonLabel='Выбрать файл'
						filenameStatus='edit'
						iconDescription='Очистить'
					/>
					<Button onClick={onSubmitButtonClick}>Отправить результаты</Button>
				</FileUploaderWrapper>
			</Main>
		</Wrapper>
	);
};

export default ResultPage;
