import React, { memo, useCallback } from "react";
import useGenerate from "../common/hooks/use-generate";

type Props = {
  append: any;
};

export default memo(function GenerateBasic({ append }: Props) {
  const { data, loading } = useGenerate<Array<string>>({ count: 6 });

  const handleOnClick = useCallback((content: string) => {
    content && append({ id: "", role: "user", content });
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-row mx-auto flex-wrap justify-center">
        {loading && (
          <div className="bg-gray-100 py-4 px-4 rounded-lg w-full animate-pulse">
            Generating quick questions...
          </div>
        )}

        {data?.map((value: string) => {
          return (
            <div
              key={value}
              className="cursor-pointer mx-2 rounded-lg border my-2 border-gray-400 p-2 text-sm flex items-center"
              onClick={() => handleOnClick(value)}
            >
              <span>{value}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
});
