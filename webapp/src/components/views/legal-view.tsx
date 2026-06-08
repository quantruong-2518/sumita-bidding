"use client";

import { PageHeader } from "@/components/common/page-header";
import { Section } from "@/components/common/section";
import { RichText } from "@/components/common/data-blocks";

/* O-06 Trang pháp lý tĩnh (chính sách bảo mật / điều khoản). Nội dung placeholder. */
const LEGAL_CONTENT: Record<string, { title: string; body: string }> = {
  "chinh-sach-bao-mat": {
    title: "Chính sách bảo mật",
    body: `Sumita cam kết bảo vệ thông tin cá nhân mà bạn cung cấp khi sử dụng website. Chính sách này mô tả cách chúng tôi thu thập, sử dụng và bảo vệ dữ liệu của bạn.
Chúng tôi chỉ thu thập các thông tin cần thiết (họ tên, email, số điện thoại, công ty, nhu cầu đầu tư) nhằm phục vụ việc tư vấn, gửi tài liệu và liên hệ lại theo yêu cầu của bạn.
Thông tin của bạn được lưu trữ an toàn và không chia sẻ cho bên thứ ba ngoài mục đích đã nêu, trừ khi có yêu cầu của cơ quan nhà nước có thẩm quyền theo quy định pháp luật.
Bạn có quyền yêu cầu truy cập, chỉnh sửa hoặc xoá thông tin cá nhân của mình bất cứ lúc nào bằng cách liên hệ với chúng tôi qua các kênh được công bố trên website.
Nội dung trên đây là bản nháp phục vụ trình bày; nội dung chính thức sẽ được hoàn thiện ở giai đoạn triển khai.`,
  },
  "dieu-khoan": {
    title: "Điều khoản sử dụng",
    body: `Bằng việc truy cập và sử dụng website Sumita, bạn đồng ý tuân thủ các điều khoản sử dụng được nêu dưới đây.
Toàn bộ nội dung, hình ảnh, dữ liệu quy hoạch và tài liệu trên website thuộc quyền sở hữu của Sumita và chỉ được sử dụng cho mục đích tham khảo đầu tư.
Các thông tin về diện tích, giá thuê, tiến độ và pháp lý mang tính tham khảo, có thể thay đổi mà không cần báo trước; thông tin ràng buộc sẽ được xác nhận bằng văn bản chính thức.
Bạn không được sao chép, phân phối lại hoặc sử dụng nội dung của website cho mục đích thương mại khi chưa có sự đồng ý bằng văn bản của Sumita.
Nội dung trên đây là bản nháp phục vụ trình bày; nội dung chính thức sẽ được hoàn thiện ở giai đoạn triển khai.`,
  },
};

export function LegalView({ slug }: { slug: string }) {
  const content = LEGAL_CONTENT[slug];
  if (!content) return null;

  return (
    <>
      <PageHeader
        breadcrumbs={[{ label: "Trang chủ", href: "/" }, { label: "Pháp lý" }, { label: content.title }]}
        title={content.title}
      />

      <Section contentClassName="max-w-3xl">
        <RichText content={content.body} />
      </Section>
    </>
  );
}
