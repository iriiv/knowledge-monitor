import React, { ReactElement, useEffect, useState } from 'react';
import { useGroups } from '../../hooks/useGroups';
import { useThemes } from '../../hooks/useThemes';
import { Group } from '../../types/Group';
import { Theme } from '../../types/Theme';

type FirebaseDataContextType = {
	themes: Theme[];
	groups: Group[];
	refetch: () => void;
	isLoading: boolean;
};

export const FirebaseDataContext = React.createContext<FirebaseDataContextType>(
	{
		themes: [],
		groups: [],
		isLoading: false,
		refetch: async () => {},
	}
);

export const FirebaseDataProvider = (props: { children: ReactElement }) => {
	const [themes, setThemes] = useState<Theme[]>([]);
	const [groups, setGroups] = useState<Group[]>([]);

	const { isLoading, getThemes } = useThemes();
	const { getGroups } = useGroups();

	const refetch = async () => {
		const themesData = await getThemes();
		setThemes(themesData);
	};

	useEffect(() => {
		refetch();
		getGroups().then(data => setGroups(data));
	}, []);

	return (
		<FirebaseDataContext.Provider
			value={{
				groups,
				isLoading,
				themes: themes,
				refetch: refetch,
			}}
		>
			{props.children}
		</FirebaseDataContext.Provider>
	);
};
