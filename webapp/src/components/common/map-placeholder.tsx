"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Icon } from "./icon";

/* O-01 Interactive map (placeholder). Pin đặt theo % toạ độ trên ảnh nền; kèm legend list.
   Thay bằng Mapbox/Leaflet sau, giữ nguyên prop `pins`. */
export type MapPinView = { id: string; label: string; x: number; y: number; href?: string };

export function MapPlaceholder({ pins, className }: { pins: MapPinView[]; className?: string }) {
  return (
    <div className={cn("grid gap-4 lg:grid-cols-[1fr_260px]", className)}>
      <div className="relative aspect-[16/10] w-full overflow-hidden border border-border bg-muted">
        <span className="pointer-events-none absolute left-3 top-2 text-[11px] text-muted-foreground/70">
          Bản đồ tương tác (placeholder)
        </span>
        {pins.map((p) => {
          const Pin = (
            <span className="group/pin -translate-x-1/2 -translate-y-full">
              <Icon name="MapPin" className="size-6 drop-shadow" />
              <span className="absolute left-1/2 top-full -translate-x-1/2 whitespace-nowrap border border-border bg-background px-1.5 py-0.5 text-xs opacity-0 transition-opacity group-hover/pin:opacity-100">
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
      </div>

      <ul className="divide-y divide-border border border-border">
        {pins.map((p) => (
          <li key={p.id}>
            <Link
              href={p.href ?? "#"}
              className="flex items-center gap-2 p-3 text-sm hover:bg-accent"
            >
              <Icon name="MapPin" className="size-4 shrink-0" />
              <span className="font-medium">{p.label}</span>
              <Icon name="ChevronRight" className="ml-auto size-4 text-muted-foreground" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
