import "@/styles/globals.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { useRouter } from "next/router";

import Sidebar from "../views/layouts/template/Sidebar";
import type { AppProps } from "next/app";

const queryClient = new QueryClient();

interface PageProps extends AppProps {
  Component: AppProps["Component"] & {
    headerContent?: string;
  };
}

const TO_HIDE_PATH = ["", "/", "/login", "/signup"];

export default function App({ Component, pageProps }: PageProps) {
  const router = useRouter();
  const isHidden = TO_HIDE_PATH.includes(router.pathname);
  const headerContent = Component.headerContent || "";

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex h-screen flex-col overflow-y-hidden sm:flex-row">
        {!isHidden && <Sidebar title={headerContent} />}
        <main className="flex-1 overflow-y-auto">
          <Component {...pageProps} />
        </main>
      </div>
      <div id="global-modal"></div>
    </QueryClientProvider>
  );
}
