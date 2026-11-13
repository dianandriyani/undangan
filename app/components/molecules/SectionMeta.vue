<script setup lang="ts">
withDefaults(defineProps<{
  label: string
  detail: string
  /** Lay label and detail out side by side at every breakpoint. */
  inline?: boolean
}>(), {
  inline: false,
})
</script>

<template>
  <div
    class="flex items-start justify-between gap-4 font-mono text-[10px] leading-[normal] font-normal tracking-[0.12em] text-muted not-italic"
    :class="inline ? 'flex-row pt-[13px] mobile:pt-0' : 'flex-col pt-[13px] mobile:flex-row mobile:pt-0'"
  >
    <span>{{ label }}</span>
    <span>{{ detail }}</span>
  </div>
</template>
