import {
	Form,
	Modal,
	Select,
	SelectItem,
	Stack,
	TextArea,
	TextInput,
} from '@carbon/react';

export type ModalComponentProps = {
	closeModal: () => void;
	onSubmit: (a: any) => void;
	title: string;
	isOpen: boolean;

	data?: any;
};

import { useContext, useEffect, useState } from 'react';
import { icons } from '../../consts/icons';
import { FirebaseDataContext } from '../../services/Firebase/FirebaseData';
import { AddThemeModel } from '../../types/Theme';
import { useQuery } from 'react-query';
import { GroupsService } from '../../services/groups.service';
import { LoadingPage } from '../../pages/LoadingPage';

export const ThemeModal = ({
	closeModal,
	onSubmit,
	isOpen,
	title,
	data,
}: ModalComponentProps) => {
	const { data: groups, isLoading } = useQuery(
		'groups list',
		() => GroupsService.getAll(),
		{
			select: ({ data }): any => data,
		}
	);

	const [isNameValid, setIsNameValid] = useState(true);

	const [name, setName] = useState('');
	const [link, setLink] = useState('');
	const [group, setGroup] = useState('');
	const [description, setDescription] = useState('');
	const [icon, setIcon] = useState('');

	useEffect(() => {
		initForm();
	}, [data]);

	const onFormSubmit = () => {
		const formValues: AddThemeModel = {
			title: name,
			description,
			icon,
			group: group,
			link,
		};

		if (!formValues.title) {
			setIsNameValid(false);
			return;
		}

		setIsNameValid(true);
		onSubmit({ ...formValues, done: false, topics: [] });
		initForm();
		closeModal();
	};

	const onFormClose = () => {
		initForm();
		closeModal();
	};

	const initForm = async () => {
		setName(data?.title || '');
		setLink(data?.link || '');
		setDescription(data?.description || '');
		setIcon(data?.icon || icons[0]);
		setGroup(data?.groupId || groups.items[0].id);
	};

	if (isLoading) return <LoadingPage />;

	return (
		<Modal
			modalHeading={title}
			primaryButtonText='Сохранить'
			secondaryButtonText='Отменить'
			open={isOpen}
			onRequestClose={onFormClose}
			onRequestSubmit={onFormSubmit}
		>
			<Form onSubmit={onFormSubmit}>
				<Stack gap={7}>
					<TextInput
						value={name}
						onChange={(e: any) => setName(e.target.value)}
						invalid={!isNameValid}
						id='name'
						invalidText='Название обязательно'
						labelText='Название темы'
						placeholder='Название'
					/>
					<TextInput
						value={link}
						onChange={(e: any) => setLink(e.target.value)}
						id='link'
						labelText='Введите ссылку'
						placeholder='Ссылка'
					/>
					<TextArea
						value={description}
						onChange={(e: any) => setDescription(e.target.value)}
						style={{ width: '100%' }}
						cols={50}
						id='description'
						labelText='Введите описание темы'
						placeholder='Описание'
						rows={4}
					/>
					<Select
						value={icon}
						onChange={(e: any) => setIcon(e.target.value)}
						id='icon'
						labelText='Выберите иконку'
					>
						{icons.map(icon => (
							<SelectItem text={icon} value={icon} />
						))}
					</Select>

					<Select
						value={group}
						onChange={(e: any) => setGroup(e.target.value)}
						id='group'
						labelText='Выберите группу'
					>
						{groups.items.map((group: any) => (
							<SelectItem text={group.name} value={group.id} />
						))}
					</Select>
				</Stack>
			</Form>
		</Modal>
	);
};
