# 15 — Reusable Project Discovery Prompt

Use the following prompt inside an individual project repository when preparing that project for inclusion in the portfolio.

The coding agent should have access to the repository, documentation, architecture notes, configuration, tests, and other relevant project context.

The report is source material for the portfolio. It is not polished marketing copy.

---

## Prompt

You are reviewing this project for inclusion in my personal software engineering portfolio.

Your task is to inspect the repository, existing documentation, architecture, configuration, implementation, tests, commit/context files available to you, and any relevant design artifacts, then produce a structured **portfolio case-study discovery report**.

The purpose of this report is to give a separate portfolio project enough accurate information to create:

- a project summary
- a featured-project preview
- a full case study where appropriate
- technical/architecture sections where meaningful
- design/product sections where meaningful
- project metadata
- media/screenshot recommendations
- Japanese-localization source material later

Do **not** attempt to fill every possible portfolio field. Only include information that is genuinely relevant and supported by this specific project.

A backend service should not be forced into a UI-design narrative. A visual frontend project should not be forced into deep infrastructure sections that do not exist. A small project may require only a short project entry rather than a large case study.

### 1. Project Identity

Determine, where relevant:

- project name
- concise project type/category
- current status
- approximate development period/year
- one-sentence summary
- slightly longer project description
- intended audience/users
- primary purpose
- problem the project is intended to solve

If the project is primarily a proof of concept, portfolio demonstration, internal tool, learning project, reusable platform, template, commercial concept, or production application, make that clear.

### 2. Project Scope

Explain what the project actually includes.

Identify:

- major features
- major subsystems
- user-facing capabilities
- administrative/internal capabilities
- major integrations
- explicitly excluded or deferred functionality where that is important to understanding the design

Do not list every minor feature.

Focus on functionality that helps explain the project's value, complexity, or engineering decisions.

### 3. My Role and Ownership

Based only on available evidence and project context, identify the areas for which I appear responsible, such as:

- product direction
- requirements
- research
- information architecture
- system architecture
- UI/UX direction
- frontend development
- backend development
- database design
- API design
- infrastructure/deployment
- testing
- documentation
- localization
- security
- accessibility
- performance

Do not assume that writing code necessarily means I personally authored every implementation detail.

If the project uses or appears designed around AI-assisted development, distinguish where possible between:

- decisions/direction owned by me
- architecture or requirements defined by me
- implementation assisted by AI
- review/testing/verification processes

Do not invent an exact contribution split if it cannot be supported.

### 4. Technology

Identify only technologies that materially matter to understanding the project.

Group them where useful, for example:

- frontend
- backend
- data/storage
- infrastructure
- APIs/integrations
- testing
- tooling

Avoid producing a giant dependency-list dump.

Do not treat incidental packages as portfolio technologies.

### 5. Architecture

Determine whether the architecture is significant enough to discuss in a portfolio case study.

If it is, explain:

- high-level architecture
- important application layers
- data flow
- major services/modules
- persistence model
- external dependencies
- deployment/runtime model
- important boundaries between components

Describe this in implementation-independent language first, then include relevant technologies.

Recommend one or more architecture diagrams that would help explain the project.

For each recommended diagram, state:

- what it should show
- which components/nodes should appear
- what relationships/data flow should be illustrated
- why the diagram would help a portfolio reader

If architecture is trivial, say so rather than manufacturing complexity.

### 6. Important Engineering or Product Decisions

Identify decisions that are actually worth discussing in a case study.

Examples may include:

- framework or rendering strategy
- data/content architecture
- database choice
- authentication approach
- API boundaries
- modularity
- deployment strategy
- localization design
- performance decisions
- state management
- concurrency
- CMS architecture
- generator architecture
- security controls
- accessibility strategy
- reusable component/design-system decisions
- build-vs-buy decisions
- scope constraints

For each meaningful decision, provide:

**Decision**

**Context / problem**

**Chosen approach**

**Why it was chosen**

**Relevant tradeoffs**

**Alternatives considered**, only when supported by project documentation/context

Do not invent alternatives merely to make the decision appear more sophisticated.

### 7. Constraints

Identify constraints that materially influenced the project.

Examples:

- hosting cost
- free-tier limitations
- performance
- deployment environment
- maintainability
- portability
- accessibility
- localization
- SEO
- privacy
- API limits
- framework restrictions
- client handoff requirements
- development time
- project scope
- platform/device requirements

Explain how important constraints affected decisions.

### 8. Challenges

Identify real technical, product, UX, architecture, or implementation challenges evident in the project.

For each useful challenge:

**Challenge**

**Why it mattered**

**Response / solution**

**Result or current state**

Do not exaggerate ordinary implementation work into a major challenge.

If a challenge remains unresolved, say that clearly.

### 9. Design / UX

Include this section only if the project has meaningful interface or user-experience work.

Identify:

- UX goals
- information hierarchy
- navigation model
- interaction patterns
- visual-system decisions
- responsive behavior
- accessibility considerations
- design-system/component architecture
- meaningful iterations or rejected approaches

Highlight decisions rather than simply describing what the UI looks like.

If there is little meaningful design work, omit or keep this section brief.

### 10. Data / Content Model

Include this when data modeling, content modeling, CMS architecture, structured content, or domain modeling is important.

Explain:

- key entities/content types
- important relationships
- why the model was structured this way
- how the model supports product requirements

Do not provide exhaustive schemas unless a particular schema is itself portfolio-worthy.

### 11. Security / Reliability / Performance

