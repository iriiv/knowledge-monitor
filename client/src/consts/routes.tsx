import { lazy } from 'react';
import { Navigate, Outlet, useRoutes } from 'react-router-dom';
import { MainLayout } from '../components/MainLayout';
import { CandidatePage } from '../pages/CandidatePage';

const EstimatePage = lazy(() => import('../pages/EstimatePage'));
const ProfilePage = lazy(() => import('../pages/ProfilePage'));
const ResultPage = lazy(() => import('../pages/ResultPage'));
const TaskEditPage = lazy(() => import('../pages/TaskEditPage'));
const ThemePage = lazy(() => import('../pages/ThemePage'));
const ThemesePage = lazy(() => import('../pages/ThemesPage'));
const UserPage = lazy(() => import('../pages/UserPage'));
const UsersPage = lazy(() => import('../pages/UsersPage'));
const SignInPage = lazy(() => import('../pages/authPages/SignInPage'));
const SignUpPage = lazy(() => import('../pages/authPages/SignUpPage'));
const InfoPage = lazy(() => import('../pages/InfoPage'));
const ConfirmPage = lazy(() => import('../pages/ConfirmPage'));
const EstimateProvider = lazy(() => import('../services/Estimates/Estimate'));

type RouterProps = {
	isAuth: boolean;
};

export default function Router({ isAuth }: RouterProps) {
	const routes = [
		{
			path: '/',
			element: isAuth ? <MainLayout /> : <Navigate to='/signin' />,
			children: [
				{
					path: '',
					element: <ThemesePage />,
				},
				{
					path: '/:id',
					element: <ThemePage />,
				},
			],
		},
		{
			path: '/edit',
			element: isAuth ? <MainLayout /> : <Navigate to='/signin' />,
			children: [
				{
					path: ':id',
					element: <TaskEditPage />,
				},
			],
		},
		{
			path: '/me',
			element: isAuth ? <MainLayout /> : <Navigate to='/signin' />,
			children: [
				{
					path: '',
					element: <ProfilePage />,
				},
			],
		},
		{
			path: '/users',
			element: isAuth ? <MainLayout /> : <Navigate to='/signin' />,
			children: [
				{
					path: '',
					element: <UsersPage />,
				},
				{
					path: ':id',
					element: <UserPage />,
				},
			],
		},
		{
			path: '/candidate',
			element: <MainLayout isLogin={false} />,
			children: [
				{
					path: '/candidate/:id',
					element: <CandidatePage />,
				},
			],
		},
		{
			path: '/estimate',
			element: isAuth ? <MainLayout /> : <Navigate to='/signin' />,
			children: [
				{
					path: '/estimate/:id',
					element: (
						<EstimateProvider>
							<EstimatePage />
						</EstimateProvider>
					),
				},
			],
		},
		{
			path: '/confirm',
			element: isAuth ? <MainLayout /> : <Navigate to='/signin' />,
			children: [
				{
					path: '/confirm/:id',
					element: <ConfirmPage />,
				},
			],
		},
		{
			path: '/result',
			element: isAuth ? <MainLayout /> : <Navigate to='/signin' />,
			children: [
				{
					path: '/result/:id',
					element: <ResultPage />,
				},
			],
		},
		{
			path: '/task',
			element: isAuth ? <MainLayout /> : <Navigate to='/signin' />,
			children: [
				{
					path: '/task/:id',
					element: <></>,
				},
			],
		},
		{
			path: '/info',
			element: isAuth ? <MainLayout /> : <Navigate to='/' />,
			children: [{ path: '', element: <InfoPage /> }],
		},
		{
			path: '/signin',
			element: !isAuth ? <Outlet /> : <Navigate to='/' />,
			children: [{ path: '', element: <SignInPage /> }],
		},
		{
			path: '/signup',
			element: !isAuth ? <Outlet /> : <Navigate to='/' />,
			children: [{ path: '', element: <SignUpPage /> }],
		},
	];

	let element = useRoutes(routes);
	return element;
}
