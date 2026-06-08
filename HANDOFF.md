# HANDOFF — Trạng thái dự án & việc tiếp theo

> Đọc file này **đầu mỗi phiên mới** để nối tiếp công việc. Cập nhật lại khi kết thúc phiên.
> Workspace: `sumita-bid/` · Entry: `CLAUDE.md`.

## 1. Dự án là gì
Chuẩn bị **hồ sơ thầu + đặc tả** cho website xúc tiến đầu tư **Sumita.vn** (nền tảng chuỗi CCN, mục tiêu lead-generation). 2 tài liệu gốc: `docs/brief.pdf` (11 trang) + `docs/sitemap.jfif`.

## 2. Đã làm xong (qua các phiên trước)

**a. Audit context — XONG.** Đối chiếu toàn bộ 37 file workspace vs 2 doc gốc → **34 ✅ · 3 ⚠️ · 0 ❌**. Chi tiết + nguồn sự thật + bảng mâu thuẫn brief↔sitemap: **`AUDIT-LOG.md`**.

**b. Verify dữ kiện ngoài — XONG, đều CHÍNH XÁC.** FDI Thái Bình 2023 (~3 tỷ/top5), 2024 (~1,16 tỷ/hạng12); đối thủ Liên Hà Thái; sáp nhập TB→Hưng Yên (NQ 60-NQ/TW, hiệu lực 01/7/2025). Nguồn đã ghi trong `01-analysis/04`, `01-analysis/05`.

**c. Quyết định mới.** `DECISIONS.md` **#9 (☑)**: dùng **song song** "Thái Bình" + "Hưng Yên" (chờ khách xác nhận, câu E). Đã làm mềm proposal tương ứng. ⚠️ **#1–#8 vẫn CHƯA chốt** — quan trọng nhất là **#1: thiết kế-only vs full-build**.

**d. Đặc tả (spec) — MỚI DỰNG KHUNG, chưa chi tiết.**
- Khung: **`08-spec/00-overview.md`** — template module chuẩn + TOC 25 module (G1–G6, P0–P7, F1–F4, N1–N5) + thứ tự đề xuất. Tất cả module đang ⬜.
- Skill BA tái dùng: **`~/.claude/skills/ba-spec/SKILL.md`** (BABOK v3 + ISO/IEC/IEEE 29148 + MoSCoW + Gherkin AC; kỷ luật no-bịa / no-over-engineer). Gọi `/ba-spec` — **cần reload Claude Code mới hiện trong danh sách**.

