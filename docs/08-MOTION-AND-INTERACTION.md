# 08 — Motion and Interaction

## Goal

Motion should clarify hierarchy, reward exploration, and express theme personality.

It must not obstruct reading or become necessary to use the portfolio.

## Motion categories

### Entry

Used when content initially appears.

### Reveal

Used for meaningful content introduction.

### Transition

Used for page/theme/composition changes.

### Response

Used for hover, focus, press, selection, and feedback.

### Ambient

Used for low-priority background movement.

## Motion intensity levels

### Essential

Interaction feedback necessary for clear UI state.

Examples:

- button press;
- menu open;
- focus/selection feedback.

Keep subtle.

### Expressive

Enhances storytelling.

Examples:

- scroll reveal;
- title movement;
- project media transitions;
- theme morphing.

Reduce/remove for reduced-motion users.

### Experimental

Optional enhancement.

Examples:

- shader deformation;
- parallax;
- pointer-follow;
- particles;
- animated spatial diagrams.

Never required to understand content.

## Theme motion profiles

### Editorial

- restrained;
- slower;
- subtle easing;
- minimal travel distance;
- reveal and continuity.

### Engineer

- precise;
- faster;
- structured/mechanical;
- minimal overshoot;
- immediate state changes.

### Digital

- expressive;
- layered;
- stronger continuity;
- richer media motion;
- optional spatial/pointer effects.

## Theme switching

Potential behavior:

```text
color       → fade
geometry    → controlled morph
spacing     → ease
decoration  → crossfade
typography  → controlled swap
```

Exact choreography remains open.

Avoid:

- long loading-like transitions;
- severe layout thrashing;
- disappearing text for extended periods.

Reduced motion:

- near-instant or simple crossfade.

## Page transitions

Keep reasonably short.

Possible:

- title continuity;
- project preview to hero continuity;
- image continuity;
- restrained fade/slide.

Avoid mandatory multi-second transitions on every route.

## Project preview interaction

May include:

- image pan/crop;
- title shift;
- metadata reveal;
- contextual cursor label;
- subtle scale;
- focus treatment.

Essential information must already be accessible.

## Cursor

Custom cursors are optional and theme-specific.

Editorial:

- likely native.

Engineer:

- native/minimal.

Digital:

- may use contextual labels such as `VIEW`, `OPEN`, `DRAG`.

Rules:

- disable on touch;
- preserve pointer affordances;
- do not hide system cursor without reason;
- never make cursor effects essential.

## Scrolling

Use normal browser scrolling.

Do not implement scroll hijacking.

Scroll-linked effects are acceptable only if:

- lightweight;
- content remains readable;
- reduced-motion disables them;
- keyboard/page navigation remains normal.

## Digital progressive enhancement

Digital must have a usable baseline without advanced rendering.

```text
semantic HTML
↓
base styling
↓
standard interactions
↓
advanced Digital enhancement
```

If WebGL/canvas fails:

- navigation remains;
- project information remains;
- links remain;
- case study remains readable.

## Reduced motion

Respect:

```css
@media (prefers-reduced-motion: reduce)
```

Reduced behavior should:

- remove large transforms;
- remove parallax;
- stop decorative autoplay motion;
- simplify theme transitions;
- disable cursor-follow;
- simplify page transitions.

## Video

For motion previews:

- muted;
- no sound autoplay;
- short;
- lazy loaded;
- poster provided;
- pause offscreen where practical;
- accessible description/caption.

## Interaction states

Every control needs appropriate states:

- default;
- hover where pointer exists;
- focus;
- active/pressed;
- disabled where applicable;
- selected where applicable.

Keyboard focus must be at least as clear as hover.

## Mobile

Do not simulate hover.

Digital mobile should simplify:

- pointer effects;
- heavy parallax;
- overly spatial layouts.

Use:

- tap;
- scroll;
- swipe where appropriate;
- native-feeling interactions.

## Performance

Avoid per-frame React state updates for visual effects when CSS/direct animation systems are better.

Prefer:

- transforms/opacity;
- intersection observers;
- lazy loading;
- cleanup of listeners/observers.

## Testing

Test:

- reduced motion;
- keyboard during transitions;
- route changes;
- theme changes;
- mobile/touch;
- slow devices;
- hydration;
- scroll restoration.

## Principle

Motion should make the portfolio feel more intentional, not more difficult.
