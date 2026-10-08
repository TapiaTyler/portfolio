import { type ContactMethod, type ContactDocument } from "@/content/contact";
import { type Locale } from "@/lib/i18n/locales";
import { Text } from "../localized-text";
import { UiText } from "../ui-text";
import { CopyEmail } from "../contact-email";
import { externalLinkAttributes } from "@/lib/external-links";

export function ContactMethods({
  methods,
  locale,
}: {
  methods: readonly ContactMethod[];
  locale: Locale;
}) {
  return (
    <ul className="contact-methods">
      {methods.map((method) => (
        <li key={method.id} data-contact-method={method.id}>
          <h3>
            {method.address ? (
              <Text value={method.title} locale={locale} />
            ) : (
              <a
                className="contact-method__profile"
                href={method.href}
                {...externalLinkAttributes(method.href)}
              >
                <Text value={method.title} locale={locale} />
              </a>
            )}
          </h3>
          <p>
            <Text value={method.description} locale={locale} />
          </p>
          {method.address && (
            <CopyEmail address={method.address} locale={locale} />
          )}
        </li>
      ))}
    </ul>
  );
}

export function ContactDocuments({
  documents,
  locale,
}: {
  documents: readonly ContactDocument[];
  locale: Locale;
}) {
  return (
    <ul className="contact-documents">
      {documents.map((document) => (
        <li key={document.id} data-contact-document={document.id}>
          <h3>
            <Text value={document.title} locale={locale} />
          </h3>
          <div className="contact-document__files">
            {(["pdf", "word"] as const).map(
              (format) =>
                document.files[format] && (
                  <a
                    className="text-link"
                    key={format}
                    href={document.files[format]}
                    hrefLang={document.language}
                    download
                  >
                    <UiText
                      locale={locale}
                      id={format === "pdf" ? "PDF" : "Word"}
                    />
                  </a>
                ),
            )}
            {!document.files.pdf && !document.files.word && (
              <p>
                <UiText locale={locale} id="Files will be added soon." />
              </p>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
