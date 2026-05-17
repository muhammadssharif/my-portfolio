import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Muhammad Sharif portfolio";
export const size = {
  width: 1200,
  height: 630
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(140deg, #0f172a 0%, #08080A 65%)",
          width: "100%",
          height: "100%",
          color: "#F4F4F5",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "72px"
        }}
      >
        <div style={{ color: "#3B82F6", fontSize: 28, letterSpacing: 3 }}>MUHAMMAD SHARIF</div>
        <h1 style={{ margin: "18px 0 0", fontSize: 72, lineHeight: 1.02 }}>Full Stack Developer</h1>
        <p style={{ margin: "20px 0 0", fontSize: 34, color: "#A1A1AA" }}>
          Frontend Architecture · Enterprise SaaS · Payments
        </p>
      </div>
    ),
    size
  );
}
