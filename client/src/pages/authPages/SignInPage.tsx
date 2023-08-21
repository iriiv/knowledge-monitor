import {
	Button,
	Form,
	Stack,
	TextInput,
	ToastNotification,
} from '@carbon/react';

import { useContext, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../../hooks/useAuth';
import { AuthContext } from '../../services/Auth';

const ToastWrapper = styled.div`
	position: absolute;
	top: 2em;
	right: 0;
`;

const PageWrapper = styled.div`
	display: flex;
	justify-content: center;
	padding-top: 15%;
	height: 100vh;
`;

export const SigUpLink = styled.div`
	display: flex;
	align-items: center;
	gap: 7px;
`;

const FormWrapper = styled.div`
	width: 25%;
`;

const SignInPage = () => {
	const { login } = useContext(AuthContext);

	const [isToast, setIsToast] = useState(false);
	const [isError, setIsError] = useState(false);

	const loginRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);

	const clickHandler = async () => {
		const email = loginRef.current?.value ?? '';
		const password = passwordRef.current?.value ?? '';
		try {
			await login({ identity: email, password: password });
		} catch (e) {
			setIsToast(true);
			setIsError(true);
		}
	};

	return (
		<>
			<PageWrapper>
				<FormWrapper>
					<Form>
						<Stack gap={7}>
							<h1>Войти</h1>
							<SigUpLink>
								<p>У вас нет аккаунта?</p>
								<Link to='/signup'>Зарегистрироваться</Link>
							</SigUpLink>
							<TextInput
								invalid={isError}
								ref={loginRef}
								id='login'
								onChange={() => {
									setIsError(false);
								}}
								labelText='Электронная почта'
								placeholder='Введите адрес электронной почты'
							/>
							<TextInput.PasswordInput
								ref={passwordRef}
								invalid={isError}
								type='password'
								id='password'
								onChange={() => {
									setIsError(false);
								}}
								labelText='Пароль'
								placeholder='Введите ваш пароль'
								hidePasswordLabel='Скрыть пароль'
								showPasswordLabel='Показать пароль'
							/>
							<Button kind='primary' onClick={clickHandler}>
								Войти
							</Button>
						</Stack>
					</Form>
				</FormWrapper>
			</PageWrapper>

			{isToast && (
				<ToastWrapper>
					<ToastNotification
						iconDescription='describes the close button'
						subtitle={<span>Неверный логин или пароль</span>}
						onClose={() => setIsToast(false)}
						timeout={5000}
						title='Ошибка аутентификации'
					/>
				</ToastWrapper>
			)}
		</>
	);
};
export default SignInPage;
