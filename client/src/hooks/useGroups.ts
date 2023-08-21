import { collection, getDocs, getFirestore } from "firebase/firestore";
import { useState } from "react";
import app from "../base";
import { Group } from "../types/Group";

export const useGroups = () => {
  const [isLoading, setIsLoading] = useState(false);

  const db = getFirestore(app);

  const getGroups = async () => {
    setIsLoading(true);
    const groups = await getDocs(collection(db, "groups"));
    setIsLoading(false);
    return groups.docs.map(d => d.data()) as Group[];
  }

  return { isLoading, getGroups };
}