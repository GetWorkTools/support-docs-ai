"use client";

import React, { memo, useCallback } from "react";
import { useSession } from "next-auth/react";
import { FolderDot } from "lucide-react";
import Login from "../login";

export default memo(function Header() {
  const { data: session } = useSession();

  const onClick = useCallback(() => {
    window.location.href = "/admin";
  }, []);

  return (
    <header className="sticky top-0 bg-white border-b flex flex-col border-b-gray-200 h-16 justify-center">
      <div className="px-4 py-3 flex right-10 flex-end space-x-4">
        <div className="flex-grow" />
        <nav className="flex items-center space-x-4">
          <div className="flex space-x-8 mr-8">
            <a href="/quick-start" className="text-gray-800">
              {"Quick Start"}
            </a>
          </div>
          <Login />
          {session && (
            <button
              className="flex cursor-pointer border border-gray-200 hover:bg-gray-100 py-2 px-4 rounded-lg items-center gap-2"
              onClick={onClick}
            >
              <FolderDot size={18} />
              <span>Documents Manager</span>
            </button>
          )}
        </nav>
      </div>
    </header>
  );
});
