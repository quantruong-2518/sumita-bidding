import {
  CCNS,
  FACTORIES,
  NEWS,
  JOBS,
  UTILITY_GROUPS,
  SERVICES,
  PARTNERS,
  DOCS,
  MAP_PINS,
} from "@/lib/mock";
import type {
  Ccn,
  Doc,
  Factory,
  Job,
  LeadInput,
  LocalizedText,
  MapPin,
  NewsArticle,
  NewsCategory,
  Partner,
  ServiceItem,
  UtilityGroup,
} from "@/lib/schema";

/* ─────────────────────────────────────────────────────────────────────────
   API LAYER — lớp duy nhất chạm dữ liệu. Hiện đọc từ mock fixtures + giả lập
   độ trễ mạng. Đổi sang backend thật = thay thân hàm bằng fetch(), giữ NGUYÊN
   chữ ký → React Query hooks & UI không phải sửa.
   ──────────────────────────────────────────────────────────────────────── */

const NETWORK_DELAY = 300; // ms — để thấy loading state (demo)

function resolve<T>(data: T, ms = NETWORK_DELAY): Promise<T> {
  return new Promise((res) => setTimeout(() => res(data), ms));
}

// ── CCN ──
export const getCcns = () => resolve<Ccn[]>(CCNS);
export const getCcn = (slug: string) => resolve<Ccn | null>(CCNS.find((c) => c.slug === slug) ?? null);
/** Sync — dùng cho generateStaticParams (build-time, không cần delay). */
export const getCcnSlugs = (): string[] => CCNS.map((c) => c.slug);

// ── Nhà xưởng ──
export const getFactories = (ccnSlug?: string) =>
  resolve<Factory[]>(ccnSlug ? FACTORIES.filter((f) => f.ccnSlug === ccnSlug) : FACTORIES);

// ── Tin tức ──
export const getNews = (category?: NewsCategory) =>
  resolve<NewsArticle[]>(
    [...(category ? NEWS.filter((n) => n.category === category) : NEWS)].sort((a, b) => (a.date < b.date ? 1 : -1)),
  );
export const getNewsArticle = (slug: string) => resolve<NewsArticle | null>(NEWS.find((n) => n.slug === slug) ?? null);
export const getNewsSlugs = (): string[] => NEWS.map((n) => n.slug);

// ── Tuyển dụng ──
export const getJobs = () => resolve<Job[]>(JOBS);
export const getJob = (slug: string) => resolve<Job | null>(JOBS.find((j) => j.slug === slug) ?? null);
export const getJobSlugs = (): string[] => JOBS.map((j) => j.slug);

// ── Tiện ích / dịch vụ / đối tác / map ──
export const getUtilityGroups = () => resolve<UtilityGroup[]>(UTILITY_GROUPS);
export const getServices = () => resolve<ServiceItem[]>(SERVICES);
export const getPartners = () => resolve<Partner[]>(PARTNERS);
export const getMapPins = () => resolve<MapPin[]>(MAP_PINS);

// ── Tài liệu ──
export const getDocs = (opts?: { ccnSlug?: string; category?: Doc["category"] }) =>
  resolve<Doc[]>(
    DOCS.filter(
      (d) => (!opts?.ccnSlug || d.ccnSlug === opts.ccnSlug) && (!opts?.category || d.category === opts.category),
    ),
  );

// ── Tìm kiếm (O-04) — quét tiêu đề/mô tả VI+EN ──
export type SearchHit = { type: "ccn" | "factory" | "news" | "job"; title: LocalizedText; href: string };

function match(q: string, ...parts: (LocalizedText | undefined)[]) {
  const hay = parts
    .filter(Boolean)
    .map((p) => `${p!.vi} ${p!.en ?? ""}`)
    .join(" ")
    .toLowerCase();
  return hay.includes(q.trim().toLowerCase());
}

export function search(q: string): Promise<SearchHit[]> {
  if (!q || q.trim().length < 2) return resolve<SearchHit[]>([], 0);
  const hits: SearchHit[] = [];
  for (const c of CCNS) if (match(q, c.name, c.tagline, c.overview)) hits.push({ type: "ccn", title: c.name, href: `/san-pham/dat-cong-nghiep/${c.slug}` });
  for (const f of FACTORIES) if (match(q, f.name)) hits.push({ type: "factory", title: f.name, href: `/san-pham/nha-xuong-xay-san#${f.slug}` });
  for (const n of NEWS) if (match(q, n.title, n.excerpt)) hits.push({ type: "news", title: n.title, href: `/tin-tuc/${n.slug}` });
  for (const j of JOBS) if (match(q, j.title, j.department)) hits.push({ type: "job", title: j.title, href: `/tuyen-dung/${j.slug}` });
  return resolve(hits);
}

// ── Lead (engine chuyển đổi) ──
export type LeadResult = { ok: true; id: string };
export async function submitLead(input: LeadInput): Promise<LeadResult> {
  await resolve(null, 700); // giả lập gửi
  // [Build] thay bằng POST CRM/email (DECISIONS #10). Hiện log để kiểm chứng luồng.
  if (typeof window !== "undefined") console.info("[lead submitted]", input);
  return { ok: true, id: globalThis.crypto?.randomUUID?.() ?? `lead_${input.email}` };
}
