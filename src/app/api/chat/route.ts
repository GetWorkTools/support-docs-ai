import qs from "qs";
import { CoreMessage, streamText } from "ai";
import { withAxiom, AxiomRequest } from "next-axiom";
import {
  filterDocsBasedOnSimilarityScore,
  getUniqueDocumentMetadata,
  extractDocuments,
} from "@/server/utils";
import { getLLMModel } from "@/server/utils/model-utils";
import { getVectorStore } from "@/server/integrations/vector-store";

type JsonBody = { messages: CoreMessage[] };

/**
 * POST route handler for the chat API.
 *
 * @param {AxiomRequest} req - The request object containing the request body.
 * @returns {Promise<Response>} A streamed response containing the AI-generated answer based on the provided messages
 **/
export const POST = withAxiom(async (req: AxiomRequest) => {
  const { messages }: JsonBody = await req.json();
  const lastMessage = messages[messages.length - 1] ?? {};

  const vectorStore = await getVectorStore();

  const docs = await vectorStore?.similaritySearchWithScore(
    String(lastMessage.content),
    20
  );

  const mostSimilarDocs = filterDocsBasedOnSimilarityScore(docs ?? []);
  const context = extractDocuments(mostSimilarDocs)
    .map((doc: any) => doc.pageContent)
    .join(" ");

  if (!context) {
    return Response.json({});
  }

  const systemPrompt = `
  # Instructions:
    - Use the following context to answer the question. Do not bring in any outside information.
    - Be very clear in answering the question.
    - Keep the answer concise.
    - Do not repeat the question in the answer.
    - Use bullet points in the answer for readability.
    - Reply should be in markdown.
    - Decline to answer any question that is not directly related to the context.
    - Only answer questions that are strictly relevant to the context.
    - Do not include any preamble or conclusion in the answer.
    - If there is no context, then don't reply.
    - For questions seeking specific data points (e.g., names, numbers, dates, addresses), provide the information exactly as it appears in the context, even if it's a single item.

  # Context:
    ### CONTEXT ###
       ${context}
    ### END CONTEXT ###
  `;

  const model = getLLMModel();

  if (model) {
    const result = await streamText({
      model,
      maxTokens: 1600,
      temperature: 0,
      system: systemPrompt,
      messages,
    });

    return result.toAIStreamResponse();
  }

  return new Response("no llm model specified", { status: 500 });
});

/**
 * GET route handler for the chat API.
 *
 * @param {AxiomRequest} req - The request object.
 * @returns {Promise<Response>} A JSON response containing the metadata of the most similar
 * documents from vector store based on query.
 */
export const GET = withAxiom(async (req: AxiomRequest) => {
  const queryString = qs.parse(req.url.split("?")[1]);
  const { query } = queryString;

  const vectorStore = await getVectorStore();
  const docs = await vectorStore?.similaritySearchWithScore(String(query), 10);
  const mostSimilarDocs = filterDocsBasedOnSimilarityScore(docs ?? [], 0.6);
  const metadata = getUniqueDocumentMetadata(extractDocuments(mostSimilarDocs));

  return Response.json({ metadata });
});
