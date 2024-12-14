"use client";
import React, { useRef, useState } from "react";
import * as Yup from "yup";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  TextField,
} from "@mui/material";
import { ErrorMessage, Field, Form, Formik, FormikErrors } from "formik";
import Image from "next/image";
import Link from "next/link";
import { lato } from "@/app/fonts";
import TextEditor from "@/app/components/TextEditor";
import { CreateBlog } from "@/app/types/blog";
import ReactQuill from "react-quill";
import isEqual from "lodash/isEqual";

const validationSchema = Yup.object({
  title: Yup.string()
    .required("Title is required")
    .min(10, "Title has at least 10 characters."),
  thumnail: Yup.string().required("Thumnail image is required"),
  category: Yup.array().min(1, "At least one category must be selected"),
  description: Yup.string()
    .required("Description is required")
    .min(50, "Description has at least 50 characters."),
  content: Yup.string()
    .required("Content is required")
    .min(100, "Content has at least 100 characters."),
});

const CreateBlogPage = () => {
  const [preview, setPreview] = useState<string>();
  const initialValues = {
    title: "",
    thumnail: "",
    category: [],
    description: "",
    content: "",
  } as CreateBlog;

  const titleRef = useRef<HTMLInputElement>(null);
  const thumbnailRef = useRef<HTMLInputElement>(null);
  const categoryRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLInputElement>(null);

  const categoryOptions = [
    { label: "Option 1", value: "1" },
    { label: "Option 2", value: "2" },
    { label: "Option 3", value: "3" },
  ];

  const scrollToError = (errors: FormikErrors<CreateBlog>) => {
    if (errors.title) {
      titleRef?.current?.scrollIntoView({
        behavior: "instant",
        block: "center",
      });
      titleRef.current?.focus();
    } else if (errors.thumnail) {
      thumbnailRef?.current?.scrollIntoView({
        behavior: "instant",
        block: "center",
      });
      thumbnailRef?.current?.focus();
    } else if (errors.category) {
      categoryRef?.current?.scrollIntoView({
        behavior: "instant",
        block: "center",
      });
      categoryRef?.current?.focus();
    } else if (errors.description) {
      descriptionRef?.current?.scrollIntoView({
        behavior: "instant",
        block: "center",
      });
      descriptionRef?.current?.focus();
    } else if (errors.content) {
      contentRef?.current?.scrollIntoView({
        behavior: "instant",
        block: "center",
      });
      contentRef?.current?.focus();
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      // disable immediately validation input when typing input
      // validateOnChange={false}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      {({
        values,
        errors,
        touched,
        setFieldValue,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        validateForm,
      }) => {
        console.log({ values, errors, touched });
        const handleFormSubmit = async (
          e: React.FormEvent<HTMLFormElement>
        ) => {
          e.preventDefault();
          const validationErrors = await validateForm();
          console.log({ validationErrors });
          if (Object.keys(validationErrors).length > 0) {
            scrollToError(validationErrors);
          } else {
            handleSubmit(e);
          }
        };

        return (
          <Form onSubmit={handleFormSubmit} className="flex flex-col gap-5">
            <div className="grid grid-cols-11 gap-5">
              <div className="col-span-7 max-md:col-span-12 col-start-1">
                <h1 className="font-medium text-lg mb-2">Create Blog</h1>
                <div className="flex flex-col gap-5">
                  <FormControl
                    fullWidth
                    error={Boolean(errors.title)}
                    ref={titleRef}
                  >
                    <TextField
                      id="name"
                      name="title"
                      label="Title"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={Boolean(errors.title)}
                    />
                    <ErrorMessage name="title" component={FormHelperText} />
                  </FormControl>

                  <FormControl
                    fullWidth
                    error={Boolean(errors.thumnail)}
                    ref={thumbnailRef}
                  >
                    <TextField
                      type="file"
                      id="thumnail"
                      name="thumnail"
                      onChange={(e) => {
                        const file = (e?.target as HTMLInputElement).files?.[0];
                        if (file) {
                          console.log({ file });
                          const previewImage = URL.createObjectURL(file);
                          console.log({ previewImage });
                          setFieldValue("thumnail", file.name);
                          setPreview(previewImage);
                        }
                      }}
                      onBlur={handleBlur}
                      error={Boolean(errors.thumnail)}
                    />

                    <ErrorMessage name="thumnail" component={FormHelperText} />
                  </FormControl>

                  <FormControl
                    fullWidth
                    error={Boolean(errors.description)}
                    ref={descriptionRef}
                  >
                    <TextField
                      id="description"
                      name="description"
                      label="Description"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={Boolean(errors.description)}
                      multiline
                    />
                    <ErrorMessage
                      name="description"
                      component={FormHelperText}
                    />
                  </FormControl>

                  <FormControl
                    fullWidth
                    error={Boolean(errors.category)}
                    ref={categoryRef}
                  >
                    <FormGroup>
                      {categoryOptions.map((option) => (
                        <FormControlLabel
                          id="category"
                          label={option.label}
                          key={option.value}
                          name="category"
                          control={
                            <Field
                              type="checkbox"
                              value={option.value}
                              as={Checkbox}
                              onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                              ) => {
                                const { value, checked } = e.target;
                                const selectedCategory = checked
                                  ? [...values.category, value]
                                  : values.category.filter(
                                      (opt) => opt !== value
                                    );
                                setFieldValue("category", selectedCategory);
                              }}
                            />
                          }
                        />
                      ))}
                    </FormGroup>
                    <ErrorMessage name="category" component={FormHelperText} />
                  </FormControl>

                  <FormControl
                    fullWidth
                    error={Boolean(errors.content)}
                    ref={contentRef}
                  >
                    <TextEditor />
                    <ErrorMessage name="content" component={FormHelperText} />
                  </FormControl>
                </div>
              </div>
              <div className="col-span-7 max-md:col-span-12 col-start-1">
                <h1 className="font-medium text-lg mb-2">Preview Blog</h1>
                <div className={"pb-16 mb-16"}>
                  <div className="text-center">
                    <h1 className="uppercase text-2xl mb-2">
                      <Link href={`#`}>{values.title}</Link>
                    </h1>
                    <p
                      className={`uppercase text-xs text-subTitleColor mb-2 font-medium tracking-wider ${lato.variable} font-sans`}
                    >
                      March 6, 2024 By Lộc Nguyễn 10 comments
                    </p>
                    {preview && (
                      <Image
                        src={preview}
                        alt="thumnaiblog"
                        fill
                        className="!static"
                      />
                    )}
                    <div className="mt-3 border-b border-[#dd9933]"></div>
                  </div>
                  <div
                    className={`mt-3 leading-7 ${lato.variable} font-sans text-wrap`}
                  >
                    <p className="break-words">
                      {values.description}...
                      <Link
                        href={`#`}
                        className="hover:text-primaryColor font-semibold ml-1"
                      >
                        [Read more ...]
                      </Link>
                    </p>
                  </div>
                  <div
                    className="mt-3"
                    dangerouslySetInnerHTML={{
                      __html: values.content,
                    }}
                  />
                  <p className={`mt-5 text-subTitleColor`}>
                    <span className="mr-1">Category:</span>
                    {values.category.map((selectedCategory) => {
                      const option = categoryOptions.find(
                        (opt) => opt.value === selectedCategory
                      );
                      return (
                        option && (
                          <Link href="/#" key={option.value}>
                            {option.label},{" "}
                          </Link>
                        )
                      );
                    })}
                  </p>
                </div>
              </div>
            </div>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isSubmitting}
              size="large"
            >
              Submit
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default CreateBlogPage;
