import React from "react";
import Link from "next/link";

interface LinkItemProps {
  href: string;
  label: string;
}

const LinkItem = ({ href, label }: LinkItemProps) => {
  return (
    <li className="p-4 py-7">
      <Link href={href} className="hover:text-primaryColor">
        {label}
      </Link>
    </li>
  );
};

export default LinkItem;
