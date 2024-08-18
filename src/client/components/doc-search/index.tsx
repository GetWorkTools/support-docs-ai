"use client";

import React, { memo, useState, useCallback } from "react";
import { TextSearch } from "lucide-react";

type Props = {
  documents: Array<Document>;
  onSearchCompleted: (query: string) => void;
};

/**
 * SearchBar component renders an input field for searching documents.
 * It filters the documents based on the search query and calls the `onSearchCompleted` callback
 * with the query.
 * @component
 * @param {Array<Document>} documents - An array of document objects.
 * @param {string} [placeholder] - The placeholder text for the search input.
 * @param {function} onSearchCompleted - The callback function to be called with the query.
 * @returns {JSX.Element} The rendered SearchBar component.
 */
export default memo(function DocSearch({
  documents,
  onSearchCompleted,
}: Props) {
  const [value, setValue] = useState<string>();

  const onChange = useCallback(
    (e: any) => {
      const query = e.target.value ?? "";
      setValue(query);
    },
    [documents, onSearchCompleted]
  );

  const onKeyDown = useCallback(
    (e: any) => {
      if ((e.key === "Enter" || e.code === "Enter") && value) {
        onSearchCompleted(value);
      }
    },
    [value]
  );

  return (
    <div className="relative w-1/3">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <TextSearch className="w-5 h-5 text-gray-400" />
      </div>
      <input
        type="text"
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        placeholder={"Search documents.."}
        className="w-full pl-10 pr-4 py-2 h-12 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent"
      />
    </div>
  );
});
