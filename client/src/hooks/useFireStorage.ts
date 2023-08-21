import {
	deleteObject,
	getDownloadURL,
	ref,
	uploadBytesResumable,
} from 'firebase/storage';
import { useState } from 'react';
import { storage } from '../base';
import { FirebaseFile, KMFile } from '../types/KMFile';
import { useFiles } from './useFiles';

export const useFireStorage = () => {
	const [progress, setProgress] = useState(0);
	const { addFile, deleteFiles } = useFiles();

	const uploadFile = async (kmFile: KMFile, isThemeFile = true) => {
		let fireBaseFile: FirebaseFile;
		const storageRef = ref(
			storage,
			`/${isThemeFile ? 'files' : 'estimates'}/${kmFile.file.name}`
		);
		const uploadSnapshot = await uploadBytesResumable(storageRef, kmFile.file);
		const url = await getDownloadURL(uploadSnapshot.ref);
		if (isThemeFile) {
			fireBaseFile = {
				description: kmFile.description,
				name: kmFile.name,
				fileName: kmFile.file.name,
				fileUrl: url,
				themeId: kmFile.themeId,
				estimateId: '',
				format: `.${kmFile.file.name.split('.').pop()}`,
			};
		} else {
			fireBaseFile = {
				description: kmFile.description,
				name: kmFile.name,
				fileName: kmFile.file.name,
				fileUrl: url,
				themeId: '',
				estimateId: kmFile.estimateId || '',
				format: `.${kmFile.file.name.split('.').pop()}`,
			};
		}
		await addFile(fireBaseFile);
	};

	const deleteStorageFiles = async (
		fileNames: { name: string; id: string }[]
	) => {
		fileNames.forEach(async name => {
			const fileRef = ref(storage, `/files/${name.name}`);
			await deleteObject(fileRef);
		});
		await deleteFiles(fileNames);
	};

	return { progress, uploadFile, deleteStorageFiles };
};
