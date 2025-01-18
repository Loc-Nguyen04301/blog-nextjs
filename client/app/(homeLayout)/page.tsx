import avatarImage from "@/assets/images/avatarMyself.jpg";
import Image from "next/image";
import React from "react";
import AudioPlayer from "@/components/AudioPlayer";
import ContactSocialMedia from "@/components/ContactSocialMedia";

const MainPage = () => {
  return (
    <>
      <section>
        <AudioPlayer />
      </section>
      <div className="justify-items-end pr-5">
        <ContactSocialMedia />
      </div>
      <section className="flex-auto">
        <div className="py-10 px-3 gap-8 container mx-auto flex max-md:flex-col">
          <div className="p-5 w-[30%] max-md:w-full">
            <Image
              src={avatarImage}
              alt="avatar"
              className="rounded-full object-cover"
            />
          </div>
          <div className="text-black w-[70%] max-md:w-full font-[Arial]">
            <h1 className="font-bold text-center mb-2 text-xl">
              Chào mừng bạn đến với Loc Nguyen Writter!
            </h1>
            <div className="text-[15px] font-sans">
              <p className="mt-14">
                Hello các bạn, mình là Nguyễn Gia Lộc, một lập trình viên !
              </p>
              <p className="my-4">
                Cảm ơn bạn đã ghé thăm blog Loc Nguyen Writter. Trang blog này
                được chính tôi tạo ra với mục đích chia sẻ những câu chuyện,
                quan điểm cá nhân, cách nhìn nhận về sự vật, hiện tượng đang
                chuyển động, xảy ra xung quanh cuộc sống chúng ta.
              </p>
              <p className="mt-4">Cảm ơn bạn đọc đã ghé thăm.</p>
              <p className="mt-1 font-semibold">Lộc Nguyễn</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default MainPage;
