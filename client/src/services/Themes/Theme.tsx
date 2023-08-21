import React, { ReactElement } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';

type ThemeContextType = {
	isLightTheme: boolean;
	changeTheme: () => void;
};
export const ThemeContext = React.createContext<ThemeContextType>({
	isLightTheme: true,
	changeTheme: () => {},
});

export const ThemeProvider = (props: { children: ReactElement }) => {
	const [theme, setTheme] = useLocalStorage('theme', true);

	const changeTheme = () => {
		setTheme(!theme);
	};

	return (
		<ThemeContext.Provider
			value={{
				isLightTheme: theme,
				changeTheme: changeTheme,
			}}
		>
			{props.children}
		</ThemeContext.Provider>
	);
};
