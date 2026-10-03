# Follow-up verification record

Date: 2026-10-03, Pacific/Honolulu. Source: `385c122b2d4669089f02fe576130fc178549d05b`. Windows PowerShell, Node 24.21.0; existing Temurin 21.0.12.1, cached Maven 3.9.16. No installation, account creation, production write, database startup or migration.

## Git and source

- `git status --short`: only existing untracked `docs/portfolio/` before follow-up; no application changes.
- `git rev-parse HEAD`; `git log --all --format='%h %ad %s' --date=iso-strict`; `git tag -n`; `git show --no-patch --format=fuller capstone-v1.0`; `git cat-file -t capstone-v1.0`; `git rev-list --max-parents=0 HEAD`.
- Result: HEAD above; lightweight capstone tag at `23a4dd6` (2026-09-01 05:49:38 HST); root `835201f`. Submission/date of tagging is not established.
- `git log --all --name-only --format= -- '*.png' '*.jpg' '*.jpeg' '*.webp' '*.pdf' '*.docx' '*.fig'`; `git diff capstone-v1.0..HEAD --stat`: no earlier application captures; later feature sequence supported. No restricted course text bundled.
- Source/test reads and `rg` symbol searches covered auth, session/logout, CSRF client/server, ownership, DTO/domain validation, rate limiting/IP handling, exception responses, configuration and CI.

## Backend tests

The installed Java 21 was selected through the process's `JAVA_HOME`; no system setting was changed. Local executable/cache paths are represented by portable placeholders below to avoid machine-specific paths in the bundle.

1. `./mvnw.cmd --offline --batch-mode test` (in `backend/`, Java 21): failed before Maven startup with wrapper PowerShell `Cannot index into a null array`.
2. Cached `mvn.cmd --offline --batch-mode test`: initially chose an inaccessible default local-repository path.
3. Cached `mvn.cmd -Dmaven.repo.local=<existing-user-maven-cache> --offline --batch-mode test`, then the same with `-e`: sandbox `AccessDeniedException` when closing cached JARs; these were environment failures, not test failures.
4. The same command without `-e`, outside sandbox access restrictions: **BUILD SUCCESS**, **25 tests in nine classes, failures 0, errors 0, skipped 0**, reported duration 4.059 seconds. Test reports were generated in ignored `backend/target/surefire-reports`; raw logs/dependencies are not bundled. Mockito emitted its existing dynamic-agent warning.

Tests are service/handler/unit tests with mocks, plus SPA forwarding; no Spring security filter-chain/database integration check. Source review found no existing tests of unauthenticated private requests, missing/invalid CSRF, session/token rotation, or wrong current-password rejection. Specific cross-owner, rate-limit and domain-validation cases are identified in `FOLLOWUP.md`.

The original discovery frontend checks at this exact source revision remain: ESLint pass, 21 Vitest files / 72 tests pass, Vite build pass. Not repeated in follow-up because application source is unchanged.

## Anonymous public checks

Initial web-tool, PowerShell, curl and Node HTTPS attempts failed inside the sandbox (fetch/TLS trust or Windows Schannel credential errors). They did not establish a remote service failure. Outside those restrictions, `Invoke-WebRequest -Uri <URL> -TimeoutSec 20` succeeded with ordinary certificate checking and no credentials for:

- `https://japan-travel-planner-production.up.railway.app/`: 200 HTML shell.
- `https://japan-travel-planner-production.up.railway.app/library`: 200 HTML shell.
- `https://japan-travel-planner-production.up.railway.app/api/templates/public`: 200 JSON, three curated templates / 11 items.
- `https://japan-travel-planner-production.up.railway.app/actuator/health`: 200 JSON, status `UP`.

Existing Chrome was started headlessly with separate new profiles and flags `--headless=new --disable-gpu --no-first-run --no-default-browser-check --dump-dom --virtual-time-budget=8000 --user-data-dir=<isolated-profile> <URL>` for `/` and `/library`. Both exited 0; landing DOM contained “Your Japan” and Login; library DOM contained “Kyoto Cultural Weekend” and Login; neither retained Loading text. Profiles/DOM logs are excluded from the ZIP. This is anonymous rendering evidence, not a complete visual or interaction audit. No authentication, private data, attack probes, modified requests, or cookie/proxy environment review.

## Historical CI

Anonymous GETs to the public GitHub API:

- `https://api.github.com/repos/TapiaTyler/japan-travel-planner/actions/runs?per_page=5`
- `https://api.github.com/repos/TapiaTyler/japan-travel-planner/actions/runs/33992189208/jobs`

Run `33992189208`, `head_sha` matching HEAD, created `2026-09-05T21:09:12Z`, reports `completed` / `success`. Backend Test and frontend Lint/Test/Build step conclusions were success. Full CI logs, artifact contents and deployment revision were not verified. Public run link: https://github.com/TapiaTyler/japan-travel-planner/actions/runs/33992189208.

## Bundle validation

JSON parsing, asset dimensions/byte sizes and SHA-256, archive containment, allowed-file inventory, snippet equality to tracked source, diagram edges, reference IDs and supporting-block adjacency are checked during packaging. Approved screenshots retain their original bytes. No environment/configuration files, build outputs, raw test/browser logs, dependencies or repository copy are included.
