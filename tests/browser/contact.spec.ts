import { expect, test } from "@playwright/test";

for (const mode of [
  "editorial",
  "engineer",
  "digital",
  "chronicle",
  "product",
]) {
  test(`${mode} Contact supports email, document downloads and both locale routes`, async ({
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
        await page.goto(`/${locale}/contact`, {
          waitUntil: "domcontentloaded",
        });
        await expect(
          page.getByRole("heading", {
            name: locale === "ja" ? "お問い合わせ" : "Contact",
            exact: true,
          }),
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
        if (locale === "ja") {
          // Every published case study is translated, so no site-wide notice.
          await expect(page.locator(".translation-notice")).toHaveCount(0);
          await expect(page.locator("h1 span")).toHaveAttribute("lang", "ja");
        }
        if (mode === "chronicle") {
          const documents = page.getByRole("tab", {
            name: locale === "ja" ? "履歴書・職務経歴書" : "Résumés & CV",
          });
          await documents.focus();
          await page.keyboard.press("Enter");
          await expect(documents).toHaveAttribute("aria-selected", "true");
        }
        await expect(page.locator("[data-contact-document]")).toHaveCount(3);
        await expect(
          page.locator('[data-contact-document="cv-ja"]'),
        ).toBeVisible();
        const downloads = page.locator("[data-contact-document] a");
        await expect(downloads).toHaveCount(3);
        for (const link of await downloads.all()) {
          await expect(link).toHaveAttribute("download", "");
          await expect(link).toHaveAttribute(
            "href",
            /\/documents\/contact\/.+\.(pdf|docx)$/,
          );
        }
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
  for (const mode of [
    "editorial",
    "engineer",
    "digital",
    "chronicle",
    "product",
  ]) {
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
