import Link from "next/link";
import { type ComponentProps } from "react";
import { Hero } from "@/components/semantic/hero";
import { Text } from "@/components/localized-text";
import { UiText } from "@/components/ui-text";

export function ProductHero({ content, locale }: ComponentProps<typeof Hero>) {
  return (
    <section className="product-hero" lang="en" data-motion-id="hero-narrative">
      <div className="product-hero__copy">
        <p className="eyebrow">
          <Text value={content.label} locale={locale} />
        </p>
        <h1>
          <Text value={content.title} locale={locale} />
          {content.emphasis && (
            <>
              <br />
              <Text value={content.emphasis} locale={locale} />
            </>
          )}
        </h1>
        <p className="product-hero__description">
          <Text value={content.description} locale={locale} />
        </p>
        <div className="product-actions">
          <Link
            className="product-action"
            href={`/${locale}${content.link.destination}`}
          >
            <Text value={content.link.label} locale={locale} />
          </Link>
          <Link
            className="product-action product-action--secondary"
            href={`/${locale}/about`}
          >
            <UiText locale={locale} id="About" />
          </Link>
        </div>
      </div>
      <picture className="product-hero__landscape">
        <source
          type="image/avif"
          srcSet="/media/themes/product/misty-valley-960.avif 960w, /media/themes/product/misty-valley-1600.avif 1600w, /media/themes/product/misty-valley-2172.avif 2172w"
          sizes="(max-width: 900px) 100vw, 1320px"
        />
        <source
          type="image/webp"
          srcSet="/media/themes/product/misty-valley-960.webp 960w, /media/themes/product/misty-valley-1600.webp 1600w, /media/themes/product/misty-valley-2172.webp 2172w"
          sizes="(max-width: 900px) 100vw, 1320px"
        />
        <img
          src="/media/themes/product/misty-valley-1600.jpg"
          width="2172"
          height="724"
          alt=""
          decoding="async"
        />
      </picture>
    </section>
  );
}
