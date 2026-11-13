<script setup lang="ts">
import { padNumber } from '~/utils/format'

import type {
  GalleryBlock as GalleryBlockData,
} from '../../../shared/types/invitation'

const props = defineProps<{
  block: GalleryBlockData
}>()

type GalleryVariant = GalleryBlockData['variant']

const layoutClass: Record<GalleryVariant, string> = {
  grid: 'grid-cols-3 [align-items:start] gap-[24px] mobile:grid-cols-2 mobile:gap-[28px]',
  masonry: 'grid-cols-[repeat(12,minmax(0,1fr))] [align-items:start] gap-x-[20px] gap-y-[48px] mobile:grid-cols-2 mobile:gap-x-[12px] mobile:gap-y-[32px]',
}

/** Placement of each figure inside the layout grid. */
function getItemClass(variant: GalleryVariant, index: number, total: number): string {
  if (variant === 'masonry') {
    if (index === 0) return 'col-[span_7] mobile:col-[span_2]'
    if (index === 1) return 'col-[span_5] mt-[100px] mobile:col-[2] mobile:mt-0'
    if (index === 2) return 'col-[3/span_6] mt-[-20px] w-[68%] mobile:col-[1] mobile:mt-[40px] mobile:w-[88%]'

    return 'col-[span_4] mobile:col-[span_1]'
  }

  const classes: string[] = []

  if (index === 2) classes.push('col-[1/-1] w-[68%] mobile:w-[88%]')
  if (index === total - 1 && index % 2 === 0) classes.push('mobile:col-[span_2]')

  return classes.join(' ')
}

/** Aspect ratio of each image frame. */
function getFrameClass(variant: GalleryVariant, index: number): string {
  if (variant === 'masonry') {
    if (index === 0) return 'aspect-[5/4]'
    if (index === 1) return 'aspect-[3/4]'
  }

  return 'aspect-[4/5]'
}
</script>

<template>
  <section class="border-t border-t-line px-(--ag-section-padding) pt-[110px] pb-[180px] mobile:pt-[90px] mobile:pb-[110px]">
    <div class="ml-auto max-w-[850px] mobile:m-0">
      <MoleculesSectionMeta
        class="mb-[42px] mobile:mb-[34px]"
        inline
        :label="block.eyebrow"
        :detail="`${padNumber(1)} — ${padNumber(block.images.length)}`"
      />

      <h2 class="m-0 font-display text-[length:clamp(54px,8vw,112px)] leading-[0.99] font-medium tracking-(--ag-tracking-tight) whitespace-pre-line mobile:text-[length:clamp(52px,14vw,82px)]">
        {{ block.title }}
      </h2>
    </div>

    <div
      class="grid w-full py-5"
      :class="layoutClass[props.block.variant]"
      :data-variant="props.block.variant"
    >
      <MoleculesGalleryItem
        v-for="(item, index) in block.images"
        :key="item.id"
        :class="getItemClass(props.block.variant, index, block.images.length)"
        :item="item"
        :index="index"
        :frame-class="getFrameClass(props.block.variant, index)"
      />
    </div>
  </section>
</template>
