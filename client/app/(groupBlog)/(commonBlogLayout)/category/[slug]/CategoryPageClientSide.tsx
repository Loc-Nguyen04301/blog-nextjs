"use client";
import React from "react";

interface CategoryPageClientSide {
  slug: string;
}
const CategoryPageClientSide = ({ slug }: CategoryPageClientSide) => {
  console.log({ slug });
  return <div>CategoryPageClientSide</div>;
};

export default CategoryPageClientSide;
