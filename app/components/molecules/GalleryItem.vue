<script setup lang="ts">
import { motion } from 'motion-v'

import { padNumber } from '~/utils/format'

import type { GalleryImage } from '../../../shared/types/invitation'

defineProps<{
  item: GalleryImage
  index: number
  /** Aspect-ratio utility for the image frame, decided by the gallery layout. */
  frameClass: string
}>()
</script>

<template>
  <motion.figure
    class="group m-0 min-w-0 overflow-hidden"
    :initial="{ opacity: 0, y: 32 }"
    while-in-view="visible"
    :viewport="{ once: true, amount: 0.15 }"
    :variants="{
      hidden: {
        opacity: 0,
        y: 32,
      },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.7,
          delay: index * 0.12,
        },
      },
    }"
  >
    <div
      class="w-full overflow-hidden bg-surface"
      :class="frameClass"
    >
      <img
        class="block h-full w-full object-cover [filter:saturate(0.78)] [transition:transform_900ms_var(--ag-ease-standard)] group-hover:[filter:saturate(1)] group-hover:[transform:scale(1.035)] motion-reduce:[transition:none]"
        :class="index === 2 ? 'aspect-[16/9]' : 'aspect-[4/5]'"
        :src="item.src"
        :alt="item.alt"
        loading="lazy"
        decoding="async"
      >
    </div>

    <figcaption
      v-if="item.caption"
      class="flex items-center gap-[12px] pt-[12px] font-mono text-(length:--ag-text-xs) leading-[normal] font-normal tracking-[0.04em] text-muted not-italic"
    >
      <span class="text-ink">{{ padNumber(index + 1) }}</span>
      {{ item.caption }}
    </figcaption>
  </motion.figure>
</template>
