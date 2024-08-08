import React, { memo, useEffect } from "react";
import { CircleDashed, FileUp } from "lucide-react";
import { ErrorToast } from "@/client/components";
import { useDocumentFileUpload } from "./hooks/use-document-file-upload";

export default memo(function FileUpload() {
  const { data, loading, error, handleChange } = useDocumentFileUpload();

  useEffect(() => {
    if (data && loading === false) {
      window.location.reload();
    }
  }, [data, loading]);

  return (
    <div>
      {error && <ErrorToast error={error} />}

      <label className="cursor-pointer bg-gray-700 hover:bg-gray-800 text-white py-2 px-4 rounded-lg flex items-center space-x-2">
        {!loading && <FileUp size={18} />}
        {loading && (
          <CircleDashed className="animate-spin font-bold" size={18} />
        )}

        <span>Upload Document</span>
        <input
          id="file-upload"
          type="file"
          className="hidden"
          onChange={handleChange}
        />
      </label>
    </div>
  );
});
