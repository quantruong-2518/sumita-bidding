import { L, type LocalizedText } from "@/lib/schema";

/* Cấu hình site dùng chung: nav, kênh liên hệ, footer, nội dung trang chủ/giới thiệu.
   ⚠️CONFIRM(brief↔sitemap.jfif): footer 3 cột (brief) vs 6 cột; CTA icon set; địa danh (DECISIONS #9 dùng cả hai). */

export type NavItem = { label: LocalizedText; href: string; children?: NavItem[] };

export const MAIN_NAV: NavItem[] = [
  { label: L("Giới thiệu", "About"), href: "/gioi-thieu" },
  {
    label: L("Sản phẩm", "Products"),
    href: "/san-pham/dat-cong-nghiep",
    children: [
      { label: L("Đất công nghiệp cho thuê", "Industrial land"), href: "/san-pham/dat-cong-nghiep" },
      { label: L("Nhà xưởng xây sẵn", "Ready-built factory"), href: "/san-pham/nha-xuong-xay-san" },
    ],
  },
  { label: L("Tiện ích & hạ tầng", "Utilities & Infrastructure"), href: "/tien-ich-ha-tang" },
  { label: L("Dịch vụ đầu tư", "Investment services"), href: "/dich-vu-ho-tro-dau-tu" },
  { label: L("Tin tức", "News"), href: "/tin-tuc" },
  { label: L("Tuyển dụng", "Careers"), href: "/tuyen-dung" },
  { label: L("Liên hệ", "Contact"), href: "/lien-he" },
];

export const CONTACT = {
  company: "Công ty Cổ phần Đầu tư Hạ tầng Sumita",
  hotline: "1900 0000",
  email: "info@sumita.vn",
  // DECISIONS #9: dùng song song Thái Bình + Hưng Yên (chờ khách xác nhận)
  address: L("KCN Sumita, tỉnh Hưng Yên (Thái Bình cũ), Việt Nam", "Sumita IP, Hung Yen Province, Vietnam"),
  zalo: "https://zalo.me/0000000000",
  facebook: "https://facebook.com/sumita.vn",
  linkedin: "https://linkedin.com/company/sumita-vn",
};

// CTA bar sticky (brief §6). ⚠️CONFIRM: sitemap.jfif vẽ bộ icon khác.
export const CTA_CHANNELS = [
  { id: "zalo", label: L("Zalo", "Zalo"), href: CONTACT.zalo, icon: "MessageCircle" },
  { id: "hotline", label: L("Hotline", "Hotline"), href: `tel:${CONTACT.hotline.replace(/\s/g, "")}`, icon: "Phone" },
  { id: "facebook", label: L("Facebook", "Facebook"), href: CONTACT.facebook, icon: "Facebook" },
  { id: "linkedin", label: L("LinkedIn", "LinkedIn"), href: CONTACT.linkedin, icon: "Linkedin" },
] as const;

// Footer 3 cột (brief §7). ⚠️CONFIRM: sitemap.jfif vẽ 6 cột.
export const FOOTER_LINKS: { title: LocalizedText; links: NavItem[] }[] = [
  {
    title: L("Sản phẩm", "Products"),
    links: [
      { label: L("Đất công nghiệp cho thuê", "Industrial land"), href: "/san-pham/dat-cong-nghiep" },
      { label: L("Nhà xưởng xây sẵn", "Ready-built factory"), href: "/san-pham/nha-xuong-xay-san" },
      { label: L("Tiện ích & hạ tầng", "Utilities"), href: "/tien-ich-ha-tang" },
      { label: L("Tài liệu", "Downloads"), href: "/tai-lieu" },
    ],
  },
  {
    title: L("Về Sumita", "Company"),
    links: [
      { label: L("Giới thiệu", "About"), href: "/gioi-thieu" },
      { label: L("Dịch vụ đầu tư", "Services"), href: "/dich-vu-ho-tro-dau-tu" },
      { label: L("Tin tức", "News"), href: "/tin-tuc" },
      { label: L("Tuyển dụng", "Careers"), href: "/tuyen-dung" },
    ],
  },
];

// Trang chủ (P-01)
export const HOME = {
  hero: {
    eyebrow: L("Nền tảng xúc tiến đầu tư", "Investment promotion platform"),
    title: L(
      "Quỹ đất công nghiệp & nhà xưởng xây sẵn cho nhà đầu tư trong nước và FDI",
      "Industrial land & ready-built factories for domestic and FDI investors",
    ),
    tagline: L(
      "Chuỗi cụm công nghiệp linh hoạt — hạ tầng đồng bộ, pháp lý minh bạch, đồng hành thủ tục đầu tư từ A–Z.",
      "A flexible industrial cluster network — synchronized infrastructure, transparent legal status, end-to-end investment support.",
    ),
  },
  stats: [
    { label: L("Cụm công nghiệp", "Industrial clusters"), value: L("3+", "3+") },
    { label: L("Tổng quỹ đất", "Total land bank"), value: L("≈ 150 ha", "≈ 150 ha") },
    { label: L("Cách cảng Hải Phòng", "To Hai Phong port"), value: L("~70 km", "~70 km") },
    { label: L("Hỗ trợ thủ tục", "Procedure support"), value: L("A–Z", "A–Z") },
  ],
};

// Giới thiệu (P-02)
export const ABOUT = {
  intro: L(
    "Sumita phát triển và vận hành chuỗi cụm công nghiệp tại khu vực Hưng Yên (Thái Bình cũ), tập trung phục vụ nhà đầu tư sản xuất vừa và nhỏ trong nước cũng như FDI.",
    "Sumita develops and operates a network of industrial clusters in the Hung Yen (former Thai Binh) area, serving domestic and FDI small-and-medium manufacturers.",
  ),
  mission: L("Trở thành điểm đến đầu tư công nghiệp linh hoạt, minh bạch và đáng tin cậy của vùng.", "..."),
  vision: L("Lấp đầy quỹ đất bằng những dự án sản xuất bền vững, tạo việc làm cho địa phương.", "..."),
  values: [
    { label: L("Minh bạch", "Transparency"), value: L("Pháp lý & tiến độ công khai", "Open legal & progress") },
    { label: L("Linh hoạt", "Flexibility"), value: L("Diện tích & điều khoản thuê tuỳ nhu cầu", "Flexible lots & terms") },
    { label: L("Đồng hành", "Partnership"), value: L("Hỗ trợ thủ tục đầu tư trọn gói", "End-to-end support") },
  ],
};
