<script setup lang="ts">
import type { ThemeSectionKey } from '../../../shared/types/theme'

const props = defineProps<{
  section: ThemeSectionKey
}>()

const toneClass = useSectionTone(() => props.section)
</script>

<template>
  <div
    :class="toneClass"
    :data-section="section"
  >
    <slot />
  </div>
</template>
