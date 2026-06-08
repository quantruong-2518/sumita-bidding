import { z } from "zod";

/* ─────────────────────────────────────────────────────────────────────────
   SCHEMA (Zod) — nguồn sự thật cho data shape của toàn site.
   Mọi text hiển thị dùng `Localized` ({ vi, en? }) → i18n-ready (render VI, EN fallback VI).
   Đổi sang API thật: chỉ cần các hàm trong lib/api trả về đúng các type này.
   Ref: 08-spec/F0-screen-inventory.md, 08-spec/F4-template-ccn.md
   ──────────────────────────────────────────────────────────────────────── */

// i18n-ready string: VI bắt buộc, EN tuỳ chọn (thiếu → fallback VI)
export const Localized = z.object({ vi: z.string(), en: z.string().optional() });
export type LocalizedText = z.infer<typeof Localized>;

/** Helper gọn cho fixtures: L("Tổng quan", "Overview") */
export const L = (vi: string, en?: string): LocalizedText => (en ? { vi, en } : { vi });

// ── mảnh dùng chung ──
export const LinkRef = z.object({ label: Localized, href: z.string() });
export type LinkRef = z.infer<typeof LinkRef>;

export const KeyValue = z.object({ label: Localized, value: Localized });
export type KeyValue = z.infer<typeof KeyValue>;

export const Distance = z.object({ label: Localized, value: z.string() });

export const Doc = z.object({
  id: z.string(),
  title: Localized,
  type: z.enum(["pdf", "zip", "docx", "xlsx"]).default("pdf"),
  size: z.string(),
  href: z.string(),
  category: z.enum(["brochure", "quy-hoach", "phap-ly", "chinh-sach", "khac"]).default("khac"),
  ccnSlug: z.string().optional(),
});
export type Doc = z.infer<typeof Doc>;

// ── CCN: 12 mục template (F4) ──
export const InfraItem = z.object({ icon: z.string(), label: Localized, spec: Localized.optional() });
export const Industry = z.object({ name: Localized, type: z.enum(["uu-tien", "duoc", "han-che"]).default("duoc") });
export const Zone = z.object({ name: Localized, note: Localized.optional() });
export const Milestone = z.object({ date: z.string(), label: Localized, done: z.boolean().default(false) });
export const LegalItem = z.object({ item: Localized, status: z.enum(["xong", "dang-lam", "ke-hoach"]).default("dang-lam") });

export const Ccn = z.object({
  slug: z.string(),
  name: Localized,
  tagline: Localized,
  heroImage: z.string().optional(),
  status: z.enum(["dang-cho-thue", "sap-mo-ban", "da-lap-day"]).default("dang-cho-thue"),

  // 1. Tổng quan
  overview: Localized,
  area: z.number(), // ha
  occupancy: z.number().optional(), // %
  priceFrom: Localized.optional(),
  landType: Localized.optional(),

  // 2. Vị trí chiến lược
  location: z.object({
    address: Localized,
    lat: z.number().optional(),
    lng: z.number().optional(),
    image: z.string().optional(),
    distances: z.array(Distance).default([]),
  }),

  // 3. Quy hoạch mặt bằng
  masterPlanImage: z.string().optional(),
  zones: z.array(Zone).default([]),

  // 4. Hạ tầng kỹ thuật
  infrastructure: z.array(InfraItem).default([]),

  // 5. Ngành nghề thu hút
  industries: z.array(Industry).default([]),

  // 6. Lao động & dân cư
  labor: z.array(KeyValue).default([]),

  // 7. Chính sách ưu đãi
  incentives: z.array(Localized).default([]),

  // 8. Pháp lý dự án
  legal: z.array(LegalItem).default([]),

  // 9. Tiến độ thực tế
  progress: z.number().optional(), // %
  milestones: z.array(Milestone).default([]),

  // 10. Hình ảnh / flycam
  gallery: z.array(z.string()).default([]),
  flycamVideo: z.string().optional(),

  // 11. Tài liệu (Doc liên kết qua ccnSlug) · 12. Form (do UI xử lý)
});
export type Ccn = z.infer<typeof Ccn>;

// ── Nhà xưởng xây sẵn (P-04) ──
export const Factory = z.object({
  slug: z.string(),
  name: Localized,
  ccnSlug: z.string().optional(),
  area: z.number(), // m²
  priceFrom: Localized.optional(),
  status: z.enum(["con-trong", "da-thue", "sap-ban-giao"]).default("con-trong"),
  image: z.string().optional(),
  specs: z.array(KeyValue).default([]),
});
export type Factory = z.infer<typeof Factory>;

// ── Tin tức (P-08/P-09) ──
export const NewsCategory = z.enum(["thi-truong", "tin-du-an", "su-kien"]);
export type NewsCategory = z.infer<typeof NewsCategory>;
export const NewsArticle = z.object({
  slug: z.string(),
  title: Localized,
  category: NewsCategory,
  excerpt: Localized,
  body: Localized,
  cover: z.string().optional(),
  date: z.string(), // ISO yyyy-mm-dd
  author: z.string().optional(),
});
export type NewsArticle = z.infer<typeof NewsArticle>;

// ── Tuyển dụng (P-10/P-11) ──
export const Job = z.object({
  slug: z.string(),
  title: Localized,
  department: Localized,
  location: Localized,
  type: z.enum(["full-time", "part-time", "thoi-vu"]).default("full-time"),
  salary: Localized.optional(),
  deadline: z.string().optional(),
  description: Localized,
  requirements: z.array(Localized).default([]),
});
export type Job = z.infer<typeof Job>;

// ── Tiện ích & hạ tầng (P-06) ──
export const UtilityGroup = z.object({
  id: z.string(),
  title: Localized,
  items: z.array(z.object({ icon: z.string(), label: Localized, desc: Localized.optional() })).default([]),
});
export type UtilityGroup = z.infer<typeof UtilityGroup>;

// ── Dịch vụ & hỗ trợ đầu tư (P-07) ──
export const ServiceItem = z.object({ id: z.string(), icon: z.string(), title: Localized, desc: Localized });
export type ServiceItem = z.infer<typeof ServiceItem>;

// ── Đối tác / khách hàng (P-02) ──
export const Partner = z.object({ id: z.string(), name: z.string(), logo: z.string().optional() });
export type Partner = z.infer<typeof Partner>;

// ── Pin bản đồ (O-01) ──
export const MapPin = z.object({ ccnSlug: z.string(), name: Localized, x: z.number(), y: z.number() });
export type MapPin = z.infer<typeof MapPin>;

// ── Lead (engine chuyển đổi: brochure/khảo sát/tư vấn/liên hệ/ứng tuyển) ──
export const LeadVariant = z.enum(["brochure", "khao-sat", "tu-van", "lien-he", "ung-tuyen"]);
export type LeadVariant = z.infer<typeof LeadVariant>;

export const LeadInput = z.object({
  name: z.string().min(2, "Vui lòng nhập họ tên"),
  company: z.string().optional(),
  email: z.email("Email không hợp lệ"),
  phone: z.string().min(8, "Số điện thoại chưa hợp lệ").max(20),
  need: z.string().optional(),
  ccnInterest: z.string().optional(),
  message: z.string().optional(),
  variant: LeadVariant.default("tu-van"),
  source: z.string().optional(),
  consent: z.boolean().refine((v) => v === true, { message: "Bạn cần đồng ý chính sách dữ liệu để tiếp tục" }),
});
export type LeadInput = z.infer<typeof LeadInput>;
