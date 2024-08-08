import React, { memo } from "react";
import DocumentCard from "./document-card";
import { type DocumentMetadata } from "../common/types";

type Props = {
  documents: Array<DocumentMetadata>;
};

export default memo(function DocumentList({ documents }: Props) {
  return (
    <div className="flex gap-4">
      {documents?.map((documentMeta: DocumentMetadata) => {
        return (
          <DocumentCard
            key={documentMeta.documentTitle}
            documentMeta={documentMeta}
          />
        );
      })}
    </div>
  );
});
