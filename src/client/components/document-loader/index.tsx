"use client";

import React, { memo } from "react";
import { FileText } from "lucide-react";
import useSourceFetch from "./use-source-fetch";
import DocumentList from "./document-list";

type Props = {
  title: string;
  query: string;
  options?: {};
};

export default memo(function SourceDocumentLoader({
  title,
  query,
  options,
}: Props) {
  const { data, loading } = useSourceFetch({ query, options });

  return (
    <div>
      <div className="flex flex-row space-x-2 items-center my-4">
        <FileText size={18} />
        <span>{title}</span>
      </div>

      {loading && (
        <div className="bg-gray-100 py-4 px-4 rounded-lg w-full animate-pulse">
          Answering....
        </div>
      )}

      {data && data.metadata.length > 0 && (
        <DocumentList documents={data.metadata} />
      )}

      {data && data.metadata.length === 0 && (
        <div>No information found from the given set of documents</div>
      )}
    </div>
  );
});
