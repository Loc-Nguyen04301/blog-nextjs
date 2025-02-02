"use client";
import { useFormikContext } from "formik";
import React, { FC, LegacyRef, useEffect, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { CreateBlogFormValues } from "../types/blog";
import { useAlertStore } from "@/zustand/stores/alert-store";
import { checkImage, imageUpload } from "@/utils/uploadImage";

interface TextEditorProps {
  editorRef?: HTMLInputElement | LegacyRef<ReactQuill>;
  className?: string;
}

const TextEditor: FC<TextEditorProps> = ({ className }) => {
  const { values, setFieldValue } = useFormikContext<CreateBlogFormValues>();
  const quillRef = useRef<ReactQuill>(null);

  const { addError, setLoading } = useAlertStore((state) => state);

  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, false] }],
        ["bold", "italic", "underline", "strike"],
        ["blockquote", "code-block"],
        [
          { list: "ordered" },
          { list: "bullet" },
          { indent: "-1" },
          { indent: "+1" },
        ],
        ["clean", "link", "image", "video"],
      ],
    },
    clipboard: {
      matchVisual: false,
    },
  };

  const handleChange = (value: string) => {
    setFieldValue("content", value);
  };

  const handleImageUpload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";

    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return addError("No file selected.");

      const error = checkImage(file);
      if (error) return addError(error);

      setLoading(true);
      try {
        const response = await imageUpload(file);
        const editor = quillRef.current?.getEditor();
        const range = editor?.getSelection();

        if (range) {
          editor?.insertEmbed(range.index, "image", response.url);
        }
      } catch (error) {
        console.error("Image upload failed:", error);
        addError("Failed to upload image.");
      } finally {
        setLoading(false);
      }
    };

    input.click();
  };

  useEffect(() => {
    const quill = quillRef.current;

    const toolbar = quill?.getEditor().getModule("toolbar");
    toolbar.addHandler("image", handleImageUpload);
  }, []);

  return (
    <ReactQuill
      ref={quillRef}
      theme="snow"
      placeholder="Write somethings..."
      modules={modules}
      formats={[
        "header",
        "font",
        "size",
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        "list",
        "bullet",
        "indent",
        "link",
        "image",
        "video",
        "code-block",
      ]}
      className={className}
      value={values.content}
      onChange={handleChange}
    />
  );
};

export default TextEditor;
