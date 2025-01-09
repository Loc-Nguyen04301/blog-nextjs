"use client";
import { useFormikContext } from "formik";
import React, { FC, LegacyRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { CreateBlogFormValues } from "../types/blog";

interface TextEditorProps {
  editorRef?: HTMLInputElement | LegacyRef<ReactQuill>;
  className?: string;
}

const TextEditor: FC<TextEditorProps> = ({ editorRef, className }) => {
  const { values, setFieldValue } = useFormikContext<CreateBlogFormValues>();

  const modules = {
    toolbar: [
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
  };

  const formats = [
    "header",
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
  ];

  const handleChange = (value: string) => {
    setFieldValue("content", value);
  };

  return (
    <ReactQuill
      theme="snow"
      placeholder="Write somethings..."
      modules={modules}
      formats={formats}
      onChange={handleChange}
      value={values.content}
      className={className}
    />
  );
};

export default TextEditor;
