import type { Partner } from "@/lib/schema";

/* P-02 khách hàng & đối tác.
   `logo` = key ảnh demo (Unsplash) — production sẽ là logo thật của khách (DECISIONS #4). */
export const PARTNERS: Partner[] = [
  { id: "p1", name: "Đối tác A", logo: "about/partners" },
  { id: "p2", name: "Đối tác B", logo: "about/office-1" },
  { id: "p3", name: "Đối tác C", logo: "about/office-2" },
  { id: "p4", name: "Đối tác D", logo: "about/partners" },
  { id: "p5", name: "Đối tác E", logo: "about/office-1" },
  { id: "p6", name: "Đối tác F", logo: "about/office-2" },
];
