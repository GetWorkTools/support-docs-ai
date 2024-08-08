export const ALLOWED_FILE_TYPES = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "text/csv",
];
export const FILE_SIZE_THRESHOLD = 50000000;
export const DOCUMENT_FILES_RETRIEVAL_LIMIT = 100;

export const DOCUMENT_FILE_TYPE: Record<string, string> = {
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  pdf: "application/pdf",
  csv: "text/csv",
};
