import type { Metadata } from "next";
import { HomeView } from "@/components/views/home-view";

export const metadata: Metadata = {
  description:
    "Sumita — nền tảng xúc tiến đầu tư cụm công nghiệp: quỹ đất công nghiệp & nhà xưởng xây sẵn cho thuê. Nhận brochure, đặt lịch khảo sát, tư vấn đầu tư.",
};

export default function Page() {
  return <HomeView />;
}
