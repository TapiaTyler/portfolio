import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { mkdir } from "node:fs/promises";

for (const mode of ["editorial", "engineer", "digital", "chronicle"]) {
  test(`${mode} Contact supports email, pending documents and both locale routes`, async ({
    page,
    context,
    baseURL,
  }) => {
    await context.addCookies([
      { name: "portfolio-mode", value: mode, url: baseURL! },
    ]);
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    for (const locale of ["en", "ja"]) {
      for (const viewport of [
        { width: 1440, height: 900 },
        { width: 390, height: 844 },
      ]) {
        await page.setViewportSize(viewport);
        await page.goto(`/${locale}/contact`);
        await page.evaluate(() => document.fonts.ready);
        await page.waitForFunction(
          () =>
            document
              .getAnimations()
              .filter(
                (animation) =>
                  animation.playState === "running" &&
                  animation.effect?.getComputedTiming().iterations !== Infinity,
              ).length === 0,
        );
        await expect(
          page.getByRole("heading", { name: "Contact", exact: true }),
        ).toBeVisible();
        await expect(
          page.getByRole("link", { name: "tapiatylert@gmail.com" }),
        ).toHaveAttribute("href", "mailto:tapiatylert@gmail.com");
        await expect(
          page.locator('[data-contact-method="email"]'),
        ).toBeVisible();
        await expect(page.locator(".contact-methods h3 a")).toHaveText([
          "GitHub",
          "LinkedIn",
        ]);
        await expect(page.locator(".contact-methods a")).toHaveCount(3);
        for (const link of await page.locator('a[href^="https://"]').all()) {
          await expect(link).toHaveAttribute("target", "_blank");
          await expect(link).toHaveAttribute("rel", "noopener noreferrer");
        }
        await expect(
          page.getByRole("link", { name: "tapiatylert@gmail.com" }),
        ).not.toHaveAttribute("target", "_blank");
        const copy = page.getByRole("button", { name: "Copy email address" });
        await expect(copy.locator("svg")).toBeVisible();
        await expect(copy).toHaveText("");
        const address = await page
          .getByRole("link", { name: "tapiatylert@gmail.com" })
          .boundingBox();
        const icon = await copy.boundingBox();
        expect(icon!.x).toBeGreaterThanOrEqual(address!.x + address!.width - 1);
        expect(
          Math.abs(
            icon!.y + icon!.height / 2 - address!.y - address!.height / 2,
          ),
        ).toBeLessThan(2);
        await copy.focus();
        await expect(page.getByRole("tooltip")).toBeVisible();
        await expect(page.getByRole("tooltip")).toHaveText("Copy");
        await copy.evaluate((button: HTMLButtonElement) => button.blur());
        await expect(page.getByRole("tooltip")).toBeHidden();
        expect(
          await page.evaluate(
            () => document.documentElement.scrollWidth <= window.innerWidth + 1,
          ),
        ).toBe(true);
        if (locale === "ja") {
          await expect(page.locator(".translation-notice")).toContainText(
            "where Japanese translations are unavailable",
          );
          await expect(page.locator("h1 span")).toHaveAttribute("lang", "en");
        }
        if (locale === "en") {
          // Capture the settled composition rather than an entrance-animation frame.
          await page.waitForFunction(
            () =>
              document.getAnimations().filter((animation) => {
                const timing = animation.effect?.getComputedTiming();
                return (
                  animation.playState === "running" &&
                  timing?.iterations !== Infinity
                );
              }).length === 0,
          );
          await mkdir(".cache/contact-review", { recursive: true });
          await page.screenshot({
            path: `.cache/contact-review/${mode}-${viewport.width}.png`,
            fullPage: true,
          });
        }
        const result = await new AxeBuilder({ page })
          .include("main")
          .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
          .analyze();
        expect(result.violations).toEqual([]);
        if (mode === "chronicle") {
          const documents = page.getByRole("tab", { name: "Résumés & CV" });
          await documents.focus();
          await page.keyboard.press("Enter");
          await expect(documents).toHaveAttribute("aria-selected", "true");
        }
        await expect(page.locator("[data-contact-document]")).toHaveCount(3);
        await expect(
          page.locator('[data-contact-document="cv-ja"]'),
        ).toBeVisible();
        await expect(page.locator("[data-contact-document] a")).toHaveCount(0);
      }
    }
    expect(errors).toEqual([]);
  });
}

test("email copy announces success and a manual fallback", async ({ page }) => {
  await page.goto("/en/contact");
  await page.evaluate(() =>
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: {
        writeText: async (value: string) => {
          document.documentElement.dataset.copiedEmail = value;
        },
      },
    }),
  );
  const button = page.getByRole("button", { name: "Copy email address" });
  await button.focus();
  await page.keyboard.press("Enter");
  await expect(page.locator(".contact-copy [role=status]")).toHaveText(
    "Email address copied.",
  );
  await expect(page.locator("html")).toHaveAttribute(
    "data-copied-email",
    "tapiatylert@gmail.com",
  );
  await page.evaluate(() =>
    Object.defineProperty(navigator, "clipboard", { value: undefined }),
  );
  await button.click();
  await expect(page.locator(".contact-copy [role=status]")).toHaveText(
    "Copy unavailable. Select the email address to copy it.",
  );
});

test("native Contact retains working links and all document states", async ({
  browser,
  baseURL,
}) => {
  for (const mode of ["editorial", "engineer", "digital", "chronicle"]) {
    const context = await browser.newContext({
      javaScriptEnabled: false,
      viewport: { width: 390, height: 844 },
      reducedMotion: "reduce",
    });
    try {
      await context.addCookies([
        { name: "portfolio-mode", value: mode, url: baseURL! },
      ]);
      const page = await context.newPage();
      await page.goto("/ja/contact");
      await expect(
        page.getByRole("link", { name: "tapiatylert@gmail.com" }),
      ).toBeVisible();
      await expect(
        page.getByRole("button", { name: "Copy email address" }),
      ).toBeHidden();
      await expect(page.locator("[data-contact-document]")).toHaveCount(3);
      await expect(
        page.locator('[data-contact-document="cv-ja"]'),
      ).toBeVisible();
    } finally {
      await context.close();
    }
  }
});
