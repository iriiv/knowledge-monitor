import { UnorderedList, ListItem } from '@carbon/react';
import styled from 'styled-components';
import { UserInfo } from '../../types/UserInfo';

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 2em;
`;

export const UserInfoTable = ({ user }: { user: any }) => {
	return (
		<Wrapper>
			{/* <UnorderedList>
        <ListItem>
          Директорат
          <UnorderedList nested>
            <ListItem>Отдел региона CE</ListItem>
            <UnorderedList nested>
              <ListItem>
                Направление бизнес-услуг и услуг по приложениям
              </ListItem>
            </UnorderedList>
          </UnorderedList>
        </ListItem>
      </UnorderedList> */}
			<p>
				E-mail: {user?.email}
				<br />
				{user?.phone && `Телефон: ${user?.phone}`}
				<br />
			</p>
		</Wrapper>
	);
};
