import React, { Fragment, memo } from "react";
import { MarkdownRender, SourceDocumentLoader } from "..";
import { type Message } from "ai/react";

type Props = {
  messages: Message[];
  isLoading: boolean;
};

const MessageListComponent = ({ messages, isLoading }: Props) => {
  return (
    <>
      {messages.map((message: Message) => (
        <Fragment key={message.id}>
          <div className="my-4">
            {message.role === "user" && (
              <div className="first-letter:uppercase text-3xl leading-relaxed text-sky-800">
                {message.content}
              </div>
            )}

            {message.role === "assistant" && (
              <div
                className={`text-wrap ${
                  isLoading ? "" : "border-b"
                } pb-16 mb-4 w-full overflow-x-hidden`}
              >
                <MarkdownRender markdownContent={message.content} />
              </div>
            )}
          </div>

          {message.role === "user" && (
            <SourceDocumentLoader
              title="Sources"
              key={message.id}
              query={message.content}
            />
          )}
        </Fragment>
      ))}
    </>
  );
};

export const MessageList = memo(MessageListComponent);
