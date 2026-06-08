import { pageMeta } from "@/lib/seo";
import { NewsListView } from "@/components/views/news-list-view";

export const metadata = pageMeta({
  title: "Tin tức",
  description: "Tin tức & truyền thông từ Sumita.",
  path: "/news",
});

export default function Page() {
  return <NewsListView />;
}
