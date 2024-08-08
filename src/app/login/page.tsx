"use client";

import React, { memo } from "react";
import { SessionProvider } from "next-auth/react";
import { LoginView } from "@/client";
import { Header, useAnalytics } from "@/client/components";

export default memo(function () {
  useAnalytics();

  return (
    <SessionProvider>
      <main className="bg-grid flex flex-col justify-center min-h-screen">
        <Header />
        <div className="flex flex-col mt-24 items-center flex-1">
          <section>
            <div className="flex">
              <LoginView />
            </div>
          </section>
        </div>
      </main>
    </SessionProvider>
  );
});
