"use client";

import { Container } from "@/components/common/section";
import { Button } from "@/components/ui/button";
import { useTt } from "@/lib/i18n/use-tx";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const tt = useTt();
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center gap-6 py-20 text-center">
      <p className="text-2xl font-semibold tracking-tight sm:text-3xl">{tt("Đã có lỗi xảy ra", "Something went wrong")}</p>
      <p className="text-muted-foreground">{tt("Vui lòng thử lại sau ít phút.", "Please try again in a few minutes.")}</p>
      <Button size="lg" onClick={() => reset()}>
        {tt("Thử lại", "Try again")}
      </Button>
    </Container>
  );
}
