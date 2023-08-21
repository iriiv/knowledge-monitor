import styled from 'styled-components';
import { Topic } from '../types/Topic';

import { Link, UnorderedList, ListItem } from '@carbon/react';
import { useEffect, useState } from 'react';
import { useUsers } from '../hooks/useUsers';
import { UserInfo } from '../types/UserInfo';
import { useQuery } from 'react-query';
import { UsersService } from '../services/users.service';

const Title = styled.div`
	padding: 1em 0;
`;
const Wrapper = styled.div`
	display: flex;
	justify-content: space-between;
	min-height: 30vh;
	max-height: 40vh;
`;

const TextWrapper = styled.div`
	width: 70%;
`;

const ExpertsWrapper = styled.div`
	align-items: end;
`;

type EstimateInfoComponentProps = {
	topic: Topic;
	theme: any;
};
export const EstimateInfoComponent = ({
	topic,
	theme,
}: EstimateInfoComponentProps) => {
	const { data: users, isLoading } = useQuery(
		'users list',
		() => UsersService.getAll(),
		{
			select: ({ data }): any => data.items,
		}
	);

	if (isLoading) return <></>;

	return (
		<Wrapper>
			<TextWrapper>
				<Title>
					<Link href={topic.link} target='_blank'>
						<h3>{topic.title}</h3>
					</Link>
				</Title>
				<p>{topic.description}</p>
			</TextWrapper>
			<ExpertsWrapper>
				<p>Эксперты</p>
				<UnorderedList>
					{users
						.filter((user: any) => user.expert.includes(theme.id))
						.map((expert: any) => (
							<ListItem>{expert.name}</ListItem>
						))}
				</UnorderedList>
			</ExpertsWrapper>
		</Wrapper>
	);
};
