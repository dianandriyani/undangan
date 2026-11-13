<script setup lang="ts">
import { motion } from 'motion-v'

import type {
  VerseBlock as VerseBlockData,
} from '../../../shared/types/invitation'

const props = defineProps<{
  block: VerseBlockData
}>()

const reveal = (delay = 0) => ({
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      delay,
    },
  },
})
</script>

<template>
  <section
    class="flex flex-col items-center border-t border-t-line px-(--ag-section-padding) pt-(--ag-space-7) pb-(--ag-space-7) text-center mobile:pt-(--ag-space-6) mobile:pb-(--ag-space-6)"
    :data-variant="props.block.variant"
  >
    <span class="font-mono text-(length:--ag-text-xs) leading-[normal] font-normal tracking-(--ag-tracking-wide) text-muted not-italic">
      {{ block.eyebrow }}
    </span>

    <AtomsAsteriskMark class="mt-[clamp(28px,4vw,44px)] text-[1.25rem] text-accent" />

    <motion.p
      class="mx-0 mt-[clamp(36px,5vw,60px)] mb-0 max-w-[920px] font-arabic text-[clamp(1.6rem,3.4vw,2.75rem)] leading-[2.1] text-ink mobile:text-[clamp(1.4rem,6.4vw,1.9rem)]"
      lang="ar"
      dir="rtl"
      :initial="{ opacity: 0, y: 20 }"
      while-in-view="visible"
      :viewport="{ once: true, amount: 0.3 }"
      :variants="reveal()"
    >
      {{ block.arabic }}
    </motion.p>

    <motion.blockquote
      class="mx-0 mt-[clamp(32px,4.5vw,52px)] mb-0 max-w-[640px] font-display text-[clamp(1.1rem,1.8vw,1.45rem)] leading-[1.7] font-normal text-ink italic mobile:text-[1.05rem]"
      :initial="{ opacity: 0, y: 20 }"
      while-in-view="visible"
      :viewport="{ once: true, amount: 0.3 }"
      :variants="reveal(0.2)"
    >
      “{{ block.translation }}”
    </motion.blockquote>

    <span class="mt-[clamp(28px,4vw,44px)] font-mono text-(length:--ag-text-xs) leading-[normal] font-normal tracking-(--ag-tracking-wide) text-accent not-italic">
      {{ block.source }}
    </span>
  </section>
</template>
