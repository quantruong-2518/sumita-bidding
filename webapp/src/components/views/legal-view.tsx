"use client";

import { L, type LocalizedText } from "@/lib/schema";
import { useTx, useTt } from "@/lib/i18n/use-tx";
import { PageHeader } from "@/components/common/page-header";
import { Section } from "@/components/common/section";
import { RichText } from "@/components/common/data-blocks";

/* O-06 Trang pháp lý tĩnh (chính sách bảo mật / điều khoản). Nội dung placeholder. */
const LEGAL_CONTENT: Record<string, { title: LocalizedText; body: LocalizedText }> = {
  "chinh-sach-bao-mat": {
    title: L("Chính sách bảo mật", "Privacy policy"),
    body: L(
      `Sumita cam kết bảo vệ thông tin cá nhân mà bạn cung cấp khi sử dụng website. Chính sách này mô tả cách chúng tôi thu thập, sử dụng và bảo vệ dữ liệu của bạn.
Chúng tôi chỉ thu thập các thông tin cần thiết (họ tên, email, số điện thoại, công ty, nhu cầu đầu tư) nhằm phục vụ việc tư vấn, gửi tài liệu và liên hệ lại theo yêu cầu của bạn.
Thông tin của bạn được lưu trữ an toàn và không chia sẻ cho bên thứ ba ngoài mục đích đã nêu, trừ khi có yêu cầu của cơ quan nhà nước có thẩm quyền theo quy định pháp luật.
Bạn có quyền yêu cầu truy cập, chỉnh sửa hoặc xoá thông tin cá nhân của mình bất cứ lúc nào bằng cách liên hệ với chúng tôi qua các kênh được công bố trên website.
Nội dung trên đây là bản nháp phục vụ trình bày; nội dung chính thức sẽ được hoàn thiện ở giai đoạn triển khai.`,
      `Sumita is committed to protecting the personal information you provide when using this website. This policy describes how we collect, use and safeguard your data.
We only collect the information necessary (full name, email, phone number, company and investment requirements) in order to provide advisory services, send documents and follow up at your request.
Your information is stored securely and is not shared with any third party beyond the stated purposes, except where required by a competent state authority under applicable law.
You have the right to request access to, correction of, or deletion of your personal information at any time by contacting us through the channels published on this website.
The content above is a draft for presentation purposes; the official version will be finalized at the deployment stage.`
    ),
  },
  "dieu-khoan": {
    title: L("Điều khoản sử dụng", "Terms of use"),
    body: L(
      `Bằng việc truy cập và sử dụng website Sumita, bạn đồng ý tuân thủ các điều khoản sử dụng được nêu dưới đây.
Toàn bộ nội dung, hình ảnh, dữ liệu quy hoạch và tài liệu trên website thuộc quyền sở hữu của Sumita và chỉ được sử dụng cho mục đích tham khảo đầu tư.
Các thông tin về diện tích, giá thuê, tiến độ và pháp lý mang tính tham khảo, có thể thay đổi mà không cần báo trước; thông tin ràng buộc sẽ được xác nhận bằng văn bản chính thức.
Bạn không được sao chép, phân phối lại hoặc sử dụng nội dung của website cho mục đích thương mại khi chưa có sự đồng ý bằng văn bản của Sumita.
Nội dung trên đây là bản nháp phục vụ trình bày; nội dung chính thức sẽ được hoàn thiện ở giai đoạn triển khai.`,
      `By accessing and using the Sumita website, you agree to comply with the terms of use set out below.
All content, images, planning data and documents on this website are the property of Sumita and may be used for investment reference purposes only.
Information on land area, lease rates, project progress and legal status is provided for reference, may change without prior notice; binding information will be confirmed by official written documents.
You may not copy, redistribute or use the content of this website for commercial purposes without the prior written consent of Sumita.
The content above is a draft for presentation purposes; the official version will be finalized at the deployment stage.`
    ),
  },
};

export function LegalView({ slug }: { slug: string }) {
  const t = useTx();
  const tt = useTt();
  const content = LEGAL_CONTENT[slug];
  if (!content) return null;

  const title = t(content.title);

  return (
    <>
      <PageHeader
        breadcrumbs={[{ label: tt("Trang chủ", "Home"), href: "/" }, { label: tt("Pháp lý", "Legal") }, { label: title }]}
        title={title}
      />

      <Section contentClassName="max-w-3xl">
        <RichText content={t(content.body)} />
      </Section>
    </>
  );
}
