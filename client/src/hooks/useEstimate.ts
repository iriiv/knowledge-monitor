import {
	addDoc,
	collection,
	getDocs,
	getFirestore,
	query,
	updateDoc,
	where,
} from 'firebase/firestore';
import app from '../base';
import { ConfirmedEstimates, EstimateDTO } from '../types/Estimate';
import { UserInfo } from '../types/UserInfo';

export const useEstimate = () => {
	const db = getFirestore(app);

	const getEstimates = async () => {
		const reports = await getDocs(collection(db, 'estimates'));
		const data = reports.docs.map(f => f.data()) as EstimateDTO[];
		return data;
	};

	const getConfirmedEstimates = async () => {
		const reports = await getDocs(collection(db, 'confirmed_estimates'));
		const data = reports.docs.map(f => f.data()) as ConfirmedEstimates[];
		return data;
	};

	const getUserEstimates = async (uid: string) => {
		const q = query(
			collection(db, 'estimates'),
			where('userId', '==', uid),
			where('confirmed', '==', true)
		);
		const estimates = await getDocs(q);
		type dataT = EstimateDTO & { id: string };
		const data = estimates.docs.map(f => ({
			...f.data(),
			id: f.id,
		})) as dataT[];
		return data as EstimateDTO[];
	};

	const addEstimate = async (estimate: EstimateDTO) => {
		const docRef = await addDoc(collection(db, 'estimates'), {
			...estimate,
			confirmed: false,
		});
		const q = query(
			collection(db, 'users'),
			where('userId', '==', estimate.userId)
		);
		const users = await getDocs(q);
		const userRef = users.docs.map(d => d.ref)[0];
		const user = users.docs.map(d => d.data())[0] as UserInfo;
		// const tags = Array.from(new Set([...user.tags, estimate.theme]));
		// updateDoc(userRef, {
		// 	tags,
		// });
		await updateDoc(docRef, {
			id: docRef.id,
		});
		return docRef.id;
	};

	const getEstimateById = async (id: string) => {
		const q = query(collection(db, 'estimates'), where('id', '==', id));
		const estimates = await getDocs(q);
		return estimates.docs.map(e => e.data())[0] as EstimateDTO;
	};

	const getUserWaitingExpertEstimates = async (id: string) => {
		const q = query(collection(db, 'estimates'), where('id', '==', id));
	};

	return {
		getUserEstimates,
		addEstimate,
		getEstimateById,
		getEstimates,
		getConfirmedEstimates,
	};
};
