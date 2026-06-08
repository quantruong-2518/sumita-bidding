# FDD-BATCH-PLAN — Kế hoạch phân lô viết FDD song song (Sumita.vn)

> **Đây là bản KẾ HOẠCH PHÂN LÔ (work-breakdown plan)** để main agent fan-out nhiều BA agent viết FDD (Functional Design Document) **song song**. File này KHÔNG chứa nội dung FDD — chỉ hướng dẫn cách chia việc, thứ tự, contract dùng chung, prompt mẫu, định nghĩa Done.
>
> Nguồn xương sống: `08-spec/00-overview.md` (TOC 25 module + template §2 + thứ tự §4) · `08-spec/N0-hidden-modules-and-nfr.md` (7 module ẩn + NFR N6–N10) · `08-spec/F4-template-ccn.md` (🟡 — **golden sample**) · `08-spec/F0-screen-inventory.md` · `DECISIONS.md` (15 quyết định, #1 thiết kế-only/full-build CHƯA chốt).
>
> ⚠️ **Lưu ý về skill `/ba-spec`:** tại thời điểm lập kế hoạch, **chưa tìm thấy** `~/.claude/skills/ba-spec/SKILL.md` (chỉ có `commit`, `pr`). Prompt mẫu vẫn nhắc gọi `/ba-spec`; **nếu skill chưa hiện trong danh sách** (cần reload Claude Code), BA agent tuân thủ trực tiếp **template §2 của `00-overview.md`** + kỷ luật ghi trong mục 7 file này (đó chính là nội dung skill rút gọn).
>
> _Tạo: 2026-06-08. Trả lời tiếng Việt, giữ thuật ngữ EN._

---

## 1. Mục tiêu & phạm vi

**Mục tiêu:** bóc FR-xx (singular, có MoSCoW + AC Gherkin + ref nguồn Stated/Implied/Assumed) cho **toàn bộ module có thật** trong `08-spec/`, mỗi module → **1 file `08-spec/<mã>-<tên>.md`** theo template §2 của `00-overview.md`. Hiện trạng: **0/25 module gốc có FR**; F4 đang 🟡 (đã có FE-level, còn FR-xx + [Build]).

**Tổng phạm vi cần viết (37 đơn vị FDD):**

| Nhóm | Module (mã thật) | Số |
|---|---|---|
| **A. Global** | G1 Header · G2 Utility bar · G3 CTA bar · G4 Footer · G5 Đa ngôn ngữ · G6 Design system | 6 |
| **B. Pages** | P0 Trang chủ · P1 Giới thiệu · P2 Đất CN (list) · P2b Nhà xưởng · P3 Tiện ích · P4 Dịch vụ · P5 Tin tức · P6 Tuyển dụng · P7 Liên hệ | 9 |
| **C. Features** | F1 Map · F2 Download Center · F3 Hệ form · **F4 Template CCN (🟡)** | 4 |
| **D. NFR gốc** | N1 Responsive · N2 SEO · N3 CMS · N4 Tốc độ · N5 Tracking | 5 |
| **E. Module ẩn** | S1 Search · X1 Consent · X2 Pháp lý · X3 Error states · X4 Hậu-form · X5 Chống spam · A1 Quản lý Lead | 7 |
| **E. NFR mở rộng** | N6 SEO-infra · N7 Security · N8 Monitoring(data) · N9 Compliance/PDPD · N10 Reliability/Ops | 5 |
| | **TỔNG** | **36 + F4 nâng cấp** |

**Quy ước hợp nhất NFR:** N1–N5 (gốc, mỗi cái 1 dòng trong brief) và N6–N10 (mở rộng trong N0) đều viết thành FDD-NFR riêng theo cùng template, có FR/AC kiểm chứng được. N0 đã bóc sẵn các tiêu mục con (N1.1–N1.6, N4.1–N4.5, N6.1–N6.4, N7.1–N7.6, N8.1–N8.7, N9.1–N9.3, N10.1–N10.4) → BA agent nâng từ tiêu mục thành FR-N*-n.

**Mỗi FR phải:** mã `FR-<mã module>-n` · 1 ý (singular) · MoSCoW · ref nguồn (Stated/Implied/Assumed) · AC Gherkin cho Must/Should. Phần kỹ thuật full-build gom vào khối **[Build]** (xem mục 6 — đánh dấu khi DECISIONS #1 chưa chốt).

---

## 2. Bản đồ phụ thuộc (ai là nền tảng, ai là lá)

Ký hiệu: **→** = "phụ thuộc vào / cần đã chốt trước".

```
                  ┌─────────────────── NỀN TẢNG (foundation) ───────────────────┐
   G6 Design system ──┐
   F3 Hệ form ────────┼──► (mọi CTA / lead-gate / form trên toàn site)
   F4 Template CCN ───┤
   X4 Hậu-form ───────┘
        │  │  │
        ▼  ▼  ▼
   ── LÁ phụ thuộc nền tảng (consumer) ──
   F2 Download → F3, X4            P2 list CCN → F4
   F1 Map → (độc lập tương đối)    P0 Trang chủ → F1, F2, F3, P2(card), P5(card)
   X1 Consent → N5(tracking), N9   A1 Quản lý Lead → F3, X4
   X5 Chống spam → F3              X3 Error states → (gần độc lập)
   X2 Pháp lý → X1, N9            S1 Search → (index mọi page, viết sau cùng nội dung)
```

**Bảng phụ thuộc tóm tắt:**

| Module | Phụ thuộc (cần chốt trước) | Vai trò |
|---|---|---|
| **G6 Design system** | — (chỉ cần contract token) | **NỀN TẢNG #1** — token/màu/typo/component dùng cho tất cả |
| **F3 Hệ form** | G6 | **NỀN TẢNG #2** — LeadForm 5 variant; mọi CTA/lead-gate dựa vào |
| **F4 Template CCN** | G6, F3 (form mục 4.12), F2 (lead-gate 4.11) | **NỀN TẢNG #3** — golden sample; P2 list trỏ vào |
| **X4 Hậu-form** | F3 | nền cho mọi success-state của form |
| F2 Download Center | F3, X4 | engine chuyển đổi |
| X5 Chống spam | F3 | bảo vệ mọi form |
| A1 Quản lý Lead | F3, X4 | điểm nhận lead |
| F1 Interactive Map | G6 (tương đối độc lập) | dùng ở P0, F4 §4.2, P7 |
| P2 (list CCN) | F4 (card → detail) | list↔detail |
| P2b Nhà xưởng | F4 (tham chiếu pattern card) | song song P2 |
| P0 Trang chủ | F1, F2, F3, card từ P2/P5 | trang tổng hợp — viết **sau** các block |
| X1 Consent | N5, N9 | banner cookie |
| X2 Pháp lý | X1, N9 | trang privacy/terms |
| X3 Error states | gần độc lập | 404/500/empty |
| S1 Search | toàn bộ page (index) | viết khi nội dung page ổn định |
| P1,P3,P4,P5,P6,P7 | G6, F3 (CTA/form nhúng) | trang nội dung — phần lớn độc lập nhau |
| N1–N10 | tham chiếu module liên quan | đặc tả ngang, ít coupling |

**Kết luận nền tảng phải đi trước:** **G6 + F3 + F4** (và mức contract của chúng). Đây chính là lý do có **Wave 0 (contract)** + **Wave 1 ưu tiên nền tảng**.

---

## 3. Contract khoá-trước (WAVE 0) — chốt TRƯỚC khi fan-out

Do nhiều BA agent chạy song song, phải khoá những thứ DÙNG CHUNG để các agent không định nghĩa lệch nhau. **Chủ trì: main agent** (hoặc 1 "lead/architect" agent), viết gọn vào đầu mỗi prompt fan-out (hoặc 1 file contract dùng chung). KHÔNG cần là FDD đầy đủ — chỉ là "khế ước".

| # | Contract | Nội dung phải chốt | Nguồn |
|---|---|---|---|
| **C1** | **Template 1 module** | Đúng 10 mục §2 `00-overview.md`. Mọi FDD theo đúng thứ tự 10 mục này. | 00-overview §2 |
| **C2** | **Quy ước mã FR** | `FR-<mã module>-n` (vd `FR-F3-1`); 1 FR = 1 ý singular; mỗi FR có MoSCoW + ref nhãn. NFR: `FR-N3-1`… | 00-overview §2.4 |
| **C3** | **MoSCoW + Gherkin** | Must/Should/Could/Won't. AC Gherkin `Given…When…Then…` bắt buộc cho Must & Should. | 00-overview §2.4,§2.8 · F4 §7 |
| **C4** | **Nhãn nguồn** | Mỗi yêu cầu gắn **Stated / Implied / Assumed** (định nghĩa trong N0 đầu file). | N0 header |
| **C5** | **Data model dùng chung** | Khoá schema để 2 agent không định nghĩa lệch: **LeadForm 5 variant** (brochure · khảo sát · liên hệ · tư vấn · ứng tuyển CV) với field chuẩn (name✓·company·email✓·phone✓·need·ccnInterest·consent✓); **LocalizedText{vi, en?}** + quy tắc fallback VI; **CCN 12 mục** (field theo F4 §3–4). **F3 sở hữu LeadForm, F4 sở hữu CCN, G5 sở hữu LocalizedText** — agent khác chỉ *tham chiếu*, không định nghĩa lại. | F4 §3–4 · F0 · webapp |
| **C6** | **Quy ước [Build]** | Mọi nội dung full-build (kiến trúc/CMS/API/CRM/security) gom vào khối `[Build]` cuối module, gắn `[Build · chờ DECISIONS #1]`. Phần lõi (mục tiêu/nội dung/FR chức năng/AC) dùng cho cả 2 kịch bản. | 00-overview §0 · N0 SCOPE-GUARD |
| **C7** | **Cột phạm vi DO/FB** | Giữ nhãn DO (Design-only) / FB (Full-build) như N0 cho FR liên quan NFR/security/monitoring (đặc biệt N7, N8.5–8.7, N10 = FB-only, KHÔNG vào SOW thiết kế-only). | N0 §2 SCOPE-GUARD |
| **C8** | **Quy ước ⚠️CONFIRM / ⚠️CONFLICT / [ASSUMPTION]** | Gom mọi điểm chưa chắc vào mục 10 của module; mâu thuẫn brief↔sitemap.jfif theo **brief** + đánh ⚠️CONFLICT (ref AUDIT-LOG). | 00-overview §2.10 · F4 §8 |
| **C9** | **Map mã ↔ tên file** | Chốt danh sách file `08-spec/<mã>-<tên>.md` (xem bảng mục 4) để không 2 agent tạo trùng/lệch tên file. | file này §4 |
| **C10** | **Golden sample** | **F4** (`08-spec/F4-template-ccn.md`) là CHUẨN tham chiếu (cách viết section/field/state/AC). Mọi agent đọc F4 trước khi viết. | F4 |

> **Lý tưởng:** main agent nâng F4 từ 🟡 → ✅ (bổ sung FR-F4-n + [Build]) **ngay trong Wave 0** để F4 trở thành golden sample hoàn chỉnh trước khi fan-out. Nếu không, vẫn dùng F4 bản FE-level làm mẫu cấu trúc.

---

## 4. Phân lô cho các BA agent — **6 lô (BA-1 … BA-6)**

Nguyên tắc: cohesion cao trong lô (chung domain/luồng/template), coupling thấp giữa lô (chạy song song). Lô nền tảng tách riêng để chạy trước.

### Bảng map mã → file (chốt ở C9)
G1→`G1-header-menu.md` · G2→`G2-utility-bar.md` · G3→`G3-cta-bar.md` · G4→`G4-footer.md` · G5→`G5-i18n.md` · G6→`G6-design-system.md` · P0→`P0-home.md` · P1→`P1-gioi-thieu.md` · P2→`P2-dat-cn-list.md` · P2b→`P2b-nha-xuong.md` · P3→`P3-tien-ich.md` · P4→`P4-dich-vu.md` · P5→`P5-tin-tuc.md` · P6→`P6-tuyen-dung.md` · P7→`P7-lien-he.md` · F1→`F1-map.md` · F2→`F2-download-center.md` · F3→`F3-form-system.md` · F4→`F4-template-ccn.md`(có sẵn) · N1→`N1-responsive.md` · N2→`N2-seo.md` · N3→`N3-cms.md` · N4→`N4-performance.md` · N5→`N5-tracking.md` · S1→`S1-search.md` · X1→`X1-consent.md` · X2→`X2-legal.md` · X3→`X3-error-states.md` · X4→`X4-post-form.md` · X5→`X5-anti-spam.md` · A1→`A1-lead-management.md` · N6→`N6-seo-infra.md` · N7→`N7-security.md` · N8→`N8-monitoring.md` · N9→`N9-compliance.md` · N10→`N10-reliability-ops.md`.

---

### 🔵 BA-1 — Lô NỀN TẢNG CHUYỂN ĐỔI (form engine)
**Module + thứ tự viết:** `F3 → X4 → F2 → X5 → A1`
| Hạng mục | Nội dung |
|---|---|
| **Cohesion** | Cả 5 module xoay quanh **1 đối tượng dữ liệu = lead/form**: F3 định nghĩa LeadForm 5 variant → X4 là hậu-form (thank-you + email) → F2 là download lead-gate (gọi F3) → X5 bảo vệ form → A1 nhận/xử lý lead. Cùng domain, nối tiếp logic, dùng chung field. **Đây là engine chuyển đổi** — phải nhất quán tuyệt đối, nên giao 1 agent. |
| **Phụ thuộc ra ngoài lô** | Cần **G6** (token form-field) và **C5** (schema LeadForm) đã chốt ở Wave 0. → Đây là LÔ NỀN TẢNG, chạy **Wave 1**; F3 chính là chủ sở hữu schema LeadForm (C5) — vì vậy F3 nên là module được viết SỚM NHẤT toàn dự án (có thể đưa vào Wave 0 cùng main agent nếu muốn khoá schema chắc hơn). |
| **Context phải đọc** | `00-overview.md`(§2) · `N0`(X4/X5/A1, N7.2/N8.1/N8.4/N9) · `F4`(§4.11–4.12 golden) · `F0`(O-02/O-03/O-08) · `01-analysis/02-buyer-journey.md` · `DECISIONS.md`(#1,#10,#12) · `webapp/README.md` + `webapp/docs/FE-BUILD-CONTRACT.md`(LeadForm thực tế) |
| **Độ lớn** | 5 module · **phức tạp CAO** (nhiều state, [Build] nặng CRM/spam). |

### 🔵 BA-2 — Lô SẢN PHẨM / CCN
**Module + thứ tự viết:** `F4(nâng cấp FR) → P2 → P2b → F1`
| Hạng mục | Nội dung |
|---|---|
| **Cohesion** | Đều là **trục "sản phẩm cho thuê"**: F4 template chi tiết CCN (12 mục) → P2 list CCN trỏ vào F4 → P2b nhà xưởng (pattern card tương tự) → F1 map ghim CCN (dùng trong F4 §4.2 + P2). Chung data-model CCN (C5), chung luồng list↔detail↔map. |
| **Phụ thuộc ra ngoài lô** | Cần **F4 golden + C5(CCN)** + **F3**(form mục 4.12, do BA-1 giữ). Xử lý: F4 do chính lô này hoàn thiện sớm (nó là golden sample nên ưu tiên Wave 1); chỗ nhúng form chỉ **tham chiếu** `FR-F3-*` (không định nghĩa lại). F1 tương đối độc lập. |
| **Context phải đọc** | `00-overview.md`(§2) · **`F4`(toàn bộ — vừa golden vừa thuộc lô)** · `F0`(P-03/P-04/P-05/O-01) · `N0`(N4.2 video, N6) · `01-analysis/01,02` · `DECISIONS.md`(#3,#5,#7,#13) · `00-context/03-sitemap.md`(12 mục) |
| **Độ lớn** | 4 module · **phức tạp CAO** (F4 nhiều section; map). |

### 🔵 BA-3 — Lô GLOBAL / SHELL
**Module + thứ tự viết:** `G6 → G1 → G2 → G3 → G4 → G5`
| Hạng mục | Nội dung |
|---|---|
| **Cohesion** | Toàn bộ **khung dùng chung (shell)**: design system + header + utility bar + CTA bar + footer + đa ngôn ngữ. Cùng tầng "áp mọi trang", chung token (G6) và chung quy ước i18n (G5 sở hữu LocalizedText — C5). 1 agent giữ tính nhất quán hệ thống. |
| **Phụ thuộc ra ngoài lô** | **G6 là nền tảng #1** — phải viết SỚM (Wave 1, đầu lô). G5 sở hữu LocalizedText (C5) → các lô khác chỉ tham chiếu. G2 utility bar có ô search → chỉ *trỏ* sang S1 (BA-5), không định nghĩa trang kết quả. G3 CTA bar trỏ form → tham chiếu F3 (BA-1). |
| **Context phải đọc** | `00-overview.md`(§2) · `F0`(S-01…S-06) · `N0`(N1.2 đa ngữ, N6.2 hreflang) · `00-context/02`(nhận diện) · `00-context/03-sitemap.md` · `DECISIONS.md`(#2,#11,#15) · `webapp/README.md`(theme navy/cam) · `AUDIT-LOG.md`(footer 3 vs 6, CTA icon mâu thuẫn) |
| **Độ lớn** | 6 module · **phức tạp TRUNG BÌNH** (nhiều module nhưng mỗi cái gọn; G5/G6 nặng hơn). |

### 🔵 BA-4 — Lô TRANG NỘI DUNG
**Module + thứ tự viết:** `P1 → P3 → P4 → P5 → P6 → P7`
| Hạng mục | Nội dung |
|---|---|
| **Cohesion** | Các **trang nội dung tĩnh/bán-tĩnh** không thuộc trục sản phẩm: giới thiệu · tiện ích · dịch vụ · tin tức · tuyển dụng · liên hệ. Chung pattern (content + CTA nhúng + list/detail đơn giản), ít phụ thuộc chéo nhau. Gom 1 lô để 1 agent giữ giọng nội dung & cấu trúc CTA đồng nhất. |
| **Phụ thuộc ra ngoài lô** | Nhúng CTA/form → tham chiếu **F3** (BA-1) + token **G6** (BA-3). P5 (tin tức) liên quan DECISIONS #14 (filter in-page) + P-09 detail. P6 form ứng tuyển = LeadForm variant "CV" (C5). P7 nhúng map → tham chiếu F1 (BA-2). Tất cả chỉ **tham chiếu mã FR**, không định nghĩa lại. → chạy **Wave 2** (sau khi G6/F3 ổn). |
| **Context phải đọc** | `00-overview.md`(§2) · `F0`(P-02,P-06…P-12) · `N0` · `01-analysis/*`(định vị, ROI) · `DECISIONS.md`(#9,#14) · `00-context/03-sitemap.md` · `sitemap.xml` |
| **Độ lớn** | 6 module · **phức tạp TRUNG BÌNH-THẤP** (P5 tin tức nhỉnh hơn vì list+detail+filter). |

### 🔵 BA-5 — Lô HỆ THỐNG ẨN & TRANG ĐẶC BIỆT
**Module + thứ tự viết:** `X3 → S1 → X1 → X2`
| Hạng mục | Nội dung |
|---|---|
| **Cohesion** | Các **module ẩn dạng trang/overlay đặc biệt** không thuộc 3 lô trên: error states (404/500/empty) · search (ô + trang kết quả + index) · consent banner · trang pháp lý. Cùng đặc điểm: cross-page, "kết cấu nền" trải nghiệm, gắn compliance. X1↔X2↔N9 liên đới chặt (consent + privacy + PDPD). |
| **Phụ thuộc ra ngoài lô** | S1 cần biết các page tồn tại (index) → viết **sau** khi inventory page ổn (tham chiếu F0, không chờ nội dung). X1/X2 tham chiếu **N9 + N5** (BA-6). X3 gần độc lập. → chạy **Wave 2** (song song BA-4). |
| **Context phải đọc** | `00-overview.md`(§2) · `N0`(S1,X1,X2,X3 + N9 PDPD, N6.3) · `F0`(O-04…O-07) · `DECISIONS.md`(#12,#14) · `sitemap.xml` · `webapp`(route pháp lý/404/500/tìm kiếm đã dựng) |
| **Độ lớn** | 4 module · **phức tạp TRUNG BÌNH** (search có index logic; X2 cần nội dung pháp lý). |

### 🔵 BA-6 — Lô PHI CHỨC NĂNG (NFR)
**Module + thứ tự viết:** `N5 → N8 → N9 → N2 → N6 → N1 → N4 → N3 → N7 → N10`
| Hạng mục | Nội dung |
|---|---|
| **Cohesion** | Toàn bộ **đặc tả phi chức năng**, viết theo cùng template, là tài liệu **ngang** áp cho mọi module. Gom 1 agent để: (a) đảm bảo cùng cách định lượng (số đo, ngưỡng), (b) áp dụng nhất quán cột DO/FB + SCOPE-GUARD, (c) liên đới nội bộ chặt (N5 tracking ↔ N8 monitoring ↔ N9 consent; N2 SEO ↔ N6 SEO-infra; N1 UX ↔ N4 perf). Thứ tự ưu tiên N5/N8/N9 vì các lô khác tham chiếu event taxonomy + consent. |
| **Phụ thuộc ra ngoài lô** | NFR tham chiếu module chức năng nhưng **không bị chặn** bởi chúng (đặc tả yêu cầu, không cần FR module xong). N8.1 event taxonomy được nhiều lô tham chiếu → **viết sớm trong lô** (đầu Wave). N7/N10 + N8.5–8.7 = FB-only, đánh `[Build]` rõ. → có thể chạy **Wave 1 song song** (độc lập cao), riêng phần "liên kết FR cụ thể" rà ở Wave 3. |
| **Context phải đọc** | `00-overview.md`(§2) · **`N0`(toàn bộ §2 — xương sống NFR)** · `DECISIONS.md`(#1,#2,#11,#12,#13) · `01-analysis/06-metrics-roi.md` · `sitemap.xml`(hreflang) · `webapp/README.md`(stack perf) |
| **Độ lớn** | 10 module NFR · **phức tạp TRUNG BÌNH** (nhiều file nhưng N0 đã bóc sẵn tiêu mục con → chủ yếu nâng thành FR + AC). |

---

## 5. Sơ đồ WAVE chạy song song

```
┌─ WAVE 0 — CONTRACT (main agent / lead) ──────────────────────────────────┐
│  Khoá C1–C10 (mục 3). Tối thiểu: template §2, mã FR, MoSCoW+Gherkin,      │
│  nhãn nguồn, schema dùng chung (LeadForm/LocalizedText/CCN), quy ước      │
│  [Build]+DO/FB, map mã↔file. KHUYẾN NGHỊ: nâng F4 🟡→✅ làm golden sample. │
└───────────────────────────┬──────────────────────────────────────────────┘
                            │ (chốt xong mới fan-out)
        ┌───────────────────┼───────────────────┬───────────────────┐
        ▼                   ▼                   ▼                   ▼
┌─ WAVE 1 — NỀN TẢNG (song song) ──────────────────────────────────────────┐
│  BA-1 (F3→X4→F2→X5→A1)   BA-2 (F4→P2→P2b→F1)   BA-3 (G6→G1…G5)            │
│  BA-6 (NFR — N5/N8/N9… độc lập cao, chạy luôn)                            │
│  ► 4 lô CHẠY SONG SONG. F3, F4, G6, N8.1 (các "chủ sở hữu contract")     │
│    được viết ĐẦU mỗi lô để khoá phần dùng chung sớm.                      │
└───────────────────────────┬──────────────────────────────────────────────┘
                            │ (khi F3+G6 ổn — phần được tham chiếu nhiều nhất)
        ┌───────────────────┴───────────────────┐
        ▼                                       ▼
┌─ WAVE 2 — TIÊU THỤ NỀN TẢNG (song song) ─────────────────────────────────┐
│  BA-4 (P1→P3→P4→P5→P6→P7)        BA-5 (X3→S1→X1→X2)                       │
│  ► 2 lô SONG SONG. Tham chiếu FR-F3/G6 (đã có), tham chiếu N5/N9 (BA-6). │
│    P0 (trang chủ) được viết Ở ĐÂY hoặc đầu Wave 3 vì gom block từ        │
│    P2/P5/F1/F2/F3 — giao cho BA-2 hoặc BA-4 viết CUỐI (xem ghi chú).     │
└───────────────────────────┬──────────────────────────────────────────────┘
                            │
                            ▼
┌─ WAVE 3 — TỔNG HỢP & RÀ (main agent / 1 agent rà) ───────────────────────┐
│  • Viết/khép P0 Trang chủ (phụ thuộc nhiều nhất — gom block đã xong).     │
│  • Rà chéo: trùng field? lệch mã FR? AC mâu thuẫn? cập nhật TOC trạng thái│
│    trong 00-overview.md (⬜→✅). Đối chiếu DO/FB vs SOW.                   │
└───────────────────────────────────────────────────────────────────────────┘
```

**Song song tối đa ở Wave 1 = 4 lô** (BA-1, BA-2, BA-3, BA-6). Wave 2 = 2 lô (BA-4, BA-5). 

**Ghi chú P0 (trang chủ):** P0 là module phụ thuộc nhiều nhất (gom hero/map/CCN-card/tin-card/CTA). **Không** xếp vào lô chạy sớm. Đề xuất: giao **BA-2 viết P0 cuối lô** (vì BA-2 đã nắm F4/P2/F1) hoặc main agent viết ở Wave 3. Trong bảng mục 4, P0 KHÔNG nằm trong BA-2 mặc định để tránh kéo dài Wave 1 → **gán P0 cho Wave 3** (chủ sở hữu: main agent, tham chiếu output BA-1/BA-2/BA-4).

---

## 6. Chống mâu thuẫn & trùng lặp

| Rủi ro | Quy ước phòng tránh |
|---|---|
| **2 agent định nghĩa lệch cùng 1 data field** | **Chủ sở hữu schema duy nhất** (C5): **F3** sở hữu LeadForm (5 variant) · **F4** sở hữu CCN (12 mục) · **G5** sở hữu LocalizedText. Agent khác chỉ *tham chiếu mã FR/field*, ghi rõ "theo `FR-F3-x`", KHÔNG redefine. |
| **2 agent chạm cùng file** | Map mã↔file (mục 4) là 1:1, mỗi file 1 chủ. Không agent nào sửa file ngoài lô mình. F4 đã tồn tại → chỉ BA-2 (chủ F4) được sửa. 00-overview.md (cập nhật TOC) chỉ main agent đụng ở Wave 3. |
| **Lệch mã FR / format** | C2+C3 khoá ở Wave 0; mọi agent gọi `/ba-spec` (hoặc theo §2) → cùng khuôn. Mã module cố định theo TOC thật. |
| **Lệch event/tracking name** | **N8.1 event taxonomy là nguồn duy nhất** cho tên event (`form_submit`, `brochure_download`, `book_survey`, `consult_request`, `map_pin_click`, `language_switch`…). Module khác tham chiếu, không tự đặt tên (F4 §6 đang `[ASSUMPTION]` → trỏ về N8.1 khi có). |
| **Phần [Build] khi DECISIONS #1 chưa chốt** | C6: mọi nội dung full-build gom vào khối **`[Build · chờ DECISIONS #1]`** cuối module; FR full-build gắn MoSCoW + cột **FB**; phần lõi (FR chức năng + AC) độc lập với #1. SCOPE-GUARD (C7): N7 toàn bộ, N8.5–8.7, N10 toàn bộ, X5 = **FB-only**, đánh dấu KHÔNG vào SOW thiết kế-only. |
| **Mâu thuẫn brief↔sitemap.jfif** | C8: theo **brief**, đánh ⚠️CONFLICT + ref AUDIT-LOG (footer 3/6 cột → G4; CTA icon → G3; số CCN → F4/P2; tin 3/4 mục → P5). Không agent nào tự "quyết" — để ⚠️CONFIRM. |
| **Bịa module/feature** | Chỉ viết module CÓ trong TOC `00-overview.md` + N0. Không thêm module mới. Yêu cầu không có nguồn → nhãn `Assumed` + ⚠️CONFIRM, không trình bày như Stated. |

---

## 7. Prompt mẫu sẵn-dùng cho 1 BA agent (copy & điền chỗ trống)

```
Bạn là BA agent #<BA-n> cho dự án FDD website Sumita.vn (repo
/Users/st2518/Works/Senera/bidđing/sumita-bidding). Nhiệm vụ: viết FDD
(Functional Design Document) cho các module: <DANH SÁCH MÃ + THỨ TỰ, vd F3→X4→F2→X5→A1>.
Mỗi module → 1 file riêng: <DANH SÁCH file 08-spec/<mã>-<tên>.md>.

QUY TRÌNH:
- Gọi skill /ba-spec nếu có trong danh sách (BABOK v3 + ISO/IEC/IEEE 29148 +
  MoSCoW + Gherkin AC + kỷ luật no-bịa/no-over-engineer + ref Stated/Implied/Assumed).
  NẾU /ba-spec CHƯA xuất hiện → tuân thủ trực tiếp template §2 của 08-spec/00-overview.md
  + các contract C1–C10 trong 08-spec/FDD-BATCH-PLAN.md §3 (đó là skill rút gọn).
- Bám 100% module/ký hiệu CÓ THẬT trong 08-spec/ — KHÔNG bịa module/feature mới.

ĐỌC TRƯỚC (bắt buộc):
1. 08-spec/00-overview.md (§2 template 10 mục + §0 quy ước [Build])
2. 08-spec/FDD-BATCH-PLAN.md (§3 contract C1–C10, §6 chống mâu thuẫn, §8 Done)
3. 08-spec/F4-template-ccn.md  ← GOLDEN SAMPLE, viết theo phong cách này
4. 08-spec/N0-hidden-modules-and-nfr.md (nhãn nguồn + DO/FB + SCOPE-GUARD)
5. DECISIONS.md (đặc biệt #1 thiết kế-only/full-build CHƯA chốt)
6. <FILE CONTEXT RIÊNG CỦA LÔ — chép từ cột "Context phải đọc" mục 4>

CHUẨN ĐẦU RA mỗi FDD = đủ 10 mục template §2:
1 Mục tiêu&phễu(ref) · 2 Actor · 3 Cấu trúc nội dung&field(tên·kiểu·bắt buộc·i18n)
· 4 FR (FR-<mã>-n singular + MoSCoW + ref nhãn Stated/Implied/Assumed)
· 5 State&edge case · 6 Phụ thuộc · 7 NFR liên quan(+tracking) · 8 AC Gherkin
(Given/When/Then cho mọi FR Must & Should) · 9 Tham chiếu nguồn · 10 ⚠️CONFIRM/[ASSUMPTION]/⚠️CONFLICT.

KỶ LUẬT:
- KHÔNG redefine data dùng chung: LeadForm thuộc F3, CCN thuộc F4, LocalizedText
  thuộc G5 — chỉ tham chiếu "theo FR-F3-x", không định nghĩa lại (contract C5).
- Tên event tracking lấy từ N8.1 (không tự đặt).
- Nội dung full-build gom vào khối [Build · chờ DECISIONS #1]; FR full-build gắn cột FB;
  N7/N8.5–8.7/N10/X5 = FB-only, KHÔNG vào SOW thiết kế-only (SCOPE-GUARD C7).
- Mâu thuẫn brief↔sitemap.jfif: theo brief + ⚠️CONFLICT (ref AUDIT-LOG).
- Viết tiếng Việt, giữ thuật ngữ EN. Con số không nguồn → [ASSUMPTION].

RÀNG BUỘC FILE:
- CHỈ tạo/sửa các file 08-spec/<mã>-<tên>.md thuộc lô mình. KHÔNG đụng file lô khác,
  KHÔNG sửa 00-overview.md (main agent cập nhật TOC ở Wave 3), KHÔNG đụng webapp/,
  KHÔNG commit/push.

BÁO CÁO CUỐI: liệt kê file đã tạo + số FR mỗi module + các ⚠️CONFIRM/⚠️CONFLICT phát sinh.
```

---

## 8. Định nghĩa Done cho mỗi lô (checklist nghiệm thu 1 FDD)

Mỗi file `08-spec/<mã>-<tên>.md` chỉ tính **Done** khi:

- [ ] **Đủ 10 mục** template §2 (`00-overview.md`) — không thiếu mục nào (mục rỗng phải ghi "không áp dụng" + lý do).
- [ ] **Mục 4 — FR:** mọi FR mã `FR-<mã>-n`, **singular** (1 ý), có **MoSCoW** (Must/Should/Could/Won't) + **ref nhãn** (Stated/Implied/Assumed).
- [ ] **Mục 8 — AC:** mọi FR **Must & Should** có AC **Gherkin** (Given/When/Then). Could/Won't không bắt buộc AC.
- [ ] **Mục 3 — field:** đủ `tên · kiểu · bắt buộc? · i18n?`; data dùng chung **tham chiếu** chủ sở hữu (C5), không redefine.
- [ ] **[Build]** gom riêng, gắn `[Build · chờ DECISIONS #1]`; cột **DO/FB** đúng SCOPE-GUARD; FB-only không lẫn vào phần lõi/SOW thiết kế-only.
- [ ] **Tracking/event** (mục 7) trỏ về **N8.1**, không tự đặt tên.
- [ ] **Mục 10:** gom đủ ⚠️CONFIRM / [ASSUMPTION] / ⚠️CONFLICT; mâu thuẫn brief↔sitemap theo brief + ref AUDIT-LOG.
- [ ] **Mục 9 — ref:** mọi yêu cầu truy được về brief §/file context/sitemap.
- [ ] **Không bịa** module/feature ngoài TOC + N0; **không over-engineer** (không thêm yêu cầu không có nguồn mà không gắn Assumed).
- [ ] **Cập nhật TOC** trạng thái trong `00-overview.md` (⬜→✅, hoặc 🟡 nếu còn [Build] chờ #1) — **do main agent làm ở Wave 3** (BA agent chỉ báo cáo, KHÔNG tự sửa 00-overview.md).

**Done cho cả LÔ:** tất cả file trong lô đạt checklist trên + báo cáo cuối (file đã tạo · số FR/module · danh sách ⚠️CONFIRM/⚠️CONFLICT) + không chạm file ngoài lô.

---

## 9. Tóm tắt nhanh (cho main agent)

- **6 lô / 6 BA agent**, mỗi lô 1 file context riêng + chủ sở hữu file 1:1.
- **Wave 0:** main agent khoá C1–C10 (+ khuyến nghị nâng F4→golden).
- **Wave 1 (4 lô song song):** BA-1 form-engine · BA-2 CCN/sản phẩm · BA-3 global/shell · BA-6 NFR.
- **Wave 2 (2 lô song song):** BA-4 trang nội dung · BA-5 hệ thống ẩn.
- **Wave 3:** main agent viết P0 + rà chéo + cập nhật TOC.
- **Chủ sở hữu contract dùng chung:** F3=LeadForm · F4=CCN · G5=LocalizedText · N8.1=event taxonomy. Mọi nơi khác chỉ tham chiếu.

_Tạo: 2026-06-08 bởi Agent #2 (work-breakdown planner). KHÔNG chứa nội dung FDD._
