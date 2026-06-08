"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { cn } from "@/lib/utils";
import { Icon } from "./icon";

/* O-01 Bản đồ tương tác.
   - Pin có lat/lng → render MAP THẬT (Leaflet + tiles OpenStreetMap, free, không token).
   - Pin không có lat/lng → fallback hộp placeholder + pin theo % (hành vi cũ).
   GIỮ NGUYÊN prop `pins` (mở rộng thêm lat/lng tuỳ chọn) + legend list bên cạnh.

   Leaflet cần DOM → nạp client-only qua dynamic(ssr:false) cho SSR-safe (Next 16). */
export type MapPinView = {
  id: string;
  label: string;
  x: number;
  y: number;
  lat?: number;
  lng?: number;
  href?: string;
};

// Map thật chỉ tải ở client; SSR/prerender hiện skeleton.
const LeafletMap = dynamic(() => import("./leaflet-map"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-muted text-sm text-muted-foreground">
      <Icon name="MapPin" className="mr-2 size-4 animate-pulse" /> Đang tải bản đồ…
    </div>
  ),
});

export function MapPlaceholder({ pins, className }: { pins: MapPinView[]; className?: string }) {
  const hasGeo = pins.some((p) => p.lat != null && p.lng != null);

  return (
    <div className={cn("grid gap-4 lg:grid-cols-[1fr_280px]", className)}>
      {/* Khung bản đồ: tỉ lệ cố định, bo góc, viền. */}
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg border border-border bg-muted">
        {hasGeo ? (
          <LeafletMap pins={pins} className="h-full w-full" />
        ) : (
          // Fallback: ảnh nền placeholder + pin theo % (khi pin chưa có toạ độ).
          <>
            <span className="pointer-events-none absolute left-3 top-2 z-[1] text-[11px] text-muted-foreground/70">
              Bản đồ tương tác (placeholder)
            </span>
            {pins.map((p) => {
              const Pin = (
                <span className="group/pin -translate-x-1/2 -translate-y-full">
                  <Icon name="MapPin" className="size-6 text-cta drop-shadow" />
                  <span className="absolute left-1/2 top-full -translate-x-1/2 whitespace-nowrap rounded border border-border bg-background px-1.5 py-0.5 text-xs opacity-0 transition-opacity group-hover/pin:opacity-100">
                    {p.label}
                  </span>
                </span>
              );
              return (
                <div key={p.id} className="absolute" style={{ left: `${p.x}%`, top: `${p.y}%` }}>
                  {p.href ? (
                    <Link href={p.href} aria-label={p.label} className="outline-none focus-visible:ring-3 focus-visible:ring-ring/50">
                      {Pin}
                    </Link>
                  ) : (
                    Pin
                  )}
                </div>
              );
            })}
          </>
        )}
      </div>

      {/* Legend list — luôn hiển thị, dùng được bằng bàn phím (touch target ≥44px). */}
      <ul className="divide-y divide-border overflow-hidden rounded-lg border border-border">
        {pins.map((p) => (
          <li key={p.id}>
            <Link
              href={p.href ?? "#"}
              className="flex min-h-11 items-center gap-2 p-3 text-sm transition-colors hover:bg-accent focus-visible:bg-accent focus-visible:outline-none"
            >
              <Icon name="MapPin" className="size-4 shrink-0 text-cta" />
              <span className="font-medium">{p.label}</span>
              <Icon name="ChevronRight" className="ml-auto size-4 text-muted-foreground" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
