import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
import getClient from "../client";
import { getVectorStoreIdsFromDB } from "../database";
import { getEmbeddings } from "../../utils/model-utils";

const DATABASE_TABLE_NAME = "documents";

/**
 * Returns the configuration object for the Supabase vector store database table.
 *
 * @returns {Object} An object containing the Supabase client, table name, and query name.
 */
const getDatabaseClientConfiguration = () => {
  const client = getClient();

  return {
    client,
    tableName: DATABASE_TABLE_NAME,
    queryName: "match_documents",
  };
};

/**
 * Retrieves or creates a new instance of the Supabase vector store database table.
 *
 * @param {boolean} [forceNewInstance=false] - Flag to force the creation of a new instance.
 * @returns {Promise<SupabaseVectorStore | null>} A promise that resolves to the Supabase vector store instance or null if no embedding model is found.
 */
export const getVectorStore = async (forceNewInstance = false) => {
  const config = getDatabaseClientConfiguration();
  const embeddings = getEmbeddings();

  if (embeddings) {
    if (forceNewInstance) {
      return new SupabaseVectorStore(embeddings, config);
    }

    return (
      (await SupabaseVectorStore.fromExistingIndex(embeddings, config)) ??
      new SupabaseVectorStore(embeddings, config)
    );
  } else {
    console.error("No embedding model found");
    return null;
  }
};

/**
 * Adds documents to the Supabase vector store database table.
 *
 * @param {Array<any>} documents - An array of documents to be added.
 * @returns {Promise<void>} A promise that resolves when the documents have been added.
 */
export const addDocumentsToVectorStore = async (documents: Array<any>) => {
  const vectorStore = await getVectorStore();

  if (vectorStore) {
    await vectorStore.addDocuments(documents);
  }
};

/**
 * Creates a new Supabase vector store instance and adds documents to it.
 *
 * @param {Array<any>} documents - An array of documents to be added.
 * @returns {Promise<void>} A promise that resolves when the vector store has been created and the documents have been added.
 */
export const createVectorStore = async (documents: Array<any>) => {
  const vectorStore = await getVectorStore(true);

  if (vectorStore) {
    await vectorStore.addDocuments(documents);
  }
};

/**
 * Deletes documents from the Supabase vector store based on their IDs.
 *
 * @param {string} documentPath - The source path of the document to be deleted.
 * @returns {Promise<{ error?: any }>} A promise that resolves with an error object if an error occurred, or an empty object if successful.
 */
export const deleteVectorStoreByIds = async (
  documentPath: string
): Promise<{ error?: any }> => {
  const vectorStore = await getVectorStore();

  if (vectorStore) {
    const { ids, error } = await getVectorStoreIdsFromDB(documentPath);

    if (error) {
      return { error };
    }

    if (ids) {
      await vectorStore.delete({ ids });
    }
  }

  return {};
};
