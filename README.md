# Sumita Bid — Bộ context cho hồ sơ thầu

Bộ tài liệu này tách nhỏ toàn bộ phân tích gói thầu website Sumita.vn thành các file `.md` theo chủ đề, để dùng cùng **Claude Code** khi chuẩn bị hồ sơ thầu.

## Dùng thế nào
1. Mở thư mục này bằng Claude Code.
2. Claude Code sẽ tự đọc `CLAUDE.md` (điểm vào).
3. Bắt đầu bằng cách trả lời 4 câu hỏi trong `05-open-questions/01-critical-four.md`, ghi vào `DECISIONS.md`.
4. Giao việc cho Claude Code dựa trên `07-bid-prep/` (vd: "viết báo giá", "lập SOW", "dựng timeline").

## Cấu trúc
```
sumita-bid/
├── CLAUDE.md            <- điểm vào cho Claude Code
├── README.md            <- file này
├── DECISIONS.md         <- nhật ký quyết định
├── GLOSSARY.md          <- thuật ngữ
├── AUDIT-LOG.md         <- nhật ký audit context (đối chiếu file vs docs gốc)
├── 00-context/
├── 01-analysis/
├── 02-scope/
├── 03-deliverables/
├── 04-team/
├── 05-open-questions/
├── 06-risks/
└── 07-bid-prep/
```

## Lưu ý
Tất cả ước lượng đang dựa trên giả định mặc định (xem `CLAUDE.md`). Cập nhật `DECISIONS.md` ngay khi có thông tin thật từ khách để các phần sau khớp lại.
