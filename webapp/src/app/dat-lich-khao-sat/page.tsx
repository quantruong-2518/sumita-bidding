import type { Metadata } from "next";
import { BookVisitView } from "@/components/views/book-visit-view";

export const metadata: Metadata = {
  title: "Đặt lịch khảo sát",
  description: "Đăng ký tham quan thực địa cụm công nghiệp Sumita cùng đội ngũ tư vấn.",
};

export default function Page() {
  return <BookVisitView />;
}
