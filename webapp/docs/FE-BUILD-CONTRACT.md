# FE BUILD CONTRACT — đọc trước khi viết view/page

> Nền tảng (lib, hooks, store, shell, component tái dùng, engine chuyển đổi) **ĐÃ XONG**.
> Việc còn lại: dựng **view + page** cho từng màn, **chỉ dùng lại** các API dưới đây. Không sửa file dùng chung. Không tự chế lại component đã có.

## 0. Stack & quy ước bất biến
- **Next 16 (App Router) + TS + Tailwind v4 + shadcn + React Query + Zustand + Zod.**
- Theme đen/trắng, bo góc = 0 — **không thêm màu**, không cần style đẹp; ưu tiên đúng cấu trúc + function.
- Trả lời/nội dung tiếng Việt. Mọi text dữ liệu là `LocalizedText` → resolve qua `useTx()`.
- **KHÔNG** chạy `next build`/`dev`/`tsc` (sẽ verify tập trung ở cuối). **KHÔNG** sửa file ngoài phạm vi được giao. **KHÔNG** tạo mock mới trong `lib/` (dùng hook sẵn có).

## 1. Pattern màn (BẮT BUỘC theo đúng mẫu)
Mỗi route = **`page.tsx` server mỏng** (export metadata) → render **`*View` client** trong `src/components/views/`.

### Static page
```tsx
// src/app/<route>/page.tsx  — SERVER (không "use client")
import type { Metadata } from "next";
import { AboutView } from "@/components/views/about-view";
export const metadata: Metadata = { title: "Giới thiệu", description: "Giới thiệu Sumita…" };
export default function Page() { return <AboutView />; }
```

### Dynamic page ([slug]) — Next 16: params là Promise
```tsx
// src/app/.../[slug]/page.tsx — SERVER
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCcn, getCcnSlugs } from "@/lib/api";
import { tx } from "@/lib/i18n";
import { CcnDetailView } from "@/components/views/ccn-detail-view";

export function generateStaticParams() {
  return getCcnSlugs().map((slug) => ({ slug }));
}
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const item = await getCcn(slug);
  return item ? { title: tx(item.name), description: tx(item.tagline) } : {};
}
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!(await getCcn(slug))) notFound();   // 404 phía server
  return <CcnDetailView slug={slug} />;     // view tự fetch lại bằng React Query
}
```
> Slug getters sync: `getCcnSlugs()`, `getNewsSlugs()`, `getJobSlugs()` từ `@/lib/api`.

### View (client)
```tsx
"use client";
import { useCcns } from "@/lib/query/hooks";
import { useTx } from "@/lib/i18n/use-tx";
// ... dùng component tái dùng
export function CcnListView() {
  const t = useTx();
  const { data, isLoading, isError, refetch } = useCcns();
  // render theo "mẫu trạng thái" mục 4
}
```

## 2. i18n
- `import { useTx } from "@/lib/i18n/use-tx"; const t = useTx();` rồi `t(item.name)` → string (VI, fallback nếu thiếu EN).
- Trong **server** (page.tsx/metadata) dùng `tx(value)` từ `@/lib/i18n` (mặc định VI).
- Component tái dùng nhận **string đã resolve** (gọi `t()` ở view trước khi truyền).

## 3. Hooks dữ liệu — `@/lib/query/hooks`
Tất cả trả về React Query result `{ data, isLoading, isError, refetch }`.
| Hook | data |
|---|---|
| `useCcns()` | `Ccn[]` |
| `useCcn(slug)` | `Ccn \| null` |
| `useFactories(ccnSlug?)` | `Factory[]` |
| `useNews(category?)` | `NewsArticle[]` (category: `"thi-truong"\|"tin-du-an"\|"su-kien"`) |
| `useNewsArticle(slug)` | `NewsArticle \| null` |
| `useJobs()` | `Job[]` |
| `useJob(slug)` | `Job \| null` |
| `useUtilityGroups()` | `UtilityGroup[]` |
| `useServices()` | `ServiceItem[]` |
| `usePartners()` | `Partner[]` |
| `useMapPins()` | `MapPin[]` (`{ ccnSlug, name, x, y }`) |
| `useDocs({ ccnSlug?, category? })` | `Doc[]` |
| `useSearch(q)` | `SearchHit[]` (`{ type, title, href }`); chỉ chạy khi q≥2 |

Types: `import type { Ccn, Factory, NewsArticle, Job, ... } from "@/lib/schema"`.

## 4. Mẫu trạng thái (dùng `@/components/common/states`)
```tsx
if (isLoading) return <LoadingCards columns={3} count={6} />;          // hoặc <LoadingLines />
if (isError)   return <ErrorState onRetry={() => refetch()} />;
if (!data?.length) return <EmptyState title="Chưa có dữ liệu" />;
return <CardGrid> … </CardGrid>;
```
Đặt khối trạng thái **bên trong** `<Section>`/`<Container>` của màn.

