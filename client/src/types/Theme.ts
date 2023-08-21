import { Group } from './Group';
import { Topic } from './Topic';

export type ThemeDTO = {
	description: string;
	groupId: string;
	icon: string;
	id: string;
	title: string;
	link: string;

	topics: Topic[];
};

export type Theme = {
	description: string;
	group: Group;
	icon: string;
	id: string;
	title: string;
	link: string;

	topics: Topic[];
};

export type AddThemeModel = {
	description: string;
	group: string;
	icon: string;
	title: string;
	link: string;
};
