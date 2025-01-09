"use client";
import React, { useRef } from "react";
import * as Yup from "yup";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  TextField,
} from "@mui/material";
import { Field, Form, Formik, FormikErrors, FormikHelpers } from "formik";
import TextEditor from "@/components/TextEditor";
import { CreateBlogData } from "@/types/blog";
import ErrorMessage from "@/components/ErrorMessage";
import BlogComponent from "@/components/BlogComponent";
import BlogService from "@/services/BlogService";
import { useAlertStore } from "@/zustand/stores/alert-store";

const validationSchema = Yup.object({
  title: Yup.string()
    .required("Title is required")
    .min(10, "Title has at least 10 characters."),
  thumbnail: Yup.string().required("Thumbnail image is required"),
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
    thumbnail: "",
    categories: [],
    description: "",
    content: "",
  } as CreateBlogData;

  const titleRef = useRef<HTMLInputElement>(null);
  const thumbnailRef = useRef<HTMLInputElement>(null);
  const categoriesRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLInputElement>(null);

  const categoryOptions = [
    { label: "Option 1", id: 1 },
    { label: "Option 2", id: 2 },
    { label: "Option 3", id: 3 },
  ];

  const scrollToError = (errors: FormikErrors<CreateBlogData>) => {
    if (errors.title) {
      titleRef?.current?.scrollIntoView({
        behavior: "instant",
        block: "center",
      });
      titleRef.current?.focus();
    } else if (errors.thumbnail) {
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

  const { addError, setSuccess } = useAlertStore((state) => state);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting, resetForm, setFieldValue }) => {
        try {
          setSubmitting(true);
          const res = await BlogService.createBlog(values);
          setSuccess(res.data.message);
          setFieldValue("thumbnail", "");
          setFieldValue("content", "");
          resetForm();
        } catch (error: any) {
          addError(error.response.data.message);
        }
      }}
    >
      {({
        values,
        errors,
        setFieldValue,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        validateForm,
      }) => {
        const handleFormSubmit = async (
          e: React.FormEvent<HTMLFormElement>
        ) => {
          e.preventDefault();
          const validationErrors = await validateForm();
          if (Object.keys(validationErrors).length > 0) {
            scrollToError(validationErrors);
          } else {
            handleSubmit(e);
          }
        };
        console.log({ values, errors });
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
                      value={values.title}
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
                      id="thumbnail"
                      name="thumbnail"
                      onChange={(e) => {
                        const file = (e?.target as HTMLInputElement).files?.[0];
                        if (file) {
                          const previewImage = URL.createObjectURL(file);
                          setFieldValue("thumbnail", previewImage);
                        } else {
                          setFieldValue("thumbnail", "");
                        }
                      }}
                      onBlur={handleBlur}
                      error={Boolean(errors.thumbnail)}
                    />
                    {errors.thumbnail && (
                      <ErrorMessage textContent={errors.thumbnail} />
                    )}
                  </FormControl>

                  <FormControl fullWidth ref={descriptionRef}>
                    <TextField
                      id="description"
                      name="description"
                      label="Description"
                      onChange={handleChange}
                      value={values.description}
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
                              value={String(option.id)}
                              as={Checkbox}
                              onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                              ) => {
                                const { value, checked } = e.target;
                                const selectedCategory = checked
                                  ? [...values.categories, value]
                                  : values.categories.filter(
                                      (opt) => String(opt) !== value
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
                  thumbnail={values.thumbnail as string}
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
              {isSubmitting ? "Submitting..." : "Create Blog"}
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default CreateBlogPage;
