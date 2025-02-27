import "@/styles/globals.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import AuthGuard from "@/components/AuthGuard";
import Toaster from "@/components/organisms/toaster/Toaster";
import ToastProvider from "@/components/organisms/toaster/ToastProvider";
import { InputModalProvider } from "@/contexts/InputModalContext";

import Sidebar from "../views/layouts/template/Sidebar";
import type { AppProps } from "next/app";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthGuard>
        <ToastProvider>
          <InputModalProvider>
            <Sidebar />
            <main>
              <Component {...pageProps} />
              <Toaster />
            </main>
          </InputModalProvider>
        </ToastProvider>
      </AuthGuard>
    </QueryClientProvider>
  );
}
