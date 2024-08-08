import React, { memo } from "react";

export default memo(function PoweredBy() {
  return (
    <div className="fixed flex justify-center bottom-2 p-2 w-5/12">
      <span className="text-sm text-gray-500">
        Powered by{" "}
        <a
          className="underline"
          target="_blank"
          href="https://deepmind.google/technologies/gemini/flash/"
        >
          Google Gemini Flash AI Model
        </a>
      </span>
    </div>
  );
});
