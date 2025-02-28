import "@/styles/globals.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import AuthGuard from "@/components/AuthGuard";
import NoteDetail from "@/components/organisms/note-detail/NoteDetail";
import Toaster from "@/components/organisms/toaster/Toaster";
import ToastProvider from "@/components/organisms/toaster/ToastProvider";
import { InputModalProvider } from "@/contexts/InputModalContext";
import Sidebar from "@/views/layouts/sidebar/Sidebar";

import type { AppProps } from "next/app";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthGuard>
        <ToastProvider>
          <InputModalProvider>
            <div className="flex h-screen flex-col overflow-y-hidden sm:flex-row">
              <Sidebar />
              <NoteDetail />

              <main className="flex-1 overflow-y-auto">
                <Component {...pageProps} />
                <Toaster />
              </main>
            </div>
          </InputModalProvider>
        </ToastProvider>
      </AuthGuard>
    </QueryClientProvider>
  );
}
