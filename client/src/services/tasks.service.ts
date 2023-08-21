import axios from 'axios';

export const TasksService = {
	// async create(data: any) {
	// 	return axios.post('/collections/estimates/records', data, {
	// 		headers: { 'Content-Type': 'application/json' },
	// 	});
	// },

	async getAll() {
		return axios.get(`/collections/tasks/records/?expand=theme`);
	},
};