Include only areas that are meaningfully implemented or explicitly designed.

Possible topics:

- authentication/authorization
- validation
- route protection
- secrets management
- rate limiting
- secure data handling
- failure handling
- retries
- observability
- concurrency safety
- caching
- performance optimization
- accessibility/performance targets
- uptime/reliability design

Separate completed implementation from planned work.

### 12. Testing and Quality

Summarize meaningful quality practices, such as:

- unit tests
- integration tests
- end-to-end tests
- linting/static analysis
- type safety
- security scanning
- accessibility testing
- manual verification
- CI checks

Focus on what demonstrates engineering discipline.

Do not list routine commands unless their use is notable.

### 13. Deployment and Operations

Where relevant, identify:

- hosting platform
- database/storage hosting
- build/deployment model
- environment strategy
- CI/CD
- monitoring
- operational constraints
- cost-conscious decisions

Keep this concise unless deployment/operations is an important part of the project.

### 14. Results / Current State

State what has actually been achieved.

Distinguish clearly between:

- completed
- working but still being refined
- planned
- prototype only
- not yet implemented

Do not invent user counts, business impact, performance improvements, adoption metrics, or other results that are not documented.

If quantitative metrics genuinely exist, include them with context.

Otherwise describe concrete outputs rather than fake impact.

### 15. Reflection

Based on documented project history and current architecture, identify useful reflection topics such as:

- lessons learned
- decisions that worked well
- decisions that may change
- technical debt
- areas that would be improved in another iteration
- natural next steps

Do not fabricate personal lessons that cannot reasonably be inferred. Flag anything that would require me to provide my own reflection.

### 16. Portfolio-Worthy Highlights

Identify the **3–7 strongest things about this project** from a hiring-manager or technical-interviewer perspective.

These should be specific.

Examples:

- unusual architecture
- thoughtful product constraint
- good use of Go concurrency
- sophisticated content model
- modular client-generation system
- strong accessibility implementation

Do not simply repeat the technology stack.

### 17. Capability Mapping

Map the project only to capabilities it genuinely demonstrates.

Possible capability categories include:

- Product & UI Engineering
- Frontend Development
- Backend Development
- Full-stack Development
- System Architecture
- API Design
- Data Modeling
- Design Systems
- Accessibility
- Performance
- Localization / Internationalization
- Security
- DevOps / Deployment
- Testing / Quality Engineering
- Developer Tooling
- Technical Documentation

For each selected capability, include a short explanation of what in the project demonstrates it.

Do not select everything.

### 18. Recommended Portfolio Media

Determine what visual evidence should be captured for the portfolio.

Recommend only useful media such as:

- homepage/full UI view
- specific interface state
- mobile layout
- dashboard
- content page
- configuration/admin UI
- architecture diagram
- data-flow diagram
- sequence diagram
- API flow
- code excerpt
- before/after comparison
- interaction video
- animation recording
- responsive sequence

For each recommendation, provide:

**Media**

**What should be shown**

**Why it is useful**

**Suggested portfolio role:** overview / detail / process / architecture / result

If a backend project has little UI, emphasize diagrams and system evidence instead of inventing visual screenshots.

### 19. Suggested Case-Study Structure

Based on this specific project, recommend an appropriate case-study outline.

Do not use a fixed template merely because these sections are available.

A product-heavy project might emphasize:

- problem
- users
- information architecture
- product decisions
- interface
- architecture
- result

A backend/system project might emphasize:

- problem
- requirements
- system architecture
- key technical decisions
- concurrency/data flow
- reliability/security
- deployment
- result

A smaller project may warrant only:

- overview
- implementation
- key lesson

Recommend the structure that best tells this project's story.

### 20. Featured-Project Summary

Provide candidate source material for a portfolio preview:

**Title**

**Short category**

**One-sentence summary**

**2–4 key technologies**

**2–4 strongest capabilities demonstrated**

**Suggested preview visual**

Do not write marketing hype.

### 21. Missing Information

Finish with a section called:

**Questions for Tyler**

Include only questions where my answer would materially improve the case study and where the answer cannot be reliably determined from the repository/context.

Examples:

- why I chose one architecture over another
- whether an apparent future feature was intentionally deferred
- what part of a design was personally created versus AI-assisted
- what I learned from a difficult implementation
- whether a project has been used by real users
- whether a particular result can be publicly disclosed

Do not ask me to restate information that is already available in the project.

Keep this list focused.

### Evidence and Accuracy Requirements

Throughout the report:

- base factual claims on repository evidence or explicit project context
- distinguish implemented, partially implemented, planned, and speculative work
- do not infer business results that are not documented
- do not inflate routine implementation into architectural sophistication
- do not claim I personally hand-wrote code merely because it exists
- do not hide meaningful use of AI-assisted development
- do not force every report section to contain content
- explicitly mark sections as not relevant when necessary, or omit them
- prefer a smaller set of strong, defensible portfolio claims over exhaustive coverage

The final report is **source material for another agent**, not polished portfolio copy.

Prioritize accuracy, useful context, engineering/design decisions, and evidence over promotional language.

---

## Portfolio-side handling

When importing the discovery report into the portfolio:

1. Treat it as evidence/source material.
2. Do not automatically publish every identified detail.
3. Select only material that strengthens the project narrative.
4. Preserve implemented/planned distinctions.
5. Ask Tyler only unresolved questions that materially matter.
6. Convert source material into semantic case-study blocks.
7. Do not create theme-specific content versions.
