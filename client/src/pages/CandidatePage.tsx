import { useParams } from 'react-router';
import { MainLayout } from '../components/MainLayout';
import ConfirmPage from './ConfirmPage';
import ResultPage from './ResultPage';

export const CandidatePage = () => {
	const { id } = useParams();
	return <ResultPage />;
};
