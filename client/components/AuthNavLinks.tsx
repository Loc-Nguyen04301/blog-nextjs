"use client";
import { useEffect, useState } from "react";
import LinkItem from "@/components/LinkItem/LinkItem";
import { getAccessToken } from "@/utils/authTokens";

const AuthNavLinks = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!getAccessToken());
  }, []);

  if (isLoggedIn) return null;

  return (
    <>
      <LinkItem
        href={"/sign-in"}
        label="Đăng nhập"
        className="hover:text-primaryColor"
      />
      <div>fhoasdhfiosda</div>
      <LinkItem
        href={"/sign-up"}
        label="Đăng ký"
        className="hover:text-primaryColor"
      />
    </>
  );
};

export default AuthNavLinks;
