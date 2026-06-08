import { L, type NewsArticle } from "@/lib/schema";

export const NEWS: NewsArticle[] = [
  {
    slug: "fdi-hung-yen-2026-tang-truong",
    title: L("Dòng vốn FDI vào Hưng Yên tăng trưởng nửa đầu 2026", "FDI inflows to Hung Yen grow in H1 2026"),
    category: "thi-truong",
    excerpt: L("Khu vực tiếp tục là điểm sáng thu hút đầu tư sản xuất nhờ hạ tầng giao thông cải thiện.", "..."),
    body: L(
      "Nửa đầu năm 2026, dòng vốn FDI vào khu vực Hưng Yên (gồm Thái Bình cũ) duy trì đà tăng, tập trung vào công nghiệp chế biến và công nghiệp hỗ trợ. Hạ tầng kết nối cảng và cao tốc được xem là yếu tố then chốt.",
      "",
    ),
    cover: "news/fdi-2026",
    date: "2026-05-20",
    author: "Ban Truyền thông Sumita",
  },
  {
    slug: "khoi-cong-ha-tang-giai-doan-2-hung-nhan",
    title: L("Khởi công hạ tầng giai đoạn 2 CCN Hưng Nhân", "Phase 2 infrastructure breaks ground at Hung Nhan"),
    category: "tin-du-an",
    excerpt: L("Giai đoạn 2 tập trung hoàn thiện trạm xử lý nước thải và mở rộng đường nội khu.", "..."),
    body: L("Dự án giai đoạn 2 CCN Hưng Nhân chính thức khởi công, dự kiến nâng công suất xử lý nước thải lên 3.000 m³/ngày đêm.", ""),
    cover: "news/khoi-cong-gd2",
    date: "2026-04-08",
    author: "Ban Dự án",
  },
  {
    slug: "su-kien-xuc-tien-dau-tu-nhat-ban",
    title: L("Sumita tham dự sự kiện xúc tiến đầu tư Nhật Bản 2026", "Sumita joins Japan investment promotion 2026"),
    category: "su-kien",
    excerpt: L("Kết nối nhà đầu tư Nhật Bản quan tâm tới quỹ đất công nghiệp linh hoạt.", "..."),
    body: L("Sumita giới thiệu quỹ đất và mô hình nhà xưởng xây sẵn tới các nhà đầu tư Nhật Bản đang tìm kiếm cơ sở sản xuất tại miền Bắc Việt Nam.", ""),
    cover: "news/su-kien-jp",
    date: "2026-03-15",
    author: "Ban Truyền thông Sumita",
  },
  {
    slug: "xu-huong-nha-xuong-xay-san-2026",
    title: L("Xu hướng thuê nhà xưởng xây sẵn của doanh nghiệp SME", "Ready-built factory leasing trends for SMEs"),
    category: "thi-truong",
    excerpt: L("Nhà xưởng xây sẵn giúp SME rút ngắn thời gian đi vào sản xuất.", "..."),
    body: L("Mô hình thuê nhà xưởng xây sẵn ngày càng được doanh nghiệp vừa và nhỏ lựa chọn nhờ chi phí ban đầu thấp và thời gian triển khai nhanh.", ""),
    cover: "news/xu-huong-rbf",
    date: "2026-02-28",
  },
];
