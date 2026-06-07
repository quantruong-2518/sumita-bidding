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

## 3. Việc tiếp theo (ưu tiên giảm dần)
1. **Chi tiết spec từng module** bằng `/ba-spec`, bắt đầu **F4 (template CCN 12 mục)** → P2 → P0 → F3+F2 → F1 → global → còn lại. Mỗi module 1 file `08-spec/<mã>-<tên>.md`; cập nhật trạng thái TOC.
2. **(Nợ từ audit — mức Cao) Việc 1:** bổ sung vào `07-bid-prep/output/07-questions-to-client.md` 2 nhóm câu hỏi còn thiếu — *brand assets* (logo vector, mã navy, font bản quyền) + *redesign/di trú site cũ*; và đưa **mâu thuẫn brief↔sitemap** thành câu hỏi khách.
3. Khi khách trả lời **4 câu tối quan trọng** → cập nhật `DECISIONS.md` → rà lại `02-scope/04-effort-split.md`, `04-team/03-scenarios.md`, và bộ `07-bid-prep/output/`.

## 4. Đọc gì trước khi bắt đầu phiên mới
1. `CLAUDE.md` (tự động đọc)
2. **`HANDOFF.md`** (file này)
3. `AUDIT-LOG.md` — trạng thái audit + bảng mâu thuẫn brief↔sitemap
4. `DECISIONS.md` — giả định đang giữ
5. `08-spec/00-overview.md` — khung spec + TOC (nếu làm spec)

## 5. Cảnh báo còn mở
- **2 doc gốc lệch nhau** (mục 3/4/5, footer 3 vs 6 cột, thứ tự ngôn ngữ) — spec/đang theo **brief**, các điểm này đánh `⚠️CONFIRM`, chưa hỏi khách.
- Mọi con số (effort / giá / timeline) là **tham khảo theo giả định mặc định** — chưa phải cam kết.

_Cập nhật: 2026-06-07._
