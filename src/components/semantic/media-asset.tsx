"use client";
import { externalLinkAttributes } from "@/lib/external-links";
import { UiText } from "@/components/ui-text";

import Image, { getImageProps } from "next/image";
import { useEffect, useRef, useState } from "react";
import { type Locale } from "@/lib/i18n/locales";

interface MediaAssetProps {
  type: "image" | "video";
  src: string;
  poster?: string;
  alt: string;
  lang: Locale;
  locale?: Locale;
  width: number;
  height: number;
  focalPoint?: { x: number; y: number };
  loading?: "lazy" | "eager";
  sizes?: string;
  fetchPriority?: "high" | "low" | "auto";
}

export function MediaAsset({
  type,
  src,
  poster,
  alt,
  lang,
  locale = lang,
  width,
  height,
  focalPoint,
  loading = "lazy",
  sizes = "(max-width: 768px) 100vw, 1200px",
  fetchPriority,
}: MediaAssetProps) {
  const [failed, setFailed] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [posterReady, setPosterReady] = useState(false);
  const localRasterPoster = Boolean(
    poster && /^\/media\/.*\.(png|jpe?g|webp|avif)$/i.test(poster),
  );
  const deferPoster =
    type === "video" && loading === "lazy" && localRasterPoster;

  useEffect(() => {
    if (!deferPoster || failed || !videoRef.current) return;
    // Native preload="none" defers playback, but browsers still fetch posters
    // for every offscreen video. Observe the video through nested reading panels.
    if (typeof IntersectionObserver !== "function") {
      const frame = requestAnimationFrame(() => setPosterReady(true));
      return () => cancelAnimationFrame(frame);
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setPosterReady(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px 0px" },
    );
    observer.observe(videoRef.current);
    return () => observer.disconnect();
  }, [deferPoster, failed]);
  if (failed)
    return (
      <div className="media-unavailable">
        <p lang="en">
          <UiText locale={locale} id="Media is unavailable." />
        </p>
        <p lang={lang}>{alt}</p>
      </div>
    );

  if (type === "video")
    return (
      <video
        ref={videoRef}
        controls
        muted
        playsInline
        preload="none"
        poster={
          deferPoster && !posterReady
            ? undefined
            : poster && localRasterPoster
              ? getImageProps({ src: poster, alt: "", width, height }).props.src
              : poster
        }
        width={width}
        height={height}
        aria-label={alt}
        lang={lang}
        onError={() => setFailed(true)}
      >
        <source src={src} />
        <a href={src} {...externalLinkAttributes(src)} lang="en">
          <UiText locale={locale} id="Open the Video" />
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
      sizes={sizes}
      fetchPriority={fetchPriority}
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
