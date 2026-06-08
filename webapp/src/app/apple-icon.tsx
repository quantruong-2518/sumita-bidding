import { ImageResponse } from "next/og";

/* Apple touch icon 180x180 (iOS thêm bo góc). Navy nền, chữ S trắng + chấm cam (đồng bộ wordmark "Sumita."). */
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          background: "#16223A",
          color: "#ffffff",
          fontSize: 116,
          fontWeight: 800,
          fontFamily: "sans-serif",
        }}
      >
        S
        <div
          style={{
            position: "absolute",
            right: 40,
            bottom: 48,
            width: 20,
            height: 20,
            borderRadius: 10,
            background: "#F6861F",
            display: "flex",
          }}
        />
      </div>
    ),
    { ...size },
  );
}
