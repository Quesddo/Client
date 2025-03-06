import dynamic from "next/dynamic";
import { ForwardedRef } from "react";
import ReactQuill from "react-quill-new";

import { cn } from "@/utils/cn";

interface ReactQuillNewProps extends ReactQuill.ReactQuillProps {
  forwardedRef?: ForwardedRef<ReactQuill>;
}

const ReactQuillEditor = dynamic(
  async () => {
    const { default: RQ } = await import("react-quill-new");

    const ReactQuillNew = ({ forwardedRef, ...props }: ReactQuillNewProps) => (
      <RQ
        ref={forwardedRef}
        {...props}
        className={cn(
          // container
          "relative flex min-h-0 flex-1 flex-col-reverse gap-4",
          // toolbar, link item
          "[&_.ql-toolbar]:rounded-[22px] [&_.ql-toolbar.ql-snow]:!flex [&_.ql-toolbar.ql-snow_.ql-formats]:last:ml-auto [&_.ql-toolbar.ql-snow_.ql-formats]:last:rounded-full [&_.ql-toolbar.ql-snow_.ql-formats]:last:bg-slate-200",
          // color palette
          "[&_.ql-snow_.ql-picker.ql-expanded_.ql-picker-options]:!top-auto [&_.ql-snow_.ql-picker.ql-expanded_.ql-picker-options]:!bottom-[100%]",
          // content container
          "[&>.ql-container]:min-h-0 [&>.ql-container]:!text-base [&>.ql-container]:!font-normal [&>.ql-container.ql-snow]:!border-none",
          // content, content placeholder
          "[&_.ql-editor]:!p-0 [&_.ql-editor.ql-blank::before]:!left-0",
        )}
      />
    );

    return ReactQuillNew;
  },
  {
    ssr: false,
  },
);

export default ReactQuillEditor;
