import axios from 'axios';

export const EstimatesService = {
	async create(data: any) {
		return axios.post('/collections/estimates/records', data, {
			headers: { 'Content-Type': 'application/json' },
		});
	},

	async getOne(id: string) {
		return axios.get(`/collections/estimates/records/${id}?expand=theme`);
	},

	async getOneExpanded(id: string) {
		return axios.get(
			`/collections/estimates/records/${id}?expand=theme,user,values,values.topic`
		);
	},

	async getAll() {
		return axios.get(`/collections/estimates/records/?expand=theme,grade`);
	},

	async getAllByUserId(userId: string) {
		return axios.get(
			`/collections/estimates/records/?expand=theme,grade,values,values.topic&filter=(user="${userId}")`
		);
	},

	async getAllByPage(page: number) {
		return axios.get(
			`/collections/estimates/records/?expand=theme,grade,user,values,values.topic&filter=(confirmed=true)&page=${page}`
		);
	},

	async update(id: string, data: any) {
		return axios.patch(`/collections/estimates/records/${id}`, data, {
			headers: { 'Content-Type': 'application/json' },
		});
	},

	async uploadFile(id: string, file: any) {
		return axios.patch(`/collections/estimates/records/${id}`, file, {
			headers: { 'Content-Type': 'multipart/form-data' },
		});
	},

	async getAllConfirmed() {
		return axios.get(
			`/collections/estimates/records/?expand=theme,grade,user&filter=(confirmed=true)`
		);
	},
};
