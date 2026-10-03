import { ImageResponse } from "next/og";
import { identity } from "@/content/identity";

export const dynamic = "force-static";

export function GET() {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        padding: 80,
        background: "#f9f8f6",
        color: "#191919",
      }}
    >
      <div
        style={{
          display: "flex",
          fontSize: 24,
          letterSpacing: 6,
          marginBottom: 40,
        }}
      >
        PORTFOLIO
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 80,
          fontWeight: 700,
          lineHeight: 1.1,
          maxWidth: 1000,
        }}
      >
        {identity.name}
      </div>
    </div>,
    { width: 1200, height: 630 },
  );
}
