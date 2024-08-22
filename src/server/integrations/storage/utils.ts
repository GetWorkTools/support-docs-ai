import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { DocxLoader } from "@langchain/community/document_loaders/fs/docx";
import { CSVLoader } from "@langchain/community/document_loaders/fs/csv";
import { PPTXLoader } from "@langchain/community/document_loaders/fs/pptx";

export const getDocumentFileLoader = (
  documentFileName: string,
  content: string
) => {
  switch (documentFileName.split(".").pop()?.toLowerCase()) {
    case "pdf":
      return new PDFLoader(content ?? "");
    case "docx":
      return new DocxLoader(content ?? "");
    case "csv":
      return new CSVLoader(content ?? "");
    case ".pptx":
      return new PPTXLoader(content ?? "");
  }
};
