import {
  downloadDocumentFileFromSupaBase,
  getDocumentFilesFromSupaBase,
  storeDocumentFilesInSupaBase,
  deleteDocumentFileFromSupaBase,
  getDocumentFileContentFromSupaBase,
} from "./supabase-storage";

export const storeDocumentFiles = async (documents: Array<any>) => {
  return await storeDocumentFilesInSupaBase(documents);
};

export const getDocumentFiles = async () => {
  return await getDocumentFilesFromSupaBase();
};

export const getDocumentFileContent = async (document: any) => {
  return await getDocumentFileContentFromSupaBase(document);
};

export const downloadDocumentFile = async (documentName: string) => {
  return await downloadDocumentFileFromSupaBase(documentName);
};

export const deleteDocumentFile = async (documentName: string) => {
  return await deleteDocumentFileFromSupaBase(documentName);
};
