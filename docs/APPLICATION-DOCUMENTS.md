# Public application documents

Reviewed and integrated on 2026-10-14 from the owner's application-document ZIP.

The Contact page offers three PDFs through the shared `contactDocuments` registry:

- English résumé: the supplied one-page A4 résumé, with the JLPT credential expanded to "Japanese-Language Proficiency Test (JLPT) N2 - Passed" on 2026-10-15.
- Japanese 履歴書: a two-page A4 public version, explicitly labeled 公開用. The photo placeholder, birth date, age and sex field are omitted. The address contains only city, state and country. Contact phone and email remain as supplied.
- Japanese 職務経歴書: a two-page A4 PDF with programming languages and spoken languages labeled separately.

Only reviewed public PDFs belong in `public/documents/contact/`. Do not store the source ZIP or the private 履歴書 in the repository. Word download slots remain supported by the component, but are unpopulated at the owner's request.

## Formatting verification

Both Japanese documents use MS 明朝 with minimum text size 10.5 pt. Fonts are embedded in the PDFs. Headings are black, table widths stay within the printable area, and each page was rendered and visually inspected. The English PDF also has embedded fonts.

The Japanese Word sources were corrected before export with Microsoft Word. The supplied 履歴書 Word version had overflowing history and qualifications tables despite its original PDF appearing correct. Updated editable sources and review renders are retained outside the repository; only public PDF exports are shipped.

The public 履歴書 is intended for portfolio distribution. Employer-specific applications may require a prescribed form, a photo, fuller personal details and a tailored motivation statement. No universal employer acceptance or factual credential verification is implied by the formatting review.

Formatting references:

- [Hello Work application-document guidance](https://www.hellowork.mhlw.go.jp/member/career_doc01.html)
- [Recruit Agent guidance on business fonts and 10.5–12 pt body text](https://www.r-agent.com/guide/resume/article4341/)
- [Hello Work sample using MS 明朝 at 10.5 pt](https://jsite.mhlw.go.jp/kanagawa-hellowork/content/contents/002482495.pdf)

## Updates

Replace PDFs at their existing descriptive URLs so links remain stable. Review every page and verify embedded fonts, links and the absence of omitted personal details before replacing the public version. Contact tests cover downloads and the pending state for missing files.
