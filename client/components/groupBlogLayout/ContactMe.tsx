import React from "react";
import ContactSocialMedia from "../ContactSocialMedia";

const ContactMe = () => {
  return (
    <div className="border border-[#000] relative">
      <div className="absolute w-full px-10 top-[-28px]">
        <h1 className="p-5 bg-black text-[#fff] text-center text-xs uppercase tracking-wide top-[">
          Kết nối
        </h1>
      </div>
      <div className="p-10 pb-7 mt-3 mb-4">
        <ContactSocialMedia />
      </div>
    </div>
  );
};

export default ContactMe;
