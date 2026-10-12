import { readFile } from "node:fs/promises";
import path from "node:path";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ asset: string }> },
) {
  if (process.env.NODE_ENV !== "development")
    return new Response("Not found", { status: 404 });
  const { asset } = await params;
  // This allowlist exposes only the known synthetic fixture, never arbitrary source paths.
  if (!["reference.svg", "wide.svg", "portrait.svg"].includes(asset))
    return new Response("Not found", { status: 404 });
  const file = path.join(
    process.cwd(),
    "src/content/fixtures/assets/media/fixtures",
    asset,
  );
  try {
    const data = await readFile(file);
    return new Response(new Uint8Array(data), {
      headers: {
        "Content-Type": "image/svg+xml",
        "Cache-Control": "no-store",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}
