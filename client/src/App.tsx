import { Theme } from '@carbon/react';
import { useContext } from 'react';
import { BrowserRouter } from 'react-router-dom';
import styled from 'styled-components';

import './App.scss';
import Router from './consts/routes';

import { AuthContext } from './services/Auth';
import { ReportsProvider } from './services/Reports/Reports';
import { ThemeContext } from './services/Themes/Theme';

const Wrapper = styled.div``;

function App() {
	const { user } = useContext(AuthContext);
	const themeContext = useContext(ThemeContext);

	return (
		<BrowserRouter>
			<ReportsProvider>
				<Theme theme={themeContext.isLightTheme ? 'g10' : 'g90'}>
					<Wrapper>
						<Router isAuth={user != null} />
					</Wrapper>
				</Theme>
			</ReportsProvider>
		</BrowserRouter>
	);
}

export default App;
