import { ArrowRight } from '@carbon/icons-react';
import { ClickableTile } from '@carbon/react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import { GetIcon } from '../consts/icons';

type TileComponentProps = {
	id: string;
	title: string;
	description: string;
	icon: string;
	done: boolean;
};

const IconsWrapper = styled.div`
	display: flex;
	justify-content: space-between;
`;

const TileContent = styled.div`
	gap: 1em;
	display: flex;
	flex-direction: column;
	max-height: 130px;
`;

const TileBody = styled.div`
	padding: 1em;
	height: 200px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`;

export const TileComponent = ({
	id,
	title,
	icon,
	done,
}: TileComponentProps) => {
	const navigate = useNavigate();
	const clickHandler = () => {
		navigate(id);
	};

	return (
		<ClickableTile
			disabled={!done}
			style={{ padding: 0, width: '380px' }}
			onClick={clickHandler}
		>
			<TileBody>
				<TileContent>
					<h4>{title}</h4>
				</TileContent>
				<IconsWrapper>
					{GetIcon(icon)}
					<ArrowRight size={32} />
				</IconsWrapper>
			</TileBody>
		</ClickableTile>
	);
};
