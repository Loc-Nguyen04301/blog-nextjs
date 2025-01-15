"use client";
import React, { useEffect } from "react";

interface BlogByMonthClientSideProps {
  slug: string;
}

const BlogByMonthClientSide = ({ slug }: BlogByMonthClientSideProps) => {
  useEffect(() => {}, []);

  return (
    <div>
      {slug[0]},{slug[1]}
    </div>
  );
};

export default BlogByMonthClientSide;
