<script setup lang="ts">
defineProps<{
  href: string
}>()
</script>

<template>
  <a
    class="pt-[4px] font-mono text-[10px] leading-[normal] font-normal tracking-[0.08em] text-muted not-italic no-underline [transition:color_var(--ag-duration-fast,180ms)_ease] hover:text-ink"
    :href="href"
    target="_blank"
    rel="noopener noreferrer"
  >
    <slot />
  </a>
</template>
