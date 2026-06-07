# DỰ ÁN THẦU — WEBSITE SUMITA.VN

> File này là **điểm vào** cho Claude Code. Đọc file này trước, sau đó đọc các file context theo nhu cầu từng việc.
>
> 🔄 **Tiếp tục công việc?** Đọc **`HANDOFF.md`** trước — trạng thái mới nhất + việc tiếp theo.

## Bối cảnh 1 đoạn
Sumita là **nền tảng xúc tiến đầu tư** cho một chuỗi cụm công nghiệp (CCN). Đây KHÔNG phải website công ty thông thường: mục tiêu cốt lõi là **lead generation** (nhận brochure, đặt lịch khảo sát, tư vấn đầu tư) phục vụ nhà đầu tư trong nước & FDI, hướng tới cảm giác quốc tế hóa (benchmark: DEEP C, Hung Phu IP).

## Mục tiêu hiện tại
Chuẩn bị **hồ sơ thầu** cho dự án thiết kế (và có thể kèm phát triển) website này. Sản phẩm cần tạo ra: xem `07-bid-prep/`.

## ⚠️ 4 QUYẾT ĐỊNH CHƯA CHỐT (ảnh hưởng mọi thứ)
Trước khi báo giá / lập kế hoạch, phải khóa được 4 điều sau. Mọi ước lượng trong repo này đang dùng GIẢ ĐỊNH MẶC ĐỊNH (ghi rõ bên dưới):

1. **Phạm vi: thiết kế-only hay full-build?** → giả định: *thiết kế-only*
2. **Đa ngôn ngữ làm ngay hay sau?** → giả định: *VI/EN trước, JP/KR/CN tính kiến trúc nhưng kích hoạt sau*
3. **Số template & số CCN?** → giả định: *~13 template gốc, 3–4 CCN (brief ghi 3, footer có thêm Thụy Trường = 4)*
4. **Ảnh/flycam đã có chưa?** → giả định: *khách cung cấp*

Chi tiết: `05-open-questions/01-critical-four.md`. Khi chốt được, cập nhật `DECISIONS.md`.

## Bản đồ thư mục
- `00-context/` — dữ kiện gốc: tổng quan, nhận diện, sitemap
- `01-analysis/` — phân tích kinh doanh (bài toán thật, hành trình mua, định vị, rủi ro thương hiệu, cạnh tranh, ROI)
- `02-scope/` — phạm vi: thiết kế vs build, khối lượng nội dung, tính năng kỹ thuật, tỉ trọng effort
- `03-deliverables/` — đầu ra: thiết kế / phát triển / nội dung / ngoài phạm vi
- `04-team/` — nhân sự: vai trò, graphic vs UI/UX, kịch bản đội
- `05-open-questions/` — câu hỏi cần xác minh với khách
- `06-risks/` — sổ rủi ro
- `07-bid-prep/` — sản phẩm hồ sơ thầu cần tạo + checklist
- `08-spec/` — đặc tả chức năng website (BA): khung + chi tiết từng module
- `DECISIONS.md` — nhật ký quyết định (cập nhật khi chốt giả định)
- `GLOSSARY.md` — thuật ngữ
- `AUDIT-LOG.md` — **nhật ký audit context** (đối chiếu file workspace vs 2 doc gốc); điểm nối xuyên nhiều conversation, đọc khi tiếp tục việc kiểm tra context

## Quy ước làm việc
- Trả lời & viết tài liệu bằng **tiếng Việt**; giữ nguyên thuật ngữ tiếng Anh (UI/UX, CMS, FDI...).
- Phân biệt rõ **effort (giờ công)** vs **chi phí (tiền)** vs **timeline (lịch)**.
- Mọi con số là **tham khảo**, phải đánh dấu giả định, không trình bày như cam kết.
- Khi tạo file hồ sơ thầu, đặt vào `07-bid-prep/output/`.
