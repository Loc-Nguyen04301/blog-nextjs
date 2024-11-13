import Image from "next/image";
import Link from "next/link";
import thumnailBlog from "@/assets/images/thumnailBlog.jpg";
import { lato } from "@/app/fonts";
import fbIcon from "@/assets/images/fbIcon.png";
import instagramIcon from "@/assets/images/instagramIcon.png";
import wifiIcon from "@/assets/images/wifiIcon.png";
import emailIcon from "@/assets/images/emailIcon.png";
import blogImage from "@/assets/images/blogImage.jpg";
import defaultImage from "@/assets/images/defaultImage.png";
import { TextField } from "@mui/material";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;

  return (
    <div className="pb-16 mb-16">
      <div className="text-center">
        <h1 className="uppercase text-2xl mb-2">
          <Link href={`/blog/${slug}`}>
            Tại sao tôi ngừng viết & Tương lai The Present Writer
          </Link>
        </h1>
        <p
          className={`uppercase text-xs text-subTitleColor mb-2 font-medium tracking-wider ${lato.variable} font-sans`}
        >
          March 6, 2024 By Chi Nguyễn 29 comments
        </p>
        <Image src={thumnailBlog} alt="thumnaiblog" />
        {/* <div className="mt-3 border-b border-[#dd9933]"></div> */}
      </div>
      <p className={`mt-3 ${lato.variable} font-sans leading-7`}>
        Đã khá lâu tôi không đăng bài viết mới trên blog. Đôi lúc tôi tự hỏi:
        Cái tên “The Present Writer” có còn đúng nữa không khi mình không còn là
        một writer (người viết) trong lòng công chúng? Mới cách đây vài hôm, tôi
        nhận được một tin nhắn trên Instagram: “Em theo dõi chị mấy năm nay qua
        YouTube và podcast nhưng hôm nay em mới biết chị có cả blog!” Đối với
        các bạn khán giả mới (và đôi khi cả với chính tôi!), thật khó có thể
        tưởng tượng rằng tôi bắt đầu xây dựng thương hiệu The Present Writer với
        trang blog này năm 2016. Phải tới 4 năm sau, năm 2020, các kênh video và
        podcast mới ra đời. Đã có những giai đoạn, hàng năm liền, tôi đều đặn
        đăng bài viết mới vào thứ Tư hàng tuần. Dù bận rộn, đau …
      </p>
      <div>
        <div className="flex gap-2 mt-20 mb-5 ml-3">
          <Link target="_blank" href="/">
            <Image src={wifiIcon} alt="fb-icon" width={40} />
          </Link>
          <Link target="_blank" href="mailto:nguyengialoc7@gmail.com">
            <Image src={emailIcon} alt="fb-icon" width={40} />
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
        <div className="flex gap-6">
          {Array.from({ length: 3 }, (_, idx) => (
            <div className={`${lato.variable} font-sans`} key={idx}>
              <Link href={"/#"} className="opacity-70 hover:opacity-100">
                <Image src={blogImage} alt="123" />
                <p className="text-sm text-black hover:text-primaryColorBold">
                  1 năm viết blog – Những chuyện chưa kể
                </p>
                <p className="text-sm text-subTitleColor">July 26, 2017</p>
              </Link>
            </div>
          ))}
        </div>
        <div className={`${lato.variable} font-sans mt-5 text-subTitleColor`}>
          <span className="mr-1">Category:</span>
          <Link href={"/#"}>Công việc</Link>,{" "}
          <Link href={"/#"}>Hành trình của tôi </Link>{" "}
        </div>
      </div>
      <div className="comment mt-20">
        <h1 className="uppercase text-xl">Comments</h1>

        <div className="mt-5">
          {Array.from({ length: 5 }, (_, idx) => (
            <div
              className={`${lato.variable} font-sans border-b border-black mb-10 pb-10`}
              key={idx}
            >
              <div className="flex gap-5">
                <Image src={defaultImage} alt="default-image" width={55} />
                <div className={`flex flex-col justify-center text-[15px]`}>
                  <span className={``}>Phương Thúy says</span>
                  <span
                    className={`font-semibold hover:text-primaryColorBold cursor-pointer border-b border-primaryColorBold`}
                  >
                    December 18, 2022 at 7:41 pm
                  </span>
                </div>
              </div>
              <p className="mt-6 tracking-wide">
                con đường Ph.D thật gian nan chị Chi ạ. Cảm ơn chị Chi rất nhiều
                vì đã cung cấp cho em vào nhiều bạn những thông tin hữu ích. có
                những điều em đã biết và cũng có nhiều điều em chưa biết. Mỗi
                lần nghe và đọc những gì chị Chi chia sẻ, em lại cảm thấy rất có
                giá trị.
              </p>
              <h1 className="pt-7">
                <span className="border-b border-primaryColorBold cursor-pointer font-semibold hover:text-primaryColorBold">
                  Reply
                </span>
              </h1>
              <div className="mt-20">
                <div>
                  <span className="text-xl uppercase tracking-widest">
                    Reply to Ngan Thi Phuong Nguyen
                  </span>
                  <span className="ml-3 border-b uppercase border-primaryColorBold font-semibold hover:text-primaryColorBold cursor-pointer duration-200 tracking-wider">
                    Cancel reply
                  </span>
                </div>
                <div className="mt-5 flex flex-col gap-3">
                  <TextField
                    label="Comment"
                    id="Comment"
                    variant="filled"
                    size="medium"
                    fullWidth
                    sx={{
                      "& .MuiInputBase-root.MuiFilledInput-root::before": {
                        borderBottom: "none",
                      },
                    }}
                  />
                  <TextField
                    label="Name"
                    id="Name"
                    variant="filled"
                    size="medium"
                    fullWidth
                    sx={{
                      "& .MuiInputBase-root.MuiFilledInput-root::before": {
                        borderBottom: "none",
                      },
                    }}
                  />
                  <TextField
                    label="Email"
                    id="Email"
                    variant="filled"
                    size="medium"
                    fullWidth
                    sx={{
                      "& .MuiInputBase-root.MuiFilledInput-root::before": {
                        borderBottom: "none",
                      },
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
