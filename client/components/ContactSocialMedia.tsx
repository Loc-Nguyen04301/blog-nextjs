import Link from "next/link";
import React from "react";
import Image from "next/image";
import fbIcon from "@/assets/images/fbIcon.png";
import instagramIcon from "@/assets/images/instagramIcon.png";
import wifiIcon from "@/assets/images/wifiIcon.png";
import emailIcon from "@/assets/images/emailIcon.png";

const ContactSocialMedia = () => {
  return (
    <div className="flex gap-3 justify-center">
      <Link target="_blank" href="/">
        <Image src={wifiIcon} alt="wifi-icon" width={40} />
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
