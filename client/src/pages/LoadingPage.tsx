import styled from 'styled-components';
import { Loading } from '@carbon/react';

const Wrapper = styled.div`
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const LoadingPage = () => {
	return (
		<Wrapper>
			<Loading description='Индикатор загрузки' withOverlay={false} />
		</Wrapper>
	);
};
