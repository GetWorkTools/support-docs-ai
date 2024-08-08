import getClient from "../../client";
import { type PostgrestError } from "@supabase/supabase-js";

const TABLE = "documents";

/**
 * Retrieves the IDs of vector store documents from Supabase database based on the source.
 *
 * @param {string} source - The source path of the document to retrieve.
 * @returns {Promise<{ ids?: string[], error?: PostgrestError }>} A promise that resolves with an object containing the IDs of the documents and any error that occurred.
 */
export const getVectorStoreIdsFromSupabase = async (
  source: string
): Promise<{ ids?: string[]; error?: PostgrestError }> => {
  const supabaseClient = getClient();
  const { data: rows, error } = await supabaseClient
    .from(TABLE)
    .select(`id, metadata->>source`);

  if (error) {
    return { error };
  }

  const ids = rows
    ?.filter((row: any) => row["source"] === source)
    ?.map((row: any) => row.id);

  return { ids };
};

/**
 * Retrieves the content and app UUID of documents from Supabase database based on the app UUID.
 *
 * @returns {Promise<{ contents?: string[], error?: PostgrestError }>} A promise that resolves with an object containing the contents of the documents and any error that occurred.
 */
export const getContentFromSupabase = async (): Promise<{
  contents?: string[] | undefined;
  error?: PostgrestError;
}> => {
  const supabaseClient = getClient();
  const { data, error } = await supabaseClient.from(TABLE).select("content");

  if (error) {
    return { error };
  }

  const contents = data?.map((item: any) => item.content);
  return { contents };
};
