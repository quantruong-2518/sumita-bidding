# BÁO GIÁ (khung tham khảo) — Sumita.vn

> ⚠️ Bản nháp v1. Đây là **khung bóc tách theo rổ effort**, chưa phải báo giá cam kết. Đơn giá để biến số `[ĐƠN GIÁ]` — điền theo bảng giá nội bộ trước khi nộp. Mọi tỉ trọng lấy từ `02-scope/04-effort-split.md`.

## 1. Nguyên tắc báo giá
- Tách **3 rổ** độc lập để khách thấy rõ tiền đi đâu: **Thiết kế · Phát triển · Nội dung & bản địa hóa**.
- Phân biệt **effort (giờ công)** ≠ **chi phí (tiền)** ≠ **timeline (lịch)**.
- Tại VN đơn giá thiết kế ≈ lập trình → tiền bám sát tỉ trọng effort.

## 2. Kịch bản A — Thiết kế-only (giả định mặc định)
Chỉ phát sinh rổ Thiết kế (+ phần nội dung nếu trong scope).

| Hạng mục thiết kế | Tỉ trọng effort | Effort (giờ) | Đơn giá | Thành tiền |
|---|---|---|---|---|
| Discovery & planning | ~5–10% | `[giờ]` | `[ĐƠN GIÁ]` | `[…]` |
| UX (flow, wireframe, IA) | ~10% | `[giờ]` | `[ĐƠN GIÁ]` | `[…]` |
| UI (visual, design system, prototype, animation) | ~20–25% | `[giờ]` | `[ĐƠN GIÁ]` | `[…]` |
| **Tổng rổ Thiết kế** | | | | `[…]` |

## 3. Kịch bản B — Full-build (nếu khách chọn)
Thêm rổ Phát triển. Tỉ trọng tham khảo trên tổng dự án:

| Rổ | Tỉ trọng tổng | Ghi chú |
|---|---|---|
| **Thiết kế** | ~30–35% | UX + UI + design system |
| **Phát triển** | ~60–65% | Frontend + Backend/CMS đa ngữ + tích hợp (form/map/download/CRM/tracking) + QA/launch |
| **Nội dung & bản địa hóa** | ~15–25% (tách riêng) | Copywriting + dịch 4–5 ngôn ngữ + nhập liệu (CCN × mục × ngôn ngữ) |

> Dự án nghiêng về dev vì CMS đa ngữ, Interactive Map có logic, Download Center lead-gating, form + CRM + tracking.

## 4. Rổ thứ ba — Nội dung & bản địa hóa (dễ quên)
Nếu trong scope: có thể **15–25% tổng chi phí**. Bao gồm copywriting, dịch thuật, nhập liệu theo (CCN × mục × ngôn ngữ). **Ghi rõ ai làm** — nếu khách tự lo thì loại khỏi báo giá.

## 5. Yếu tố làm giá tăng
- JP/KR/CN làm ngay (DECISIONS #2).
- Interactive Map vẽ vector riêng thay nền Mapbox/Google (cần Illustrator).
- CMS headless/custom thay WordPress; tích hợp CRM sâu.
- Số template > 13 hoặc số CCN > 4.

## 6. Điều kiện báo giá
Giá chỉ khóa sau khi chốt 4 câu hỏi tối quan trọng. Báo giá kèm **bảng giả định** (`06-assumptions.md`) — thay đổi giả định → báo giá điều chỉnh.
