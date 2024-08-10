"use client";

import { memo } from "react";
import { useAnalytics } from "@/client/components";
import { Home } from "@/client";

export default memo(function () {
  useAnalytics();

  return (
    <Home />
  );
});
