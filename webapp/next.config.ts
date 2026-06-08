import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /*
   * Ảnh demo lưu LOCAL ở public/images (next/image tối ưu được ngay, không cần remotePatterns,
   * không phụ thuộc mạng lúc demo). DECISIONS #4: production = ảnh khách.
   *
   * Nếu sau này khách dùng ảnh từ CDN (vd Unsplash hotlink hoặc CDN riêng), mở `images.remotePatterns`:
   *   images: { remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }] },
   * rồi đổi giá trị trong src/lib/images.ts (hoặc fixtures) sang URL tuyệt đối.
   */
};

export default nextConfig;
