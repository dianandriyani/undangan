
import type {
  InvitationThemeRegistry,
} from '../../shared/types/theme'

export const themeRegistry = {
  'avant-garde': {
    id: 'avant-garde',
    name: 'Avant-garde',
    description: 'A quiet, editorial canvas with expressive typography.',
    className: 'theme-avant-garde',

    variables: {
      '--theme-bg': 'var(--ag-bg)',
      '--theme-surface': 'var(--ag-surface)',
      '--theme-ink': 'var(--ag-ink)',
      '--theme-muted': 'var(--ag-muted)',
      '--theme-accent': 'var(--ag-accent)',
      '--theme-line': 'var(--ag-line)',
    },
  },
  'sage-botanical': {
    id: 'sage-botanical',
    name: 'Sage Botanical',
    description: 'Soft sage greens and deep forest tones, alternating per section.',
    className: 'theme-sage-botanical',

    variables: {
      '--theme-bg': 'var(--ag-bg)',
      '--theme-surface': 'var(--ag-surface)',
      '--theme-ink': 'var(--ag-ink)',
      '--theme-muted': 'var(--ag-muted)',
      '--theme-accent': 'var(--ag-accent)',
      '--theme-line': 'var(--ag-line)',
    },

    sectionTones: {
      opening: 'tone-sage-mist',
      cover: 'tone-ivory',
      countdown: 'tone-forest',
      story: 'tone-sage-mist',
      gallery: 'tone-ivory',
      event: 'tone-sage',
      rsvp: 'tone-sage-mist',
      closing: 'tone-forest',
      footer: 'tone-forest',
    },
  },
} satisfies InvitationThemeRegistry

export type RegisteredThemeId = keyof typeof themeRegistry
