# Content and publication review

Updated 2026-10-08 against the current typed records and implementation. Historical
import reports retain the state at their capture date; this file tracks current work.

## Current source inventory

| Area                 | Source                                                       | Current state                                                                                         | Remaining work                                                        |
| -------------------- | ------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| Identity             | src/content/identity.ts                                      | Confirmed English/Japanese name; GitHub and LinkedIn profiles in header/footer                        | Maintain verified profile destinations                                |
| Home                 | src/content/placeholder.ts                                   | Opening is provisional; About summary and career direction populated                                  | Final opening statement and practice wording                          |
| About                | src/content/pages.ts                                         | Background, working approach, focus, skills/languages, education and current direction                | Further editorial review as needed                                    |
| Contact              | src/content/contact.ts and src/content/pages.ts              | Approved email, LinkedIn and GitHub; three document entries with PDF/Word slots                       | Supply reviewed English résumé, Japanese résumé and Japanese CV files |
| Work                 | Filtered project registry                                    | Nihonest, Portfolio and Japan Travel Planner published and featured, in that order                    | Maintain narrative and evidence                                       |
| Lab                  | src/content/pages.ts                                         | Intentional empty catalogue                                                                           | Reviewed studies if available; may remain empty                       |
| Portfolio            | src/content/projects/portfolio.ts                            | Published English case study with four-mode comparison and motion/iteration evidence                  | Screenshot currency after recent theme changes                        |
| Japan Travel Planner | src/content/projects/japan-travel-planner.ts                 | Complete application; published case study; Railway live link                                         | Optional further evidence                                             |
| Nihonest             | src/content/projects/nihonest.ts                             | Active; published case study; Vercel live link and private-source declaration                         | Keep development status and evidence current                          |
| Japanese             | Page sources, interface dictionary and project locale fields | Page/UI Japanese slots, validation and per-field English fallback implemented; no new Japanese drafts | Review and translate selected content                                 |
| Portfolio release    | docs/RELEASE-RUNBOOK.md                                      | Vercel prepared; deployment deferred; origin not selected                                             | Public origin, hosted preview and populated release checks            |

## Published case-study standard

All three records follow [CASE-STUDY-CONTRACT.md](CASE-STUDY-CONTRACT.md) (D040):
problem, what was built, key decisions, architecture, optional challenge, one grouped
Engineering details disclosure and result. Section/media limits and the visible-word
ceiling keep the main account scannable. Discovery remains exhaustive; its findings
are edited into primary, supporting, evidence-only and do-not-publish material.

Keep neutral report voice, factual results and explicit contribution ownership.
Do not turn local checks into claims of full accessibility conformance, deployed
performance gains or business outcomes. Preserve labels for synthetic fixtures,
reconstructions and authentic historical screenshots.

## Portfolio evidence review criteria

The title is **One Portfolio, Several Ways of Reading It**. Its focus remains shared
meaning, different compositions, continuity and iterative design judgment.

1. Do the four-mode screenshots show comparable content and current compositions?
2. Does morphing evidence demonstrate continuity without implying a benchmark?
3. Do Chronicle comparisons distinguish the authentic first build from later states?
4. Are supporting screenshots readable at their rendered size and in the gallery?
5. Do captions describe what is shown, with provenance in the manifest?
6. Does the account distinguish implementation from pending deployment and translations?

## Publication state

Portfolio, Japan Travel Planner and Nihonest are published and featured.
An active application may have a published case study. Publishing a record does
not mean the application is complete or the portfolio is deployed. Publication and
homepage featuring remain separate decisions for future imports.

## Next content decisions

- Final homepage opening and practice descriptions.
- Reviewed résumé/CV files for the reserved Contact entries (see CONTACT-CONTENT.md).
- Currency and readability of Portfolio screenshots and recordings.
- Selected Japanese translations.
- Permanent portfolio origin and populated hosted release verification.
