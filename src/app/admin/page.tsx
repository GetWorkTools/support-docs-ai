"use client";

import { memo } from "react";
import { SessionProvider } from "next-auth/react";
import { DocumentsManager } from "@/client";
import { useAnalytics } from "@/client/components";

export default memo(function () {
  useAnalytics();

  return (
    <SessionProvider>
      <DocumentsManager />
    </SessionProvider>
  );
});
