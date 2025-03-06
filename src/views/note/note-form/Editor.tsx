import "react-quill-new/dist/quill.snow.css";

import { useCallback, useMemo, useRef } from "react";
import { Controller, useFormContext } from "react-hook-form";
import ReactQuill from "react-quill-new";

import { useModalContext } from "@/contexts/InputModalContext";

import ReactQuillEditor from "../editor/ReactQuillEditor";

const toolbarOptions = [
  ["bold", "italic", "underline"],
  [{ align: "" }, { align: "center" }, { align: "right" }],
  [{ list: "bullet" }, { list: "ordered" }],
  [{ color: [] }],
  ["link"],
];

export default function Editor() {
  const { openModal } = useModalContext();
  const methods = useFormContext();
  const editorRef = useRef<ReactQuill>(null);

  const modules = useMemo(
    () => ({
      toolbar: {
        container: toolbarOptions,
        handlers: {
          link: openModal,
        },
      },
    }),
    [],
  );

  const handleChangePlainText = () => {
    methods.setValue(
      "plainText",
      editorRef.current?.getEditor().getText().replace(/\n+$/, ""),
      {
        shouldDirty: false,
      },
    );
  };

  const setEditorRef = useCallback((el: ReactQuill | null) => {
    if (!el) return;
    editorRef.current = el;

    handleChangePlainText();
  }, []);

  return (
    <>
      <Controller
        control={methods.control}
        name="content"
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => (
          <ReactQuillEditor
            forwardedRef={setEditorRef}
            theme="snow"
            modules={modules}
            onChange={(value: string) => {
              onChange(value);
              handleChangePlainText();
            }}
            value={value}
            placeholder="내용을 입력하세요"
          ></ReactQuillEditor>
        )}
      />
      <input type="hidden" defaultValue="" onChange={handleChangePlainText} />
    </>
  );
}
