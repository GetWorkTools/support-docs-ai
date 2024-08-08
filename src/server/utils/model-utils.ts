import { google } from "@ai-sdk/google";
import { openai } from "@ai-sdk/openai";
import { ollama } from "ollama-ai-provider";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { TaskType } from "@google/generative-ai";
import { OpenAIEmbeddings } from "@langchain/openai";

/**
 * Returns an instance of the specified large language model.
 *
 * @returns {import("langchain/llms").BaseLLM | null}
 */
export const getLLMModel = () => {
  const modelName = process.env.LLM_MODEL_NAME;

  switch (modelName) {
    case "phi3":
      return ollama("phi3");
    case "models/gemini-1.5-flash":
      return google("models/gemini-1.5-flash");
    case "gpt-4-turbo":
      return openai("gpt-4-turbo");
    case "gpt-4o":
      return openai("gpt-4-o");
    case "gpt-4o-mini":
      return openai("gpt-4o-mini");
    case "gpt-4":
      return openai("gpt-4");
    case "gpt-3.5-turbo":
      return openai("gpt-3.5-turbo");
    default:
      console.error("no LLM model specified");
      return null;
  }
};

/**
 * Returns an instance of the embeddings model for the specified large language model.
 *
 * @returns {import("langchain/embeddings").Embeddings | undefined}
 */
export const getEmbeddings = () => {
  const modelName = process.env.LLM_MODEL_NAME;

  switch (modelName) {
    case "gpt-4-turbo":
    case "gpt-4o-mini":
    case "gpt-4o":
    case "gpt-4":
    case "gpt-3.5-turbo":
      return new OpenAIEmbeddings({
        apiKey: process.env.OPENAI_API_KEY,
        batchSize: 512,
        dimensions: 768,
        model: "text-embedding-3-small",
        stripNewLines: true,
      });
    case "models/gemini-1.5-flash":
      return new GoogleGenerativeAIEmbeddings({
        model: "text-embedding-004",
        taskType: TaskType.SEMANTIC_SIMILARITY,
        stripNewLines: true,
      });
    default:
      return;
  }
};
