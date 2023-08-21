import axios from 'axios';

export const GradesService = {
	async getAll() {
		return axios.get('/collections/grades/records');
	},
};
