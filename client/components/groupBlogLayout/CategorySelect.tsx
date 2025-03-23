"use client";
import { lato } from "@/fonts";
import { useCategoryStore } from "@/zustand/stores/category-store";
import {
  FormControl,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const CategorySelect = () => {
  const router = useRouter();

  const { listCategories, selectedCategory } = useCategoryStore(
    (state) => state
  );

  const handleChangeSelect = (
    event: SelectChangeEvent<typeof selectedCategory>
  ) => {
    const {
      target: { value },
    } = event;
    router.push(`/category/${value}`);
  };

  return (
    <div className="border border-[#000] relative">
      <div className="absolute w-full px-10 top-[-28px]">
        <h1 className="p-5 bg-black text-[#fff] text-center text-xs uppercase tracking-wide top-[">
          Chủ đề
        </h1>
      </div>
      <div className="p-10 pb-7">
        <FormControl fullWidth className="mt-3" variant="filled">
          <Select
            displayEmpty
            value={selectedCategory}
            onChange={handleChangeSelect}
            input={<OutlinedInput />}
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                  width: 400,
                },
              },
            }}
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem className={`${lato.variable} font-sans`} value={""}>
              Select Category
            </MenuItem>
            {listCategories &&
              listCategories.map((c) => (
                <MenuItem
                  key={c.id}
                  value={c.id}
                  className={`${lato.variable} font-sans`}
                >
                  {c.name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </div>
    </div>
  );
};

export default CategorySelect;
