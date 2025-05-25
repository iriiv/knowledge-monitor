import {
	Header,
	HeaderGlobalAction,
	HeaderGlobalBar,
	HeaderMenuItem,
	HeaderName,
	HeaderNavigation,
} from '@carbon/react';

import {
	Asleep,
	Light,
	Logout,
	User,
	UserAvatar,
	UserProfile,
} from '@carbon/icons-react';
import { Suspense, useContext } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../hooks/useAuth';
import { LoadingPage } from '../pages/LoadingPage';
import { ThemeContext } from '../services/Themes/Theme';
import { useUsers } from '../hooks/useUsers';
import { AuthContext } from '../services/Auth/Auth';

const BodyWrapper = styled.div`
	min-height: 100vh;
	padding: 4em 15%;
`;

const Chip = styled.div`
	position: absolute;
	display: flex;
	align-items: center;
	justify-content: center;
	bottom: 8px;
	right: 8px;
	width: 15px;
	height: 15px;
	padding-top: 1px;
	border-radius: 50%;
	font-size: 0.5em;
	background-color: #750e13;
	color: #ffd7d9;
`;

export const MainLayout: React.FC<{ isLogin?: boolean }> = ({
	isLogin = true,
}) => {
	const location = useLocation();
	const navigate = useNavigate();
	const { logOut } = useContext(AuthContext);

	const { isLightTheme, changeTheme } = useContext(ThemeContext);

	const { user } = useContext(AuthContext);

	return (
		<>
			<Header aria-label='IBM Platform Name'>
				<HeaderName
					prefix='Knowledge-Monitor'
					href='#'
					onClick={!isLogin ? () => {} : () => navigate('/')}
				>
					[v1.2.0]
				</HeaderName>
				{isLogin && (
					<>
						<HeaderNavigation aria-label='IBM [Platform]'>
							<HeaderMenuItem
								href='#'
								onClick={() => navigate('/')}
								isCurrentPage={location.pathname === '/'}
							>
								Главная
							</HeaderMenuItem>
							<HeaderMenuItem
								href='#'
								onClick={() => navigate('/users')}
								isCurrentPage={location.pathname === '/users'}
							>
								Пользователи
							</HeaderMenuItem>
							<HeaderMenuItem
								href='#'
								onClick={() => navigate('/info')}
								isCurrentPage={location.pathname === '/info'}
							>
								Отчеты
							</HeaderMenuItem>
						</HeaderNavigation>
						<HeaderGlobalBar>
							{/* <HeaderGlobalAction aria-label="Search" onClick={() => {}}>
            <Search />
          </HeaderGlobalAction> */}
							<HeaderGlobalAction
								aria-label='Профиль'
								onClick={() => navigate('/me')}
							>
								<UserAvatar />
								{user?.waiting?.length > 0 && (
									<Chip>{user?.waiting?.length}</Chip>
								)}
							</HeaderGlobalAction>
							<HeaderGlobalAction
								aria-label='Сменить тему'
								onClick={changeTheme}
							>
								{isLightTheme ? <Asleep /> : <Light />}
							</HeaderGlobalAction>
							<HeaderGlobalAction aria-label='Выйти' onClick={logOut}>
								<Logout />
							</HeaderGlobalAction>
						</HeaderGlobalBar>
					</>
				)}
			</Header>
			<BodyWrapper>
				<Outlet />
			</BodyWrapper>
		</>
	);
};
