<script setup lang="ts">
import { COPY } from '~/constants/copy'

defineProps<{
  title: string
}>()
</script>

<template>
  <footer
    class="flex justify-between border-t border-t-line px-(--ag-section-padding) py-[20px] font-mono text-[9px] leading-[normal] font-normal tracking-[0.1em] text-muted not-italic mobile:gap-[14px] mobile:text-[8px]"
  >
    <span>{{ title }}</span>
    <span>{{ COPY.site.tagline }}</span>
  </footer>
</template>
