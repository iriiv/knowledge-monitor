import { Save } from '@carbon/icons-react';
import { Button } from '@carbon/react';
import { useContext, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router';
import styled from 'styled-components';
import MarkDownComponent from '../components/tasks/MarkdownComponent';
import { useTasks } from '../hooks/useTasks';
import { FirebaseDataContext } from '../services/Firebase/FirebaseData';
import { ThemeContext } from '../services/Themes/Theme';
import { TaskAddModel } from '../types/Task';

const Header = styled.div`
	padding: 2em 0;
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const EditWrapper = styled.div`
	display: flex;
`;

const MarkDownWrapper = styled.div`
	padding: 2em;
	max-width: 100%;
	min-width: 50%;
	overflow-x: auto;
`;

const TextArea = styled.textarea<any>`
	outline: none;
	border: none;
	background: ${props => (props.lightTheme ? 'white' : '#2e2e2e')};
	color: ${props => (props.lightTheme ? 'black' : 'white')};
	font-size: 16px;
	height: 100vh;

	min-width: 50%;
	padding: 2em;
`;

const TaskEditPage = () => {
	const [text, setText] = useState('');
	const [text2, setText2] = useState('');
	const { isLightTheme } = useContext(ThemeContext);
	const { themes } = useContext(FirebaseDataContext);
	const { addTask, getTasks } = useTasks();
	const { id } = useParams();

	const theme = useMemo(() => {
		return themes.find(theme => theme.id === id);
	}, [id, themes]);

	const onTextareaChange = (e: any) => {
		setText(e.target.value);
	};

	useEffect(() => {
		getTasks().then(d => setText2(d[1].text));
	}, []);

	const save = async () => {
		const task: TaskAddModel = {
			text,
			themeId: id || '',
		};

		await addTask(task);
	};

	return (
		<>
			<Header>
				<h1>Задание - {theme?.title}</h1>
				<Button renderIcon={Save} kind='secondary' onClick={save}>
					Сохранить
				</Button>
			</Header>
			<EditWrapper>
				<TextArea
					value={text}
					onChange={onTextareaChange}
					lightTheme={isLightTheme}
				/>
				<MarkDownWrapper>
					<MarkDownComponent text={text} />
				</MarkDownWrapper>
			</EditWrapper>
		</>
	);
};

export default TaskEditPage;
