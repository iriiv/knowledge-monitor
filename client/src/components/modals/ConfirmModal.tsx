import { Modal, Select, SelectItem } from '@carbon/react';
import { useQuery } from 'react-query';
import { UsersService } from '../../services/users.service';
import { useParams } from 'react-router';
import { useState } from 'react';
import { ModalComponentProps } from './UserModal';

export const ConfirmModal = ({
	closeModal,
	onSubmit,
	isOpen,
	title,
}: ModalComponentProps) => {
	const { id } = useParams();

	const [expert, setExpert] = useState('');

	const { data: users, isLoading } = useQuery(
		'users list',
		() => UsersService.getAll(),
		{
			select: ({ data }): any => data.items,
			onSuccess: data => {
				setExpert(data.filter((user: any) => user.expert.includes(id))[0].id);
			},
		}
	);

	const onFormSubmit = () => {
		onSubmit({ expert });
		closeModal();
	};

	return (
		<Modal
			modalHeading={title}
			primaryButtonText='Ок'
			secondaryButtonText='Отменить'
			open={isOpen}
			onRequestClose={closeModal}
			onRequestSubmit={onFormSubmit}
			passiveModal={false}
			danger={false}
		>
			<p style={{ paddingBottom: '2em' }}>Отправить результаты?</p>
			{!isLoading && (
				<Select
					value={expert}
					onChange={(e: any) => setExpert(e.target.value)}
					size='lg'
					ariaLabel='Dropdown'
					id='carbon-dropdown-example'
					labelText='Выберите эксперта'
				>
					{users
						.filter((user: any) => user.expert.includes(id))
						.map((user: any) => (
							<SelectItem text={user.name} value={user.id} />
						))}
				</Select>
			)}
		</Modal>
	);
};
