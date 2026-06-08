import type { Metadata } from "next";
import { NewsListView } from "@/components/views/news-list-view";

export const metadata: Metadata = {
  title: "Tin tức",
  description: "Tin tức & truyền thông từ Sumita.",
};

export default function Page() {
  return <NewsListView />;
}
