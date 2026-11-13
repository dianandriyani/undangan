<script setup lang="ts">
import { motion } from 'motion-v'

import type {
  StoryBlock as StoryBlockData,
} from '../../../shared/types/invitation'

const props = defineProps<{
  block: StoryBlockData
}>()
</script>

<template>
  <section
    class="grid grid-cols-[minmax(130px,0.7fr)_minmax(0,2fr)] gap-[clamp(36px,8vw,140px)] px-(--ag-section-padding) mobile:grid-cols-[1fr] mobile:gap-[38px] border-t border-t-line pt-[190px] pb-[190px] mobile:pt-[100px] mobile:pb-[110px]"
    :data-variant="props.block.variant"
  >
    <MoleculesSectionMeta
      :label="block.eyebrow"
      :detail="block.year"
    />

    <div class="relative max-w-[900px]">
      <motion.h2
        class="m-0 font-display text-[length:clamp(54px,8vw,112px)] leading-[0.99] font-medium tracking-(--ag-tracking-tight) whitespace-pre-line mobile:text-[length:clamp(52px,14vw,82px)]"
        :initial="{ opacity: 0, y: 28 }"
        while-in-view="visible"
        :viewport="{ once: true, amount: 0.3 }"
        :variants="{
          hidden: {
            opacity: 0,
            y: 28,
          },
          visible: {
            opacity: 1,
            y: 0,
            transition: {
              duration: 0.8,
            },
          },
        }"
      >
        {{ block.title }}
      </motion.h2>

      <motion.p
        class="mt-[52px] mr-0 mb-0 ml-auto max-w-[430px] text-[15px] leading-[1.9] text-muted mobile:mt-[35px] mobile:ml-[12%] mobile:text-[14px]"
        :initial="{ opacity: 0, y: 20 }"
        while-in-view="visible"
        :viewport="{ once: true, amount: 0.3 }"
        :variants="{
          hidden: {
            opacity: 0,
            y: 20,
          },
          visible: {
            opacity: 1,
            y: 0,
            transition: {
              duration: 0.8,
              delay: 0.15,
            },
          },
        }"
      >
        {{ block.body }}
      </motion.p>

      <AtomsAsteriskMark class="absolute bottom-[-65px] left-[4px] text-[34px] text-accent mobile:bottom-[-55px]" />
    </div>
  </section>
</template>
