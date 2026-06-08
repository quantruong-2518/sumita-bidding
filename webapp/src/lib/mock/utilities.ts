import { L, type UtilityGroup } from "@/lib/schema";

/* P-06 Tiện ích & hạ tầng (brief §5.3).
   ⚠️CONFIRM: phân bổ "xử lý nước thải" + "thoát nước mưa" giữa mục 3 và mục 4 (brief↔sitemap.jfif). */
export const UTILITY_GROUPS: UtilityGroup[] = [
  {
    id: "ky-thuat",
    title: L("Hạ tầng kỹ thuật", "Technical infrastructure"),
    items: [
      { icon: "Zap", label: L("Cấp điện", "Power supply"), desc: L("Trạm biến áp 110/22kV cấp đến hàng rào", "110/22kV substation") },
      { icon: "Droplets", label: L("Cấp nước", "Water supply"), desc: L("Nhà máy nước công suất lớn", "High-capacity water plant") },
      { icon: "Recycle", label: L("Xử lý nước thải", "Wastewater treatment"), desc: L("Trạm XLNT tập trung", "Central WWTP") },
      { icon: "CloudRain", label: L("Thoát nước mưa", "Stormwater drainage"), desc: L("Hệ thống thoát nước riêng", "Separate drainage") },
    ],
  },
  {
    id: "an-toan",
    title: L("An toàn & môi trường", "Safety & environment"),
    items: [
      { icon: "Flame", label: L("PCCC", "Fire safety"), desc: L("Hệ thống cấp nước chữa cháy", "Fire mains") },
      { icon: "ShieldCheck", label: L("An ninh 24/7", "24/7 security"), desc: L("Bảo vệ, camera toàn khu", "Guards & CCTV") },
      { icon: "Trees", label: L("Cây xanh & cảnh quan", "Greenery"), desc: L("Tỉ lệ cây xanh theo quy hoạch", "Planned green ratio") },
    ],
  },
  {
    id: "dich-vu",
    title: L("Khu dịch vụ", "Service area"),
    items: [
      { icon: "UtensilsCrossed", label: L("Căng tin & ăn uống", "Canteen & F&B") },
      { icon: "ShoppingCart", label: L("Siêu thị tiện ích", "Convenience store") },
      { icon: "Bus", label: L("Bãi đỗ & giao thông", "Parking & transit") },
    ],
  },
];
