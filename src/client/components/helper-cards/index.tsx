import React, { memo } from "react";

type Props = {
  title: string;
  description: string;
  contents: Array<{
    title: string;
    text: string;
  }>;
};

export default memo(function HelperCards({
  title,
  description,
  contents,
}: Props) {
  return (
    <div className="flex flex-col justify-center items-center my-6">
      <div className="font-semibold text-3xl mb-4">{title}</div>
      <div className="text-xl">{description}</div>
      <div className="flex my-12 flex-col">
        {contents?.map((content, index) => {
          return (
            <div
              key={index}
              className="border border-gray-400 p-3 rounded-lg flex flex-col justify-center mb-4"
            >
              {content.title && (
                <div className="font-semibold mb-2">{content.title}</div>
              )}
              <div className="text-sm">{content.text}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
});
