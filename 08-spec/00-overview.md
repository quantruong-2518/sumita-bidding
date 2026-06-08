# ĐẶC TẢ CHỨC NĂNG WEBSITE SUMITA.VN — KHUNG (v0)

> Tài liệu BA: phân tích bài toán → đặc tả từng module. **Đây là bản khung** — dựng cấu trúc + tham chiếu nguồn trước; chi tiết từng module điền sau (xem trạng thái trong TOC mục 3).
> Đọc kèm: `docs/brief.pdf` (gốc), `00-context/`, `AUDIT-LOG.md` (nguồn sự thật + các mâu thuẫn brief↔sitemap đã biết).
> **Quy trình:** khung (file này) → chi tiết từng module thành file `08-spec/<mã>-<tên>.md` → cập nhật trạng thái TOC.

---

## 0. Phạm vi & giả định
- Đây là **đặc tả chức năng** (functional spec) — dùng được cho cả **thiết kế-only** lẫn **full-build**.
- Mỗi module gồm: phần **lõi** (mục tiêu, nội dung, chức năng — cần cho cả 2 kịch bản) + phần **[Build]** (kiến trúc/kỹ thuật — chỉ áp dụng nếu full-build, DECISIONS #1 chưa chốt).
- Giả định nền theo `DECISIONS.md`: thiết kế-only · VI/EN trước · ~13 template · 3–4 CCN · ảnh khách cấp.
- Địa danh: dùng **cả hai** Thái Bình + Hưng Yên (DECISIONS #9).
- Mâu thuẫn brief↔sitemap.jfif (mục 3/4/5, footer, ngôn ngữ): theo **brief**, các điểm cần khách chốt đánh dấu `⚠️CONFIRM` ngay trong module liên quan.

## 1. Bài toán (tóm tắt BA)
Website = **công cụ lead generation** cho chuỗi CCN, phục vụ nhà đầu tư trong nước & FDI vừa/nhỏ; mục tiêu kinh doanh là lấp đầy quỹ đất/nhà xưởng. Mọi module phải dẫn về **3 luồng chuyển đổi**: nhận brochure · đăng ký khảo sát · tư vấn đầu tư. Định vị trung thực (CCN linh hoạt, không "đại bàng").
_Ref: `01-analysis/01-business-problem.md`, `02-buyer-journey.md`, `03-positioning.md`, `06-metrics-roi.md`._

## 2. Template chuẩn cho 1 module (theo skill `/ba-spec` — BABOK + ISO/IEC/IEEE 29148)
> Kỷ luật: mỗi yêu cầu phải **ref về nguồn**; phân biệt **Stated / Implied / Assumed**; không bịa, không làm thừa.

1. **Mục tiêu & vai trò trong phễu** — module phục vụ luồng chuyển đổi nào. *(ref nguồn)*
2. **Actor / người dùng** — FDI, SME, khách vãng lai, admin CMS (chỉ actor nguồn có).
3. **Cấu trúc nội dung & trường dữ liệu** — field: tên · kiểu · bắt buộc? · đa ngôn ngữ? · ghi chú (cho CMS).
4. **Yêu cầu chức năng (FR)** — `FR-<mã>-n`, mỗi FR 1 ý (singular), gắn **MoSCoW** (Must/Should/Could/Won't) + **ref nguồn**.
5. **Trạng thái & edge case** — rỗng/loading/lỗi/thiếu nội dung 1 ngôn ngữ (chỉ cái thực sự xảy ra).
6. **Phụ thuộc** — module/tính năng khác, tích hợp ngoài (CRM, map, email).
7. **Phi chức năng liên quan (NFR)** — SEO, hiệu năng, a11y, **tracking events** (GA4/Pixel). Số đo không có nguồn → `[ASSUMPTION]`.
8. **Tiêu chí nghiệm thu (AC)** — kiểu **Gherkin**: `Given … When … Then …` cho FR Must/Should.
9. **Tham chiếu nguồn** — brief mục / file context / sitemap.
10. **⚠️CONFIRM / [ASSUMPTION] / ⚠️CONFLICT** — gom mọi điểm chưa chắc / cần khách chốt.

## 3. Bản đồ module (TOC) + tham chiếu + trạng thái
Trạng thái: ⬜ chưa chi tiết · 🟡 đang viết · ✅ xong.

### A. Global / xuyên suốt
| Mã | Module | Ref nguồn | TT |
|---|---|---|---|
| G1 | Header + Main menu (sticky) | brief §4 · 00-context/03 | ⬜ |
| G2 | Utility bar (tìm kiếm · ngôn ngữ · bản đồ) | brief §4 | ⬜ |
| G3 | CTA bar sticky (Zalo/hotline/FB/LinkedIn/đặt lịch) | brief §6 | ⬜ |
| G4 | Footer 3 cột | brief §7 ⚠️(sitemap.jfif vẽ 6 cột) | ⬜ |
| G5 | Hệ đa ngôn ngữ VI/EN (mở rộng JP/KR/CN) | brief §10 | ⬜ |
| G6 | Design system (tham chiếu — màu/typo/grid/component) | brief §3,§8 · 00-context/02 | ⬜ |

### B. Trang (trang chủ + 7 nhánh)
| Mã | Module | Ref nguồn | TT |
|---|---|---|---|
| P0 | Trang chủ (hero/flycam · tổng quan · map · CCN nổi bật · tiện ích · dịch vụ · tin · CTA) | brief §5 | ⬜ |
| P1 | Giới thiệu (tổng quan · SVTN/giá trị · KH & đối tác) | brief §5.1 | ⬜ |
| P2 | Sản phẩm — Đất CN cho thuê (danh sách CCN) | brief §5.2.1 | ⬜ |
| P2b | Sản phẩm — Nhà xưởng xây sẵn cho thuê | brief §5.2.2 | ⬜ |
| P3 | Tiện ích & hạ tầng | brief §5.3 ⚠️(phân bổ XLNT/thoát nước) | ⬜ |
| P4 | Dịch vụ & hỗ trợ đầu tư | brief §5.4 | ⬜ |
| P5 | Tin tức & truyền thông | brief §5.5 ⚠️(+"Báo chí nói gì") | ⬜ |
| P6 | Tuyển dụng | brief §5.6 | ⬜ |
| P7 | Liên hệ | brief §5.7 | ⬜ |

### C. Tính năng bắt buộc (cross-page)
| Mã | Module | Ref nguồn | TT |
|---|---|---|---|
| F1 | Interactive Map (pin CCN · hover · link chi tiết) | brief §10 | ⬜ |
| F2 | Download Center (lead-gating: form trước tải) | brief §10 | ⬜ |
| F3 | Hệ thống form (brochure/khảo sát/liên hệ/tư vấn) + tích hợp CRM/email | brief §10 | ⬜ |
| F4 | **Template chi tiết CCN (12 mục, tái sử dụng)** → `08-spec/F4-template-ccn.md` | brief §5.2.1 | 🟡 |

### D. Phi chức năng (NFR)
| Mã | Hạng mục | Ref nguồn | TT |
|---|---|---|---|
| N1 | Responsive / mobile-first | brief §11 | ⬜ |
| N2 | SEO-friendly | brief §11 | ⬜ |
| N3 | CMS dễ quản trị · upload tài liệu | brief §11 | ⬜ |
| N4 | Tối ưu tốc độ tải | brief §11 | ⬜ |
| N5 | Tracking: GA4 · Meta Pixel · Conversion | brief §11 | ⬜ |

### E. Module ẩn & NFR mở rộng (ngoài brief) → `08-spec/N0-hidden-modules-and-nfr.md`
| Mã | Nhóm | Nội dung | TT |
|---|---|---|---|
| S1·X1–X5·A1 | Module ẩn | Search · Consent · Pháp lý · Error states · Hậu-form · Chống spam · Quản lý Lead | ✅ identify |
| N6–N10 | NFR mở rộng | SEO-infra · Security · Monitoring(data) · Compliance(PDPD) · Reliability/Ops | ✅ identify |

## 4. Đề xuất thứ tự chi tiết (giá trị giảm dần)
**F4** (template CCN — lõi tái sử dụng) → **P2** (sản phẩm) → **P0** (trang chủ) → **F3 + F2** (form + download = engine chuyển đổi) → **F1** (map) → **G1–G6** (global) → **P1,P3–P7** → **N1–N5**.

## ⏭️ Tiếp theo
- [ ] Bạn duyệt khung này (cấu trúc + template mục 2) — có muốn đổi định dạng (vd thêm user story / use case) không?
- [ ] Chọn module bắt đầu chi tiết (mặc định: **F4 — template CCN 12 mục**).

_Tạo: 2026-06-07._
