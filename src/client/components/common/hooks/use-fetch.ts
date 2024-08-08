import { useState, useEffect } from "react";
import { getErrorMessage } from "./utils";

type Props = {
  url: string;
  options?: {
    method: string;
    body: string;
  };
};

export default function useFetch<T>({ url, options }: Props) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(url, options);
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

    fetchData();
  }, [url, options]);

  return { data, error, loading };
}
