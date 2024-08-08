import qs from "qs";
import first from "lodash/first";
import { withAxiom, AxiomRequest } from "next-axiom";
import { getServerSession } from "next-auth";
import {
  deleteDocumentFile,
  downloadDocumentFile,
  getDocumentFileContent,
  getDocumentFiles,
  storeDocumentFiles,
} from "@/server/integrations/storage";
import {
  addDocumentsToVectorStore,
  deleteVectorStoreByIds,
} from "@/server/integrations/vector-store";
import { getDocumentFileExtension } from "@/server/utils";
import { DOCUMENT_FILE_TYPE } from "@/server/integrations/storage/constants";
import { handleUpload, HandleUploadBody } from "@vercel/blob/client";

export const POST = withAxiom(async (req: AxiomRequest) => {
  try {
    const body = (await req.json()) as HandleUploadBody;
    const jsonResponse = await handleUpload({
      body,
      request: req,
      onBeforeGenerateToken: async () => {
        const session = (await getServerSession({ req } as any)) as any;

        if (!session) {
          return {};
        }

        return {
          allowedContentTypes: ["application/pdf"],
          tokenPayload: JSON.stringify({}),
        };
      },
      onUploadCompleted: async ({ blob }) => {
        try {
          const response = await fetch(blob.downloadUrl);
          const fileData = await response.blob();

          const formData = new FormData();
          formData.append("blob", fileData, blob.pathname);
          const files = Array.from(formData.values());

          const [uploadedDocuments, uploadErrors] = await storeDocumentFiles(
            files
          );

          if (uploadErrors?.length > 0 || uploadedDocuments?.length === 0) {
            throw new Error("unable to store the documents");
          }

          const { documents, error } = await getDocumentFileContent(
            first(uploadedDocuments)?.data
          );

          if (error || !documents) {
            throw new Error("unable to parse or get document content", error);
          }

          await addDocumentsToVectorStore(documents);
        } catch (error: any) {
          throw new Error(error);
        }
      },
    });

    return Response.json(jsonResponse);
  } catch (error: any) {
    req.log.error("unable to store documents", error);

    return Response.json(
      { message: (error as Error).message },
      { status: 400 }
    );
  }
});

/**
 * GET route handler for downloading or retrieving document files.
 *
 * @param {AxiomRequest} req - The request object containing the document path in the query string.
 * @returns {Promise<Response>} A response containing either the requested document file or a list of document metadata.
 */
export const GET = withAxiom(async (req: AxiomRequest) => {
  const session = (await getServerSession({ req } as any)) as any;

  if (!session) {
    return Response.json({ message: "access denied" }, { status: 403 });
  }

  const queryString = qs.parse(req.url.split("?")[1]);
  const { downloadDocumentPath } = queryString;

  if (downloadDocumentPath) {
    const { content, error } = await downloadDocumentFile(
      downloadDocumentPath as string
    );

    const extension = getDocumentFileExtension(downloadDocumentPath as string);

    if (!extension) {
      return new Response();
    }

    const headers = new Headers();
    headers.append("Content-Type", DOCUMENT_FILE_TYPE[extension]);
    headers.append(
      "Content-Disposition",
      "inline; filename=" + downloadDocumentPath
    );

    if (error) {
      return Response.json(
        { message: "unable to download the document" },
        { status: 500 }
      );
    }

    return new Response(content, {
      headers,
    });
  }

  const { documentFiles, error } = await getDocumentFiles();

  if (error) {
    req.log.error("unable to get documents", error);

    return Response.json(
      { message: "unable to get documents" },
      { status: 500 }
    );
  }

  return Response.json(documentFiles);
});

/**
 * DELETE route handler for deleting a document.
 *
 * @param {AxiomRequest} req - The request object containing the document name in the query string.
 * @returns {Promise<Response>} A JSON response indicating the success or failure of the document deletion.
 */
export const DELETE = withAxiom(async (req: AxiomRequest) => {
  const queryString = qs.parse(req.url.split("?")[1]);
  const { deleteDocumentName } = queryString;

  if (!deleteDocumentName) {
    return Response.json(
      { message: "no document name found" },
      { status: 400 }
    );
  }

  const { deletedDocument, error } = await deleteDocumentFile(
    deleteDocumentName as string
  );

  if (error) {
    req.log.error("unable to delete document", error);

    return Response.json(
      { message: "unable to delete the document" },
      { status: 500 }
    );
  }

  if (deletedDocument) {
    const result = await deleteVectorStoreByIds(deletedDocument.name);

    if (result?.error) {
      req.log.error("unable to delete document from vector store", error);

      return Response.json(
        { message: "unable to delete the document" },
        { status: 500 }
      );
    }
  }

  return Response.json(deletedDocument, { status: 200 });
});
