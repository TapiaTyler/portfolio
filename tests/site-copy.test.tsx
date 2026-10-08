import assert from "node:assert/strict";
import test from "node:test";
import { renderToStaticMarkup } from "react-dom/server";
import { Text } from "../src/components/localized-text";
import { interfaceMessages } from "../src/content/interface";
import { homepageContent, placeholderPages } from "../src/content/placeholder";
import { pageContent } from "../src/content/pages";
import { contactDocuments, contactMethods } from "../src/content/contact";
import { validateCopyTree } from "../src/lib/i18n/validate-copy";
import { selectCopy } from "../src/lib/i18n/copy";
import { message } from "../src/lib/i18n/messages";
import { resolveComposition } from "../src/registries/compositions";
import { themeIds } from "../src/lib/theme/ids";
import type { LocalizedText } from "../src/lib/i18n/copy";
import { UiText } from "../src/components/ui-text";
import { ContactDocuments } from "../src/components/semantic/contact-resources";

test("interface translations can be filled independently without changing English fallback", () => {
  const entry: LocalizedText = interfaceMessages["View Source"];
  const previous = entry.ja;
  try {
    entry.ja = "ソースを見る";
    assert.match(
      renderToStaticMarkup(<UiText locale="ja" id="View Source" />),
      /lang="ja">ソースを見る/,
    );
    assert.match(
      renderToStaticMarkup(<UiText locale="ja" id="Source private" />),
      /lang="en">Source private/,
    );
    assert.equal(message("en", "View Source"), "View Source");
  } finally {
    if (previous === undefined) delete entry.ja;
    else entry.ja = previous;
  }
});

test("available documents expose native downloads with the document's language", () => {
  const html = renderToStaticMarkup(
    <ContactDocuments
      locale="en"
      documents={[
        {
          ...contactDocuments[1],
          files: {
            pdf: "/documents/contact/resume-ja.pdf",
            word: "/documents/contact/resume-ja.docx",
          },
        },
      ]}
    />,
  );
  assert.equal((html.match(/download=""/g) ?? []).length, 2);
  assert.equal((html.match(/hrefLang="ja"/g) ?? []).length, 2);
  assert.doesNotMatch(html, /Files will be added soon/);
});

test("site copy validates independent Japanese slots and interpolation fields", () => {
  validateCopyTree({
    homepageContent,
    placeholderPages,
    pageContent,
    interfaceMessages,
  });
  validateCopyTree({ title: { en: "Contact", ja: "連絡先" } });
  assert.throws(() => validateCopyTree({ title: { en: "Contact", ja: " " } }));
  assert.throws(() => validateCopyTree({ title: { ja: "連絡先" } }));
  assert.throws(() => validateCopyTree({ en: "Select {title}", ja: "選択" }));
  assert.equal(
    message("ja", "Select {title}", { title: "<project>" }),
    "Select <project>",
  );
  assert.throws(() => message("en", "Select {title}"));
});

test("partial page translations mark each field with its actual language", () => {
  const title = { en: "Contact", ja: "連絡先" };
  assert.deepEqual(selectCopy(title, "ja"), {
    value: "連絡先",
    lang: "ja",
    isFallback: false,
  });
  assert.deepEqual(selectCopy({ en: "Email" }, "ja"), {
    value: "Email",
    lang: "en",
    isFallback: true,
  });
  for (const theme of themeIds) {
    const Renderer = resolveComposition(theme).SecondaryPage;
    const html = renderToStaticMarkup(
      <Renderer content={{ ...pageContent.contact, title }} locale="ja" />,
    );
    assert.match(html, /lang="ja">連絡先/);
    assert.match(html, /lang="en">Email/);
    assert.match(html, /mailto:tapiatylert@gmail.com/);
  }
  assert.match(
    renderToStaticMarkup(<Text value={{ en: "<script>" }} locale="ja" />),
    /&lt;script&gt;/,
  );
});

test("Contact has verified methods and no download links before documents exist", () => {
  assert.equal(contactMethods[0].href, "mailto:tapiatylert@gmail.com");
  assert.deepEqual(
    contactDocuments.map((document) => document.id),
    ["resume-en", "resume-ja", "cv-ja"],
  );
  for (const locale of ["en", "ja"] as const)
    for (const theme of themeIds) {
      const Renderer = resolveComposition(theme).SecondaryPage;
      const html = renderToStaticMarkup(
        <Renderer content={pageContent.contact} locale={locale} />,
      );
      assert.equal((html.match(/data-contact-document=/g) ?? []).length, 3);
      assert.match(html, /Files will be added soon/);
      assert.doesNotMatch(html, / download=""/);
      assert.doesNotMatch(html, /<form/);
    }
});
