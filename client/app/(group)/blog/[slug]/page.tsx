import Image from "next/image";
import Link from "next/link";
import thumnailBlog from "@/assets/images/thumnailBlog.jpg";
import { lato } from "@/app/fonts";
import fbIcon from "@/assets/images/fbIcon.png";
import instagramIcon from "@/assets/images/instagramIcon.png";
import wifiIcon from "@/assets/images/wifiIcon.png";
import emailIcon from "@/assets/images/emailIcon.png";

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
        <div className="mt-10">
          “Đề bài đấy, giáo trình đấy, cứ lên mạng lấy thông tin thêm là viết
          được bài” — Đó là toàn văn “hướng dẫn” làm nghiên cứu mà mình từng
          nhận được khi còn học ở Việt Nam. Mình từng tin theo lời hướng dẫn
          này… cho tới khi: lên mạng kiếm không ra nổi một nguồn tin chính
          thống, gặp phải rất nhiều tin rác – ngụy khoa học, lần mò được đúng
          bài nghiên cứu học thuật “xịn” thì không biết cách tải về hay không có
          quyền tải về, không biết đọc một bài báo khoa học như thế nào và trích
          nguồn ra sao… Mãi cho tới khi sang Mỹ học cao học và đi sâu hơn vào
          con đường học thuật, mình mới biết rằng: Tìm kiếm tài liệu nghiên cứu
          là cả một “nghệ thuật”! Đó là một quy trình với những bước rõ ràng,
          dựa vào những công cụ tìm kiếm chính thống, bao gồm nhiều bí quyết để
          tìm kiếm và sắp xếp tài liệu hiệu quả… chứ không chỉ đơn thuần “cứ lên
          mạng” là tài liệu xuất hiện một cách thần kỳ.
        </div>
      </div>
      <div className="mt-10">
        <div className="flex gap-2">
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
        <p className={`${lato.variable} font-sans text-subTitleColor`}>
          <span className="mr-1">Category:</span>
          <Link href={"/#"}>Công việc</Link>,{" "}
          <Link href={"/#"}>Hành trình của tôi </Link>{" "}
        </p>
      </div>
    </div>
  );
}
