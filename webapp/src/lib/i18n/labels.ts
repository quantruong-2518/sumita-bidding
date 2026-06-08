import { L, type LocalizedText } from "@/lib/schema";
import type { Ccn, Factory, Job, NewsCategory } from "@/lib/schema";

/* Nhãn enum dùng chung (i18n-ready) — gom 1 chỗ để VI/EN nhất quán & không lặp giữa các view.
   Dùng: `const t = useTx(); t(CCN_STATUS_LABEL[c.status])`. */

export const CCN_STATUS_LABEL: Record<Ccn["status"], LocalizedText> = {
  "dang-cho-thue": L("Đang cho thuê", "Available for lease"),
  "sap-mo-ban": L("Sắp mở bán", "Opening soon"),
  "da-lap-day": L("Đã lấp đầy", "Fully occupied"),
};

export const FACTORY_STATUS_LABEL: Record<Factory["status"], LocalizedText> = {
  "con-trong": L("Còn trống", "Available"),
  "da-thue": L("Đã thuê", "Leased"),
  "sap-ban-giao": L("Sắp bàn giao", "Handover soon"),
};

export const NEWS_CATEGORY_LABEL: Record<NewsCategory, LocalizedText> = {
  "thi-truong": L("Thị trường", "Market"),
  "tin-du-an": L("Tin dự án", "Project news"),
  "su-kien": L("Sự kiện", "Events"),
};

export const JOB_TYPE_LABEL: Record<Job["type"], LocalizedText> = {
  "full-time": L("Toàn thời gian", "Full-time"),
  "part-time": L("Bán thời gian", "Part-time"),
  "thoi-vu": L("Thời vụ", "Seasonal"),
};

export type LegalStatus = "xong" | "dang-lam" | "ke-hoach";
export const LEGAL_STATUS_LABEL: Record<LegalStatus, LocalizedText> = {
  xong: L("Hoàn thành", "Completed"),
  "dang-lam": L("Đang thực hiện", "In progress"),
  "ke-hoach": L("Kế hoạch", "Planned"),
};

export type SearchHitType = "ccn" | "factory" | "news" | "job";
export const SEARCH_TYPE_LABEL: Record<SearchHitType, LocalizedText> = {
  ccn: L("Cụm CN", "Cluster"),
  factory: L("Nhà xưởng", "Factory"),
  news: L("Tin tức", "News"),
  job: L("Tuyển dụng", "Careers"),
};
