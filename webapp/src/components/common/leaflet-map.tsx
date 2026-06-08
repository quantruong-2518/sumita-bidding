"use client";

/* Bản đồ thật (Leaflet + tiles OpenStreetMap — KHÔNG cần token, free).
   Component này CHỈ chạy client (dùng window/DOM của Leaflet) → được nạp qua
   dynamic(..., { ssr: false }) trong map-placeholder.tsx (SSR-safe cho Next 16).

   Nhận `pins` đã có lat/lng + href. Marker = DivIcon brand (navy + cam) để:
   - không phụ thuộc asset ảnh marker mặc định của Leaflet (hay vỡ khi bundle),
   - khớp tông thương hiệu.
   Click marker → mở popup có link sang trang chi tiết CCN. */

import { useRouter } from "next/navigation";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useTt } from "@/lib/i18n/use-tx";
import type { MapPinView } from "./map-placeholder";

// DivIcon pin theo brand (cam viền trắng, đổ bóng). Tạo 1 lần/khởi tạo.
const brandIcon = L.divIcon({
  className: "",
  html: `<span style="
    display:flex;align-items:center;justify-content:center;
    width:26px;height:26px;border-radius:9999px;
    background:#f6861f;border:3px solid #fff;
    box-shadow:0 2px 6px rgba(22,34,58,.45);
  "></span>`,
  iconSize: [26, 26],
  iconAnchor: [13, 13],
  popupAnchor: [0, -14],
});

export default function LeafletMap({
  pins,
  className,
}: {
  pins: MapPinView[];
  className?: string;
}) {
  const tt = useTt();
  const router = useRouter();
  const geoPins = pins.filter((p) => p.lat != null && p.lng != null);

  // Tâm bản đồ = trung bình toạ độ pin; fallback ~Thái Bình/Hưng Yên.
  const center: [number, number] = geoPins.length
    ? [
        geoPins.reduce((s, p) => s + (p.lat as number), 0) / geoPins.length,
        geoPins.reduce((s, p) => s + (p.lng as number), 0) / geoPins.length,
      ]
    : [20.49, 106.34];

  return (
    <MapContainer
      center={center}
      zoom={10}
      scrollWheelZoom={false}
      className={className}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {geoPins.map((p) => (
        <Marker
          key={p.id}
          position={[p.lat as number, p.lng as number]}
          icon={brandIcon}
          eventHandlers={p.href ? { click: () => router.push(p.href as string) } : undefined}
        >
          <Popup>
            <span style={{ fontWeight: 600 }}>{p.label}</span>
            {p.href ? (
              <>
                <br />
                <a href={p.href} style={{ color: "#f6861f", fontWeight: 600 }}>
                  {tt("Xem chi tiết →", "View details →")}
                </a>
              </>
            ) : null}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
