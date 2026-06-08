# F4 / P-05 — TEMPLATE CHI TIẾT CCN (12 mục, tái dùng) — đặc tả FE

> **Màn:** trang chi tiết 1 Cụm công nghiệp (CCN). Layout **tái dùng 3–4 lần** (số CCN: ⚠️CONFIRM — DECISIONS #3). Đây là màn reuse cao nhất → làm trước.
> **Phạm vi file:** FE thuần — component, **data field** (để bind), **state**, hành vi tương tác. Phần `[Build]` (CMS/API) ghi vắn tắt, kích hoạt nếu full-build (DECISIONS #1).
> **Nguồn:** brief §5.2.1 · `00-context/03-sitemap.md` (12 mục) · template module `08-spec/00-overview.md` §2 · inventory `F0`.
> **Quy ước field:** `tên · kiểu · bắt buộc? · đa ngữ?(i18n)`. Kiểu: `text/richtext/number/enum/img/img[]/file/geo/url/date`.

---

## 1. Mục tiêu & vai trò trong phễu
Màn **bán hàng cốt lõi**: thuyết phục nhà đầu tư (FDI/SME) rằng CCN này phù hợp → đẩy về **3 chuyển đổi**: tải brochure (mục 11) · đăng ký tư vấn/khảo sát (mục 12) · liên hệ nhanh (CTA bar S-03). Mọi section phải có đường dẫn xuống CTA.
_Ref: 01-analysis/01, 02-buyer-journey · brief §5.2.1._

## 2. Actor
Khách vãng lai (chưa định danh) · FDI · SME. Không có vai trò đăng nhập ở FE. *(admin CMS chỉ xuất hiện nếu full-build.)*

## 3. Khung trang (page-level, ngoài 12 section)
| Vùng | Component | Data field | State |
|---|---|---|---|
| Breadcrumb | Trang chủ › Sản phẩm › Đất CN › **{tên CCN}** | `ccn.name·text·bắt buộc·i18n` | default |
| Hero CCN | ảnh/flycam nền · tên CCN · 1 dòng định vị · 2 nút CTA (brochure · khảo sát) | `ccn.heroImg·img` · `ccn.tagline·text·i18n` | loading(poster) · default · img-error(fallback) |
| **Sticky sub-nav** | anchor 12 mục, cuộn mượt, highlight mục đang xem | (sinh từ danh sách section có dữ liệu) | default · scrolled · mobile(scrollable chips/dropdown) |
| Khối CTA cuối trang | "Quan tâm CCN này?" + form rút gọn / 2 nút | — | → O-03 |
| Điều hướng | nút "CCN khác" / quay lại danh sách P-03 | `ccn[]` | — |

**⚠️CONFIRM:** sticky sub-nav 12 mục có thể quá dài → cân nhắc gom nhóm (Tổng quan / Hạ tầng / Đầu tư / Tài liệu). `[ASSUMPTION]` FE: hiển thị dạng chips cuộn ngang trên mobile.

---

## 4. 12 SECTION — component · field · state
> Quy ước state mặc định mỗi section: `default · empty(ẩn section nếu CMS không nhập) · loading`. Chỉ ghi thêm state đặc biệt.

### 4.1 — Tổng quan dự án
- **Component:** tiêu đề · richtext mô tả · bảng thông số nhanh (diện tích · tỉ lệ lấp đầy · giá thuê từ · loại hình).
- **Field:** `overview.desc·richtext·✓·i18n` · `area·number(ha)·✓` · `occupancy·number(%)·–` · `priceFrom·text·–·i18n`(vd "từ X USD/m²/kỳ") · `landType·enum·–·i18n`.
- **State:** thông số thiếu → ẩn ô đó (không hiện "N/A").

### 4.2 — Vị trí chiến lược
- **Component:** mini-map/ảnh vị trí · danh sách khoảng cách (cảng/sân bay/cao tốc/trung tâm) · liên kết tới O-01 map lớn.
- **Field:** `geo·geo(lat,lng)·–` · `distances[]{label·text·i18n, value·text}` · `locationImg·img`.
- **State:** map loading · map error(fallback ảnh tĩnh).

### 4.3 — Quy hoạch mặt bằng
- **Component:** ảnh master plan (zoom/lightbox) · chú giải phân khu (legend).
- **Field:** `masterPlanImg·img·✓` · `zones[]{name·text·i18n, color·text, note·text·i18n}`.
- **State:** ảnh loading(skeleton) · lightbox open/close.

### 4.4 — Hạ tầng kỹ thuật
- **Component:** grid icon + nhãn (điện · cấp/thoát nước · XLNT · viễn thông · giao thông nội khu · PCCC).
- **Field:** `infra[]{icon·enum, label·text·i18n, spec·text·i18n}`.
- **State:** empty(ẩn item chưa có spec).

### 4.5 — Ngành nghề thu hút
- **Component:** tag/chip danh mục ngành · (tuỳ) ngành ưu tiên/hạn chế.
- **Field:** `industries[]{name·text·i18n, type·enum(ưu tiên/được/hạn chế)}`.
- **State:** empty.

### 4.6 — Lao động & dân cư
- **Component:** vài số liệu (dân số khu vực · lực lượng lao động · trường nghề lân cận) dạng stat-card.
- **Field:** `labor[]{label·text·i18n, value·text·i18n}`.
- **⚠️CONFIRM:** nguồn số liệu lao động (khách cấp?) — đánh `[ASSUMPTION]` nếu chưa có.

### 4.7 — Chính sách ưu đãi
- **Component:** danh sách ưu đãi (thuế · tiền thuê đất · thủ tục) · richtext.
- **Field:** `incentives·richtext·–·i18n` hoặc `incentives[]{title·text·i18n, detail·text·i18n}`.

### 4.8 — Pháp lý dự án
- **Component:** danh sách trạng thái pháp lý (quy hoạch · GPMB · quyết định chủ trương…) + (tuỳ) badge trạng thái · link tài liệu (→ 4.11).
- **Field:** `legal[]{item·text·i18n, status·enum, docRef·file?}`.
- **State:** empty.

### 4.9 — Tiến độ thực tế
- **Component:** timeline / progress hoặc grid ảnh hiện trạng + % hoàn thành.
- **Field:** `progress·number(%)·–` · `milestones[]{date·date, label·text·i18n, done·bool}` · `progressImgs·img[]`.
- **State:** empty · ảnh loading.

### 4.10 — Hình ảnh / flycam (gallery)
- **Component:** gallery grid · lightbox · (tuỳ) video flycam.
- **Field:** `gallery·img[]·–` · `flycamVideo·url/file?`.
- **State:** loading(skeleton grid) · empty(ẩn section) · video loading/poster · lightbox nav (prev/next).

### 4.11 — Tài liệu download  →  **lead-gate (O-02)**
- **Component:** danh sách tài liệu (brochure/quy hoạch/chính sách) · nút "Tải" mở **modal form** trước khi tải.
- **Field:** `docs[]{title·text·i18n, type·enum(pdf/zip…), size·text, file·file·✓}`.
- **State:** default · click→modal O-02(form) · submitting · success(hiện link/auto-download) · error · empty(ẩn section).
- **Phụ thuộc:** O-02 Download Center + O-03 form. **[Build]** ghi lead vào CRM (DECISIONS #10).

### 4.12 — Đăng ký tư vấn / khảo sát  →  **form (O-03)**
- **Component:** form inline (họ tên · cty · email · phone · nhu cầu · ngành · CCN quan tâm[prefill = CCN hiện tại]).
- **Field:** `name·✓` · `company·–` · `email·✓` · `phone·✓` · `need·enum·–` · `ccnInterest·prefill` · `consent·bool·✓`(PDPD).
- **State:** default · validating · invalid(error theo field) · submitting · success(→ O-08 cảm ơn) · error · spam-guard(X5).

---

## 5. Phụ thuộc
- **Shell:** S-01..S-06 (header/CTA bar/footer/lang/design-system).
- **Overlay:** O-01 (map · mục 4.2) · O-02 (download · 4.11) · O-03 (form · 4.11+4.12) · O-08 (cảm ơn).
- **Nguồn dữ liệu list:** P-03 (danh sách CCN) trỏ vào màn này.
- **[Build]:** CMS quản lý record CCN + 12 section; field i18n; CRM nhận lead.

## 6. NFR liên quan (FE)
- **Responsive (N1):** sticky sub-nav → chips/dropdown trên mobile; gallery 1 cột; bảng thông số xuống stack.
- **Hiệu năng (N4):** ảnh hero/flycam **lazy + poster**; gallery lazy-load; `[ASSUMPTION]` LCP < 2.5s.
- **SEO (N2):** mỗi CCN 1 URL riêng (sitemap.xml đã có) · heading 12 mục đúng cấp · alt ảnh.
- **A11y:** sub-nav điều hướng bàn phím; lightbox trap focus; form label/error gắn aria.
- **Tracking (N5):** event `view_ccn`, `click_download`(theo doc), `submit_form`(theo loại), `play_flycam`. Tên event `[ASSUMPTION]` chờ taxonomy.
- **i18n (G5):** mọi field `i18n` thiếu bản dịch → fallback VI + ghi chú dịch (không để trống).

## 7. Tiêu chí nghiệm thu (AC — Gherkin, Must/Should)
- **AC-01 (sub-nav):** *Given* đang ở màn CCN, *When* cuộn tới section X, *Then* mục X trên sticky sub-nav được highlight; *When* click mục Y, *Then* cuộn mượt tới section Y.
- **AC-02 (empty):** *Given* 1 section không có dữ liệu (CMS để trống), *When* render, *Then* **ẩn hẳn section** đó cả ở sub-nav lẫn nội dung (không hiện khối rỗng).
- **AC-03 (download lead-gate):** *Given* khách bấm "Tải" 1 tài liệu, *When* chưa điền form, *Then* hiện modal O-02; *When* submit hợp lệ, *Then* mới lộ link/tải.
- **AC-04 (form prefill):** *Given* đang ở CCN "Hưng Nhân", *When* mở form mục 4.12, *Then* trường "CCN quan tâm" prefill = "Hưng Nhân".
- **AC-05 (form validate):** *Given* form, *When* submit thiếu email/phone hoặc sai định dạng, *Then* hiện lỗi theo field, không gọi submit.
- **AC-06 (responsive):** *Given* viewport mobile, *When* xem màn, *Then* sub-nav thành chips/dropdown, gallery 1 cột, không tràn ngang.
- **AC-07 (i18n fallback):** *Given* đang xem bản EN, *When* 1 field chưa có bản EN, *Then* hiển thị bản VI (fallback), không để trống.

## 8. ⚠️CONFIRM / [ASSUMPTION] / ⚠️CONFLICT
- **⚠️CONFIRM** số CCN 3 hay 4 (Thụy Trường) → số lần reuse (DECISIONS #3).
- **⚠️CONFIRM** sub-nav 12 mục có gom nhóm không (UX dài).
- **⚠️CONFIRM** nguồn dữ liệu mục 4.6 (lao động/dân cư) và 4.9 (tiến độ %) — khách cấp?
- **⚠️CONFIRM** có video flycam (4.10) hay chỉ ảnh (DECISIONS #13 — tác động giá lớn).
- **[ASSUMPTION]** mục có dữ liệu rỗng → ẩn section (AC-02); breakpoint mobile/tablet/desktop chuẩn; ngưỡng hiệu năng.
- **⚠️CONFLICT** brief↔sitemap.jfif về XLNT/thoát nước (mục 4.4) — xem AUDIT-LOG; ở đây liệt kê theo brief.

## 9. Tham chiếu
brief §5.2.1 · `00-context/03-sitemap.md` (12 mục) · `08-spec/00-overview.md` §2 (template) · `08-spec/F0-screen-inventory.md` (P-05/C) · `08-spec/N0-hidden-modules-and-nfr.md` (O-02/O-03/X5 · PDPD) · `DECISIONS.md` #3,#10,#13.

---

## ⏭️ Tiếp theo
- [ ] Khách chốt số CCN + nguồn data mục 4.6/4.9 + video flycam.
- [ ] Đi sâu **O-03 (hệ form)** và **O-02 (lead-gate)** — vì 4.11+4.12 phụ thuộc trực tiếp.
- [ ] Sau đó **P-03** (list CCN) để khép cặp list↔detail.

_Tạo: 2026-06-08. Trạng thái module F4: 🟡 đang viết (FE-level xong; FR-xx chi tiết + [Build] còn chờ DECISIONS #1)._
