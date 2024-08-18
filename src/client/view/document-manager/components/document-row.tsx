"use client";

import React, { memo, useCallback, useEffect } from "react";
import moment from "moment";
import { CircleDashed, ExternalLink, FileText, Trash2 } from "lucide-react";
import { useDeleteDocument } from "./use-documents";
import { ErrorToast } from "@/client/components";

type Props = {
  name: string;
  size: string;
  lastModified: string;
  src: string;
};

export default memo(function DocumentRow({
  name,
  size,
  lastModified,
  src,
}: Props) {
  const { lazyFetch, data, error, loading } = useDeleteDocument({
    deleteDocumentName: name,
  });

  const onDeleteClick = useCallback(() => {
    lazyFetch?.();
  }, []);

  useEffect(() => {
    if (data && loading === false) {
      window.location.reload();
    }
  }, [data, loading]);

  return (
    <div className="border-b border-gray-200">
      <div className="grid grid-cols-5 gap-4 px-6 py-4">
        <div className="flex items-center space-x-2">
          <FileText size={18} />
          <span className="text-sm font-medium">{name}</span>
        </div>
        <div className="text-sm flex items-center">
          {(Number(size) / 1024).toFixed(2)} kb
        </div>
        <div className="text-sm flex items-center">
          {moment(lastModified).format("MMM Do YY")}
        </div>
        <div className="text-sm font-medium flex items-center space-x-2">
          <a
            href={src}
            target={"_blank"}
            className="text-sky-600 hover:text-sky-900"
          >
            Open
          </a>
          <ExternalLink size={18} />
        </div>
        <div className="text-sm flex items-center gap-2">
          <button onClick={onDeleteClick} disabled={loading}>
            {!loading && <Trash2 size={18} className="text-red-800" />}
            {loading && <CircleDashed className="ftext-red-800 animate-spin" />}
          </button>
          {error && <ErrorToast error={error} />}
        </div>
      </div>
    </div>
  );
});
