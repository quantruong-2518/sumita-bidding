import { L, type MapPin } from "@/lib/schema";

/* O-01 Bản đồ tương tác.
   - lat/lng: toạ độ thật quanh khu vực Thái Bình / Hưng Yên (DECISIONS #9) → dùng cho map Leaflet/OSM.
   - x/y (% trên ảnh nền 0..100): GIỮ LẠI cho fallback placeholder khi map chưa tải.
   Khớp với location.lat/lng trong mock/ccn.ts. */
export const MAP_PINS: MapPin[] = [
  { ccnSlug: "ccn-hung-nhan", name: L("CCN Hưng Nhân", "Hung Nhan"), x: 42, y: 38, lat: 20.55, lng: 106.27 },
  { ccnSlug: "ccn-duc-hiep", name: L("CCN Đức Hiệp", "Duc Hiep"), x: 58, y: 52, lat: 20.49, lng: 106.33 },
  { ccnSlug: "ccn-con-nhat", name: L("CCN Cồn Nhất", "Con Nhat"), x: 66, y: 70, lat: 20.42, lng: 106.45 },
];
