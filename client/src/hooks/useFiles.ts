import { addDoc, collection, deleteDoc, doc, getDocs, getFirestore, query, setDoc, where } from "firebase/firestore";
import app from "../base";
import { FirebaseFile, KMFile } from "../types/KMFile";

export const useFiles = () => {
  const db = getFirestore(app);

  const getFiles = async () => {
    const files = await getDocs(collection(db, "files"));
    const data = files.docs.map(f => ({ ...f.data(), id: f.id })) as FirebaseFile[];
    return data;
  }

  const getFilesByThemeId = async (id: string) => {
    const q = query(collection(db, "files"), where("themeId", "==", id));
    const files = await getDocs(q);
    const data = files.docs.map(f => ({ ...f.data(), id: f.id })) as FirebaseFile[];
    return data;
  }

  const addFile = async (file: FirebaseFile) => {
    await addDoc(collection(db, "files"), file);
  }

  const deleteFiles = async (fileNames: { name: string, id: string }[]) => {
    fileNames.forEach(async (file) => {
      const docRef = doc(db, "files", file.id);
      await deleteDoc(docRef);
    })
  }

  return { getFiles, getFilesByThemeId, deleteFiles, addFile }
}