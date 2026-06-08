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
- **`00-context/sitemap.xml`** ✨ — sitemap XML chuẩn sitemaps.org + hreflang VI/EN, 19 URL active; CCN Thụy Trường & "Báo chí nói gì" để comment-out chờ chốt. Đã validate well-formed. (Khác `03-sitemap.md` = bản cho người đọc.)
- **`08-spec/N0-hidden-modules-and-nfr.md`** ✨ — verify độ phủ: **25 module map 1:1 với brief §4–11 (đủ)**, nhưng **FR chưa bóc tách (0/25 vẫn ⬜)**. Identify **7 module ẩn** (S1 Search · X1 Consent · X2 Pháp lý · X3 Error states · X4 Hậu-form · X5 Chống spam · A1 Quản lý Lead) + **NFR mở rộng N6–N10** (SEO-infra · Security · Monitoring-bằng-data · Compliance PDPD · Reliability/Ops). Gắn nhãn Stated/Implied/Assumed + cột Design-only/Full-build. → đã thêm **nhóm E** vào TOC `00-overview.md`.
- **`DECISIONS.md` #10–#13** (☐) phát sinh từ N0: CRM-đích-lead · font CJK · tuân thủ PDPD · hero video-flycam. → đã thêm **nhóm F (Q-N1→Q-N5)** vào câu hỏi khách.
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

## 3. Việc tiếp theo (ưu tiên giảm dần)
1. **Chi tiết spec từng module** bằng `/ba-spec`, bắt đầu **F4 (template CCN 12 mục)** → P2 → P0 → F3+F2 → F1 → global → còn lại. Mỗi module 1 file `08-spec/<mã>-<tên>.md`; cập nhật trạng thái TOC.
2. **(Nợ từ audit — mức Cao) Việc 1:** bổ sung vào `07-bid-prep/output/07-questions-to-client.md` 2 nhóm câu hỏi còn thiếu — *brand assets* (logo vector, mã navy, font bản quyền) + *redesign/di trú site cũ*; và đưa **mâu thuẫn brief↔sitemap** thành câu hỏi khách.
3. Khi khách trả lời **4 câu tối quan trọng** → cập nhật `DECISIONS.md` → rà lại `02-scope/04-effort-split.md`, `04-team/03-scenarios.md`, và bộ `07-bid-prep/output/`.

## 4. Đọc gì trước khi bắt đầu phiên mới
1. `CLAUDE.md` (tự động đọc)
2. **`HANDOFF.md`** (file này)
3. `AUDIT-LOG.md` — trạng thái audit + bảng mâu thuẫn brief↔sitemap
4. `DECISIONS.md` — giả định đang giữ (nay 13 mục, chốt 1)
5. `08-spec/00-overview.md` — khung spec + TOC (nếu làm spec)
6. `08-spec/N0-hidden-modules-and-nfr.md` — module ẩn + NFR mở rộng (nếu làm scope/architecture)
7. `08-spec/F0-screen-inventory.md` + `08-spec/F4-template-ccn.md` — gom màn FE + spec CCN (nếu làm web)
8. `webapp/README.md` — kiến trúc FE đã dựng (nếu làm web/FE)

## 5. Cảnh báo còn mở
- **2 doc gốc lệch nhau** (mục 3/4/5, footer 3 vs 6 cột, thứ tự ngôn ngữ) — spec/đang theo **brief**, các điểm này đánh `⚠️CONFIRM`, chưa hỏi khách.
- Mọi con số (effort / giá / timeline) là **tham khảo theo giả định mặc định** — chưa phải cam kết.
- **FR chưa bóc tách:** 25 module + nhóm ẩn mới ở mức danh mục; **0/25 module có FR** (FR-xx-n, MoSCoW, AC Gherkin). Đây là việc kế tiếp rõ nhất để khóa scope MVP.

_Cập nhật: 2026-06-08 (thêm: dựng FE `webapp/` — build pass, 27 route)._
