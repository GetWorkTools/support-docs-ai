import React, { memo } from "react";
import Link from "next/link";
import { ExternalLink, NotebookPen, SquareArrowUpRight } from "lucide-react";

type Props = {
  isAdminPanel?: boolean;
};

export default memo(function SideBarNav({ isAdminPanel }: Props) {
  if (isAdminPanel) {
    return (
      <nav className="px-4 py-2">
        <Link
          href="/admin"
          className="flex items-center py-2 text-gray-700 space-x-2"
        >
          <NotebookPen size={18} />
          <span>Documents Manager</span>
        </Link>
      </nav>
    );
  }

  return (
    <nav className="px-4 py-2">
      <Link
        href="/"
        target="_blank"
        className="flex items-center py-2 text-gray-700 space-x-2"
      >
        <ExternalLink size={18} />
        <span>New Thread</span>
      </Link>
    </nav>
  );
});
