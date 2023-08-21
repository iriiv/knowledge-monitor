import { addDoc, collection, deleteDoc, doc, getDocs, getFirestore, query, updateDoc, where } from "firebase/firestore";
import { useState } from "react";
import app from "../base";
import { Group } from "../types/Group";
import { AddThemeModel, Theme, ThemeDTO } from "../types/Theme";

export const useThemes = () => {
  const [isLoading, setIsLoading] = useState(false);
  const db = getFirestore(app);

  const getThemes = async () => {
    setIsLoading(true);
    const themesRef = await getDocs(collection(db, "km_themes"));
    const groupsRef = await getDocs(collection(db, "groups"));

    const groups = groupsRef.docs.map(d => d.data()) as Group[];

    const themes = themesRef.docs.map<ThemeDTO>(d => d.data() as ThemeDTO)
    setIsLoading(false);
    return themes.map(theme => ({ ...theme, group: groups.find(g => g.id === theme.groupId) })) as Theme[]
  }

  // const getThemeById = async (uid: string) => {
  //   setIsLoading(true);
  //   const q = query(collection(db, "km_themes"), where("id", "==", uid));
  //   const themeRef = await getDocs(q);
  //   const groupsRef = await getDocs(collection(db, "groups"));
  //   const groups = groupsRef.docs.map(d => d.data()) as Group[];
  //   const theme = themeRef.docs.map(d => d.data())[0] as ThemeDTO;
  //   setIsLoading(false);
  //   return { ...theme, group: groups.find(g => g.id === theme.groupId) } as Theme
  // }

  const addTheme = async (theme: AddThemeModel) => {
    setIsLoading(true);
    const themeRef = await addDoc(collection(db, "km_themes"), theme);
    await updateDoc(themeRef, {
      id: themeRef.id
    });
    setIsLoading(false);
  }

  const deleteTheme = async (uid: string) => {
    setIsLoading(true);
    const docRef = doc(db, "km_themes", uid);
    await deleteDoc(docRef);
    setIsLoading(false);
  }

  const updateTheme = async (theme: ThemeDTO) => {
    const q = query(collection(db, "km_themes"), where("id", "==", theme.id));
    const themeRef = await getDocs(q);

    await updateDoc(themeRef.docs.map(d => d.ref)[0], theme);
  }

  return { isLoading, getThemes, addTheme, updateTheme, deleteTheme };
}