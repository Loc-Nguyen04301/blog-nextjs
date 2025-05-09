"use client";
import React, { useEffect } from "react";
import BlogComponent from "@/components/BlogComponent";
import { useBlogStore } from "@/zustand/stores/blog-store";
import Link from "next/link";
import Image from "next/image";
import ContactSocialMedia from "@/components/ContactSocialMedia";
import { lato } from "@/fonts";
import blogImage from "@/assets/images/backgroundBlog.png";
import { TextField } from "@mui/material";
import { Formik } from "formik";
import defaultImage from "@/assets/images/defaultImage.png";

interface DetailBlogPageClientSide {
  id: string;
}

const DetailBlogPageClientSide = ({ id }: DetailBlogPageClientSide) => {
  const { currentBlog, fetchDetailBlog } = useBlogStore((state) => state);

  useEffect(() => {
    if (id) {
      fetchDetailBlog(id);
    }
  }, [fetchDetailBlog, id]);

  if (currentBlog)
    return (
      <>
        <BlogComponent
          linkTo={`/blog/${currentBlog.id}`}
          title={currentBlog.title}
          thumbnail={String(currentBlog.thumbnail)}
          content={currentBlog.content}
          categories={currentBlog.categories}
          isDetail
        />

        <div className="list-blog">
          <ContactSocialMedia />
          <div className="flex gap-6">
            {Array.from({ length: 3 }, (_, idx) => (
              <div className={`${lato.variable} font-sans`} key={idx}>
                <Link href={"/#"} className="opacity-70 hover:opacity-100">
                  <Image src={blogImage} alt="123" />
                  <p className="text-sm text-black hover:text-primaryColorBold">
                    1 năm viết blog – Những chuyện chưa kể
                  </p>
                  <p className="text-sm text-subTitleColor">July 26, 2017</p>
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div className="comment mt-20">
          <h1 className="uppercase text-xl">Comments</h1>

          <div className="mt-5">
            {Array.from({ length: 5 }, (_, idx) => (
              <div
                className={`${lato.variable} font-sans border-b border-black mb-10 pb-10`}
                key={idx}
              >
                <div className="flex gap-5">
                  <Image src={defaultImage} alt="default-image" width={55} />
                  <div className={`flex flex-col justify-center text-[15px]`}>
                    <span>Phương Thúy says</span>
                    <span
                      className={`font-semibold hover:text-primaryColorBold cursor-pointer border-b border-primaryColorBold`}
                    >
                      December 18, 2022 at 7:41 pm
                    </span>
                  </div>
                </div>
                <p className="mt-6 tracking-wide">
                  con đường Ph.D thật gian nan chị Chi ạ. Cảm ơn chị Chi rất
                  nhiều vì đã cung cấp cho em vào nhiều bạn những thông tin hữu
                  ích. có những điều em đã biết và cũng có nhiều điều em chưa
                  biết. Mỗi lần nghe và đọc những gì chị Chi chia sẻ, em lại cảm
                  thấy rất có giá trị.
                </p>
                <h1 className="pt-7">
                  <span className="border-b border-primaryColorBold cursor-pointer font-semibold hover:text-primaryColorBold">
                    Reply
                  </span>
                </h1>
                <div className="mt-20">
                  <div>
                    <span className="text-xl uppercase tracking-widest">
                      Reply to Ngan Thi Phuong Nguyen
                    </span>
                    <span className="ml-3 border-b uppercase border-primaryColorBold font-semibold hover:text-primaryColorBold cursor-pointer duration-200 tracking-wider">
                      Cancel reply
                    </span>
                  </div>
                  <div className="mt-5 flex flex-col gap-3">
                    <Formik
                      initialValues={{ name: "", email: "", comment: "" }}
                      // validate={(values) => {
                      //   const errors = {};
                      //   if (!values.email) {
                      //     errors.email = "Required";
                      //   } else if (
                      //     !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                      //       values.email
                      //     )
                      //   ) {
                      //     errors.email = "Invalid email address";
                      //   }
                      //   return errors;
                      // }}
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
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isSubmitting,
                      }) => (
                        <form
                          onSubmit={handleSubmit}
                          className="flex flex-col gap-5"
                        >
                          <TextField
                            type="text"
                            label="Name"
                            name="name"
                            variant="filled"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.name}
                            fullWidth
                          />
                          {errors.name && touched.name && errors.name}
                          <TextField
                            type="email"
                            label="Email"
                            name="email"
                            variant="filled"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                            fullWidth
                          />
                          {errors.email && touched.email && errors.email}
                          <TextField
                            type="text"
                            label="Comment"
                            name="comment"
                            variant="filled"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.comment}
                            fullWidth
                            multiline
                            rows={4}
                          />
                          {errors.comment && touched.comment && errors.comment}
                          <button type="submit" disabled={isSubmitting}>
                            Submit
                          </button>
                        </form>
                      )}
                    </Formik>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </>
    );
};

export default DetailBlogPageClientSide;
