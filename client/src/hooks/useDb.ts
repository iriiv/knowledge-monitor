import { getFirestore, collection, getDocs, addDoc, query, where, setDoc, updateDoc, getDoc, deleteDoc, doc } from "firebase/firestore";
import { useState } from "react";

import app from "../base";
import { Theme } from "../types/Theme";

export const useDb = () => {
  const [isLoading, setIsLoading] = useState(false);

  const db = getFirestore(app);

  const getThemeInfo = async (id: string) => {
    setIsLoading(true);
    const q = query(collection(db, "themes"), where("id", "==", id));
    const q2 = query(collection(db, "themesInfo"), where("theme-id", "==", id));
    const theme = await getDocs(q);
    const themeInfo = await getDocs(q2);
    return { ...theme.docs.map(d => d.data())[0], ...themeInfo.docs.map(d => d.data())[0] };
  }

  const getUserAdditionalInfo = async (uid: string) => {
    const q = query(collection(db, "users"), where("user-id", "==", uid));
    const user = await getDocs(q);
    return user.docs.map(d => d.data())[0];
  }

  return { isLoading, getThemeInfo, getUserAdditionalInfo };
}