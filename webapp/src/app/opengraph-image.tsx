import { ImageResponse } from "next/og";

/* Ảnh OG thương hiệu (1200x630) sinh động qua next/og — navy + nhấn cam, không cần asset nhị phân.
   Next gắn ảnh này làm OG/Twitter mặc định cho mọi route. Dùng chữ Latin để render chuẩn (không cần nạp font). */
export const alt = "Sumita — Industrial cluster investment platform";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          padding: 80,
          background: "linear-gradient(135deg, #16223a 0%, #1f2f50 55%, #16223a 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", fontSize: 64, fontWeight: 800, letterSpacing: -2 }}>
          SUMITA
          <span style={{ color: "#f6861f" }}>.</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ display: "flex", fontSize: 58, fontWeight: 700, lineHeight: 1.1, maxWidth: 940 }}>
            Industrial land & ready-built factories for lease
          </div>
          <div style={{ display: "flex", fontSize: 30, color: "rgba(255,255,255,0.78)" }}>
            Industrial cluster investment platform for domestic & FDI investors
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 26, color: "rgba(255,255,255,0.6)" }}>
          <div style={{ display: "flex", width: 48, height: 4, background: "#f6861f" }} />
          sumita.vn
        </div>
      </div>
    ),
    { ...size },
  );
}
