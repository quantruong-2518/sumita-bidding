import { pageMeta } from "@/lib/seo";
import { JobsListView } from "@/components/views/jobs-list-view";

export const metadata = pageMeta({
  title: "Tuyển dụng",
  description: "Cơ hội nghề nghiệp tại Sumita.",
  path: "/careers",
});

export default function Page() {
  return <JobsListView />;
}
