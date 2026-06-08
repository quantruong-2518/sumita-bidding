import type { Metadata } from "next";
import { CcnListView } from "@/components/views/ccn-list-view";

export const metadata: Metadata = {
  title: "Đất công nghiệp cho thuê",
  description: "Danh sách cụm công nghiệp đang cho thuê.",
};

export default function Page() {
  return <CcnListView />;
}
