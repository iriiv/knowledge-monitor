import { useQuery } from 'react-query';
import { ThemesService } from '../services/Themes/themes.service';

export const usePBThemes = () => {
	const {
		isLoading,
		data: themes,
		refetch,
	} = useQuery('themes list', () => ThemesService.getAll());

	return { isLoading, themes, refetch };
};
