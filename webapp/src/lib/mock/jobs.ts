import { L, type Job } from "@/lib/schema";

export const JOBS: Job[] = [
  {
    slug: "chuyen-vien-kinh-doanh-cho-thue",
    title: L("Chuyên viên Kinh doanh cho thuê đất/nhà xưởng", "Leasing Sales Executive"),
    department: L("Kinh doanh", "Sales"),
    location: L("Hưng Yên (Thái Bình cũ)", "Hung Yen"),
    type: "full-time",
    salary: L("Thoả thuận + hoa hồng", "Negotiable + commission"),
    deadline: "2026-07-31",
    description: L("Tư vấn, chăm sóc nhà đầu tư trong nước & FDI; quản lý quỹ đất/nhà xưởng cho thuê.", ""),
    requirements: [
      L("Tối thiểu 2 năm kinh nghiệm B2B/bất động sản công nghiệp", ""),
      L("Giao tiếp tiếng Anh tốt (ưu tiên thêm Nhật/Hàn)", ""),
      L("Kỹ năng đàm phán, chăm sóc khách hàng", ""),
    ],
  },
  {
    slug: "ky-su-van-hanh-ha-tang",
    title: L("Kỹ sư Vận hành hạ tầng cụm công nghiệp", "Infrastructure Operations Engineer"),
    department: L("Kỹ thuật & Vận hành", "Technical & Operations"),
    location: L("CCN Hưng Nhân", "Hung Nhan Cluster"),
    type: "full-time",
    deadline: "2026-08-15",
    description: L("Vận hành, bảo trì hệ thống điện, cấp thoát nước, trạm xử lý nước thải nội khu.", ""),
    requirements: [L("Tốt nghiệp kỹ thuật điện/môi trường/cấp thoát nước", ""), L("Ưu tiên kinh nghiệm vận hành KCN/CCN", "")],
  },
  {
    slug: "chuyen-vien-phap-ly-du-an",
    title: L("Chuyên viên Pháp lý dự án", "Project Legal Officer"),
    department: L("Pháp chế", "Legal"),
    location: L("Hưng Yên (Thái Bình cũ)", "Hung Yen"),
    type: "full-time",
    description: L("Theo dõi pháp lý dự án: quy hoạch, đất đai, môi trường, đầu tư.", ""),
    requirements: [L("Cử nhân Luật", ""), L("Kinh nghiệm pháp lý đất đai/đầu tư là lợi thế", "")],
  },
];
