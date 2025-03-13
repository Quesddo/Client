import "@/styles/globals.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import Toaster from "@/components/organisms/toaster/Toaster";
import ToastProvider from "@/components/organisms/toaster/ToastProvider";
import { InputModalProvider } from "@/contexts/InputModalContext";
import { TodoListActionProvider } from "@/contexts/TodoListActionContext";
import AuthGuard from "@/views/layouts/AuthGuard";
import Sidebar from "@/views/layouts/sidebar/Sidebar";
import NoteDrawer from "@/views/note/note-drawer/NoteDrawer";
import TodoDrawer from "@/views/todo/todo-drawer/TodoDrawer";
import type { AppProps } from "next/app";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthGuard>
        <ToastProvider>
          <InputModalProvider>
            <TodoListActionProvider>
              <div className="flex h-screen flex-col overflow-y-hidden sm:flex-row">
                <Sidebar />

                <div className="flex-1 overflow-y-auto">
                  <Component {...pageProps} />
                  <NoteDrawer />
                  <TodoDrawer />
                  <Toaster />
                </div>
              </div>
            </TodoListActionProvider>
          </InputModalProvider>
        </ToastProvider>
      </AuthGuard>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
