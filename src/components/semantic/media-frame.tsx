import type { ProjectMedia } from "@/lib/content/schema";
import type { Locale } from "@/lib/i18n/locales";
import { resolveText, type LocalizedValue } from "@/lib/i18n/project-content";
import { MediaAsset } from "./media-asset";

export type AssetUrl = (source: string) => string;

export function MediaFrame({
  media,
  locale,
  caption,
  assetUrl = (source) => source,
  loading = "lazy",
}: {
  media: ProjectMedia;
  locale: Locale;
  caption?: LocalizedValue<string>;
  assetUrl?: AssetUrl;
  loading?: "lazy" | "eager";
}) {
  const alt = resolveText(media.alt, locale);
  const selectedCaption =
    caption ?? (media.caption ? resolveText(media.caption, locale) : undefined);
  const src = assetUrl(media.src);
  return (
    <figure
      className="media-frame"
      data-media-id={media.id}
      data-media-aspect={
        media.width / media.height >= 1.8
          ? "wide"
          : media.width / media.height <= 0.8
            ? "portrait"
            : "standard"
      }
    >
      <MediaAsset
        key={src}
        type={media.type}
        src={src}
        alt={alt.value}
        lang={alt.lang}
        width={media.width}
        height={media.height}
        focalPoint={media.focalPoint}
        poster={media.type === "video" ? assetUrl(media.poster) : undefined}
        loading={loading}
      />
      {selectedCaption && (
        <figcaption lang={selectedCaption.lang}>
          {selectedCaption.value}
        </figcaption>
      )}
    </figure>
  );
}
