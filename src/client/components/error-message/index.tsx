import React, { memo } from "react";

type Props = {
  error: any;
};

const ErrorMessageComponent = ({ error }: Props) => {
  return (
    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg mb-4">
      <div className="flex items-center">
        <svg className="h-6 w-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
            clipRule="evenodd"
          />
        </svg>
        <p className="font-semibold">Error</p>
      </div>
      <p className="mt-2 text-sm">{error.message}</p>
    </div>
  );
};

export const ErrorMessage = memo(ErrorMessageComponent);
