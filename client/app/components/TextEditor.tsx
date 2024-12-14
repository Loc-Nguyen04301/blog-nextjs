"use client";
import { useFormikContext } from "formik";
import React, { FC, LegacyRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { CreateBlog } from "../types/blog";

interface TextEditorProps {
  editorRef?: HTMLInputElement | LegacyRef<ReactQuill>;
}

const TextEditor: FC<TextEditorProps> = ({ editorRef }) => {
  const { values, setFieldValue } = useFormikContext<CreateBlog>();

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
    />
  );
};

export default TextEditor;
