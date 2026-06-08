"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Icon } from "./icon";
import { gridColsClass } from "./grid";

/* Trạng thái dùng lại: loading / empty / error (O-07). */

export function LoadingCards({ count = 3, columns = 3 }: { count?: number; columns?: number }) {
  return (
    <div className={cn("grid gap-4 sm:gap-6", gridColsClass[columns])}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="border border-border">
          <Skeleton className="aspect-[16/9] w-full" />
          <div className="space-y-3 p-5">
            <Skeleton className="h-5 w-2/3" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function LoadingLines({ lines = 3, className }: { lines?: number; className?: string }) {
  return (
    <div className={cn("space-y-3", className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton key={i} className={cn("h-4", i === lines - 1 ? "w-1/2" : "w-full")} />
      ))}
    </div>
  );
}

export function EmptyState({
  title = "Chưa có dữ liệu",
  description,
  icon = "ImageOff",
  action,
}: {
  title?: string;
  description?: string;
  icon?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 border border-dashed border-border p-10 text-center">
      <Icon name={icon} className="size-7 text-muted-foreground" />
      <div className="space-y-1">
        <p className="font-medium">{title}</p>
        {description ? <p className="text-sm text-muted-foreground">{description}</p> : null}
      </div>
      {action}
    </div>
  );
}

export function ErrorState({
  title = "Không tải được dữ liệu",
  description = "Đã có lỗi xảy ra. Vui lòng thử lại.",
  onRetry,
}: {
  title?: string;
  description?: string;
  onRetry?: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 border border-border p-10 text-center">
      <Icon name="X" className="size-7 text-destructive" />
      <div className="space-y-1">
        <p className="font-medium">{title}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      {onRetry ? (
        <Button variant="outline" size="sm" onClick={onRetry}>
          Thử lại
        </Button>
      ) : null}
    </div>
  );
}
