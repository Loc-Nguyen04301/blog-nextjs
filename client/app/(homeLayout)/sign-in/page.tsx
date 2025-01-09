import { Metadata } from "next";
import SignInComponent from "./SignInComponent";

export const metadata: Metadata = {
  title: "Đăng nhập - Loc Nguyen Writer",
  description: "Đăng nhập - Loc Nguyen Writer",
  icons: {
    icon: "favicon.ico",
  },
};

const SignInPage = () => {
  return (
    <>
      <SignInComponent />
    </>
  );
};

export default SignInPage;
