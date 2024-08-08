import { useState } from "react";
import { getErrorMessage } from "./utils";

type Props = {
  url: string;
  options?: {
    method: string;
  };
};

export default function useLazyFetch<T>({ url, options }: Props) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const lazyFetch = async (body?: Record<string, any>) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(url, {
        ...options,
        body: body ? JSON.stringify(body) : undefined,
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
  };

  return { lazyFetch, data, loading, error };
}
