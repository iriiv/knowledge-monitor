import { collection, getDocs, getFirestore } from 'firebase/firestore';
import app from '../base';
import { Report } from '../types/Report';

export const useReports = () => {
	const db = getFirestore(app);

	const getReports = async () => {
		const reports = await getDocs(collection(db, 'report'));
		const data = reports.docs.map(f => f.data()) as Report[];
		return data;
	};

	return { getReports };
};
