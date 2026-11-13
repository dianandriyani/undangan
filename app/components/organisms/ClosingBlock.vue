<script setup lang="ts">
import { COPY } from '~/constants/copy'
import { motion } from 'motion-v'

import type {
  ClosingBlock as ClosingBlockData,
} from '../../../shared/types/invitation'

const props = defineProps<{
  block: ClosingBlockData
}>()
</script>

<template>
  <section
    class="flex min-h-[620px] flex-col items-center justify-center border-t border-t-line px-(--ag-section-padding) pt-(--ag-space-7) pb-(--ag-space-7) text-center mobile:min-h-[520px] mobile:pt-(--ag-space-6) mobile:pb-(--ag-space-6)"
    :data-variant="props.block.variant"
  >
    <span class="mb-[clamp(28px,4vw,44px)] font-mono text-(length:--ag-text-xs) leading-[normal] font-normal tracking-(--ag-tracking-wide) text-muted not-italic">
      {{ COPY.closing.eyebrow }}
    </span>

    <motion.h2
      class="mx-0 my-[34px] max-w-[850px] font-display text-[length:clamp(3rem,7vw,6.5rem)] leading-[1] font-medium tracking-[-0.055em] whitespace-pre-line mobile:text-[length:clamp(2.7rem,11vw,4.5rem)]"
      :initial="{ opacity: 0, y: 30 }"
      while-in-view="visible"
      :viewport="{ once: true }"
      :variants="{
        hidden: {
          opacity: 0,
          y: 30,
        },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.9,
          },
        },
      }"
    >
      {{ block.message }}
    </motion.h2>

    <motion.p
      class="mt-[clamp(28px,4vw,44px)] font-display text-[length:clamp(1.25rem,2.2vw,1.8rem)] leading-[1.5] font-normal text-ink italic mobile:mt-[28px] mobile:text-[1.25rem]"
      :initial="{ opacity: 0, y: 12 }"
      while-in-view="visible"
      :viewport="{ once: true }"
      :variants="{
        hidden: {
          opacity: 0,
          y: 12,
        },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.7,
            delay: 0.25,
          },
        },
      }"
    >
      {{ block.signature }}
    </motion.p>

    <AtomsAsteriskMark class="mt-[clamp(48px,7vw,80px)] text-[1.5rem] text-accent" />
  </section>
</template>
