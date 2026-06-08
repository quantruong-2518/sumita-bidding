import type { Metadata } from "next";
import { JobsListView } from "@/components/views/jobs-list-view";

export const metadata: Metadata = {
  title: "Tuyển dụng",
  description: "Cơ hội nghề nghiệp tại Sumita.",
};

export default function Page() {
  return <JobsListView />;
}
