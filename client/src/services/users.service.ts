import axios from 'axios';

export const UsersService = {
	async getAll() {
		return axios.get('/collections/users/records?expand=expert');
	},

	async getOne(id: string) {
		return axios.get(
			`/collections/users/records/${id}?expand=waiting,waiting.user,waiting.theme,expert`
		);
	},

	async update(id: string, data: any) {
		return axios.patch(`/collections/users/records/${id}`, data, {
			headers: { 'Content-Type': 'application/json' },
		});
	},
};
