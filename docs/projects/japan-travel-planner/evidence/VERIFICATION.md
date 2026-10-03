# Verification record

Inspection date: 2026-10-03, Hawaii time. Source: `385c122`; working tree clean before discovery. Windows PowerShell, local Node/npm with pre-existing `frontend/node_modules`. No packages installed and no database or deployment used.

| Command | Result | Scope / limit |
| --- | --- | --- |
| `git status --porcelain=v1` before work | Empty | HEAD working tree was clean. |
| `npm run lint` in `frontend/` | Pass, exit 0 | ESLint static check; not a browser or accessibility audit. |
| `npm test` in `frontend/` | Pass, 21 test files and 72 tests | Vitest unit/component checks; does not verify live API or deployment. |
| `npm run build` in `frontend/` | Pass, Vite 8.2.2 | Client bundle generated locally; not a production runtime check. |
| `java -version` | OpenJDK 17.0.16 | `backend/pom.xml` requires Java 21; backend Maven tests were not run. |
| Tracked image metadata via `System.Drawing.Image` | Four PNG dimensions and byte sizes measured | Intrinsic dimensions only; capture viewport and date unknown. |
| `git log --all --name-status -- docs/images` | All four screenshots added in `2b63b0e`; no earlier tracked screenshots found | Does not rule out private/off-repository historical captures. |

The GitHub Actions workflow defines Java 21 backend tests and frontend lint/test/build, but this report does not claim a recorded CI run passed. The README gives a Railway live URL; it was not visited or checked. No backend test, Docker build, database migration, screenshot capture, Lighthouse audit or accessibility audit was run.