**e. Phiên 2026-06-08 — sitemap chuẩn + module ẩn/NFR + glossary hệ thống.**
- **`00-context/sitemap.xml`** ✨ — sitemap XML chuẩn sitemaps.org + hreflang VI/EN, **14 URL active** (tổng 19 `<loc>`, 5 comment-out chờ chốt: CCN Thụy Trường · "Báo chí nói gì" · 3 danh mục tin = filter in-page theo DECISIONS #14). Đã validate well-formed. (Khác `03-sitemap.md` = bản cho người đọc.)
- **`08-spec/N0-hidden-modules-and-nfr.md`** ✨ — verify độ phủ: **25 module map 1:1 với brief §4–11 (đủ)**, nhưng **FR chưa bóc tách (0/25 vẫn ⬜)**. Identify **7 module ẩn** (S1 Search · X1 Consent · X2 Pháp lý · X3 Error states · X4 Hậu-form · X5 Chống spam · A1 Quản lý Lead) + **NFR mở rộng N6–N10** (SEO-infra · Security · Monitoring-bằng-data · Compliance PDPD · Reliability/Ops). Gắn nhãn Stated/Implied/Assumed + cột Design-only/Full-build. → đã thêm **nhóm E** vào TOC `00-overview.md`.
- **`DECISIONS.md` #10–#13** (☐) phát sinh từ N0: CRM-đích-lead · font CJK · tuân thủ PDPD · hero video-flycam. → đã thêm **nhóm G (Q-N1→Q-N5)** vào câu hỏi khách _(sau khi re-letter — xem phiên review bên dưới)._
- **Glossary 2 tầng:** tạo **`Senera/GLOSSARY.md`** (cấp hệ thống: từ vựng dùng chung) + dọn `sumita-bidding/GLOSSARY.md` (chỉ domain: CCN/KCN/RBF/XLNT…). Quy ước: từ phổ quát lên trên, domain ở dưới.
- **3 thứ ẩn tác động lớn nhất tới giá** (nêu khách): video flycam hero · font CJK + UX đa ngữ · event taxonomy + lead attribution.

**f. Phiên 2026-06-08 (tiếp) — DỰNG FE `webapp/` (CHẠY ĐƯỢC, build pass).**
- Thêm 2 spec gốc cho FE: **`08-spec/F0-screen-inventory.md`** (gom ~26 đơn vị màn) + **`08-spec/F4-template-ccn.md`** (CCN 12 mục, AC Gherkin).
- Stack: **Next 16 · Tailwind v4 · shadcn · React Query · Zustand · Zod**; theme **đen/trắng, bo góc 0** (tạm, style sau). Chạy: `pnpm -C webapp dev`.
- **27 route** khớp `sitemap.xml` (typecheck sạch, smoke-test 200): trang chủ · giới thiệu · DS CCN + **chi tiết CCN 12 mục (F4) data-driven, ẩn section rỗng** · nhà xưởng · tiện ích · dịch vụ · tin (list+detail) · tuyển dụng (list+detail+form) · liên hệ · tài liệu · đặt lịch · tìm kiếm · pháp lý · 404/500.
- **Data flow**: `src/lib/api` (mock) → React Query hooks → UI; đổi sang backend = thay thân hàm api, **giữ chữ ký**. Dữ liệu = mock fixtures (`src/lib/mock`), **i18n-ready** (`LocalizedText{vi,en?}`, render VI).
- **Engine chuyển đổi**: 1 `LeadForm` (5 variant) + modal toàn cục + **download lead-gate** (F2/O-02). Submit chỉ **giả lập/log** (chưa nối CRM — DECISIONS #10).
- Doc: **`webapp/README.md`** (kiến trúc) · `webapp/docs/FE-BUILD-CONTRACT.md` (hợp đồng build cho agent).
- Placeholder/⚠️CONFIRM nguyên trạng: ảnh (Media placeholder) · footer 3/6 cột · CTA icon · số CCN · mục tin tức · brand icons lucide đã bỏ.

**g. Phiên 2026-06-08 (tiếp) — UI THEME brand + REVIEW & SỬA độ-khớp-nguồn.**
- **2 agent chạy song song:** (1) review spec↔FE↔output tìm thừa/thiếu/sai; (2) build UI theme.
- **UI theme đã apply** (build pass): palette **navy `#16223a` (primary) + cam `#f6861f` (CTA, dùng tiết chế)** + trắng/xám; `--radius 0.625rem`; font **Inter + Plus Jakarta Sans**. Footer credit **"Một sản phẩm của Senera"** (link seneravn-web.vercel.app) + **Quân – Senera Founder · 0345913369**. (Theme đen/trắng cũ đã thay.)
- **Đã sửa các điểm chưa khớp nguồn** (đã xác minh từng cái trên file):
  - `07-questions-to-client.md`: re-letter + thêm **nhóm B brand assets · C di trú site cũ · I chốt mâu thuẫn brief↔sitemap** (E vẫn = định vị để giữ ref DECISIONS #9). → **xong "Việc 1" nợ từ audit.**
  - `sitemap.xml`: comment-out 3 URL danh mục tin (= filter in-page, DECISIONS #14) → **14 URL active** (đã sửa số "19" sai ở HANDOFF).
  - `06-assumptions.md`: đồng bộ lên **#9–15** (khớp DECISIONS).
  - `DECISIONS.md`: thêm **#14** (danh mục tin = filter) + **#15** (footer 4-cột tạm), cả 2 ☐ chờ khách.
  - `08-spec/N0`: thêm **scope-guard** N7/N8.5–8.7/N10 = Full-build, không vào SOW thiết kế-only.
  - FE: thêm nút **"Đặt lịch khảo sát" vào CTA bar desktop** (brief §6); sửa comment footer (4 cột tạm, không đổi layout); cập nhật `webapp/README.md`.
- **Chưa làm** (review nêu, để khách/phiên sau quyết): tách FR-xx cho 25 module (vẫn 0/25); thêm khối "Tiện ích" ở home; consent banner X1 toàn site; các điểm Thấp khác trong báo cáo review.

**h. Phiên 2026-06-08 (tiếp) — 2 agent song song: cải thiện UI FE + kế hoạch phân lô FDD.**
- **Agent #1 — UI `webapp/`** (verify: `tsc --noEmit` PASS · `next build` 27/27 PASS · eslint 0 error / 2 warning pre-existing):
  - **Ảnh thật thay placeholder:** 23 ảnh Unsplash (free) tải **local** `public/images/` (không phụ thuộc mạng); registry **`src/lib/images.ts`** (1 chỗ đổi ảnh) + nâng `Media` nhận `src`→`next/image` (sizes/lazy/alt), fallback hộp xám. Ảnh gắn qua mock fixtures, **không hardcode**; `public/images/CREDITS.md` ghi nguồn. **Production vẫn = ảnh khách (DECISIONS #4)** — đây chỉ là ảnh demo cho thực tế hơn.
  - **Footer "Đặt lịch khảo sát":** tách thành **dải CTA full-width** trên các cột link (copy thuyết phục + form trong card). Credit Senera/Quân/0345913369 giữ nguyên; ⚠️CONFIRM số cột (DECISIONS #15) chưa tự chốt.
  - **Map thật:** thêm `leaflet` + `react-leaflet` (OSM, **không token**), SSR-safe `dynamic(ssr:false)` (`common/leaflet-map.tsx`); pin lat/lng quanh Thái Bình/Hưng Yên (DECISIONS #9), fallback pin-% khi thiếu toạ độ. ⚠️ tiles cần mạng lúc demo (ảnh thì local).
  - **Mobile/UX:** touch target 44px, inputMode/autoComplete/type=search, focus-visible + aria, hero overlay navy đảm bảo contrast WCAG. *Đề xuất chưa làm:* nâng chiều cao mặc định Button/Input toàn site (hiện h-8/h-9 hơi nhỏ).
- **Agent #2 — kế hoạch phân lô FDD:** **`08-spec/FDD-BATCH-PLAN.md`** ✨ — chia 36 module thành **6 lô (BA-1…BA-6)** cohesion cao / coupling thấp + sơ đồ **Wave 0 (khoá contract C1–C10 + nâng F4 🟡→✅ golden sample) → Wave 1 BA-1/2/3/6 song song → Wave 2 BA-4/5 song song → Wave 3 P0 + rà chéo + TOC**. Có prompt template §7 sẵn-dùng để launch từng BA agent.
  - ⚠️ **Phát hiện:** skill `/ba-spec` **chưa tồn tại thật** ở `~/.claude/skills/` (mục 2e/HANDOFF cũ nói có — sai). Plan đã viết contract C1–C10 đủ như "skill rút gọn" để BA agent bám trực tiếp `00-overview.md §2`.

## 3. Việc tiếp theo (ưu tiên giảm dần)
1. **Thực thi viết FDD theo `08-spec/FDD-BATCH-PLAN.md`**: Wave 0 (main khoá contract C1–C10 + nâng **F4** 🟡→✅ golden sample) → Wave 1 launch song song **BA-1/2/3/6** → Wave 2 **BA-4/5** → Wave 3 **P0** + rà chéo. Mỗi module 1 file `08-spec/<mã>-<tên>.md`; cập nhật trạng thái TOC. ⚠️ `/ba-spec` chưa có thật → bám template `00-overview §2` + contract trong plan.
2. ~~**Việc 1** (brand assets + di trú + mâu thuẫn brief↔sitemap thành câu hỏi)~~ ✓ **XONG** ở phiên g.
3. **(Mức Cao) Tách FR-xx-n** cho 25 module (vẫn 0/25) — khóa scope MVP, kèm MoSCoW + AC Gherkin (dùng `/ba-spec`).
4. Khi khách trả lời **4 câu tối quan trọng** → cập nhật `DECISIONS.md` → rà lại `02-scope/04-effort-split.md`, `04-team/03-scenarios.md`, và bộ `07-bid-prep/output/`.

## 4. Đọc gì trước khi bắt đầu phiên mới
1. `CLAUDE.md` (tự động đọc)
2. **`HANDOFF.md`** (file này)
3. `AUDIT-LOG.md` — trạng thái audit + bảng mâu thuẫn brief↔sitemap
4. `DECISIONS.md` — giả định đang giữ (nay 15 mục, chốt 1)
5. `08-spec/00-overview.md` — khung spec + TOC (nếu làm spec)
6. `08-spec/N0-hidden-modules-and-nfr.md` — module ẩn + NFR mở rộng (nếu làm scope/architecture)
7. `08-spec/F0-screen-inventory.md` + `08-spec/F4-template-ccn.md` — gom màn FE + spec CCN (nếu làm web)
8. `webapp/README.md` — kiến trúc FE đã dựng (nếu làm web/FE)
9. `08-spec/FDD-BATCH-PLAN.md` — kế hoạch phân lô + wave + prompt mẫu (nếu sắp viết FDD song song)

## 5. Cảnh báo còn mở
- **2 doc gốc lệch nhau** (mục 3/4/5, footer 3 vs 6 cột, thứ tự ngôn ngữ) — spec/đang theo **brief**, các điểm này đánh `⚠️CONFIRM`, chưa hỏi khách.
- Mọi con số (effort / giá / timeline) là **tham khảo theo giả định mặc định** — chưa phải cam kết.
- **FR chưa bóc tách:** 25 module + nhóm ẩn mới ở mức danh mục; **0/25 module có FR** (FR-xx-n, MoSCoW, AC Gherkin). Đã có **kế hoạch phân lô** (`08-spec/FDD-BATCH-PLAN.md`) nhưng **chưa chạy** — đây là việc kế tiếp rõ nhất để khóa scope MVP.
- **Skill `/ba-spec` không tồn tại thật** ở `~/.claude/skills/` (chỉ có `commit`, `pr`) — tham chiếu cũ trong HANDOFF sai. BA agent bám template `00-overview §2` + contract C1–C10 trong plan thay thế.
- **FE demo:** ảnh là **demo Unsplash** (production = ảnh khách, DECISIONS #4); map dùng **OSM tiles** → cần mạng để tải tiles lúc demo (ảnh thì đã local).

_Cập nhật: 2026-06-08 (thêm: Agent#1 cải thiện UI FE — ảnh thật + footer đặt-lịch + map leaflet + mobile/UX; Agent#2 kế hoạch phân lô FDD `08-spec/FDD-BATCH-PLAN.md`)._
