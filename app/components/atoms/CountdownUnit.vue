<script setup lang="ts">
defineProps<{
  value: string
  label: string
}>()
</script>

<template>
  <div
    class="flex flex-col items-center gap-[12px] px-[24px] py-[12px] [border-right:var(--ag-border-subtle)] last:[border-right:none] mobile:gap-[10px] mobile:px-[4px] mobile:py-[8px]"
  >
    <span
      class="font-display text-[length:clamp(3.5rem,8vw,7rem)] leading-[0.95] font-medium tracking-(--ag-tracking-tight) text-ink tabular-nums mobile:text-[length:clamp(2.5rem,11vw,4rem)]"
    >
      {{ value }}
    </span>
    <span
      class="font-mono text-(length:--ag-text-xs) tracking-(--ag-tracking-wide) text-muted mobile:text-[9px] mobile:tracking-[0.08em]"
    >
      {{ label }}
    </span>
  </div>
</template>
