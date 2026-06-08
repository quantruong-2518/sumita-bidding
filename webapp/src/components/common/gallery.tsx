"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useTt } from "@/lib/i18n/use-tx";
import { cn } from "@/lib/utils";
import { Media } from "./media";
import { Icon } from "./icon";
import { gridColsClass } from "./grid";

/* Gallery + lightbox (CCN §4.10). items = nhãn placeholder ảnh. */
export function Gallery({ items, columns = 3 }: { items: { src: string; label?: string }[]; columns?: number }) {
  const tt = useTt();
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
            aria-label={tt(`Xem ảnh ${i + 1}`, `View image ${i + 1}`)}
          >
            <Media
              src={it.src}
              label={it.label ?? it.src}
              alt={it.label ?? tt(`Ảnh ${i + 1}`, `Image ${i + 1}`)}
              className="transition-opacity group-hover:opacity-80"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </button>
        ))}
      </div>

      <Dialog open={open} onOpenChange={(o) => !o && setIndex(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-sm font-normal text-muted-foreground">
              {tt("Ảnh", "Image")} {open ? index! + 1 : 0}/{items.length}
            </DialogTitle>
          </DialogHeader>
          {current ? (
            <Media
              src={current.src}
              label={current.label ?? current.src}
              alt={current.label ?? tt(`Ảnh ${open ? index! + 1 : 0}`, `Image ${open ? index! + 1 : 0}`)}
              ratio={16 / 9}
              sizes="(max-width: 768px) 100vw, 768px"
            />
          ) : null}
          <div className="flex items-center justify-between">
            <Button variant="outline" size="sm" onClick={() => go(-1)}>
              <Icon name="ChevronLeft" className="size-4" /> {tt("Trước", "Previous")}
            </Button>
            <Button variant="outline" size="sm" onClick={() => go(1)}>
              {tt("Sau", "Next")} <Icon name="ChevronRight" className="size-4" />
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
