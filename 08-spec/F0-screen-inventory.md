# F0 — SCREEN INVENTORY (FE thuần) — SUMITA.VN

> **Mục đích:** gom toàn bộ website thành **danh sách màn (screen) + shell + overlay** để bắt đầu wireframe / build FE. Đây là **góc nhìn FE-only**: chỉ quan tâm layout, component, state, data hiển thị — KHÔNG đụng backend/CRM/CMS (việc của full-build, DECISIONS #1 chưa chốt).
> **Nguồn:** rút từ `08-spec/00-overview.md` (TOC module) + `00-context/03-sitemap.md` + `08-spec/N0-hidden-modules-and-nfr.md`.
> **Quy ước:** `⚠️CONFIRM` = điểm cần khách chốt vì **ảnh hưởng trực tiếp tới layout** (không phải backend).

---

## 0. Cách đọc
- **Loại màn:** `Page` = trang đầy đủ có URL · `Shell` = khung dùng chung dựng 1 lần · `Template` = layout tái dùng nhiều lần · `Overlay/Component` = modal/banner/state không phải full-page.
- **Reuse:** số lần layout này được dùng lại (ảnh hưởng ưu tiên build).
- Mỗi màn liệt kê: **component chính** + **state** cần thiết kế. State mặc định FE: `default · loading · empty · error`; form thêm `validating · invalid · submitting · success`.

---

## A. SHELL — khung dùng chung (build 1 lần, áp mọi trang)
| Mã | Màn | Component chính | State cần vẽ | Ref |
|---|---|---|---|---|
| S-01 | Header + Main menu (sticky) | logo · menu chính · dropdown nhánh con | default · scrolled(sticky) · mobile(hamburger+drawer) | G1 · brief §4 |
| S-02 | Utility bar | ô tìm kiếm · chọn ngôn ngữ · link bản đồ | default · search-focus · search-có-kết-quả(→S-03) | G2 · brief §4 |
| S-03 | Sticky CTA bar | Zalo · hotline · FB · LinkedIn · nút "đặt lịch khảo sát" | default · mobile(thu gọn) | G3 · brief §6 — ⚠️CONFIRM bộ icon (jfif khác) |
| S-04 | Footer | cột thông tin · cột menu · cột form đặt lịch | default · mobile(stack) | G4 · brief §7 — ⚠️CONFIRM **3 cột vs 6 cột** |
| S-05 | Language switcher | VI / EN (kiến trúc mở JP/KR/CN) | đang chọn · hover · thiếu bản dịch(fallback) | G5 · brief §10 |
| S-06 | Design system (token) | màu/typo/grid/spacing/button/card/form-field | — (foundation, không phải màn) | G6 · 00-context/02 |

## B. PAGE — màn trang chính
| Mã | Màn | Component chính | State cần vẽ | Reuse | Ref |
|---|---|---|---|---|---|
| P-01 | **Trang chủ** | hero (video flycam) · tổng quan · map · CCN nổi bật · tiện ích · dịch vụ · tin mới · dải CTA | default · hero-loading(poster) · section-empty | 1 | P0 · brief §5 |
| P-02 | Giới thiệu | tổng quan · sứ mệnh/tầm nhìn/giá trị · khách hàng & đối tác (logo grid) | default · empty(logo) | 1 | P1 · brief §5.1 |
| P-03 | DS Đất CN cho thuê | bộ lọc(?) · grid card CCN · CTA | default · loading · empty · error | 1 | P2 · brief §5.2.1 |
| P-04 | DS Nhà xưởng xây sẵn | grid card nhà xưởng · thông số · CTA | default · loading · empty · error | 1 | P2b · brief §5.2.2 |
| P-05 | **Chi tiết CCN — Template 12 mục** | 12 section (xem mục C bên dưới) | default · section-empty · gallery-loading | **3–4** ⚠️CONFIRM số CCN | F4 · brief §5.2.1 |
| P-06 | Tiện ích & hạ tầng | nhóm tiện ích (điện/nước/XLNT/PCCC/thoát nước/cây xanh/an ninh/khu dịch vụ) | default · empty | 1 | P3 · brief §5.3 — ⚠️CONFIRM phân bổ XLNT/thoát nước |
| P-07 | Dịch vụ & hỗ trợ đầu tư | danh mục dịch vụ (pháp lý/xây xưởng/vay vốn/tuyển dụng/vận hành…) | default · empty | 1 | P4 · brief §5.4 |
| P-08 | Tin tức — **List** | bộ lọc theo mục(thị trường/dự án/sự kiện) · card tin · phân trang | default · loading · empty · error | 1 | P5 · brief §5.5 — ⚠️CONFIRM 3 vs 4 mục(+"Báo chí nói gì") |
| P-09 | Tin tức — **Detail** | tiêu đề · meta · nội dung · ảnh · tin liên quan · CTA | default · loading · 404 | 1 (layout) × N bài | P5 (suy ra — ⚠️CONFIRM có trang chi tiết riêng) |
| P-10 | Tuyển dụng — **List** | danh sách vị trí · chính sách nhân sự | default · empty | 1 | P6 · brief §5.6 |
| P-11 | Tuyển dụng — **JD Detail + form ứng tuyển** | mô tả công việc · form apply(upload CV) | default · form-states · success · 404 | 1 (layout) × N JD | P6 (suy ra — ⚠️CONFIRM) |
| P-12 | Liên hệ | thông tin công ty · form đặt lịch khảo sát · nhận brochure · bản đồ · liên hệ nhanh | default · form-states · map-loading | 1 | P7 · brief §5.7 |

## C. TEMPLATE CCN (P-05) — 12 section tái dùng
Mỗi section là 1 block layout trong template chi tiết CCN (dùng lại cho mọi cụm):
1. Tổng quan dự án · 2. Vị trí chiến lược · 3. Quy hoạch mặt bằng · 4. Hạ tầng kỹ thuật · 5. Ngành nghề thu hút · 6. Lao động & dân cư · 7. Chính sách ưu đãi · 8. Pháp lý dự án · 9. Tiến độ thực tế · 10. Hình ảnh/flycam (gallery) · 11. Tài liệu download (→ O-02 lead-gate) · 12. Đăng ký tư vấn/khảo sát (→ O-03 form).
_Ref: 00-context/03-sitemap.md · brief §5.2.1._

## D. OVERLAY / COMPONENT cross-page (không phải full-page nhưng là việc FE)
| Mã | Thành phần | State cần vẽ | Ref |
|---|---|---|---|
| O-01 | Interactive Map | default · pin-hover · pin-active(popup) · loading · error | F1 · brief §10 |
| O-02 | Download Center + **modal lead-gate** (form trước khi tải) | trigger · form · submitting · success(link tải) · error | F2 · brief §10 |
| O-03 | Hệ form (brochure · khảo sát · liên hệ · tư vấn) | default · validating · invalid(field error) · submitting · success · error | F3 · brief §10 |
| O-04 | Search results | đang gõ · có kết quả · không kết quả · loading | S1 · N0 |
| O-05 | Cookie / consent banner | hiện · đã chấp nhận · tuỳ chỉnh | X1 · N0 (PDPD) |
| O-06 | Trang pháp lý / privacy / điều khoản | default | X2 · N0 |
| O-07 | Error states | 404 · 500 · empty-state chung | X3 · N0 |
| O-08 | Màn/khối "Cảm ơn" sau submit | success generic · success kèm next-step | X4 · N0 |

---

## E. Tổng kết khối lượng FE (tham khảo)
- **Shell:** 6 (dựng 1 lần).
- **Page layout riêng:** 12 màn (P-01 → P-12); trong đó P-05 (CCN) nhân **3–4 lần** dữ liệu, P-09/P-11 nhân N bản ghi nhưng **1 layout**.
- **Overlay/Component:** 8.
- → Ước **~26 đơn vị thiết kế FE** (chưa gồm biến thể responsive). Mọi con số là **tham khảo theo giả định mặc định** — chưa phải cam kết.

## F. ⚠️ Điểm CHẶN layout — cần khách chốt trước khi wireframe
Đều ảnh hưởng **bố cục FE**, không phải backend (chi tiết mâu thuẫn brief↔sitemap.jfif: `AUDIT-LOG.md` · `00-context/03-sitemap.md`):
1. **Footer 3 cột (brief) hay 6 cột (jfif)** → grid footer khác hẳn. *(S-04)*
2. **CTA bar:** bộ icon Zalo/hotline/FB/LinkedIn (brief) vs tìm kiếm/bản đồ/tài liệu/chia sẻ (jfif). *(S-03)*
3. **Số CCN = 3 hay 4** (Thụy Trường) → số card P-03 + số lần lặp P-05. *(P-03, P-05)*
4. **Tin tức 3 hay 4 mục** (+"Báo chí nói gì") → cấu trúc filter P-08. *(P-08)*

## G. Gap FE cần làm rõ khi đi sâu (chưa có trong brief)
- **List ↔ Detail tách màn:** P-09 (tin chi tiết) và P-11 (JD chi tiết) là **suy ra** từ brief, cần khách xác nhận có trang chi tiết riêng.
- **State chi tiết từng màn:** mới gắn ở mức danh mục (O-07), chưa vẽ cụ thể empty/loading/error cho từng Page.
- **Responsive breakpoints:** N1 yêu cầu mobile-first nhưng chưa định breakpoint cụ thể (`[ASSUMPTION]` cần chốt: mobile/tablet/desktop).
- **Bộ lọc P-03/P-04:** có filter/sort hay chỉ grid tĩnh — chưa rõ trong brief.

---

## ⏭️ Tiếp theo
- [ ] Khách chốt 4 điểm mục F → khoá layout shell + số màn.
- [ ] Đi sâu **P-05 (Template CCN)** trước (reuse cao nhất): component + state + data field cho FE.
- [ ] Định breakpoint responsive + state chuẩn dùng lại (mục G).

_Tạo: 2026-06-08. Nguồn: 00-overview.md · 03-sitemap.md · N0-hidden-modules-and-nfr.md._
