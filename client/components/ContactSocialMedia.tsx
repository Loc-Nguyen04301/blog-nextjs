import Link from "next/link";
import React from "react";
import Image from "next/image";
import fbIcon from "@/assets/images/fbIcon.png";
import instagramIcon from "@/assets/images/instagramIcon.png";
import emailIcon from "@/assets/images/emailIcon.png";
import tiktokIcon from "@/assets/images/tiktokIcon.png";

const ContactSocialMedia = () => {
  return (
    <div className="flex gap-3 justify-center">
      <Link target="_blank" href="https://www.tiktok.com/@gialocng01?lang=en">
        <Image src={tiktokIcon} alt="tiktok-icon" width={40} />
      </Link>
      <Link target="_blank" href="mailto:nguyengialoc7@gmail.com">
        <Image src={emailIcon} alt="email-icon" width={40} />
      </Link>
      <Link
        target="_blank"
        href="https://www.facebook.com/profile.php?id=100009072109785"
      >
        <Image src={fbIcon} alt="fb-icon" width={40} />
      </Link>
      <Link target="_blank" href="https://www.instagram.com/loc_nguyen_43/">
        <Image src={instagramIcon} alt="fb-icon" width={40} />
      </Link>
    </div>
  );
};

export default ContactSocialMedia;
