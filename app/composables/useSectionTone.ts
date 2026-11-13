import type {
  InvitationThemeDefinition,
  ThemeSectionKey,
} from '../../shared/types/theme'

/**
 * Resolves the tone classes for a section from the active theme's
 * `sectionTones` map. Returns '' when the theme defines no tone for it,
 * so the section simply inherits the theme's base colors.
 */
export function useSectionTone(section: MaybeRefOrGetter<ThemeSectionKey>) {
  const theme = inject<ComputedRef<InvitationThemeDefinition> | null>('theme', null)

  return computed(() => {
    const tone = theme?.value.sectionTones?.[toValue(section)]

    return tone ? `${tone} bg-canvas text-ink` : ''
  })
}
