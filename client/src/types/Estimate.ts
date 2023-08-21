export type EstimateDTO = {
	id?: string;
	result: number;
	date: number;

	theme: string;
	themeId: string;
	percentile: number;
	grade: string;
	userId: string;
	values: EstimateValueDTO[];
};

export type EstimateValueDTO = {
	topicId: string;
	value: number;
};

export type ConfirmedEstimates = {
	results: { name: string; value: number }[];
	userId: string;
	userName: string;
};
