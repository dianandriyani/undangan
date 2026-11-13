
import type { CSSProperties } from 'vue'
import type { InvitationBlock, InvitationThemeId } from './invitation'

/**
 * CSS variables provided by a theme.
 *
 * Example:
 * {
 *   '--theme-bg': 'var(--ag-bg)',
 *   '--theme-ink': 'var(--ag-ink)',
 * }
 */
export type ThemeVariables = CSSProperties

/**
 * Every visual section of an invitation that can carry its own tone.
 */
export type ThemeSectionKey =
  | InvitationBlock['type']
  | 'opening'
  | 'countdown'
  | 'footer'

/**
 * Metadata and configuration for a single invitation theme.
 */
export interface InvitationThemeDefinition {
  id: InvitationThemeId
  name: string
  description: string
  className: string
  variables: ThemeVariables
  /**
   * Optional per-section tone classes (defined in main.css).
   * Sections without an entry inherit the theme's base colors.
   */
  sectionTones?: Partial<Record<ThemeSectionKey, string>>
}

/**
 * Collection of registered invitation themes.
 *
 * The key represents the theme ID.
 */
export type InvitationThemeRegistry = Record<
  string,
  InvitationThemeDefinition
>
