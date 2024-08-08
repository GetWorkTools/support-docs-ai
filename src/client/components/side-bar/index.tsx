import React, { memo } from "react";
import { default as NextImage } from "next/image";
import { Sparkles } from "lucide-react";
import SideBarNav from "./sidebar-nav";
import { PRODUCT_DESCRIPTION } from "../common/constants";

type Props = {
  isAdminPanel?: boolean;
};

export default memo(function Sidebar({ isAdminPanel }: Props) {
  const PRODUCT_NAME = process.env.NEXT_PUBLIC_PRODUCT_NAME ?? "";
  const PRODUCT_LOGO = process.env.NEXT_PUBLIC_PRODUCT_LOGO ?? "";

  return (
    <div className="fixed left-0 top-0 h-screen w-72 bg-gray-100 flex flex-col border border-slate-200">
      <div className="p-4 mt-2">
        <div className="flex items-center mb-4 gap-2">
          {PRODUCT_LOGO ? (
            <NextImage
              width={50}
              height={50}
              src={PRODUCT_LOGO}
              alt={PRODUCT_NAME}
              className="w-12 h-12 rounded-md"
            />
          ) : (
            <Sparkles size={24} className="text-blue-700" />
          )}

          <a href="/" className="text-xl font-semibold leading-tight">
            {PRODUCT_NAME}
          </a>
        </div>
      </div>

      <SideBarNav isAdminPanel={isAdminPanel} />

      <div className="p-4 mt-auto border-t border-gray-200">
        <p className="text-sm text-gray-600 mb-2">{PRODUCT_DESCRIPTION}</p>
      </div>
    </div>
  );
});
