# Japan Travel Planner — focused discovery follow-up

Completed: see [the supplied supplement](followup/FOLLOWUP.md) and
[current import review](IMPORT-REVIEW.md). Tyler confirmed `capstone-v1.0` as the
original project after the supplement. The prompt below records the request that
produced it; resolved ownership, media, status and capstone questions need not be
asked again.

Use this prompt in the Japan Travel Planner repository. It supplements the
existing discovery; it does not replace already confirmed facts or approve
portfolio publication.

## Prompt

Review the existing `docs/portfolio/DISCOVERY.md`, import proposal and source
evidence, then prepare a focused supplement for the portfolio import.

Tyler has now confirmed:

- The application is **complete**.
- The original school-project application was completed without AI. Later
  enhancements used AI assistance, with Tyler in charge of revisions, decisions
  and architecture. Do not apply the original manual-authorship claim to all later work.
- The four repository screenshots use fictional/demo data and are approved for
  portfolio use. The selected code excerpt is also approved.
- The website is deployed on Railway's free hosting, with no custom domain, at
  `https://japan-travel-planner-production.up.railway.app/`.
- Portfolio publication and homepage featuring have not been approved. Japanese
  portfolio translations remain out of scope.

Do not ask for those confirmations again. Treat these statements as user-supplied
provenance, distinguish them from repository or runtime verification, and focus on:

1. **School-version boundary.** Inspect available history for the original
   completed/submitted capstone revision and its date. A suggestive commit title
   alone is not proof of submission. Explain what can be established and ask Tyler
   only if the boundary cannot be recovered. Do not expose restricted course material.
2. **Optional historical evidence.** Look for authentic older screenshots or design
   artifacts. Only if a supported iteration benefits from visual comparison, try
   an isolated, bounded reconstruction using available tooling or capture-only
   overrides. Do not alter the current application, install an old stack just for
   this purpose, or invent an earlier design. Label any recreation visibly and in
   its manifest, record the method/differences, and capture comparable framing.
   Skip it when impractical; the portfolio can explain the origin in text.
3. **Deployment and quality verification.** Confirm public landing/library behavior
   where safely accessible. Distinguish anonymous checks from authentication,
   database and operations checks. If an appropriate Java 21 environment already
   exists, run the documented backend tests; otherwise report the missing environment.
   Inspect existing CI evidence if accessible without new credentials. Do not
   install runtimes, create accounts, change production data, run migrations or
   deploy solely for this report. Do not claim unrun checks passed.
4. **Security evidence for the case study.** Make this a useful showcase of the
   implemented controls. Inspect authentication/session creation and logout,
   password hashing, CSRF flow between client and server, account/resource ownership,
   public versus authenticated routes, input validation, login limiting and its
   client-IP handling, CORS/cookie configuration, secrets handling and error responses.
   For each meaningful control, supply the threat or failure it addresses, exact
   file/symbol evidence, how it works, relevant test evidence and known limitations.
   Distinguish configured defaults from verified deployment settings; do not expose
   secrets. Verify which negative cases existing tests actually cover: unauthenticated
   requests, cross-account access, missing/invalid CSRF, failed login limits and
   invalid input. Run appropriate existing tests only in a suitable local environment.
   Do not probe attacks, brute-force logins or alter accounts/data on the live site.
   Identify gaps honestly, including per-process limiting and any proxy-trust or
   route-coverage assumptions. Recommend one clear semantic security section and
   optionally a short shareable code excerpt or boundary diagram. Do not claim a
   completed security audit, penetration test or guaranteed security from controls
   merely being present. Tyler specifically wants this project to demonstrate the
   security work, with defensible evidence and tradeoffs.
5. **Useful missing media.** Consider one short silent demonstration of filtering
   and print options only if a local demo environment and synthetic data are already
   available. Provide a poster, description/caption and provenance if captured.
   A recommendation is enough when prerequisites are missing; no video is required.
6. **Rationale and reflection gaps.** Find source-backed reasons for a small number
   of important decisions or limitations. Ask Tyler for personal reflections only
   when repository evidence cannot supply them. Do not manufacture alternatives,
   user research, business outcomes or quantitative improvements.

The original bundled filter snippet ends mid-function. Supply a complete focused
excerpt of `filterItineraryItems`, with source revision/path and dependencies
explained, or a clearly marked coherent excerpt. The portfolio has already expanded
it from revision `385c122`; preserve source provenance if the function has changed.

Save `docs/portfolio/FOLLOWUP.md` with evidence paths, inspected revision/date,
actual commands and outcomes, newly resolved facts, remaining questions and optional
assets. Update metadata/manifest proposals to reflect the confirmations, retaining
the original discovery's verification conditions and limits. If useful, provide a
supplement ZIP containing only the supplement, updated proposals and approved
assets. Validate JSON, paths and cross-file references. Do not include secrets,
environment files, dependencies, build output or a repository copy.

Return the supplement/ZIP paths and a short summary of new information. The work
should improve the case study's evidence without making optional comparisons,
videos or new infrastructure prerequisites for import.
