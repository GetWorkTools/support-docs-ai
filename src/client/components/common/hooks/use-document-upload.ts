import { useState } from "react";
import { upload } from "@vercel/blob/client";
import { getErrorMessage } from "./utils";

export default function useDocumentUpload() {
  const shouldUseVerselStorage =
    process.env.NEXT_PUBLIC_USE_VERSEL_STORAGE === "true";

  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const documentFileUpload = async (file: any) => {
    setLoading(true);
    setError(null);

    if (shouldUseVerselStorage) {
      const response = await upload(file.name, file, {
        access: "public",
        handleUploadUrl: "/api/document",
      });

      console.log(response);
      setData(response);
      setLoading(false);
    } else {
      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("fileName", file.name);

        const response = await fetch("/api/document", {
          method: "POST",
          body: formData,
        });
        const data = await response.json();

        if (!response.ok) {
          const errorMessage = getErrorMessage(data, response);
          throw new Error(errorMessage);
        }

        setData(data);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    }
  };

  return { documentFileUpload, data, loading, error };
}
