"use client";

import { memo } from "react";
import { SessionProvider } from "next-auth/react";
import { useAnalytics } from "@/client/components";
import { Home } from "@/client";

export default memo(function () {
  useAnalytics();

  return (
    <SessionProvider>
      <Home />
    </SessionProvider>
  );
});
