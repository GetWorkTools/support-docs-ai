import qs from "qs";
import { z } from "zod";
import { generateObject } from "ai";
import { withAxiom, AxiomRequest } from "next-axiom";
import { getLLMModel } from "@/server/utils/model-utils";
import { getContentFromDB } from "@/server/integrations/database";

export const GET = withAxiom(async (req: AxiomRequest) => {
  const queryString = qs.parse(req.url.split("?")[1]);
  const { count } = queryString;

  const { contents, error } = await getContentFromDB();

  if (error) {
    req.log.error("unable to retrieve content from documents", error);

    return Response.json(
      { message: "unable to retrieve content from documents" },
      { status: 500 }
    );
  }

  const context = contents?.join(" ") ?? "";

  if (!context) {
    return Response.json([]);
  }

  const prompt = `
  # Generate ${count ?? 5} starting questions, with each question should be less
    than 25 words and should be related to the context only.
    Only provide a RFC8259 compliant JSON response
    [
      "",
      ...
    ]

  # Context:
    ### CONTEXT ###
       ${context}
    ### END CONTEXT ###
  `;

  const model = getLLMModel();

  if (model) {
    const { object } = await generateObject({
      model,
      maxTokens: 300,
      temperature: 0,
      schema: z.array(z.string()),
      prompt,
    });

    return Response.json(object);
  }

  return Response.json([]);
});
