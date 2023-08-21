import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, updateProfile, } from "firebase/auth";
import app from "../base";
import { UserInfo } from "../types/UserInfo";
import { useUsers } from "./useUsers";

export const useAuth = () => {
  const auth = getAuth(app);
  const { addUser } = useUsers();

  function logOut() {
    auth.signOut();
  }

  async function signIn(email: string, password: string) {
    const user = await (await signInWithEmailAndPassword(auth, email, password)).user;
    return user;
  }

  async function signUp(email: string, password: string, name: string) {
    const user = await createUserWithEmailAndPassword(auth, email, password);
    const userInfo: any = { name, userId: user.user.uid, email, tags: [] };
    await addUser(userInfo);
  }

  return { auth, logOut, signIn, signUp };
}