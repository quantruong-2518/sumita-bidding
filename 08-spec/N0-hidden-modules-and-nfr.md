# N0 — MODULE ẨN & PHI CHỨC NĂNG (mở rộng ngoài 25 module gốc)

> Tài liệu BA bổ sung cho `08-spec/00-overview.md`. Identify những hạng mục **brief không viết ra**
> nhưng một platform lead-gen thật buộc phải có.
> Kỷ luật nhãn nguồn: **Stated** (brief ghi rõ) · **Implied** (bắt buộc suy ra từ điều brief nói) · **Assumed** (best practice, đội thầu thêm — cần khách duyệt).
> Phạm vi: cột **DO** = áp dụng cả Design-only · cột **FB** = chỉ áp dụng Full-build (DECISIONS #1 chưa chốt).
> Đọc kèm: `docs/brief.pdf` · `00-context/03-sitemap.md` · `DECISIONS.md`.

_Tạo: 2026-06-08._

---

## 1. MODULE CHỨC NĂNG ẨN (ngoài G/P/F/N của TOC gốc)

Các module này **chưa có** trong 25 module nhưng được suy ra trực tiếp từ yêu cầu brief.

| Mã | Module | Vì sao bắt buộc | Ref | Nhãn | DO | FB |
|---|---|---|---|---|:--:|:--:|
| **S1** | **Hệ thống Search** — ô tìm kiếm + trang kết quả + lập chỉ mục | §4 Utility Bar có "Tìm kiếm" nhưng thiếu trang kết quả/index — search thật là 1 module, không phải 1 icon | brief §4 | Implied | ✔ | ✔ |
| **X1** | **Cookie / Consent banner** | brief bắt chạy GA4 + Meta Pixel → buộc có consent (NĐ 13/2023 VN + GDPR cho khách EU/FDI) | brief §11 | Implied | ✔ | ✔ |
| **X2** | **Trang pháp lý** — Chính sách bảo mật · Điều khoản · thông báo xử lý dữ liệu | thu lead/PII + chạy pixel là phải có | brief §10,§11 | Implied | ✔ | ✔ |
| **X3** | **Trạng thái lỗi/rỗng** — 404 · maintenance · search rỗng · form lỗi · thiếu bản dịch | site đa CCN/đa ngữ chắc chắn gặp các state này | suy luận | Implied | ✔ | ✔ |
| **X4** | **Hậu-form** — Thank-you page + email xác nhận tự động | §10 nói form→CRM/email nhưng không định nghĩa UX sau khi gửi (khâu nuôi lead) | brief §10 | Implied | ✔ | ✔ |
| **X5** | **Chống spam form** — captcha/honeypot/rate-limit | 5 form public = nam châm hút bot → lead rác làm hỏng dữ liệu | suy luận | Assumed | – | ✔ |
| **A1** | **Quản lý Lead** — xem/lọc/export hoặc đẩy CRM | cả site tồn tại để gom lead — phải có nơi nhận & xử lý | brief §10 | Implied | ◑ | ✔ |

**Ghi chú effort:** S1/X1/X2/X3/X4/A1 đều **có mặt giao diện** → kể cả Design-only vẫn phát sinh màn hình thiết kế (≈ thêm vài template gốc → ảnh hưởng DECISIONS #4).
`A1 = ◑`: Design-only chỉ cần *mô hình hóa cấu trúc nội dung/lead*; thiết kế UI dashboard riêng chỉ phát sinh nếu khách yêu cầu.

---

## 2. PHI CHỨC NĂNG MỞ RỘNG (nhánh N — mở rộng từ N1–N5 gốc)

Brief N1–N5 mới ở mức 1 dòng. Bóc chi tiết + thêm N6–N10.

### N1+ UX & Accessibility _(mở rộng N1)_
| Mã | Yêu cầu | Ghi chú | Ref | Nhãn |
|---|---|---|---|---|
| N1.1 | A11y **WCAG 2.1 AA** | khách FDI quốc tế + gần khối nhà nước → nên đạt | suy luận | Assumed |
| N1.2 | UX đa ngữ | font phủ **CJK (JP/KR/CN)** (bản quyền + nặng) · nhớ ngôn ngữ đã chọn · format ngày/số theo locale · fallback khi thiếu bản dịch | brief §10 | Implied |
| N1.3 | Reduced-motion | brief "motion nhẹ" → tôn trọng `prefers-reduced-motion` | brief §2,§8 | Implied |
| N1.4 | Đủ state | loading/skeleton · empty · error cho form & map | suy luận | Implied |
| N1.5 | Ma trận trình duyệt/thiết bị | định nghĩa hỗ trợ tối thiểu | suy luận | Assumed |
| N1.6 | Scannability | brief "thông tin dễ scan", "không rối mắt" — cần tiêu chí nghiệm thu cụ thể | brief §2,§8 | Stated |

### N4+ Performance _(mở rộng N4)_
| Mã | Yêu cầu | Ghi chú | Ref | Nhãn |
|---|---|---|---|---|
| N4.1 | Core Web Vitals định lượng (LCP/CLS/INP) | brief chỉ "tối ưu tốc độ" — phải gắn số mục tiêu | brief §11 | Implied |
| N4.2 | **⚠️ Hero Flycam VIDEO** | §5+§9 ưu tiên video flycam = rủi ro perf lớn nhất; cần poster · adaptive/streaming · lazy · fallback | brief §5,§9 | Implied |
| N4.3 | Tối ưu ảnh | nhiều flycam/infographic → WebP/AVIF · responsive images · CDN | brief §9 | Implied |
| N4.4 | CDN + latency quốc tế | khách FDI từ JP/KR/CN → CDN/edge để TTFB chấp nhận được | suy luận | Assumed |
| N4.5 | Performance budget | giới hạn page-weight + tile Mapbox | suy luận | Assumed |

### N6 SEO-infra _(tách & nâng từ N2)_
| Mã | Yêu cầu | Ghi chú | Ref | Nhãn |
|---|---|---|---|---|
| N6.1 | Structured data | Organization · LocalBusiness · BreadcrumbList | suy luận | Assumed |
| N6.2 | **hreflang đa ngữ** | bắt buộc cho site đa ngôn ngữ (đã làm trong `sitemap.xml`) | brief §10 | Implied |
| N6.3 | canonical · XML sitemap · robots.txt | hạ tầng SEO cơ bản | brief §11 | Implied |
| N6.4 | OG/Twitter tags | phục vụ social-share (P5 yêu cầu) | brief §5 | Implied |

### N7 Security _(mới — chủ yếu Full-build)_
| Mã | Yêu cầu | Ghi chú | Ref | Nhãn | DO | FB |
|---|---|---|---|---|:--:|:--:|
| N7.1 | HTTPS/TLS + HSTS | nền tảng | suy luận | Assumed | – | ✔ |
| N7.2 | Bảo vệ form | validation · rate-limit · captcha · chống injection | suy luận | Implied | – | ✔ |
| N7.3 | Bảo vệ PII lead | mã hóa khi truyền/lưu · phân quyền admin · log truy cập | brief §10 | Implied | – | ✔ |
| N7.4 | An toàn file upload | Download Center cho tải tài liệu → validate/scan file | brief §10 | Implied | – | ✔ |
| N7.5 | Hardening CMS · backup · WAF/DDoS | site xúc tiến đầu tư gần nhà nước = mục tiêu tấn công | suy luận | Assumed | – | ✔ |
| N7.6 | Quản lý secret | token Mapbox khóa theo domain · không lộ key | suy luận | Assumed | – | ✔ |

### N8 Monitoring bằng data _(mới — brief yếu nhất ở đây)_
> Brief mới ghi "GA4/Pixel/Conversion" — **thiếu cái quan trọng nhất: định nghĩa ĐO CÁI GÌ.** Không có event taxonomy thì tracking vô dụng.

| Mã | Yêu cầu | Ghi chú | Ref | Nhãn | DO | FB |
|---|---|---|---|---|:--:|:--:|
| N8.1 | **Event taxonomy** | đặc tả event: `form_submit` (theo loại) · `brochure_download` · `book_survey` · `consult_request` · `language_switch` · `map_pin_click` · scroll-depth | brief §11 | Implied | ◑ | ✔ |
| N8.2 | Lead attribution / UTM | bắt UTM · source/medium → biết campaign nào ra lead (sống còn với site xúc tiến đầu tư) | suy luận | Implied | – | ✔ |
| N8.3 | Funnel 3 luồng chuyển đổi | dashboard cho brochure/khảo sát/tư vấn | brief §1 | Implied | – | ✔ |
| N8.4 | Cảnh báo form lỗi | form gửi lỗi = mất lead = mất tiền → phải có alert | suy luận | Implied | – | ✔ |
| N8.5 | Uptime + health check | giám sát sống/chết | suy luận | Assumed | – | ✔ |
| N8.6 | Error monitoring (Sentry-like) | bắt lỗi FE/BE | suy luận | Assumed | – | ✔ |
| N8.7 | RUM Web Vitals + Search Console | đo perf thực tế + chỉ mục SEO | suy luận | Assumed | – | ✔ |

`N8.1 = ◑`: Design-only cần *đặc tả event* để bàn giao; cài đặt thực tế thuộc Full-build.

### N9 Compliance / Pháp lý dữ liệu _(mới)_
| Mã | Yêu cầu | Ghi chú | Ref | Nhãn |
|---|---|---|---|---|
| N9.1 | **NĐ 13/2023/NĐ-CP (PDPD Việt Nam)** | thu PII nhà đầu tư → phải tuân thủ | suy luận | Implied |
| N9.2 | GDPR | nếu có khách EU/FDI thực tế | suy luận | Assumed |
| N9.3 | Consent cookie/pixel | liên kết với module X1 | brief §11 | Implied |

### N10 Reliability / Ops _(mới — Full-build)_
| Mã | Yêu cầu | Ghi chú | Nhãn | FB |
|---|---|---|---|:--:|
| N10.1 | Backup & restore (lead + nội dung) | mất lead = mất tài sản | Assumed | ✔ |
| N10.2 | Môi trường staging | thử trước khi lên production | Assumed | ✔ |
| N10.3 | Deploy/rollback | quay lui khi sự cố | Assumed | ✔ |
| N10.4 | SLA uptime | mục tiêu sẵn sàng | Assumed | ✔ |

---

## 3. TOP 3 HẠNG MỤC ẨN TÁC ĐỘNG LỚN NHẤT (nêu với khách)
1. **N4.2 — Video flycam hero**: rủi ro performance + asset nặng nhất.
2. **N1.2 — Font CJK + UX đa ngữ**: nhân chi phí (đúng như brief tự nhận "yếu tố nhân chi phí lớn nhất").
3. **N8.1+N8.2 — Event taxonomy + lead attribution**: không có thì "tracking" trong brief chỉ là khẩu hiệu.

---

## 4. ⚠️CONFIRM — câu hỏi mới phát sinh, cần khách chốt
- **Q-N1.** Lead đổ về đâu? → CRM ngoài (HubSpot/Zalo OA/…) hay lưu trong site? (quyết định A1 + N8.2) — _chưa có trong `DECISIONS.md`._
- **Q-N2.** Có cần **lead-dashboard tùy biến** (thiết kế riêng) hay dùng admin sẵn của CMS? (quyết định A1 + DECISIONS #1/#6)
- **Q-N3.** Font CJK: khách cấp font bản quyền hay dùng webfont miễn phí (Noto)? (quyết định N1.2)
- **Q-N4.** Mức tuân thủ dữ liệu: chỉ NĐ 13/2023 (VN) hay cả GDPR? (quyết định N9)
- **Q-N5.** Hero: **video flycam** thật hay ảnh tĩnh? ai cấp & dung lượng? (quyết định N4.2)

> Khi chốt: cập nhật `DECISIONS.md` (đề xuất thêm #10 CRM-đích-lead, #11 font CJK) và bổ sung vào bộ câu hỏi khách `07-bid-prep/output/`.