## 5. Component tái dùng (props chính) — `@/components/common/*`
- `Container({ children, className })`
- `Section({ id?, eyebrow?, title?, description?, actions?, children?, bordered?, container?=true, contentClassName? })`
- `PageHeader({ breadcrumbs?: {label,href?}[], eyebrow?, title, description?, actions? })` — header trang con (H1)
- `PageHero({ eyebrow?, title, tagline?, image?, actions?, size?: "md"|"lg" })` — hero lớn (trang chủ/CCN)
- `Breadcrumbs({ items: {label, href?}[] })`
- `CardGrid({ columns?=3, children })` + `EntityCard({ href?, image?, badge?, title, subtitle?, description?, meta?: {label,value}[], tags?: string[], ctaLabel?, footer? })`
- `StatList({ items: {label,value}[], columns?=4 })` · `DefinitionList({ items, columns?=2 })`
- `IconFeatureGrid({ items: {icon,title,desc?}[], columns?=3 })` (icon = tên string, vd "Zap")
- `TagList({ items: {label, variant?}[] })` · `Timeline({ items: {date,label,done?}[] })` · `RichText({ content: string })`
- `Gallery({ items: {src, label?}[], columns? })` · `MapPlaceholder({ pins: {id,label,x,y,href?}[] })`
- `Media({ label?, ratio?=16/9, icon?, className? })` — placeholder ảnh
- `Icon({ name, className })` — tên icon dạng string (lucide PascalCase)
- States: `LoadingCards`, `LoadingLines`, `EmptyState`, `ErrorState`

## 6. Engine chuyển đổi — `@/components/lead/*`
- `ConversionCtas({ ccnInterest?, source?, size?, className? })` — bộ 3 nút brochure/khảo sát/tư vấn. Dùng ở hero/section CTA.
- `LeadButton({ ...buttonProps, lead?: { variant, title?, source?, ccnInterest?, doc? } })` — nút mở modal. variant ∈ `"brochure"|"khao-sat"|"tu-van"|"lien-he"|"ung-tuyen"`.
- `LeadForm({ variant, defaultCcnInterest?, source?, onSuccess?, successExtra?, className? })` — form nhúng trực tiếp (trang Liên hệ / Đặt lịch / Ứng tuyển).
- `DownloadList({ docs: Doc[], ccnInterest?, source? })` — danh sách tài liệu có lead-gate (F2/O-02).
> Modal toàn cục đã mount sẵn ở layout — chỉ cần gọi `LeadButton`/`ConversionCtas`/`DownloadList`.

## 7. Site config — `@/lib/mock`
`HOME` `{ hero:{eyebrow,title,tagline}, stats:{label,value}[] }` · `ABOUT` `{ intro, mission, vision, values:{label,value}[] }` (đều LocalizedText) · `CONTACT` · `MAIN_NAV` · `FOOTER_LINKS` · `CTA_CHANNELS`.

## 8. Bảng route ↔ view ↔ module
| Route | page.tsx | View | Module |
|---|---|---|---|
| `/` | app/page.tsx | HomeView | P-01 |
| `/gioi-thieu` | app/gioi-thieu | AboutView | P-02 |
| `/san-pham/dat-cong-nghiep` | …/page | CcnListView | P-03 |
| `/san-pham/dat-cong-nghiep/[slug]` | …/[slug] | CcnDetailView | **P-05 (F4)** |
| `/san-pham/nha-xuong-xay-san` | …/page | FactoryListView | P-04 |
| `/tien-ich-ha-tang` | …/page | UtilitiesView | P-06 |
| `/dich-vu-ho-tro-dau-tu` | …/page | ServicesView | P-07 |
| `/tin-tuc` | …/page | NewsListView | P-08 |
| `/tin-tuc/[slug]` | …/[slug] | NewsDetailView | P-09 |
| `/tuyen-dung` | …/page | JobsListView | P-10 |
| `/tuyen-dung/[slug]` | …/[slug] | JobDetailView | P-11 |
| `/lien-he` | …/page | ContactView | P-12 |
| `/tai-lieu` | …/page | DownloadsView | F2/O-02 |
| `/dat-lich-khao-sat` | …/page | BookVisitView | F3 |
| `/tim-kiem` | …/page | SearchView | O-04/S1 |
| `/phap-ly/[slug]` | …/[slug] | LegalView | O-06/X2 |
| `app/not-found.tsx` | — | (inline) | O-07 |
| `app/error.tsx` | — | (inline, "use client") | O-07 |

## 9. Icons có sẵn (Icon name)
Zap, Droplets, Recycle, Wifi, TrafficCone, Flame, CloudRain, ShieldCheck, Trees, UtensilsCrossed, ShoppingCart, Bus, Scale, HardHat, Banknote, Users, Settings, MessageCircle, Phone, Facebook, Linkedin, Menu, X, Search, ChevronDown/Left/Right, MapPin, Download, FileText, ArrowLeft/Right, Check, Mail, Clock, Building2, Play, Loader2, Globe, ImageOff, Briefcase, Calendar, ExternalLink, Quote, Square. (Thiếu tên → tự rơi về Square; ưu tiên dùng tên trong danh sách.)
