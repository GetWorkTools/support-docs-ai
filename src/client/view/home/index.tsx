"use client";

import { memo, useRef, useEffect } from "react";
import { useChat } from "ai/react";
import { Sidebar, SearchBar, Header } from "../../components";
import { GenerateBasic } from "../../components/generate";
import { MessageList } from "@/client/components/messages";

export default memo(function () {
  const containerRef = useRef<any>(null);
  const { messages, ...rest } = useChat({});

  useEffect(() => {
    if (containerRef.current && messages) {
      containerRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [messages]);

  return (
    <div
      className={`${
        messages?.length === 0 ? "bg-custom bg-cover" : ""
      } flex flex-col min-h-screen`}
    >
      <Header />
      <div className="flex flex-row flex-grow">
        <Sidebar />
        <div
          className="flex flex-grow items-center flex-col ml-[12%] mr-[8%] mx-auto w-1/2 my-4 overflow-y-auto"
          ref={containerRef}
        >
          <div className="w-5/12 md:w-1/2 lg:w-5/12 mb-32">
            <div className="flex flex-col">
              <MessageList messages={messages} isLoading={rest.isLoading} />
            </div>
          </div>

          {messages.length === 0 && (
            <div className="fixed bottom-24 p-4 w-5/12">
              <GenerateBasic append={rest.append} />
            </div>
          )}

          <SearchBar {...rest} containerRef={containerRef} />
        </div>
      </div>
    </div>
  );
});
