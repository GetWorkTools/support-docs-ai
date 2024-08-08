import first from "lodash/first";
import getClient from "../client";
import {
  ALLOWED_FILE_TYPES,
  DOCUMENT_FILES_RETRIEVAL_LIMIT,
  FILE_SIZE_THRESHOLD,
} from "./constants";
import { getDocumentFileLoader } from "./utils";

const STORAGE_BUCKET = process.env.STORAGE_BUCKET ?? "";
const FOLDER = "documents";

/**
 * Stores document files in the Supabase storage bucket
 *
 * @param {Array<any>} documents - An array of document objects to be stored.
 * @returns {Promise<[any[], any[]]>} A Promise that resolves to an array containing two arrays:
 *   - The first array contains the successfully uploaded document data.
 *   - The second array contains any errors that occurred during the upload process.
 */
export const storeDocumentFilesInSupaBase = async (
  documents: Array<any>
): Promise<[any[], any[]]> => {
  const supabaseClient = getClient();

  const results = await Promise.all(
    documents
      ?.filter(
        (document) =>
          ALLOWED_FILE_TYPES.includes(document.type) &&
          document.size <= FILE_SIZE_THRESHOLD
      )
      .map(async (document) => {
        const { data, error } = await supabaseClient.storage
          .from(STORAGE_BUCKET)
          .upload(`${FOLDER}/${document.name}`, document);

        if (error) {
          return { error };
        }

        return { data };
      })
  );

  return [
    results.filter((result) => result.data),
    results.filter((result) => result.error),
  ];
};

/**
 * Retrieves a list of document files from the Supabase storage bucket
 *
 * @returns {Promise<{ documentFiles: any[], error?: any }>} An object containing an array of document file objects and an optional error.
 */
export const getDocumentFilesFromSupaBase = async (): Promise<{
  documentFiles?: any[];
  error?: any;
}> => {
  const supabaseClient = getClient();

  const { data: documents, error } = await supabaseClient.storage
    .from(STORAGE_BUCKET)
    .list(FOLDER, {
      limit: DOCUMENT_FILES_RETRIEVAL_LIMIT,
      offset: 0,
      sortBy: { column: "name", order: "asc" },
    });

  if (error) {
    return { error };
  }

  const result = documents
    ?.filter((document: any) =>
      ALLOWED_FILE_TYPES.includes(document.metadata.mimetype)
    )
    .map((document: any) => ({
      id: document.id,
      name: document.name,
      size: document.metadata.size,
      lastModified: document.metadata.lastModified,
      src: `/api/document?downloadDocumentPath=${FOLDER}/${document.name}`,
    }));

  return { documentFiles: result };
};

/**
 * Downloads a document file from the Supabase storage bucket.
 *
 * @param {string} documentPath - The path of the document file in the Supabase storage bucket.
 * @returns {Promise<{ content: any, error: any }>} An object containing the downloaded file content and any error that occurred during the operation.
 */
export const downloadDocumentFileFromSupaBase = async (
  documentPath: string
): Promise<{ content: any; error: any }> => {
  const supabaseClient = getClient();

  const { data: content, error } = await supabaseClient.storage
    .from(STORAGE_BUCKET)
    .download(documentPath);

  return { content, error };
};

/**
 * Retrieves the content of a document file from Supabase storage.
 *
 * @param {Object} document - The document object containing the file path.
 * @param {string} document.path - The path of the document file in Supabase storage.
 * @returns {Promise<{ documents: any[], error?: any }>} An object containing an array of document objects and an optional error.
 */
export const getDocumentFileContentFromSupaBase = async (
  document: any
): Promise<{ documents?: any[]; error?: any }> => {
  const { content, error } = await downloadDocumentFileFromSupaBase(
    document.path
  );

  if (error) {
    return { error };
  }

  const documentFileLoader = getDocumentFileLoader(document.path, content);
  const loadedDocs = await documentFileLoader?.load();

  const documents = loadedDocs?.flat().map((doc: any) => ({
    ...doc,
    metadata: {
      ...doc.metadata,
      source: document.path,
    },
    id: document.id,
  }));

  return { documents };
};

/**
 * Deletes a document file from the Supabase storage bucket.
 *
 * @param {string} documentName - The name of the document file to be deleted.
 * @returns {Promise<{ deletedDocument: any, error: any }>} An object containing the deleted document data and any error that occurred during the operation.
 */
export const deleteDocumentFileFromSupaBase = async (
  documentName: string
): Promise<{ deletedDocument: any; error: any }> => {
  const supabaseClient = getClient();

  const { data, error } = await supabaseClient.storage
    .from(STORAGE_BUCKET)
    .remove([`${FOLDER}/${documentName}`]);

  return { deletedDocument: first(data), error };
};
