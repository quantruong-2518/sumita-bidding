# Tỉ trọng effort: thiết kế vs phát triển

> Con số **tham khảo** cho gói full-build. Là **effort (giờ công)**, không phải tiền/lịch.

| Giai đoạn | Tỉ trọng | Rổ |
|-----------|----------|-----|
| Discovery & planning | ~5–10% | chung |
| UX (flow, wireframe, IA) | ~10% | thiết kế |
| UI (visual, design system, prototype, animation) | ~20–25% | thiết kế |
| Frontend | ~20–25% | phát triển |
| Backend/CMS + đa ngôn ngữ | ~20–25% | phát triển |
| Tích hợp (form, map, download, CRM, tracking) | ~10–15% | phát triển |
| QA, tối ưu tốc độ, launch | ~10% | phát triển |

## Gộp
- **Thiết kế ≈ 30–35%**
- **Phát triển ≈ 60–65%**
- Dự án này nghiêng dev vì: CMS đa ngữ, Interactive Map có logic, Download Center lead-gating, form + CRM + tracking.

## Rổ thứ ba (dễ quên): Nội dung & bản địa hóa
Copywriting + dịch 4–5 ngôn ngữ + ảnh/flycam + **nhập liệu** (CCN × mục × ngôn ngữ). Nếu trong scope: có thể **15–25% tổng chi phí**. Tách riêng, ghi rõ ai làm.

## Yếu tố dịch chuyển tỉ trọng
- Đẩy về **dev**: JP/KR/CN ngay; map vector riêng; headless/custom thay WordPress; CRM sâu.
- Đẩy về **thiết kế**: nhiều template độc đáo; animation đặc tả sâu; phải xây nhận diện từ đầu.

## Phân biệt 3 trục
- **Effort** ≈ tỉ lệ trên.
- **Chi phí (VN)**: đơn giá thiết kế ~ lập trình → tiền gần với effort.
- **Timeline**: ngắn hơn tổng effort vì thiết kế & một phần dev chạy song song sau khi chốt design system.
