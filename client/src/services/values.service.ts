import axios from 'axios';

export const ValuesService = {
	async create(data: any) {
		return axios.post('/collections/values/records', data, {
			headers: { 'Content-Type': 'application/json' },
		});
	},

	async update(id: string, data: any) {
		return axios.patch(`/collections/values/records/${id}`, data, {
			headers: { 'Content-Type': 'application/json' },
		});
	},
};
