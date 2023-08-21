import styled from 'styled-components';
import { useQuery } from 'react-query';
import { TasksService } from '../../../services/tasks.service';
import { LoadingPage } from '../../../pages/LoadingPage';

// const TextArea = styled.textarea<any>`
// 	outline: none;
// 	border: none;
// 	background: ${props => (props.lightTheme ? 'white' : '#2e2e2e')};
// 	color: ${props => (props.lightTheme ? 'black' : 'white')};
// 	font-size: 14px;
// 	height: 100vh;

// 	width: 100%;
// 	padding: 2em;
// `;

const Task = styled.div`
	width: 70%;
	li {
		padding: 0.5em 0;
		margin-left: 2em;
		list-style-type: disc;
	}
`;

const ReactTaskOne: React.FC<any> = ({ estimate }) => {
	const { isLoading, data: tasks } = useQuery(
		'tasks list',
		() => TasksService.getAll(),
		{
			select: ({ data }): any => data.items,
		}
	);

	if (isLoading) return <LoadingPage />;

	return (
		<>
			<Task
				dangerouslySetInnerHTML={{
					__html: tasks.find((task: any) => task.theme === estimate.theme).text,
				}}
			></Task>
		</>
	);
};

export default ReactTaskOne;
