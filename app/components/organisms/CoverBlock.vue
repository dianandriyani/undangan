<script setup lang="ts">
import { COPY } from '~/constants/copy'
import { motion } from 'motion-v'

import type {
  CoverBlock as CoverBlockData,
  Invitation,
} from '../../../shared/types/invitation'

const props = defineProps<{
  block: CoverBlockData
}>()

const invitation = inject<ComputedRef<Invitation> | null>(
  'invitation',
  null,
)

const coupleNames = computed(() => {
  const couple = invitation?.value.couple

  if (!couple) {
    return COPY.cover.fallbackCoupleNames
  }

  return `${couple.partnerOne} & ${couple.partnerTwo}`
})

const weddingDate = computed(() => {
  const date = invitation?.value.weddingDate

  if (!date) return ''

  const parsedDate = new Date(date)

  if (Number.isNaN(parsedDate.getTime())) {
    return ''
  }

  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    timeZone: 'Asia/Jakarta',
  })
    .format(parsedDate)
    .replaceAll('/', COPY.cover.dateSeparator)
})

const location = computed(() => {
  const eventBlock = invitation?.value.blocks.find(
    (block) => block.type === 'event',
  )

  const address = eventBlock?.events[0]?.address
  const city = address?.split(',').pop()?.trim()

  return `${city || COPY.cover.fallbackCity} · ${COPY.cover.country}`.toUpperCase()
})
</script>

<template>
  <section
    class="flex min-h-[max(720px,100svh)] flex-col justify-between px-(--ag-section-padding) pt-[34px] pb-[28px] mobile:min-h-svh mobile:pt-[24px] mobile:pb-[22px]"
    :data-variant="props.block.variant"
  >
    <div class="grid grid-cols-[1fr_2fr_1fr] items-center gap-4 font-mono text-[12px] leading-[normal] font-normal tracking-[0.08em] text-muted not-italic mobile:grid-cols-[1fr_1fr] mobile:text-[10px]">
      <span>{{ invitation?.title.toUpperCase() ?? COPY.cover.fallbackTitle }}</span>
      <span class="text-center mobile:hidden">{{ block.eyebrow }}</span>
      <span class="text-right">{{ COPY.cover.scrollHint }}</span>
    </div>

    <div class="mx-auto mt-[90px] mb-[110px] w-full max-w-(--ag-content-width)">
      <motion.div
        class="mb-[clamp(28px,4vw,52px)] max-w-full font-mono text-[length:clamp(1rem,2vw,1.5rem)] leading-[1.4] font-medium tracking-[0.12em] text-accent uppercase not-italic mobile:mb-[28px] mobile:text-[length:clamp(0.85rem,4vw,1.1rem)] mobile:tracking-[0.08em]"
        :initial="{ opacity: 0, y: 16 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.7, delay: 0.1 }"
      >
        {{ coupleNames }}
      </motion.div>

      <motion.h1
        class="mx-0 mt-[26px] mb-[34px] max-w-[1100px] font-display text-[length:clamp(4rem,10.5vw,9.5rem)] leading-[0.92] font-medium tracking-(--ag-tracking-tight) whitespace-pre-line mobile:mt-[22px] mobile:mb-[28px] mobile:text-[length:clamp(3.5rem,15vw,6rem)]"
        :initial="{ opacity: 0, y: 36 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{
          duration: 1,
          delay: 0.2,
          ease: [0.22, 1, 0.36, 1],
        }"
      >
        {{ block.headline }}
      </motion.h1>

      <motion.p
        class="mt-[clamp(28px,4vw,48px)] ml-[48%] max-w-[420px] text-[length:clamp(0.9rem,1.2vw,1.05rem)] leading-[1.85] text-muted mobile:mt-[28px] mobile:ml-[18%] mobile:max-w-[320px] mobile:text-[0.9rem]"
        :initial="{ opacity: 0, y: 18 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.8, delay: 0.55 }"
      >
        {{ block.supportingText }}
      </motion.p>
    </div>

    <div class="grid grid-cols-[1fr_2fr_1fr] items-center gap-4 font-mono text-[12px] leading-[normal] font-normal tracking-[0.08em] text-muted not-italic mobile:grid-cols-[1fr_1fr] mobile:text-[10px]">
      <span class="text-2xl">{{ weddingDate || COPY.cover.fallbackDate }}</span>
      <AtomsAsteriskMark class="text-center text-[23px] text-accent mobile:hidden" />
      <span class="text-right text-xl">{{ location }}</span>
    </div>
  </section>
</template>
