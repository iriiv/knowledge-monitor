export type KMFile = {
	name: string;
	description: string;
	themeId: string;
	estimateId?: string;
	file: File;
};

export type FirebaseFile = {
	id?: string;

	name: string;
	fileUrl: string;
	fileName: string;
	description: string;
	themeId: string;
	estimateId: string;
	format: string;
};
