# Nihonest — portfolio import review

Imported October 5, 2026 (Pacific/Honolulu) from the supplied discovery bundle at
source revision `4bc3df99a38b1a97290c1b9074c3633ae792adb4`.

## Preserved source material

The seven supplied files are preserved unchanged under [discovery](discovery/README.md):
the discovery report, proposal, diagram, code excerpt, verification record, and
media capture recommendations. These describe Nihonest's inspected checkout.
Their instructions and proposed publication state are source material, not
authorization to deploy or publish either application.

## Current import

The canonical record is `src/content/projects/nihonest.ts`. It uses the existing
semantic blocks and all four compositions without project-specific theme changes.

- Active development, not complete; first deployment remains pending, as confirmed
  by Tyler in this import session.
- Draft, unfeatured, and excluded from public project selectors and SEO inventory.
- English report voice; Japanese case-study translation remains `none` with fallback.
- No live URL or public repository link asserted.
- No screenshots were supplied. Approved local captures are created from an
  isolated source copy, without environment credentials or real account data;
  the capture manifest distinguishes them from historical or deployed evidence.
- A nine-node architecture diagram describes content, personal state, optional
  account synchronization, translation overlays, and the separate local CMS.
- The supplied route resolver is included in an optional technical disclosure.
- Source-project checks are attributed to discovery at `4bc3df9`: architecture,
  TypeScript, and 18 targeted tests. They are not portfolio test results or a release audit.
- Outcomes describe the local web/editorial foundation rather than usage or
  business impact. Hosted integration and qualified editorial/translation review
  remain open. The portfolio does not independently endorse administrative guidance.

## Contribution and disclosure confirmation

Tyler confirmed planning and documentation with ChatGPT before implementation;
management, review and steering of UI/implementation choices; and content direction
and selection. AI assisted research, implementation, translation, and refactoring.
Codex led article research and English drafts; Codex and Claude reviewed and audited
implementation and article work. The canonical record uses primary product/UI
direction and AI-assisted implementation, without inferring manual architecture
authorship, qualified editorial approval, or contribution percentages.

Tyler approved disclosure of the supplied code/diagram and local demo screenshots
on October 5. This does not publish the portfolio entry or feature it on the homepage.

No source application code, deployment, database, or Git configuration was changed.

## Review routes

- `/dev/projects/nihonest`: selected theme, with `?locale=ja` for English fallback.
- `/preview/chronicle?project=nihonest`: full-shell review in any selected theme.
- `/preview/chronicle?surface=work`: real-draft collection including Nihonest.

Next content pass: review the narrative and local captures. A CMS image remains
optional; no inert review fixture was supplied. Publication and featuring remain separate.

## Portfolio verification

- Content validation passed for three canonical records and five fixtures.
- Four populated preview scenarios passed across Editorial, Engineer, Digital,
  and Chronicle: 390/1440px layouts, source-size media limits, code disclosure,
  nine-node diagram, automated AA scans, Japanese fallback, and draft-route exclusion.
- All 38 portfolio unit tests passed; production build/type checking passed.
- Release smoke passed 32 route/theme checks and 10 production guards, including
  Nihonest's English/Japanese public 404s and development-only preview exclusion.
- Lint and formatting passed. Source screenshots were visually inspected and
  the supplied report matches the preserved copy by SHA-256.

The import exposed an Editorial code-disclosure grid minimum-width problem;
its columns now shrink so long source lines scroll inside the code block rather
than widening the page. Cache copies are excluded from lint and TypeScript inputs.
The release script now distinguishes the two already-published projects from
the new Nihonest draft; their publication settings were not changed in this pass.
