import useFetch from "../common/hooks/use-fetch";
import { type DocumentMetadata } from "../common/types";

type Props = {
  query: string;
  options?: any;
};

export default function useSourceFetch({ query, options }: Props) {
  const { data, loading } = useFetch<{ metadata: Array<DocumentMetadata> }>({
    url: `/api/chat?options=${JSON.stringify(options ?? {})}&query=${query}`,
  });

  return { data, loading };
}
