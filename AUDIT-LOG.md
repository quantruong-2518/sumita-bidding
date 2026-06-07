# NHẬT KÝ AUDIT CONTEXT — đối chiếu file workspace vs 2 doc gốc

> **Mục đích:** kiểm tra từng file trong workspace đã "nắm đúng context" từ 2 tài liệu yêu cầu gốc (`docs/brief.pdf`, `docs/sitemap.jfif`) chưa.
> **File này là điểm nối xuyên nhiều conversation.** Mở đầu mỗi phiên: đọc `CLAUDE.md` → đọc file này → xem bảng checklist bên dưới → tiếp tục từ dòng "⏭️ TIẾP THEO".

## Cách đọc / cập nhật
- Mỗi file workspace có 1 dòng trong **Bảng checklist**. Khi audit xong 1 file: đổi trạng thái + ghi 1 dòng kết luận, và bổ sung chi tiết (nếu có vấn đề) ở phần "Chi tiết phát hiện".
- Trạng thái: ✅ đúng · ⚠️ đúng nhưng có lưu ý/thiếu · ❌ sai/mâu thuẫn · ⬜ chưa kiểm.
- Cập nhật mốc thời gian + dòng "⏭️ TIẾP THEO" sau mỗi đợt làm.

---

## ⚠️ NGUỒN SỰ THẬT: 2 doc gốc KHÔNG khớp 100%
Đây là dữ kiện nền — mọi file con phải nhất quán với điều này. Brief.pdf (11 trang) và ảnh sitemap.jfif lệch nhau ở các điểm sau (brief được coi là **mới hơn** vì footer ghi "CẬP NHẬT MỚI"):

