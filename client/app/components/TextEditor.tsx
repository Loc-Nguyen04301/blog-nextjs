"use client";
import { useFormikContext } from "formik";
import React, { Dispatch, FC, LegacyRef, SetStateAction } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { CreateBlog } from "../types/blog";

interface TextEditorProps {
  body: string;
  setBody: Dispatch<SetStateAction<string>>;
  editorRef: HTMLInputElement | LegacyRef<ReactQuill>;
}

const TextEditor: FC<TextEditorProps> = ({ body, setBody, editorRef }) => {
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
      value={values.content}
      onChange={handleChange}
      ref={editorRef}
    />
  );
};

export default TextEditor;
