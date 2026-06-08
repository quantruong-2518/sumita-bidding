import type { Metadata } from "next";
import { FactoryListView } from "@/components/views/factory-list-view";

export const metadata: Metadata = {
  title: "Nhà xưởng xây sẵn",
  description: "Nhà xưởng tiêu chuẩn, bàn giao nhanh.",
};

export default function Page() {
  return <FactoryListView />;
}
