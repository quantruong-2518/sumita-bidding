# DANH SÁCH CÂU HỎI GỬI KHÁCH — Sumita.vn

> Gửi kèm hồ sơ thầu. Trả lời nhóm A (4 câu tối quan trọng) là đủ để khóa nhân sự & báo giá khung. Các nhóm B–I giúp khóa phạm vi chi tiết, tránh phát sinh.

## A. 4 câu tối quan trọng (bắt buộc trước báo giá)
1. **Phạm vi:** Cần **thiết kế-only** (bàn giao file cho đội dev của quý vị) hay **full-build** (chúng tôi lập trình & bàn giao website chạy thật)?
2. **Đa ngôn ngữ:** Triển khai **VI/EN trước** rồi mở rộng JP/KR/CN sau, hay cần **tất cả ngay từ đầu**?
3. **Khối lượng:** Xác nhận **số CCN** (3 hay 4 — có cụm Thụy Trường?) và **số template gốc** (~13)?
4. **Tài nguyên:** Ảnh/flycam đã **có sẵn** chưa, hay cần chúng tôi tổ chức chụp/quay (ngoài phạm vi)?

## B. Brand assets & nhận diện (cần để khóa thiết kế)
> Nguồn: `00-context/02-brand-identity.md` — các mục "Cần xác minh".
- **Logo:** đã có **logo vector** (AI/SVG/EPS) chưa, hay cần chúng tôi số hóa/dựng lại?
- **Mã màu navy chính xác:** brief chỉ ghi "Navy Blue" — xin mã hex chuẩn. *(Bản FE demo đang tạm dùng navy `#16223a` + cam CTA `#f6861f` — sẽ thay navy khi có mã chính thức.)*
- **Font chữ:** đã chọn font chưa, đã có **bản quyền thương mại** chưa? Đặc biệt nếu sau này hiển thị **JP/KR/CN** (font CJK bản quyền thường tốn phí).
- **Brand guideline cũ:** có bộ nhận diện/quy chuẩn sẵn để bám theo không?

## C. Website hiện hữu & di trú
> Nguồn: `05-open-questions/03-group-b-inputs.md`.
- Hiện có **website đang chạy** không? Nếu có, URL là gì?
- Cần **di trú nội dung** (bài viết, tài liệu, hình ảnh) từ site cũ sang site mới không?
- Cần **giữ & redirect (301) URL cũ** để không mất thứ hạng SEO không?
- Quý vị có sẵn quyền truy cập **hosting / domain / mã nguồn cũ** để bàn giao không?

## D. Khối lượng & nội dung
- Copywriting nội dung thuộc bên nào?
- Dịch thuật (EN + JP/KR/CN) thuộc bên nào?
- Nhập liệu cho từng CCN × mục × ngôn ngữ ai phụ trách?
- Đã có nội dung thật chưa, hay cần làm song song với thiết kế?

## E. Định vị & thương hiệu
- Xác nhận định vị: CCN linh hoạt cho SME/FDI vừa & nhỏ (không theo định vị "đại bàng" của KCN lớn)?
- Hậu sáp nhập Thái Bình→Hưng Yên (01/7/2025): xác nhận hướng **đề xuất của chúng tôi** — hiển thị **song song** "Thái Bình" (giữ nhận diện) + "Hưng Yên" (địa danh hành chính mới, dùng cho SEO/bản đồ/pháp lý)? Hay quý vị muốn chỉ dùng một tên?

## F. Kỹ thuật & đầu vào (nếu full-build)
- Nền tảng CMS mong muốn (WordPress / headless / khác)?
- Interactive Map: dùng nền Mapbox/Google (nhanh, rẻ) hay vẽ **vector riêng** (đắt hơn)?
- Hệ CRM/email để nối form lead là gì?
- Yêu cầu tracking cụ thể (GA4, Meta Pixel, conversion nào)?

## G. Dữ liệu, hiệu năng & tuân thủ (phát sinh từ rà soát module ẩn — `08-spec/N0`)
- **(Q-N1) Đích của lead:** form đổ về **CRM ngoài** (HubSpot/Zalo OA/…) hay **lưu trong site**? → quyết định module Quản lý Lead + attribution. _(DECISIONS #10)_
- **(Q-N2) Lead-dashboard:** dùng **trang quản trị sẵn có của CMS** hay cần **dashboard lead thiết kế riêng**? _(DECISIONS #10)_
- **(Q-N3) Font CJK:** khi mở JP/KR/CN, quý vị **cấp font bản quyền** hay dùng **webfont miễn phí** (Noto)? → ảnh hưởng chi phí & hiển thị. _(DECISIONS #11)_
- **(Q-N4) Tuân thủ dữ liệu:** chỉ cần **NĐ 13/2023 (VN)** hay cả **GDPR** (nếu có khách EU)? → quyết định banner consent + trang pháp lý. _(DECISIONS #12)_
- **(Q-N5) Hero trang chủ:** dùng **video flycam** hay **ảnh tĩnh**? Nếu video: ai cấp, độ phân giải/dung lượng? → rủi ro hiệu năng lớn nhất. _(DECISIONS #13)_

## H. Bàn giao & vận hành
- Số vòng revision kỳ vọng mỗi giai đoạn?
- Thời gian duyệt mỗi giai đoạn (ngày làm việc)?
- Sau bàn giao có cần bảo trì/SLA/cập nhật nội dung (hợp đồng riêng)?

## I. Chốt mâu thuẫn giữa 2 tài liệu nguồn (brief.pdf ↔ sitemap.jfif)
> 2 tài liệu gốc lệch nhau ở các điểm dưới (chi tiết: `00-context/03-sitemap.md`). Spec/FE hiện **bám brief.pdf**; cần khách chốt để khóa thiết kế.
- **Footer:** **3 cột** (brief) hay **6 cột** (sitemap.jfif: Về Sumita/Hệ thống CCN/Giải pháp/Tài liệu/Kết nối/Liên hệ)? _(DECISIONS #15)_
- **Tin tức:** 3 mục (thị trường · tin dự án · sự kiện) hay thêm **"Báo chí nói gì về Sumita"** (4 mục)?
- **Danh mục tin:** cần **trang danh mục riêng có SEO** (vd `/tin-tuc/thi-truong`) hay **lọc trong trang** là đủ? _(DECISIONS #14 — FE demo đang lọc trong trang.)_
- **Tiện ích vs dịch vụ:** "xử lý nước thải" + "thoát nước mưa" thuộc **mục 3 (Tiện ích)** (brief) hay **mục 4 (Dịch vụ)** (jfif)?
- **Thứ tự ngôn ngữ mở rộng:** **JP/KR/CN** (brief) hay **CN/JP/KR** (jfif)?
- **Bộ icon CTA bar:** Zalo · hotline · FB · LinkedIn · đặt lịch (brief) hay tìm kiếm · bản đồ · tài liệu · chia sẻ (jfif)?
