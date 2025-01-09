import { Metadata } from "next";
import SignUpComponent from "./SignUpComponent";

export const metadata: Metadata = {
  title: "Đăng ký - Loc Nguyen Writer",
  description: "Đăng ký - Loc Nguyen Writer",
  icons: {
    icon: "favicon.ico",
  },
};

const SignupPage = () => {
  return (
    <>
      <SignUpComponent />
    </>
  );
};

export default SignupPage;
