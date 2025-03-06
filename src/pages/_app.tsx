import "@/styles/globals.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import AuthLayer from "@/components/AuthLayer";
import NoteDetail from "@/components/organisms/note-detail/NoteDetail";
import Toaster from "@/components/organisms/toaster/Toaster";
import ToastProvider from "@/components/organisms/toaster/ToastProvider";
import { InputModalProvider } from "@/contexts/InputModalContext";
import Sidebar from "@/views/layouts/sidebar/Sidebar";
import NoteDrawer from "@/views/note/note-drawer/NoteDrawer";
import type { AppProps } from "next/app";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthLayer>
        <ToastProvider>
          <InputModalProvider>
            <div className="flex h-screen flex-col overflow-y-hidden sm:flex-row">
              <Sidebar />
              <NoteDetail />

              <main className="flex-1 overflow-y-auto">
                <Component {...pageProps} />
                <NoteDrawer />
                <Toaster />
              </main>
            </div>
          </InputModalProvider>
        </ToastProvider>
      </AuthLayer>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
