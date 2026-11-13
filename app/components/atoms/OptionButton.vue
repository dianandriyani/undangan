<script setup lang="ts">
defineProps<{
  selected: boolean
}>()
</script>

<template>
  <button
    type="button"
    class="cursor-pointer border px-[15px] py-[13px] font-mono text-[10px] leading-[normal] font-normal tracking-[0.06em] not-italic [transition:background-color_var(--ag-duration-fast,180ms)_ease,color_var(--ag-duration-fast,180ms)_ease,border-color_var(--ag-duration-fast,180ms)_ease] hover:border-ink hover:bg-ink hover:text-canvas"
    :class="selected ? 'border-ink bg-ink text-canvas' : 'border-line bg-transparent text-ink'"
    :aria-pressed="selected"
  >
    <slot />
  </button>
</template>
