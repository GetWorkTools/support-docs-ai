import uniqBy from "lodash/uniqBy";
import first from "lodash/first";
import { type DocumentInterface } from "@langchain/core/documents";

const MIN_SIMILARITY_SCORE = 0.55;

/**
 * Extracts the file name from a given document path.
 *
 * @param {string} documentPath - The path of the document.
 * @returns {string} The file name extracted from the document path.
 */
export const getDocumentNameFromPath = (documentPath: string): string => {
  const pathParts = documentPath.split("/");
  return pathParts[pathParts.length - 1];
};

/**
 * Filters an array of document-score pairs based on a minimum similarity score.
 *
 * @param {Array<[DocumentInterface, number]>} docs - An array of document-score pairs.
 * @returns {Array<[DocumentInterface, number]>} An array of document-score pairs that meet the minimum similarity score.
 */
export const filterDocsBasedOnSimilarityScore = (
  docs: Array<[DocumentInterface, number]>,
  similarityScore: number = MIN_SIMILARITY_SCORE
): Array<[DocumentInterface, number]> => {
  return docs.filter((doc) => {
    const [, score] = doc;
    return score > similarityScore;
  });
};

/**
 * Extracts the document objects from an array of document-score pairs.
 *
 * @param {Array<[DocumentInterface, number]>} docs - An array of document-score pairs.
 * @returns {Array<DocumentInterface>} An array of document objects.
 */
export const extractDocuments = (docs: Array<[DocumentInterface, number]>) =>
  docs.map((doc) => first(doc));

/**
 * Generates an array of unique document metadata objects from an array of relevant documents.
 *
 * @param {Array<any>} relevantDocs - An array of relevant documents.
 * @returns {Array<{ documentTitle: string, src: string }>} An array of unique document metadata objects.
 */
export const getUniqueDocumentMetadata = (
  relevantDocs: Array<any>
): Array<{ documentTitle: string; src: string }> => {
  return uniqBy(
    relevantDocs.map((doc) => ({
      documentTitle: getDocumentNameFromPath(doc.metadata.source),
      src: `/api/document?downloadDocumentPath=${doc.metadata.source}`,
    })),
    "documentTitle"
  );
};


export const getDocumentFileExtension = (documentPath: string) => {
  if (documentPath) {
    return documentPath.split(".").pop();
  }
};