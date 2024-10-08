import { Suspense } from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ConvexClientProvider } from "@/components/providers/convex-client-provider";
import { Toaster } from "@/components/ui/sonner";
import { ModalProvider } from "@/components/providers/modal-provider";
import { Loading } from "@/components/auth/loading";
import { ClerkProvider, SignIn } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "A Whiteboard tool - Boardify",
  description: "Inspired by Code With Antonio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider afterSignOutUrl={"/homepage"} signInForceRedirectUrl={"/homepage"} signUpForceRedirectUrl={"/homepage"}>
      <html lang="en">
        <body className={inter.className}>
          <Suspense fallback={<Loading />}>
            <ConvexClientProvider>
              <Toaster />
              <ModalProvider />
              {children}
            </ConvexClientProvider>
          </Suspense>
        </body>
      </html>
    </ClerkProvider>
  );
}
