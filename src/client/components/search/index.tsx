"use client";

import React, { memo, useCallback } from "react";
import { Sparkles, CircleArrowUp, CircleDashed } from "lucide-react";
import PoweredBy from "./powered-by";

type Props = {
  input: any;
  handleSubmit: any;
  handleInputChange: any;
  isLoading: boolean;
  containerRef: any;
  stop: any;
  append: any;
  setInput: any;
};

export default memo(function SearchBar({
  input,
  handleSubmit,
  handleInputChange,
  isLoading,
  append,
  setInput,
  containerRef,
}: Props) {
  const scrollUp = useCallback(() => {
    if (containerRef.current) {
      containerRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, []);

  const onKeyDown = useCallback((e: any) => {
    if (e.key === "Enter" && e.target.value) {
      append({
        id: "",
        role: "user",
        content: e.target.value,
      });
      setInput("");
    }
  }, []);

  return (
    <>
      <div className="fixed bottom-6 p-4 w-5/12">
        <form onSubmit={handleSubmit}>
          <div className="relative flex items-center rounded-full border border-gray-400 shadow-lg bg-white">
            <div className="absolute left-4 top-4 flex items-center">
              {!isLoading && <Sparkles size={24} className="text-blue-700" />}
              {isLoading && (
                <CircleDashed className="mr-4 text-slate-500 font-bold animate-spin" />
              )}
            </div>
            <textarea
              onChange={handleInputChange}
              placeholder="Ask from your documents"
              className="w-full resize-none overflow-hidden rounded-full px-12 py-4 focus:outline-none"
              rows={1}
              value={input}
              onKeyDown={onKeyDown}
              disabled={isLoading}
            />
            <button onClick={scrollUp} disabled={isLoading}>
              <CircleArrowUp className="mr-4 text-gray-700 font-semibold" />
            </button>
          </div>
        </form>
      </div>
      <PoweredBy />
    </>
  );
});
