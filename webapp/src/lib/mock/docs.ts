import { L, type Doc } from "@/lib/schema";

/* F2 Download Center (lead-gate). Tài liệu chung + gắn CCN qua ccnSlug. */
export const DOCS: Doc[] = [
  { id: "brochure-tong", title: L("Brochure tổng quan Sumita", "Sumita overview brochure"), type: "pdf", size: "4.2 MB", href: "/files/brochure-sumita.pdf", category: "brochure" },
  { id: "brochure-hung-nhan", title: L("Brochure CCN Hưng Nhân", "Hung Nhan brochure"), type: "pdf", size: "3.1 MB", href: "/files/brochure-hung-nhan.pdf", category: "brochure", ccnSlug: "ccn-hung-nhan" },
  { id: "quy-hoach-hung-nhan", title: L("Bản đồ quy hoạch 1/500 — Hưng Nhân", "Master plan 1/500 — Hung Nhan"), type: "pdf", size: "8.6 MB", href: "/files/quy-hoach-hung-nhan.pdf", category: "quy-hoach", ccnSlug: "ccn-hung-nhan" },
  { id: "chinh-sach-uu-dai", title: L("Chính sách ưu đãi đầu tư", "Investment incentives"), type: "pdf", size: "1.2 MB", href: "/files/chinh-sach-uu-dai.pdf", category: "chinh-sach" },
  { id: "brochure-duc-hiep", title: L("Brochure CCN Đức Hiệp", "Duc Hiep brochure"), type: "pdf", size: "2.8 MB", href: "/files/brochure-duc-hiep.pdf", category: "brochure", ccnSlug: "ccn-duc-hiep" },
  { id: "ho-so-phap-ly", title: L("Hồ sơ pháp lý dự án (tổng hợp)", "Legal dossier"), type: "zip", size: "12.4 MB", href: "/files/ho-so-phap-ly.zip", category: "phap-ly" },
];
