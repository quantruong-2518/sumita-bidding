import { L, type Factory } from "@/lib/schema";

export const FACTORIES: Factory[] = [
  {
    slug: "nx-a1-hung-nhan",
    name: L("Nhà xưởng A1 — CCN Hưng Nhân", "Factory A1 — Hung Nhan"),
    ccnSlug: "ccn-hung-nhan",
    area: 2500,
    priceFrom: L("từ 4.2 USD/m²/tháng", "from 4.2 USD/m²/month"),
    status: "con-trong",
    image: "factory/a1",
    specs: [
      { label: L("Diện tích", "Area"), value: L("2.500 m²", "2,500 m²") },
      { label: L("Chiều cao thông thuỷ", "Clear height"), value: L("9 m", "9 m") },
      { label: L("Tải trọng nền", "Floor load"), value: L("3 tấn/m²", "3 t/m²") },
      { label: L("PCCC", "Fire safety"), value: L("Sprinkler đầy đủ", "Full sprinkler") },
    ],
  },
  {
    slug: "nx-a2-hung-nhan",
    name: L("Nhà xưởng A2 — CCN Hưng Nhân", "Factory A2 — Hung Nhan"),
    ccnSlug: "ccn-hung-nhan",
    area: 5000,
    priceFrom: L("từ 4.0 USD/m²/tháng", "from 4.0 USD/m²/month"),
    status: "sap-ban-giao",
    image: "factory/a2",
    specs: [
      { label: L("Diện tích", "Area"), value: L("5.000 m²", "5,000 m²") },
      { label: L("Chiều cao thông thuỷ", "Clear height"), value: L("10 m", "10 m") },
    ],
  },
  {
    slug: "nx-b1-duc-hiep",
    name: L("Nhà xưởng B1 — CCN Đức Hiệp", "Factory B1 — Duc Hiep"),
    ccnSlug: "ccn-duc-hiep",
    area: 1800,
    priceFrom: L("từ 3.8 USD/m²/tháng", "from 3.8 USD/m²/month"),
    status: "con-trong",
    image: "factory/b1",
    specs: [
      { label: L("Diện tích", "Area"), value: L("1.800 m²", "1,800 m²") },
      { label: L("Văn phòng kèm theo", "Attached office"), value: L("Có", "Yes") },
    ],
  },
];
