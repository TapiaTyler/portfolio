"use client";

import Image from "next/image";
import { useState } from "react";
import type { Locale } from "@/lib/i18n/locales";

interface MediaAssetProps {
  type: "image" | "video";
  src: string;
  poster?: string;
  alt: string;
  lang: Locale;
  width: number;
  height: number;
  focalPoint?: { x: number; y: number };
  loading?: "lazy" | "eager";
}

export function MediaAsset({
  type,
  src,
  poster,
  alt,
  lang,
  width,
  height,
  focalPoint,
  loading = "lazy",
}: MediaAssetProps) {
  const [failed, setFailed] = useState(false);
  if (failed)
    return (
      <div className="media-unavailable">
        <p lang="en">Media is unavailable.</p>
        <p lang={lang}>{alt}</p>
      </div>
    );

  if (type === "video")
    return (
      <video
        controls
        muted
        playsInline
        preload="none"
        poster={poster}
        width={width}
        height={height}
        aria-label={alt}
        lang={lang}
        onError={() => setFailed(true)}
      >
        <source src={src} />
        <a href={src} lang="en">
          Open the Video
        </a>
      </video>
    );

  return (
    <Image
      src={src}
      alt={alt}
      lang={lang}
      width={width}
      height={height}
      sizes="(max-width: 768px) 100vw, 1200px"
      loading={loading}
      // Remote host approval and optimization policy come with real asset integration.
      unoptimized={/^https:\/\//i.test(src) || src.startsWith("/dev/")}
      // Theme composition can fill available space, but must not upscale source pixels.
      style={{
        maxWidth: `min(100%, ${width}px)`,
        ...(focalPoint && {
          objectPosition: `${focalPoint.x * 100}% ${focalPoint.y * 100}%`,
        }),
      }}
      onError={() => setFailed(true)}
    />
  );
}
