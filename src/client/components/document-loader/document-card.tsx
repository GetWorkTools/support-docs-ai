"use client";

import React, { memo, useCallback } from "react";
import { ExternalLink } from "lucide-react";
import { type DocumentMetadata } from "../common/types";

type Props = {
  documentMeta: DocumentMetadata;
};

export default memo(function DocumentCard({ documentMeta }: Props) {
  const onClick = useCallback(() => {
    window.open(documentMeta.src, "_blank");
  }, []);

  return (
    <div
      className="text-sm text-wrap rounded-md border border-slate-200 overflow-hidden cursor-pointer bg-gray-100"
      onClick={onClick}
    >
      <div className="p-2">
        <div className="flex space-x-2 items-center">
          <div className="text-gray-600">{documentMeta.documentTitle}</div>
          <ExternalLink size={18} />
        </div>
      </div>
    </div>
  );
});
