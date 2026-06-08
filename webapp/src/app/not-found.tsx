import Link from "next/link";
import { Container } from "@/components/common/section";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center gap-6 py-20 text-center">
      <p className="text-6xl font-semibold tracking-tight sm:text-8xl">404</p>
      <p className="text-lg text-muted-foreground">Không tìm thấy trang</p>
      <Button asChild size="lg">
        <Link href="/">Về trang chủ</Link>
      </Button>
    </Container>
  );
}
