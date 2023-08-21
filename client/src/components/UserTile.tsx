import styled from 'styled-components';
import { ClickableTile, Tag } from '@carbon/react';
import { useNavigate } from 'react-router';

const TileContent = styled.div`
	display: flex;
	flex-direction: column;
	gap: 2em;
`;

const TileBody = styled.div`
	padding: 1em 0.5em;
`;

export const UserTile = (user: any) => {
	const navigate = useNavigate();
	const clickHandler = () => {
		navigate(user.id);
	};

	return (
		<ClickableTile onClick={clickHandler}>
			<TileBody>
				<TileContent>
					<h3>
						{user.name}
						{user?.expand?.expert.map((theme: any) => (
							<Tag type='red'>{theme.title}</Tag>
						))}
					</h3>
					<h4>Email: {user.email}</h4>
				</TileContent>
			</TileBody>
		</ClickableTile>
	);
};
