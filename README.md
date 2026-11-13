# EVERFORM

Experimental digital invitation engine built with Nuxt 4, Vue 3, TypeScript, Tailwind CSS v4, and Motion for Vue.

## Requirements

- Node.js 22 or newer
- npm 10 or newer

## Getting started

```bash
npm install
npm run dev
```

Open `http://localhost:3000` (add `?for=Guest_Name` to show the personalised opening screen).

## Scripts

```bash
npm run dev       # development server
npm run typecheck # Nuxt + TypeScript type checking
npm run build     # production build
```

## Architecture

Components follow **atomic design**:

```
app/
├── components/
│   ├── atoms/        # smallest UI pieces: AsteriskMark, TextLink, PillButton, OptionButton, CountdownUnit
│   ├── molecules/    # small groups of atoms: SectionMeta, EventItem, GalleryItem, Rsvp*, MusicToggle, SiteFooter
│   ├── organisms/    # full sections: Cover/Story/Gallery/Event/Rsvp/Closing blocks, CountdownDisplay, InvitationOpening
│   └── templates/    # page layout: InvitationTemplate, ThemeProvider, BlockRenderer
├── constants/        # invitation data as constants (INVITATIONS)
├── registries/       # block-type -> organism and theme-id -> theme maps
├── utils/            # pure helpers (padNumber, getMapsUrl)
├── composables/      # useInvitation
└── pages/index.vue   # public invitation route
shared/types/         # framework-agnostic invitation and theme contracts
```

### Styling

Styling uses **Tailwind CSS v4** (via `@tailwindcss/vite`) with utility classes written directly in the components.

- `app/assets/css/main.css` is the Tailwind entry. It imports the theme and utilities layers and adds a few base rules.
- **Preflight is intentionally not imported.** The design relies on the browser's default element styles, such as heading and paragraph margins.
- Theme tokens are exposed as utilities: `bg-canvas`, `text-ink`, `text-muted`, `text-accent`, `border-line`, `bg-surface`, `font-display`, `font-mono`, `font-sans`. They resolve to the active theme's CSS variables (`.theme-avant-garde` in `app/assets/css/main.css`), so adding a theme does not require touching templates.
- Use the `mobile:` variant for the `max-width: 700px` breakpoint.

### Engine boundaries

1. **Invitation data** owns content and block order.
2. **Theme** owns visual identity and composition.
3. **Blocks** own reusable content rendering and behavior.
4. **Templates and registries** resolve the invitation, theme, and block registry.

A theme must not own invitation business data. A block must not hardcode a particular theme's colors. Add new themes through the theme registry, and add new block types through the block registry and shared schema.

## Add a new invitation

Add a new entry to `INVITATIONS` in `app/constants/invitations.ts` following the `Invitation` type. The index page shows the first published invitation.

## Current scope

This is an engine foundation, not a production invitation builder. Data is local and RSVP submission is a client-side demo. Persistence, guest management, admin editing, media upload, and production validation are intentionally out of scope.
