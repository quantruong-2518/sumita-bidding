"use client";

import { Container } from "@/components/common/section";
import { Button } from "@/components/ui/button";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center gap-6 py-20 text-center">
      <p className="text-2xl font-semibold tracking-tight sm:text-3xl">Đã có lỗi xảy ra</p>
      <p className="text-muted-foreground">Vui lòng thử lại sau ít phút.</p>
      <Button size="lg" onClick={() => reset()}>
        Thử lại
      </Button>
    </Container>
  );
}
