import { getUserFromSupabase, saveUserToSupabase } from "./user";
import {
  getContentFromSupabase,
  getVectorStoreIdsFromSupabase,
} from "./vector-store";

export type UserParams = {
  email: string;
  name: string;
};

export const getVectorStoreIdsFromDB = async (source: string) => {
  return await getVectorStoreIdsFromSupabase(source);
};

export const getContentFromDB = async () => {
  return await getContentFromSupabase();
};

export const saveUserToDB = async (user: UserParams) => {
  return await saveUserToSupabase(user);
};

export const getUserFromDB = async (email: string) => {
  return await getUserFromSupabase(email);
};
