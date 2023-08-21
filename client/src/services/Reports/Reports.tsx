import React, { ReactElement, useEffect, useState } from 'react';
import { useEstimate } from '../../hooks/useEstimate';
import { useUsers } from '../../hooks/useUsers';
import { ConfirmedEstimates } from '../../types/Estimate';

type ReportsContextType = {
	confirmedEstimates: ConfirmedEstimates[];
};
export const ReportsContext = React.createContext<ReportsContextType>({
	confirmedEstimates: [],
});

export const ReportsProvider = (props: { children: ReactElement }) => {
	const [users, setUsers] = useState([]);
	const [estimates, setEstimates] = useState<ConfirmedEstimates[]>([]);

	const { getUsers } = useUsers();
	const { getConfirmedEstimates } = useEstimate();

	useEffect(() => {
		getConfirmedEstimates().then(data => setEstimates(data));
	}, []);

	return (
		<ReportsContext.Provider
			value={{
				confirmedEstimates: estimates,
			}}
		>
			{props.children}
		</ReportsContext.Provider>
	);
};
