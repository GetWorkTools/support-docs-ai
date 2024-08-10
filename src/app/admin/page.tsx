"use client";

import { memo } from "react";
import { DocumentsManager } from "@/client";
import { useAnalytics } from "@/client/components";

export default memo(function () {
  useAnalytics();

  return (
    <DocumentsManager />
  );
});
