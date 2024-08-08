import React, { memo } from "react";

type Props = {
  handleClick: (e: any) => void;
};

const SimpleLoginComponent = ({ handleClick }: Props) => {
  return (
    <button
      onClick={handleClick}
      className="bg-white py-2 px-4 border border-gray-300 rounded-md flex items-center justify-center hover:bg-gray-100"
    >
      Log in
    </button>
  );
};

export const SimpleLogin = memo(SimpleLoginComponent);
