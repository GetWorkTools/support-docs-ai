"use client";

import React, { memo, useMemo, useCallback, useState } from "react";
import { Search } from "lucide-react";
import { DocumentRow, FileUpload, useDocuments } from "./components";
import { Header, Sidebar, ErrorMessage } from "@/client/components";

export default memo(function () {
  const [value, setValue] = useState<string>("");
  const { data, error, loading } = useDocuments();

  const onChange = useCallback((e: any) => {
    setValue(e.target.value);
  }, []);

  const documents = useMemo(() => {
    return data?.filter(
      (x) => value === "" || x.name.toLowerCase().includes(value.toLowerCase())
    );
  }, [data, value]);

  return (
    <div className="flex flex-col min-h-screen leading-relaxed">
      <Header />
      <div className="flex flex-row flex-grow">
        <Sidebar isAdminPanel={true} />
        <div className="w-1/2 flex flex-col mx-auto px-4 py-8">
          <div className="text-2xl font-bold text-gray-800 mb-8">
            Documents Manager
          </div>

          <div className="mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="relative w-full sm:w-64">
              <input
                type="text"
                placeholder="Search documents..."
                value={value}
                onChange={onChange}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            <FileUpload />
          </div>

          {loading && (
            <div className="bg-gray-100 py-4 px-4 rounded-lg w-full h-24 animate-pulse">
              Loading documents....
            </div>
          )}

          {error && <ErrorMessage error={error} />}

          {documents && (
            <div className="rounded-lg border border-gray-200 overflow-hidden">
              <div className="grid grid-cols-5 gap-4 bg-gray-50 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                <div>Document Name</div>
                <div>Size</div>
                <div>Last Modified</div>
                <div>Link</div>
                <div>Action</div>
              </div>

              {documents && documents.length === 0 && (
                <div className="flex p-4 items-center justify-center">
                  No documents found
                </div>
              )}

              <div>
                {documents.map((document: any, index: number) => {
                  return (
                    <DocumentRow
                      key={`${document.name}-${index}`}
                      {...document}
                    />
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});
