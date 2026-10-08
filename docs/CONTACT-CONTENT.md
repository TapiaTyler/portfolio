# Contact content and documents

Updated 2026-10-08.

The Contact page uses shared semantic resources in all five compositions.
Homepage Contact sections now reuse the same email, copy control, GitHub and LinkedIn
resources, following Product's contact content while retaining each mode's layout.
Chronicle keeps Contact in its selectable tab panel with a persistent contact-page
action; its email link is exempt from the panel's rule hiding redundant text links.
Digital and Chronicle homepage methods use an inline row without method descriptions
or separators, wrapping when the phone/panel width requires it. Digital's enlarged
Get in Touch action follows the method links in both visual and keyboard order.
The approved primary method is `tapiatylert@gmail.com`, with a native email link and
progressively enhanced copy icon beside the address. Its “Copy” tooltip appears on
hover and keyboard focus; clipboard results are announced below the address.
GitHub then LinkedIn appear as linked headings, without duplicate action labels,
and reuse the verified
destinations in `src/content/identity.ts`. External web links open in a separate tab
with `noopener noreferrer`; email and local document links remain native.
There is no message-submission backend.
Copy failures direct visitors to select the visible address; email works without JavaScript.

## Adding résumé and CV files

`src/content/contact.ts` reserves three separate entries:

| Entry           | Language | Suggested public files            |
| --------------- | -------- | --------------------------------- |
| English Résumé  | English  | `resume-en.pdf`, `resume-en.docx` |
| Japanese Résumé | Japanese | `resume-ja.pdf`, `resume-ja.docx` |
| Japanese CV     | Japanese | `cv-ja.pdf`, `cv-ja.docx`         |

Put reviewed public files in `public/documents/contact/`, then fill the matching
entry's `files.pdf` and `files.word` with paths such as
`/documents/contact/resume-en.pdf`. File names are a convention, not an enforced format.
Only present files receive native download links, with the document's `hreflang`.
Missing files have no disabled or fabricated download links. Entries with neither
format show “Files will be added soon.” A single available format can ship independently.

Before adding files, review personal details and document metadata for public release,
verify both downloads, and confirm the language/title describes the actual document.
The Japanese résumé and CV are distinct entries; their eventual wording should match
the supplied documents. No Japanese document titles have been drafted in this pass.

## Copy and checks

Contact descriptions and page sections have optional Japanese slots. Common controls
and pending-file text use `src/content/interface.ts`; see `07-LOCALIZATION.md`.
Contact unit tests cover all mode/locale combinations, partial translations, reserved
entries and available-file downloads. Production browser checks cover desktop/mobile,
keyboard copying and failure feedback, English fallback, no JavaScript and automated
accessibility checks. These checks do not substitute for review of the future files.
