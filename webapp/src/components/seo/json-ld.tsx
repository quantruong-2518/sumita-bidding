import { SITE } from "@/lib/seo";

/* Structured data (schema.org JSON-LD) — giúp Google hiểu thực thể "Sumita" + bản chất site.
   Kỷ luật no-bịa: chỉ khai báo dữ kiện CHẮC CHẮN từ cấu hình (tên, domain, mô tả, ngôn ngữ,
   khu vực phục vụ). KHÔNG bịa địa chỉ/điện thoại/mạng xã hội khi chưa có nguồn xác nhận.
   URL tuyệt đối lấy theo SITE.url (đã auto-detect domain đang phục vụ). */
export function JsonLd() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE.url}/#organization`,
        name: SITE.name,
        legalName: SITE.legalName,
        url: SITE.url,
        logo: `${SITE.url}/icon.svg`,
        image: `${SITE.url}/opengraph-image`,
        description: SITE.description,
        knowsLanguage: ["vi", "en"],
        areaServed: ["Hưng Yên", "Thái Bình", "Việt Nam"],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE.url}/#website`,
        url: SITE.url,
        name: SITE.titleDefault,
        description: SITE.description,
        inLanguage: "vi-VN",
        publisher: { "@id": `${SITE.url}/#organization` },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // JSON.stringify an toàn (không phải HTML người dùng) — chèn structured data vào <head>.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
