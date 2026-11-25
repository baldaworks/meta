---
name: Balda Backoffice · Cobalt & Raspberry
colorMode: LIGHT
colors:
  background: "#FBF8F5"
  surface: "#FFFFFF"
  surface-raised: "#EDF2F7"
  on-background: "#152944"
  on-surface: "#152944"
  on-surface-variant: "#465A70"
  placeholder: "#5D7084"
  outline: "#78899B"
  divider: "#CCD6E0"
  primary: "#BD155B"
  on-primary: "#FFFFFF"
  action-primary: "#BD155B"
  action-hover: "#981048"
  sidebar: "#073C80"
  sidebar-active: "#12579E"
  on-sidebar: "#FFFFFF"
  link: "#064696"
  link-hover: "#03346F"
  filter-selected: "#E4EFFB"
  count-surface: "#EDF2F7"
  focus-ring: "#085CBD"
  focus-inverse: "#FFFFFF"
  success-text-emphasis: "#285C42"
  success-bg-subtle: "#EAF4EC"
  success-border-subtle: "#AAC9B4"
  warning-text-emphasis: "#714800"
  warning-bg-subtle: "#FFF3D7"
  warning-border-subtle: "#D9B565"
  danger-text-emphasis: "#982F32"
  danger-bg-subtle: "#FDECEB"
  danger-border-subtle: "#E1AEAC"
  info-text-emphasis: "#18537C"
  info-bg-subtle: "#E8F3FA"
  info-border-subtle: "#A5C9DF"
typography:
  page-title: 
    fontFamily: "system-ui, -apple-system, \"Segoe UI\", sans-serif"
    fontSize: "clamp(1.65rem, 2.5vw, 2.15rem)"
    fontWeight: "650"
    lineHeight: "1.2"
    letterSpacing: "-0.025em"
  card-title: 
    fontFamily: "system-ui, -apple-system, \"Segoe UI\", sans-serif"
    fontSize: "1.05rem"
    fontWeight: "650"
    lineHeight: "1.4"
  body: 
    fontFamily: "system-ui, -apple-system, \"Segoe UI\", sans-serif"
    fontSize: "1rem"
    fontWeight: "400"
    lineHeight: "1.5"
  supporting: 
    fontFamily: "system-ui, -apple-system, \"Segoe UI\", sans-serif"
    fontSize: "0.875rem"
    fontWeight: "400"
    lineHeight: "1.5"
  table-heading: 
    fontFamily: "system-ui, -apple-system, \"Segoe UI\", sans-serif"
    fontSize: "0.78rem"
    fontWeight: "650"
    lineHeight: "1.5"
    letterSpacing: "0.025em"
  nav-section: 
    fontFamily: "system-ui, -apple-system, \"Segoe UI\", sans-serif"
    fontSize: "0.7rem"
    fontWeight: "700"
    lineHeight: "1.2"
    letterSpacing: "0.08em"
rounded:
  control: 0.375rem
  card: 0.65rem
  login-card: 0.85rem
  pill: 999px
spacing:
  xs: "0.25rem"
  sm: "0.5rem"
  md: "0.75rem"
  base: "1rem"
  gutter: "1.25rem"
  lg: "1.5rem"
  xl: "2rem"
---

# Balda Backoffice

## Shell, brand and Bootstrap Icons

Use a light operator shell: warm porcelain canvas, white cards, header and footer, and deep cobalt sidebar with white labels and icons. Place the original mascot on its white tile. The active sidebar row uses sidebar-active and a slim raspberry leading marker. The 17rem sidebar starts with the existing Baldaworks PNG beside the word “Balda”. The lockup links to Overview. Render the mark at 2.2rem square with contain sizing and 0.6rem corners. Reuse the original artwork embedded in the Component guide’s brand link. The packaged filename is `baldaworks-logo.png`. Give the link one accessible name through the wordmark and mark the adjacent image decorative. The sign-in screen uses the text lockup “BALDA / BACKOFFICE” above a centered card up to 29rem wide.

Use the bundled Bootstrap Icons font. Sidebar and utility icons inherit the text color. Use `bi-list` for the navigation toggle, `bi-person-circle` for viewer identity, `bi-person` for Account and `bi-box-arrow-right` for Sign out. Keep the sidebar’s established module icons, including `bi-calendar-event` for schedules and `bi-chat-left-text` for chat sessions. Hide decorative glyphs from assistive technology. Give each icon-only control an accessible action name.

## Headers and footers

The 3.5rem utility header uses the card surface and a bottom divider. Put the 2.75rem navigation toggle on the left and the signed-in identity, Account and Sign out on the right. Truncate long viewer names before controls lose room. The page header inside main content carries the page title, optional context and the page action. Card headers carry a section heading and related actions above a divider.

The shell footer uses the card surface, a top divider, muted 0.85rem text and a 3.5rem minimum height. Place “Balda Backoffice” on the left and “Internal operations” on the right. Below 576px retain the brand and hide the secondary line. Form footers belong inside their card. Put mutation feedback next to Cancel and the specific submit action. Allow actions to wrap on phones. Keep destructive actions in a separate danger section.

## Color and typography

Fill at most one primary action per screen with action-primary and white text. Use cobalt underlined links for navigation and cobalt text on filter-selected for the active filter. Place neutral counts immediately beside their heading. Fields use white, a visible outline and ink text; table headers use surface-raised. Use a 3px focus-ring with 3px offset on light surfaces and focus-inverse on the cobalt rail. Use the success, info, warning and danger text/background/border triplets for feedback. Every status chip carries a readable state label; its dot follows the text color. Pair destructive styling with a verb describing the consequence.

Use system sans throughout. Apply the fluid page-title once per view, card-title for section headings and body for tasks and instructions. Reserve tracked uppercase for short navigation section labels. Give compact identifiers adequate column width on desktop. Keep telegram:9001:0 together in Report to; allow wrapping of genuinely long values and scroll wide tables on phones.

## Layout and components

Center main content at a maximum width of 90rem with fluid 1–2rem side padding. Use a 1.25rem detail-grid gap and card body inset, a 1px divider and 0.65rem card corners. At 992px and above show the navigation rail and two-column detail layouts. Below 992px stack detail cards and expose the sidebar through its toggle. Return keyboard focus to the toggle when dismissed. Respect reduced motion.

Lists use a labeled table with a raised header and links to detail views. Keep marketplace columns visible on desktop. On narrow screens contain horizontal scrolling inside the table and show the scroll hint when needed. Use a dashed panel for an empty collection, a clear-filters action for empty search results, and a retry action for recoverable failures. Keep denied, unavailable and missing states distinct.

Forms keep visible labels and field-level validation. For asynchronous authorization or mutations show pending progress, an available cancel action, and a terminal success or failure. Distinguish passkey registration from verification. Show the keyboard skip link on focus. Use the existing form-footer, status-chip and table patterns across modules.

## Review examples

Schedules uses one raspberry Add schedule button, a cobalt Active filter, a neutral count beside Recurring schedules and muted green Scheduled pills. Edit forms use a raspberry Save action, an outlined Cancel action and specific field errors. Mobile audit uses a white header and a cobalt navigation drawer; keep the scroll affordance, timestamps and row actions legible at 390px.

## Canonical structure references

- style-guide — screen 8977639203315872653
- login — screen 2709619109071334114
- account · Mobile navigation open — screen 6765891430036440801
- audit · Mobile — screen 6765891430036442668
- plugins/marketplaces — screen 911477347499015013
- mcp-authorizing — screen 15320410082628627594
