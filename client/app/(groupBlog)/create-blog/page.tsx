"use client";
import React, { useRef, useState } from "react";
import * as Yup from "yup";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  TextField,
} from "@mui/material";
import { Field, Form, Formik, FormikErrors } from "formik";
import TextEditor from "@/app/components/TextEditor";
import { CreateBlog } from "@/app/types/blog";
import { formatDate } from "@/app/utils/formatDate";
import ErrorMessage from "@/app/components/ErrorMessage";
import BlogComponent from "@/app/components/BlogComponent";

const validationSchema = Yup.object({
  title: Yup.string()
    .required("Title is required")
    .min(10, "Title has at least 10 characters."),
  thumnail: Yup.string().required("Thumnail image is required"),
  categories: Yup.array().min(1, "At least one category must be selected"),
  description: Yup.string()
    .required("Description is required")
    .min(50, "Description has at least 50 characters."),
  content: Yup.string()
    .required("Content is required")
    .min(100, "Content has at least 100 characters."),
});

const CreateBlogPage = () => {
  const initialValues = {
    title: "",
    thumnail: "",
    categories: [],
    description: "",
    content: "",
  } as CreateBlog;
  const createdAt = formatDate(new Date());

  const titleRef = useRef<HTMLInputElement>(null);
  const thumbnailRef = useRef<HTMLInputElement>(null);
  const categoriesRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLInputElement>(null);

  const categoryOptions = [
    { label: "Option 1", id: "1" },
    { label: "Option 2", id: "2" },
    { label: "Option 3", id: "3" },
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
    } else if (errors.categories) {
      categoriesRef?.current?.scrollIntoView({
        behavior: "instant",
        block: "center",
      });
      categoriesRef?.current?.focus();
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
                  <FormControl fullWidth ref={titleRef}>
                    <TextField
                      id="name"
                      name="title"
                      label="Title"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={Boolean(errors.title)}
                    />
                    {errors.title && (
                      <ErrorMessage textContent={errors.title} />
                    )}
                  </FormControl>

                  <FormControl fullWidth ref={thumbnailRef}>
                    <TextField
                      type="file"
                      id="thumnail"
                      name="thumnail"
                      onChange={(e) => {
                        const file = (e?.target as HTMLInputElement).files?.[0];
                        if (file) {
                          console.log({ file });
                          const previewImage = URL.createObjectURL(file);
                          setFieldValue("thumnail", previewImage);
                        }
                      }}
                      onBlur={handleBlur}
                      error={Boolean(errors.thumnail)}
                    />
                    {errors.thumnail && (
                      <ErrorMessage textContent={errors.thumnail} />
                    )}
                  </FormControl>

                  <FormControl fullWidth ref={descriptionRef}>
                    <TextField
                      id="description"
                      name="description"
                      label="Description"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={Boolean(errors.description)}
                      multiline
                    />
                    {errors.description && (
                      <ErrorMessage textContent={errors.description} />
                    )}
                  </FormControl>

                  <FormControl fullWidth ref={categoriesRef}>
                    <FormGroup>
                      {categoryOptions.map((option) => (
                        <FormControlLabel
                          id="categories"
                          label={option.label}
                          key={option.id}
                          name="categories"
                          className="w-fit"
                          control={
                            <Field
                              type="checkbox"
                              value={option.id}
                              as={Checkbox}
                              onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                              ) => {
                                const { value, checked } = e.target;
                                const selectedCategory = checked
                                  ? [...values.categories, value]
                                  : values.categories.filter(
                                      (opt) => opt !== value
                                    );
                                setFieldValue("categories", selectedCategory);
                              }}
                            />
                          }
                        />
                      ))}
                    </FormGroup>
                    {errors.categories && (
                      <ErrorMessage textContent={errors.categories as string} />
                    )}
                  </FormControl>

                  <FormControl
                    fullWidth
                    error={Boolean(errors.content)}
                    ref={contentRef}
                  >
                    <TextEditor
                      className={errors.content && "border border-red-600"}
                    />
                    {errors.content && (
                      <ErrorMessage textContent={errors.content} />
                    )}
                  </FormControl>
                </div>
              </div>
              <div className="col-span-7 max-md:col-span-12 col-start-1">
                <h1 className="font-medium text-lg mb-2">Preview Blog</h1>
                <BlogComponent
                  linkTo={"#"}
                  title={values.title}
                  thumnail={values.thumnail as string}
                  categories={values.categories}
                  description={values.description}
                  content={values.content}
                />
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
