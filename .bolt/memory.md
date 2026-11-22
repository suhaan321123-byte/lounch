# Project memory

## Product intent & audience

- Web app with a landing/publish flow that transitions through a brief countdown, then navigates to an external website
- Audience: end users who click "Publish" and are redirected to `evercaremedgroup.com`

## Brand personality & voice

- Production-quality, polished presentation
- Deliberate transition between landing and redirect

## Visual design & UX direction

- Scene-based architecture: LandingScene → simplified countdown → external navigation
- Countdown now shows only a large "3" for ~1.8s on a black backdrop, then redirects
- Previous multi-number countdown (3, 2, 1, GO) and video playback were removed due to reliability issues
- Landing fade-out precedes the countdown display
- Direct browser navigation used instead of iframe embedding

## Decisions, constraints & rationale

- Stack: Vite + React + Tailwind CSS + Lucide React icons
- Path alias `@/` → `src/` (authoritative in `.bolt/prompt`; do not restate)
- Components organized as separate scene files
- Fullscreen API and video element removed — caused stalled transitions and blocked playback
- Iframe/embedded-site approach removed — direct `window.location` navigation is more reliable
- Countdown simplified to single "3" display because the full 3-2-1-GO sequence stalled after the first number
- Target URL: `evercaremedgroup.com`

## Open questions & assumptions

- Whether the single "3" countdown is the desired final UX or a temporary fix is unclear
- Whether the target URL should be configurable or remains hardcoded to evercaremedgroup.com
- Whether a video phase should be reintroduced later (currently fully removed)
- No accessibility considerations confirmed for the countdown/transition (screen readers, reduced motion)