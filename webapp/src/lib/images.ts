/* ─────────────────────────────────────────────────────────────────────────
   IMAGE REGISTRY — bản đồ "key ảnh" (string trong fixtures) → đường dẫn ảnh thật.

   ⚠️ ẢNH DEMO (Unsplash, giấy phép free) — PRODUCTION = ẢNH KHÁCH CUNG CẤP (DECISIONS #4).
   Mục đích: cho FE demo trông thực tế hơn mà KHÔNG phá kiến trúc swappable.

   Cách hoạt động:
   - Fixtures (src/lib/mock/*) vẫn giữ nguyên các "key" dạng "ccn/hung-nhan/hero".
   - <Media src="ccn/hung-nhan/hero" /> → resolveImage() tra key này ra /images/*.jpg.
   - Key không có trong registry → Media tự rơi về hộp xám placeholder (fallback cũ).

   Khi khách giao ảnh thật: chỉ cần (1) bỏ ảnh vào public/images/ rồi sửa map này,
   hoặc (2) đổi giá trị fixtures sang URL CDN của khách. KHÔNG phải sửa component.

   Nguồn ảnh: xem public/images/CREDITS.md.
   ──────────────────────────────────────────────────────────────────────── */

/** Map: key fixtures → file ảnh demo trong /public/images. */
const IMAGE_MAP: Record<string, string> = {
  // ── Hero ──
  "home/hero": "/images/hero-home.jpg",

  // ── CCN Hưng Nhân (dữ liệu đầy đủ) ──
  "ccn/hung-nhan/hero": "/images/hero-ccn-hung-nhan.jpg",
  "ccn/hung-nhan/location": "/images/ccn-hung-nhan-location.jpg",
  "ccn/hung-nhan/master-plan": "/images/ccn-hung-nhan-masterplan.jpg",
  "ccn/hung-nhan/g1": "/images/gallery-aerial-1.jpg",
  "ccn/hung-nhan/g2": "/images/gallery-factory-1.jpg",
  "ccn/hung-nhan/g3": "/images/gallery-warehouse-1.jpg",
  "ccn/hung-nhan/g4": "/images/gallery-construction-1.jpg",
  "ccn/hung-nhan/g5": "/images/gallery-logistics-1.jpg",
  "ccn/hung-nhan/g6": "/images/gallery-power-1.jpg",
  "ccn/hung-nhan/flycam": "/images/hero-ccn-hung-nhan.jpg",

  // ── CCN Đức Hiệp ──
  "ccn/duc-hiep/hero": "/images/hero-ccn-duc-hiep.jpg",
  "ccn/duc-hiep/master-plan": "/images/ccn-duc-hiep-masterplan.jpg",
  "ccn/duc-hiep/g1": "/images/gallery-warehouse-1.jpg",
  "ccn/duc-hiep/g2": "/images/gallery-logistics-1.jpg",
  "ccn/duc-hiep/g3": "/images/gallery-construction-1.jpg",

  // ── CCN Cồn Nhất (mặc định hero riverside/đất xanh) ──
  "ccn/con-nhat/hero": "/images/hero-ccn-con-nhat.jpg",

  // ── Nhà xưởng xây sẵn ──
  "factory/a1": "/images/factory-a1.jpg",
  "factory/a2": "/images/factory-a2.jpg",
  "factory/b1": "/images/factory-b1.jpg",

  // ── Tin tức ──
  "news/fdi-2026": "/images/news-fdi-2026.jpg",
  "news/khoi-cong-gd2": "/images/news-khoi-cong.jpg",
  "news/su-kien-jp": "/images/news-su-kien-jp.jpg",
  "news/xu-huong-rbf": "/images/news-xu-huong-rbf.jpg",

  // ── Đối tác / văn phòng (trang Giới thiệu) ──
  "about/office-1": "/images/office-1.jpg",
  "about/office-2": "/images/office-2.jpg",
  "about/partners": "/images/partners.jpg",
};

/**
 * Tra một "key ảnh" ra đường dẫn ảnh thật.
 * - Trả về undefined nếu key không có (Media sẽ hiện placeholder hộp xám).
 * - Nếu giá trị đã là URL tuyệt đối (http) hoặc đường dẫn /images đầy đủ → trả nguyên (đỡ trường hợp khách dán URL CDN).
 */
export function resolveImage(key?: string): string | undefined {
  if (!key) return undefined;
  if (key.startsWith("http") || key.startsWith("/")) return key;
  return IMAGE_MAP[key];
}
