"use client";
import { useEffect, useState } from "react";
import AccordionMenu from "../../components/AccordionMenu";
import { usePathname } from "next/navigation";
import useFetchDataBlogLayout from "../hooks/useFetchDataBlogLayout";

const AccordionMenuClient = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    return () => setIsOpen(false);
  }, [pathname]);

  useFetchDataBlogLayout();

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  return <AccordionMenu isOpen={isOpen} handleToggle={handleToggle} />;
};

export default AccordionMenuClient;
