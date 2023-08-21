import { Theme } from '../types/Theme';

export const getTags = (themes: Theme[]) =>
	themes.map(t => ({
		id: t.id,
		label: t.title,
	}));

export const groupBy = <T, K extends keyof any>(arr: T[], key: (i: T) => K) =>
	arr.reduce((groups, item) => {
		(groups[key(item)] ||= []).push(item);
		return groups;
	}, {} as Record<K, T[]>);
