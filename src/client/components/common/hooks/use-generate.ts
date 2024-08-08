import useFetch from "./use-fetch";

type Params = {
  count: number;
};

export default function useGenerate<T>({ count }: Params) {
  const url = `/api/generate?type=question&count=${count}`;
  const { data, loading, error } = useFetch<T>({ url });

  return { data, loading, error };
}
