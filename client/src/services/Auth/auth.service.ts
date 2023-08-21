import axios from 'axios';

export const AuthService = {
	async login(data: { identity: string; password: string }) {
		return axios.post(
			'/collections/users/auth-with-password?expand=waiting,waiting.user,waiting.theme,expert',
			data,
			{
				headers: { 'Content-Type': 'application/json' },
			}
		);
	},

	async register(data: {
		password: string;
		passwordConfirm: string;
		email: string;
		emailVisibility: boolean;
		name: string;
	}) {
		return axios.post('/collections/users/records', data, {
			headers: { 'Content-Type': 'application/json' },
		});
	},
};
