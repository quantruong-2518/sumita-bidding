import { L, type ServiceItem } from "@/lib/schema";

/* P-07 Dịch vụ & hỗ trợ đầu tư (brief §5.4). */
export const SERVICES: ServiceItem[] = [
  { id: "phap-ly", icon: "Scale", title: L("Tư vấn pháp lý đầu tư", "Investment legal advisory"), desc: L("Hỗ trợ thủ tục cấp phép, đăng ký đầu tư, môi trường, PCCC.", "") },
  { id: "xay-dung", icon: "HardHat", title: L("Thiết kế & xây nhà xưởng theo yêu cầu", "Build-to-suit factory"), desc: L("Thiết kế và thi công nhà xưởng theo nhu cầu sản xuất của nhà đầu tư.", "") },
  { id: "vay-von", icon: "Banknote", title: L("Hỗ trợ vay vốn", "Financing support"), desc: L("Kết nối ngân hàng đối tác, tư vấn phương án tài chính.", "") },
  { id: "tuyen-dung", icon: "Users", title: L("Hỗ trợ tuyển dụng lao động", "Recruitment support"), desc: L("Kết nối nguồn lao động địa phương và trường nghề.", "") },
  { id: "van-hanh", icon: "Settings", title: L("Vận hành & bảo trì", "Operations & maintenance"), desc: L("Dịch vụ vận hành hạ tầng, cảnh quan, an ninh nội khu.", "") },
  { id: "xlnt", icon: "Recycle", title: L("Vận hành trạm xử lý nước thải", "WWTP operation"), desc: L("Vận hành trạm XLNT đạt quy chuẩn cho doanh nghiệp thuê.", "") },
];
