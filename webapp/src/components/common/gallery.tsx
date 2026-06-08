"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Media } from "./media";
import { Icon } from "./icon";
import { gridColsClass } from "./grid";

/* Gallery + lightbox (CCN §4.10). items = nhãn placeholder ảnh. */
export function Gallery({ items, columns = 3 }: { items: { src: string; label?: string }[]; columns?: number }) {
  const [index, setIndex] = useState<number | null>(null);
  if (!items.length) return null;

  const open = index !== null;
  const current = open ? items[index!] : null;
  const go = (delta: number) => setIndex((i) => (i === null ? null : (i + delta + items.length) % items.length));

  return (
    <>
      <div className={cn("grid gap-3", gridColsClass[columns])}>
        {items.map((it, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setIndex(i)}
            className="group block text-left outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
            aria-label={`Xem ảnh ${i + 1}`}
          >
            <Media label={it.label ?? it.src} className="transition-opacity group-hover:opacity-80" />
          </button>
        ))}
      </div>

      <Dialog open={open} onOpenChange={(o) => !o && setIndex(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-sm font-normal text-muted-foreground">
              Ảnh {open ? index! + 1 : 0}/{items.length}
            </DialogTitle>
          </DialogHeader>
          {current ? <Media label={current.label ?? current.src} ratio={16 / 9} /> : null}
          <div className="flex items-center justify-between">
            <Button variant="outline" size="sm" onClick={() => go(-1)}>
              <Icon name="ChevronLeft" className="size-4" /> Trước
            </Button>
            <Button variant="outline" size="sm" onClick={() => go(1)}>
              Sau <Icon name="ChevronRight" className="size-4" />
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
