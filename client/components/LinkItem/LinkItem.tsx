import React from "react";
import Link from "next/link";

interface LinkItemProps {
  href: string;
  label: string;
  className?: string;
}

const LinkItem = ({ href, label, className }: LinkItemProps) => {
  return (
    <li className="p-4 py-7">
      <Link href={href} className={className}>
        {label}
      </Link>
    </li>
  );
};

export default LinkItem;
