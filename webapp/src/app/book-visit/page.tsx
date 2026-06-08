import { pageMeta } from "@/lib/seo";
import { BookVisitView } from "@/components/views/book-visit-view";

export const metadata = pageMeta({
  title: "Đặt lịch khảo sát",
  description: "Đăng ký tham quan thực địa cụm công nghiệp Sumita cùng đội ngũ tư vấn.",
  path: "/book-visit",
});

export default function Page() {
  return <BookVisitView />;
}
