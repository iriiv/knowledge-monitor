import axios from 'axios';

export const TopicsService = {
	async getAll() {
		return axios.get('/collections/topics/records');
	},

	async update(id: string, data: any) {
		return axios.patch(`/collections/topics/records/${id}`, data, {
			headers: { 'Content-Type': 'application/json' },
		});
	},
};
