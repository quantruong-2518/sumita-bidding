# Sumita.vn — Web FE (skeleton)

Bản dựng **FE thuần** cho website xúc tiến đầu tư Sumita.vn, sinh từ đặc tả `../08-spec/` (F0 screen inventory + F4 CCN template) và `../00-context/sitemap.xml`.

> Trạng thái: **khung màn + data flow + schema** đã chạy được (build pass, **≈27 URL render** từ 16 route pattern — gồm route động `[slug]`, smoke-test 200). Theme **brand đã apply** (navy `#16223a` + cam CTA `#f6861f`, bo góc 0.625rem, font Inter + Plus Jakarta Sans).

## Tech stack
- **Next.js 16** (App Router, Turbopack) · **React 19** · **TypeScript**
- **Tailwind v4** + **shadcn/ui** (radix-nova; brand tokens oklch trong `globals.css`: `--primary` navy · `--cta` cam · `--radius:0.625rem`)
- **TanStack React Query** (data fetching/cache) · **Zustand** (UI/client state) · **Zod** (schema)
- **react-hook-form** + zodResolver (form chuyển đổi)

## Chạy
```bash
pnpm install
pnpm dev            # http://localhost:3000
pnpm build && pnpm start
```

## Kiến trúc & data flow
```
UI (view "use client")
   └─ React Query hooks   (src/lib/query/hooks.ts)
        └─ API layer       (src/lib/api/index.ts)   ← lớp DUY NHẤT chạm dữ liệu
             └─ Mock fixtures (src/lib/mock/*)       ← hiện tại
   └─ Zustand stores (src/lib/store/*)  — UI state: mobile-nav · locale · modal lead
```
**Đổi sang backend thật:** chỉ sửa thân hàm trong `src/lib/api/` (thay mock bằng `fetch`), giữ nguyên chữ ký → hooks & UI không phải sửa.

### Pattern mỗi màn
`page.tsx` (server, mỏng: export `metadata`/`generateStaticParams`, check 404) → render `*View` (client) trong `src/components/views/`. View dùng hook + `useTx()` rồi truyền **string đã resolve** xuống component tái dùng.

> Next 16: `params`/`searchParams` là **Promise** (phải `await`). Dữ liệu hiện fetch **client-side** (React Query) → HTML prerender hiển thị **loading skeleton**, hydrate xong mới có data (hợp lý cho skeleton; khi có API thật có thể prefetch + HydrationBoundary để SSR có data).

## i18n (VI-only, data i18n-ready)
Mọi text dữ liệu là `LocalizedText { vi, en? }`. Render qua `useTx()` (client) / `tx()` (server), thiếu EN → fallback VI. `LanguageSwitcher` đổi locale qua Zustand. Wire `next-intl` sau = thay nguồn locale + bổ sung bản EN, **không phải sửa cấu trúc data**.

## Schema (nguồn sự thật) — `src/lib/schema/index.ts`
`Ccn` (12 mục template), `Factory`, `NewsArticle`, `Job`, `UtilityGroup`, `ServiceItem`, `Partner`, `Doc`, `MapPin`, `LeadInput`. Tất cả bằng Zod → suy ra type.

## Component tái dùng (đòn bẩy reuse) — `src/components/`
- `common/`: `Section`/`Container`, `PageHero`, `PageHeader`, `Breadcrumbs`, **`EntityCard`+`CardGrid`** (1 thẻ — dùng cho CCN/nhà xưởng/tin/việc làm), `StatList`, `DefinitionList`, `IconFeatureGrid`, `TagList`, `Timeline`, `RichText`, `Gallery` (lightbox), `MapPlaceholder`, `StickySubNav` (scrollspy), `Media` (placeholder ảnh), `Icon`, states (`LoadingCards/LoadingLines/EmptyState/ErrorState`).
- `lead/` (engine chuyển đổi): **`LeadForm`** (1 form, 5 variant: brochure/khảo sát/tư vấn/liên hệ/ứng tuyển), `LeadFormDialog` (modal toàn cục theo Zustand), `LeadButton`/`ConversionCtas`, `DownloadList` (lead-gate F2/O-02).
- `shell/`: `SiteHeader` (menu + utility), `CtaBar` (sticky G3), `SiteFooter` (G4), `SearchBar`, `LanguageSwitcher`.

## Bản đồ route ↔ màn (theo F0)
| Route | Màn | Module |
|---|---|---|
| `/` | Trang chủ | P-01 |
| `/gioi-thieu` | Giới thiệu | P-02 |
| `/san-pham/dat-cong-nghiep` · `/[slug]` | DS CCN · **Chi tiết CCN 12 mục** | P-03 · **P-05/F4** |
| `/san-pham/nha-xuong-xay-san` | DS nhà xưởng | P-04 |
| `/tien-ich-ha-tang` · `/dich-vu-ho-tro-dau-tu` | Tiện ích · Dịch vụ | P-06 · P-07 |
| `/tin-tuc` · `/tin-tuc/[slug]` | Tin (list · detail) | P-08 · P-09 |
| `/tuyen-dung` · `/tuyen-dung/[slug]` | Tuyển dụng (list · detail+form) | P-10 · P-11 |
| `/lien-he` · `/tai-lieu` · `/dat-lich-khao-sat` | Liên hệ · Tài liệu · Đặt lịch | P-12 · F2 · F3 |
| `/tim-kiem` · `/phap-ly/[slug]` · `not-found`/`error` | Tìm kiếm · Pháp lý · 404/500 | O-04 · O-06 · O-07 |

## Đang là placeholder / chờ chốt (⚠️CONFIRM)
- **Ảnh/flycam**: dùng `Media` placeholder (DECISIONS #4 — khách cấp ảnh).
- **Brand icons** (Facebook/LinkedIn): lucide bản này đã bỏ → tạm map icon thay thế.
- **Footer (4 cột tạm — brief 3 / jfif 6) · CTA icon set · số CCN (3/4) · mục Tin tức (3/4) · danh mục tin = filter in-page**: theo brief, đánh `⚠️CONFIRM` (xem `../08-spec/F0…` mục F · `../DECISIONS.md` #14–15).
- **Tài liệu tải**: link `/files/*.pdf` là placeholder (chưa có file thật).
- **Submit lead**: `submitLead` chỉ log + giả lập (chưa nối CRM/email — DECISIONS #10).

## Việc tiếp (gợi ý)
~~Style theo brand (navy/cam, bo, typography)~~ ✓ đã apply → wire `next-intl` + bản EN → prefetch React Query (SSR có data) → nối API/CRM thật → thêm test.

_Doc nội bộ cho agent khi build thêm màn: `docs/FE-BUILD-CONTRACT.md`._
