import axios from 'axios';

export const ThemesService = {
	async getAll() {
		return axios.get('/collections/themes/records');
	},

	async getAllExpanded() {
		return axios.get('/collections/themes/records?expand=group,topics');
	},

	async getOne(id: string) {
		return axios.get(`/collections/themes/records/${id}?expand=topics`);
	},

	async create(data: any) {
		return axios.post('/collections/themes/records', data, {
			headers: { 'Content-Type': 'application/json' },
		});
	},

	async delete(id: string) {
		return axios.delete(`/collections/themes/records/${id}`);
	},

	async update(id: string, data: any) {
		return axios.patch(`/collections/themes/records/${id}`, data, {
			headers: { 'Content-Type': 'application/json' },
		});
	},
};
