# ADR 0007: Standardize app route ownership and test harness placement

## Status

Accepted

## Date

2026-08-21

## Decision Drivers

- Route-specific page shells were accumulating in `src/app/_components`, making that folder act like a shared drawer instead of a real boundary.
- AI Studio, What We Do, and the root homepage needed one consistent ownership model for `_components`, `_types`, `_consts`, `_utils`, and `_hooks`.
- Test files under `src/tests` blurred production source with project validation code.
- Provider files and large route components had begun mixing context wiring, local hooks, local types, constants, and render helper closures.

## Context

The app now has multiple route surfaces:

- root homepage at `/`
- What We Do at `/what-we-do`
- AI Studio at `/ai-studio`

The previous layout placed root-home and What We Do page shells under app-level `_components`, even though the route shell ownership belonged beside each route. AI Studio had a more route-local structure, but still had noisy route-prefixed internals and reusable pieces that belonged outside the route. Tests also lived under production `src`.

## Decision

Adopt route ownership as the default boundary:

- Root homepage route uses `src/app/(home)/page.tsx`.
- Root homepage page shell lives under `src/app/(home)/_components`.
- Root homepage route-owned state contracts live under `src/app/(home)/_types` and `_consts`.
- What We Do route uses `src/app/what-we-do/page.tsx`.
- What We Do page shell lives under `src/app/what-we-do/_components`.
- What We Do route-owned data shaping lives under `src/app/what-we-do/_types`, `_consts`, and `_utils`.
- AI Studio keeps route-private internals under `src/app/ai-studio/_components`, `_hooks`, `_types`, `_consts`, and `_utils`.

Reserve app-level shared folders for actual app-route shared contracts:

- `src/app/_components` is for app-route shared composites and generic section primitives. This includes `SiteHeader`, `Panel`, `SongRecording`, `RightsStamp`, `SourceCredit`, homepage viewers/CTA sections, and What We Do section primitives.
- A component does not need two current consumers to live in `src/app/_components`; it needs to be generic enough and not be the route page shell itself.
- Page-surface CSS modules stay beside the route page shell they style. App-level section components may import that route-owned style contract until their styling is split into component-local CSS modules.
- `src/app/_types` is for app-route shared component contracts, currently including song recording, source credit, and rights stamp props.
- Route-owned data contracts can remain under the route `_types`/`_consts` even when consumed by an app-level component, until the contract itself becomes broadly reusable.
- Do not recreate `src/app/_consts` or `src/app/_utils` unless there is a real app-route shared constant or utility with stable reuse.

Use global shared folders for cross-domain primitives:

- UI primitives that should be reusable beyond app-route composites live under `src/components/shared`.
- reusable hooks live under `src/hooks`.
- reusable utilities live under `src/utils`.
- reusable type contracts live under `src/types`.
- reusable static config and tokens live under `src/consts`.

Keep test harness code outside production source:

- Unit, integration, and accessibility tests live in top-level `tests/`.
- Jest setup and mocks live under `tests/setup.ts` and `tests/mocks/*`.
- Jest, runner scripts, and TypeScript excludes must refer to `tests/`, not `src/tests/`.

Keep providers thin:

- Provider files should wire context/cache providers and delegate orchestration to hooks.
- Provider prop types live under `src/types/providers`.
- Provider constants/context singletons live under `src/consts/providers`.
- Provider-specific reusable setup logic lives under `src/hooks` or `src/utils/providers`.

Keep components render-focused:

- Move component-local prop/config types to route or shared `_types`.
- Move component-local constants to route or shared `_consts`.
- Prefer props-driven components over local `renderThing` JSX closures for reusable visual fragments.

## Enforcement and Validation

- `npm run check:repo-hygiene` should reject or surface patterns that reintroduce known misplaced folders when such rules are added.
- `npm run check:file-budgets` remains the first check after file moves or extraction.
- Route ownership moves require:
  - `npm run check:file-budgets`
  - `npm run format:check`
  - `npm run typecheck`
  - `npm run lint`
  - `npm run test`
- Full handoff readiness remains `npm run prepr`.

## Consequences

### Positive

- Route code is easier to find because ownership follows the Next route tree.
- App-level shared components now represent reusable app section primitives instead of route page shells.
- Test code no longer lives inside production `src`.
- Provider files are smaller and easier to reason about.
- Component files are less likely to become mixed render/type/constant/helper modules.

### Tradeoffs

- Imports may be longer when route page shells consume app-level shared components.
- Root homepage uses a route group folder, which can look unusual but keeps `/` clean while preserving route-private internals.
- Some app-level components still import route-owned contracts; this is acceptable while the component is generic but its current data source remains route-owned.
- Some large AI Studio components still need further decomposition beyond the low-risk shared visual fragments already extracted.

## Follow-up

- Consider adding repo hygiene checks for route page shells under `src/app/_components`.
- Continue extracting large AI Studio render branches into props-driven components in small tested slices.
- Add barrel exports only where they reduce import noise without hiding ownership boundaries.
- Keep ADR and AGENTS guidance updated if additional app-level shared components are promoted.
