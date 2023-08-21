import { Button, Form, Stack, TextInput } from '@carbon/react';
import { useContext, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../../hooks/useAuth';
import { SigUpLink } from './SignInPage';
import { AuthContext } from '../../services/Auth';

const PageWrapper = styled.div`
	display: flex;
	justify-content: center;
	padding-top: 15%;
	height: 100vh;
`;

const FormWrapper = styled.div`
	width: 25%;
`;

const SignUpPage = () => {
	const { register } = useContext(AuthContext);

	const [isError, setIsError] = useState(false);

	const loginRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);
	const nameRef = useRef<HTMLInputElement>(null);

	const clickHandler = async () => {
		const email = loginRef.current?.value ?? '';
		const password = passwordRef.current?.value ?? '';
		const name = nameRef.current?.value ?? '';

		if (!name || !password || !email) {
			setIsError(true);
		}
		if (isError) return;

		try {
			await register({
				password: password,
				passwordConfirm: password,
				email: email,
				emailVisibility: true,
				name: name,
			});
		} catch (e) {
			//setIsError(true);
		}
	};

	return (
		<PageWrapper>
			<FormWrapper>
				<Form>
					<Stack gap={7}>
						<h1>Зарегистрироваться</h1>
						<SigUpLink>
							<p>У вас уже есть аккаунт?</p>
							<Link to='/signin'>Войти</Link>
						</SigUpLink>
						<TextInput
							invalid={isError}
							ref={nameRef}
							id='name'
							labelText='Имя'
							placeholder='Имя'
						/>
						<TextInput
							ref={loginRef}
							id='login'
							invalid={isError}
							labelText='Электронная почта'
							placeholder='Введите адрес электронной почты'
						/>
						<TextInput.PasswordInput
							ref={passwordRef}
							type='password'
							id='password'
							invalid={isError}
							invalidText='Необходим пароль'
							labelText='Пароль'
							placeholder='Введите ваш пароль'
							hidePasswordLabel='Скрыть пароль'
							showPasswordLabel='Показать пароль'
						/>
						<Button kind='primary' onClick={clickHandler}>
							Зарегистрироваться
						</Button>
					</Stack>
				</Form>
			</FormWrapper>
		</PageWrapper>
	);
};

export default SignUpPage;
