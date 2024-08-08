import useLazyFetch from "../../../components/common/hooks/use-lazy-fetch";
import useFetch from "../../../components/common/hooks/use-fetch";

type Params = {
  deleteDocumentName: string;
};

type Response = {
  data: Array<any>;
  loading: boolean;
  error: any;
  lazyFetch?: () => void;
};

export function useDocuments(): Response {
  const { data, loading, error } = useFetch<any>({
    url: "/api/document",
  });

  return {
    data,
    loading,
    error,
  };
}

export function useDeleteDocument({ deleteDocumentName }: Params): Response {
  const { lazyFetch, data, loading, error } = useLazyFetch<any>({
    url: `/api/document?deleteDocumentName=${deleteDocumentName}`,
    options: { method: "DELETE" },
  });

  return {
    lazyFetch,
    data,
    loading,
    error,
  };
}
