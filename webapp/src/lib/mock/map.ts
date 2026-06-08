import { L, type MapPin } from "@/lib/schema";

/* O-01 Interactive map — pin theo % toạ độ trên ảnh nền placeholder (x,y ∈ 0..100). */
export const MAP_PINS: MapPin[] = [
  { ccnSlug: "ccn-hung-nhan", name: L("CCN Hưng Nhân", "Hung Nhan"), x: 42, y: 38 },
  { ccnSlug: "ccn-duc-hiep", name: L("CCN Đức Hiệp", "Duc Hiep"), x: 58, y: 52 },
  { ccnSlug: "ccn-con-nhat", name: L("CCN Cồn Nhất", "Con Nhat"), x: 66, y: 70 },
];
