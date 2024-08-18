"use client";

import React, { memo, useState, useEffect } from "react";
import { CircleX } from "lucide-react";

type Props = {
  error: any;
  duration?: number;
};

const ErrorToastComponent = ({ error, duration = 10000 }: Props) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 w-[10%]">
      <div className="bg-white rounded-lg border border-gray-300 px-6 py-4 max-w-sm w-full">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <CircleX size={18} className="text-red-500 mr-2 font-bold" />
            <p className="font-bold text-gray-800">Error</p>
          </div>
        </div>
        <p className="mt-2 text-sm text-gray-600 font-semibold">
          {error.message}
        </p>
      </div>
    </div>
  );
};

export const ErrorToast = memo(ErrorToastComponent);
