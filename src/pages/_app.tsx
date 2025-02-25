import "@/styles/globals.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Toaster from "@/components/organisms/toaster/Toaster";
import ToastProvider from "@/components/organisms/toaster/ToastProvider";

import Sidebar from "../views/layouts/template/Sidebar";
import type { AppProps } from "next/app";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <div className="flex h-screen flex-col overflow-y-hidden sm:flex-row">
          <Sidebar />
          <main className="flex-1 overflow-y-auto">
            <Component {...pageProps} />
            <Toaster />
          </main>
        </div>
        <div id="global-modal"></div>
      </ToastProvider>
    </QueryClientProvider>
  );
}