| Điểm | brief.pdf | sitemap.jfif | Ghi chú |
|---|---|---|---|
| Mục 5 Tin tức | Thị trường · Tin dự án · Sự kiện (3) | **+ "Báo chí nói gì về Sumita"** (4) | ảnh có thêm 1 mục |
| Mục 3 | "Tiện ích" — có *Xử lý nước thải* + *Thoát nước mưa* | "Tiện ích **và dịch vụ nhà đầu tư**" — bỏ 2 mục đó | tên + nội dung lệch |
| Mục 4 | có *Xây nhà xưởng theo yêu cầu* + *vận hành trạm XLNT* | *Xử lý nước thải* nằm ở đây; gộp khác | phân bổ mục lệch |
| Ngôn ngữ | VI/EN/**JP/KR/CN** | VI/EN/**CN/JP/KR** | khác thứ tự |
| CTA bar | Zalo · Hotline · FB · LinkedIn · Đặt lịch | bộ icon khác (tìm kiếm/bản đồ/tài liệu/chia sẻ…) + nút đỏ | khác layout |
| Footer | **3 cột** (ghi "CẬP NHẬT MỚI") | **6 cột** (Về Sumita/Hệ thống CCN/Giải pháp/Tài liệu/Kết nối/Liên hệ) | brief mới hơn |
| Số CCN | 3 (Hưng Nhân, Đức Hiệp, Cồn Nhất) | footer có **CCN Thụy Trường** = 4 | → open question đã ghi |

**Dữ kiện cố định lấy từ brief (dùng để đối chiếu các file con):**
- Primary color `#f6861f`; Secondary: Navy Blue / White / Light Gray.
- Template chi tiết CCN = **12 mục** lặp lại.
- 7 nhánh menu chính: Giới thiệu · Sản phẩm · Tiện ích · Dịch vụ & hỗ trợ đầu tư · Tin tức & truyền thông · Tuyển dụng · Liên hệ.
- Benchmark: DEEP C, Hung Phu IP.
- Tính năng bắt buộc: Interactive Map, Download Center (có lead form trước tải), Form hệ thống, Đa ngôn ngữ.
- Kỹ thuật: Responsive, Mobile-first, SEO, CMS dễ quản trị, tốc độ, tracking GA4 + Meta Pixel + Conversion.
- Output đội thiết kế: Sitemap · Wireframe · Homepage UI · Inner page UI · UI Design System · Responsive Prototype · Animation Guideline · Developer Handoff.

---

## Bảng checklist (37 file)

### 00-context/ — lớp ghi context trực tiếp
| File | Trạng thái | Kết luận 1 dòng |
|---|---|---|
| 01-project-overview.md | ✅ | Khớp brief tr.1–2. (Ghi chú "Hưng Yên" là phân tích thêm, đã cross-ref.) |
| 02-brand-identity.md | ✅ | Khớp brief mục 3 + 8. |
| 03-sitemap.md | ⚠️→🔧 | Đúng theo brief; thiếu các điểm chỉ-có-trong sitemap.jfif. **Đã thêm mục cảnh báo khác biệt (xem file).** |

### 01-analysis/ — phân tích kinh doanh (diễn giải)
| File | Trạng thái | Kết luận 1 dòng |
|---|---|---|
| 01-business-problem.md | ✅ | Reframe lead-gen/lấp đầy quỹ đất — khớp mục tiêu chuyển đổi của brief. Mô hình 3 nguồn doanh thu là suy luận, đã ghi "cần xác nhận". |
| 02-buyer-journey.md | ✅ | Tách FDI vs SME; nhấn Download Center (tính năng bắt buộc của brief ✓). Diễn giải hợp lý, không mâu thuẫn. |
| 03-positioning.md | ✅ | Cảnh báo CCN≠KCN, benchmark lệch — đọc đúng việc brief chọn DEEP C/Hung Phu cho sản phẩm CCN. |
| 04-brand-risk-merger.md | ✅ | Sáp nhập TB→Hưng Yên **đã xác minh** (NQ 60-NQ/TW 12/4/2025, hiệu lực 01/7/2025). Đã chốt hướng "dùng cả hai địa danh" (DECISIONS #9). |
| 05-competition.md | ✅ | Số liệu FDI 2023 (~3 tỷ/top5) + 2024 (~1,16 tỷ/hạng12) + Liên Hà Thái **đã verify chính xác** (2026-06), đã ghi nguồn. |
| 06-metrics-roi.md | ✅ | Khung đo lead chất lượng — khớp yêu cầu tracking GA4/Pixel/Conversion (brief mục 11). Cảnh báo lead đa ngôn ngữ hợp lý. |

### 02-scope/
| File | Trạng thái | Kết luận 1 dòng |
|---|---|---|
| 01-design-vs-build.md | ✅ | Trích đúng mâu thuẫn brief: Mục 12 ("Developer Handoff" → hàm ý đội dev khác) vs Mục 11 (CMS/SEO/GA4 → chạy thật). Đọc context rất chuẩn. |
| 02-content-volume.md | ✅ | Công thức 12 mục × 3–4 CCN × ngôn ngữ — khớp brief. |
| 03-tech-features.md | ⚠️ | Bao đủ tính năng bắt buộc của brief mục 10–11, nhưng gộp lại: thay "Form hệ thống" bằng "Tracking" trong nhóm 4, Form đưa xuống dưới (brief liệt 4 bắt buộc = Map/Download/Form/Đa ngôn ngữ). Mang theo giả định "Hưng Yên". |
| 04-effort-split.md | ✅ | Ước lượng % effort gói full-build, đánh dấu "tham khảo" + phân biệt effort/chi phí/timeline đúng quy ước CLAUDE.md. |

### 03-deliverables/
| File | Trạng thái | Kết luận 1 dòng |
|---|---|---|
| 01-design.md | ✅ | 8 output thiết kế khớp **chính xác** brief mục 12; design system ghi đúng #f6861f + navy. |
| 02-development.md | ✅ | Output dev (item 9–15) map đúng brief mục 10–11 (CMS đa ngữ, Map, Download lead-gating, form/CRM, GA4/Pixel, launch). |
| 03-content-assets.md | ✅ | Copywriting/dịch/ảnh-flycam (brief cấm stock ✓)/PDF Download Center/nhập liệu — đều có gốc trong brief mục 9–10. |
| 04-out-of-scope.md | ✅ | Loại trừ hợp lý (hosting/domain/bảo trì/SEO ops/chụp ảnh); không mâu thuẫn brief, gắn giả định "ảnh khách cung cấp". |

### 04-team/
| File | Trạng thái | Kết luận 1 dòng |
|---|---|---|
| 01-roles.md | ✅ | Vai trò đội thiết kế; "3 luồng chuyển đổi" khớp 3 mục tiêu của brief; giả định ~13 template/3–4 CCN khớp CLAUDE.md. |
| 02-graphic-vs-uiux.md | ✅ | Dựa đúng các điểm brief: icon system đồng nhất, infographic hiện đại, cấm stock, flycam thật. Phân biệt graphic vs UI/UX hợp lý. |
| 03-scenarios.md | ✅ | Kịch bản đội + timeline đánh dấu "tham khảo"; nhất quán giả định phạm vi. |

### 05-open-questions/
| File | Trạng thái | Kết luận 1 dòng |
|---|---|---|
| 01-critical-four.md | ✅ | 4 câu = 4 quyết định chưa chốt ở CLAUDE.md, có xác nhận Thụy Trường. |
| 02-group-a-volume.md | ✅ | Bắt đúng ambiguity "Số CCN 3 hay 4 (Thụy Trường)" + template ~12–15. |
| 03-group-b-inputs.md | ✅ | Hỏi đúng các điểm "cần xác minh" của 02-brand-identity (logo vector, mã navy, font). |
| 04-group-c-handoff.md | ✅ | Độ sâu Map/Design System/Animation/Prototype — map đúng deliverables brief mục 12. |

### 06-risks/
| File | Trạng thái | Kết luận 1 dòng |
|---|---|---|
| 01-risk-register.md | ✅ | 6 rủi ro nhất quán với các phân tích; rủi ro sáp nhập TB–HY & phạm vi đã được ghi. |

### 07-bid-prep/
| File | Trạng thái | Kết luận 1 dòng |
|---|---|---|
| 01-deliverables-to-produce.md | ✅ | 7 tài liệu thầu map đúng về các folder nguồn. |
| 02-checklist.md | ✅ | Checklist khớp; có nhắc "xác minh số liệu FDI" + "xử lý thương hiệu TB–HY". |
| output/00-README.md | ✅ | Index + 4 giả định nền khớp DECISIONS. |
| output/01-proposal.md | ✅ | Đã **làm mềm**: chuyển sang "hiển thị song song Thái Bình + Hưng Yên, đề xuất chờ khách xác nhận". |
| output/02-sow.md | ✅ | 8 đầu ra = brief mục 12; in/out-of-scope rõ. |
| output/03-quote.md | ✅ | Khung 3 rổ, đơn giá để `[ĐƠN GIÁ]`, % lấy từ 02-scope/04, đánh dấu tham khảo. |
| output/04-timeline.md | ✅ | Timeline theo giai đoạn + phần song song; tham khảo. |
| output/05-staffing.md | ✅ | Nhân sự khớp 04-team. |
| output/06-assumptions.md | ✅ | 8 giả định = DECISIONS. |
| output/07-questions-to-client.md | ⚠️ | Đã reframe câu E (địa danh → confirm "dùng cả hai"). **Còn thiếu 2 nhóm** (việc 1 chưa làm): brand assets, redesign/di trú, + mâu thuẫn brief↔sitemap. |

### Gốc
| File | Trạng thái | Kết luận 1 dòng |
|---|---|---|
| CLAUDE.md | ✅ | Bối cảnh + 4 quyết định chưa chốt khớp brief; đã thêm con trỏ tới file này. |
| DECISIONS.md | ✅ | 8 quyết định, tất cả chưa chốt (☐); nhất quán với 06-assumptions. |
| GLOSSARY.md | ✅ | Thuật ngữ (CCN/KCN/FDI/lead-gating/effort/template gốc) chính xác, đúng tinh thần brief. |
| README.md | ✅ | Hướng dẫn dùng workspace; nhất quán. (Cây thư mục chưa liệt AUDIT-LOG.md — không bắt buộc.) |

---

## Chi tiết phát hiện

### 00-context/03-sitemap.md
- **Vấn đề:** file bám theo brief.pdf, chưa phản ánh các điểm chỉ có trong sitemap.jfif (xem bảng "NGUỒN SỰ THẬT" trên).
- **Đã xử lý:** thêm mục "⚠️ Khác biệt brief vs sitemap.jfif" vào cuối file để khóa lại các điểm cần hỏi khách.

### 01-analysis/04-brand-risk-merger.md (+ ảnh hưởng 00-context/01-project-overview.md)
- **Bản chất:** dữ kiện sáp nhập tỉnh (Thái Bình → Hưng Yên, 01/7/2025) **không có trong 2 doc gốc** — là kiến thức ngoài đưa vào. Brief vẫn dùng "Thái Bình".
- **Tại sao quan trọng:** chi phối định vị, nội dung, SEO, domain `sumita.vn`; `01-project-overview.md` đã viết "(nay thuộc tỉnh Hưng Yên)" như sự thật đã chốt.
- **Cần làm:** xác nhận với khách dùng địa danh nào trên website → đẩy thành open question / DECISIONS. Kiểm tra `05-open-questions/` xem đã có chưa (Bước 5).

### 01-analysis/05-competition.md
- **Bản chất:** số liệu FDI (2023 ~3 tỷ USD / 2024 ~1,16 tỷ USD) + đối thủ "Liên Hà Thái" là dữ kiện ngoài, **chưa kiểm chứng nguồn**. File đã tự ghi "cần xác minh lại".
- **Cần làm:** verify số liệu trước khi trích vào proposal/SOW; nếu không chắc, bỏ con số cụ thể, giữ luận điểm định tính.

### 07-bid-prep/output/07-questions-to-client.md — thiếu 3 nhóm câu hỏi
File câu hỏi gửi khách (A–E) chưa bao 3 thứ mà các file context đã nêu là "cần xác minh":
1. **Brand assets** — logo vector đã có chưa, mã navy chính xác, font đã chọn/bản quyền (đặc biệt ký tự JP/KR/CN), guideline cũ. → Nguồn: `00-context/02-brand-identity.md` + `05-open-questions/03-group-b-inputs.md`. (Hiện chỉ E hỏi định vị, không hỏi tài sản brand.)
2. **Làm mới hay redesign** — có site cũ không, cần di trú nội dung không. → Nguồn: `03-group-b-inputs.md`.
3. **Mâu thuẫn brief vs sitemap.jfif** — chốt: mục 5 có "Báo chí nói gì về Sumita"? mục 3/4 phân bổ "xử lý nước thải/thoát nước mưa" thế nào? footer 3 cột hay 6 cột? thứ tự ngôn ngữ? → Nguồn: bảng "NGUỒN SỰ THẬT" ở đầu file này.
- **Cần làm:** bổ sung vào `07-questions-to-client.md` (và cân nhắc thêm vào `05-open-questions/`).

---

## 🎯 KHUYẾN NGHỊ HÀNH ĐỘNG (sau khi audit toàn bộ)
Kết luận chung: **lớp context (00) + diễn giải (01–06) + hồ sơ thầu (07) nhất quán tốt với brief**, không có lỗi đọc-sai nghiêm trọng. Các việc nên làm tiếp (ưu tiên giảm dần):

| # | Việc | File đích | Mức | TT |
|---|---|---|---|---|
| 1 | Bổ sung nhóm câu hỏi còn thiếu (brand assets, redesign/di trú, mâu thuẫn brief↔sitemap) — *câu E địa danh đã làm ở việc 2* | `07-bid-prep/output/07-questions-to-client.md` | Cao | ⬜ chưa làm |
| 2 | Chốt dùng **cả hai** địa danh + làm mềm proposal | `DECISIONS.md` #9, `01-proposal.md`, `04-brand-risk-merger.md`, câu E | Cao | ✅ xong 2026-06-07 |
| 3 | Verify số liệu FDI / sáp nhập | `05-competition.md`, `04-brand-risk-merger.md`, checklist | TB | ✅ xong — đều CHÍNH XÁC |
| 4 | Thêm AUDIT-LOG.md vào cây thư mục README | `README.md` | Thấp | ✅ xong |

> Còn lại: **việc 1** (2 nhóm câu hỏi brand assets + redesign/di trú, và đưa mâu thuẫn brief↔sitemap thành câu hỏi khách).

---

## ⏭️ TIẾP THEO
- [x] Bước 1: tạo AUDIT-LOG.md (file này)
- [x] Bước 2: cập nhật 00-context/03-sitemap.md
- [x] Bước 3: thêm con trỏ trong CLAUDE.md
- [x] Bước 4: audit lớp 01-analysis/ (6 file) — 4 ✅, 2 ⚠️ (dữ kiện ngoài: sáp nhập tỉnh, số liệu FDI)
- [x] Bước 5: audit 02-scope/ (4 file) — 3 ✅, 1 ⚠️ (gộp nhóm tính năng)
- [x] Bước 6: audit 03-deliverables/ (4) + 04-team/ (3) — tất cả ✅
- [x] Bước 7: audit 05-open-questions/ (4) + 06-risks/ (1) — tất cả ✅
- [x] Bước 8: audit 07-bid-prep/ (10) + root (4) — 12 ✅, 2 ⚠️ (proposal client-facing, questions-to-client thiếu nhóm)
- [x] **AUDIT TOÀN BỘ 37 FILE HOÀN TẤT** → xem "KHUYẾN NGHỊ HÀNH ĐỘNG"
- [x] Việc 2: chốt địa danh "dùng cả hai" + làm mềm proposal (DECISIONS #9)
- [x] Việc 3: verify FDI + sáp nhập → tất cả CHÍNH XÁC
- [x] Việc 4: thêm AUDIT-LOG vào README
- [ ] Việc 1 (chưa làm): bổ sung 2 nhóm câu hỏi (brand assets, redesign/di trú) + câu hỏi mâu thuẫn brief↔sitemap ← **việc tiếp theo nếu muốn**

**Tổng kết trạng thái:** 34 ✅ · 3 ⚠️ · 0 ❌ · 0 ⬜
(⚠️ còn lại: 00-context/03-sitemap [đã fix nội bộ, chờ khách chốt], 02-scope/03 [gộp nhóm, nhỏ], 07-output/07-questions [thiếu nhóm — việc 1].)

_Cập nhật lần cuối: 2026-06-07 (sau khi làm việc 2, 3, 4)._
