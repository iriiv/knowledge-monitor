import axios from 'axios';

export const GroupsService = {
	async getAll() {
		return axios.get('/collections/groups/records');
	},
};
