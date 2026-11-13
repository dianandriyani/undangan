
<script setup lang="ts">

import type { Invitation } from '../../../shared/types/invitation'

const props = defineProps<{
  invitation: Invitation
}>()

const visibleBlocks = computed(() => {
  return props.invitation.blocks.filter((block) => {
    if (block.type === 'rsvp') {
      return props.invitation.settings.allowRsvp
    }

    return true
  })
})

const musicUrl = computed(() => {
  const { showMusicToggle, musicUrl } = props.invitation.settings

  return showMusicToggle && musicUrl ? musicUrl : null
})

provide(
  'invitation',
  computed(() => props.invitation),
)
</script>

<template>
  <main
    class="mx-auto max-w-(--ag-container)"
    :data-invitation-id="invitation.id"
    :data-invitation-slug="invitation.slug"
  >
    <template
      v-for="block in visibleBlocks"
      :key="block.id"
    >
      <TemplatesThemeSection :section="block.type">
        <TemplatesBlockRenderer :block="block" />
      </TemplatesThemeSection>

      <TemplatesThemeSection
        v-if="
          block.type === 'cover' &&
          invitation.settings.showCountdown
        "
        section="countdown"
      >
        <OrganismsCountdownDisplay :target-date="invitation.weddingDate" />
      </TemplatesThemeSection>
    </template>

    <MoleculesMusicToggle
      v-if="musicUrl"
      :src="musicUrl"
    />

    <TemplatesThemeSection section="footer">
      <MoleculesSiteFooter :title="invitation.title" />
    </TemplatesThemeSection>
  </main>
</template>
