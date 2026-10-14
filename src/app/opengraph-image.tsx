import { ImageResponse } from "next/og";

export const alt = "Matheus Santos — Desenvolvedor Full Stack";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: 80,
        background: "#0f1117",
        color: "white",
      }}
    >
      <div style={{ fontSize: 88, fontWeight: 700 }}>Matheus Santos</div>
      <div style={{ fontSize: 40, color: "#00b4f0", marginTop: 16 }}>
        Desenvolvedor Full Stack
      </div>
    </div>,
    size,
  );
}
