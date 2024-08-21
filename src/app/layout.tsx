import { Inter } from "next/font/google";
import type { Metadata } from "next";
import { cn } from "@/client/components/common/utils";
import { PRODUCT_DESCRIPTION } from "@/client/components/common/constants";
import { SessionProvider } from "@/client/components/common/providers/session-provider";
import "./globals.css";
import Analytics from "@/client/components/common/analytics";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_PRODUCT_NAME ?? "",
  description: PRODUCT_DESCRIPTION,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(inter.className, "leading-relaxed text-base")}>
        <SessionProvider>
          {children}
          <Analytics />
        </SessionProvider>
      </body>
    </html>
  );
};
