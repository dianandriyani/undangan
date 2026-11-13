<script setup lang="ts">
import { COPY } from '~/constants/copy'
import type { CoupleProfile } from '../../../shared/types/invitation'

const props = defineProps<{
  couple: CoupleProfile
  recipient: string
  weddingDate: string
}>()

const formattedDate = computed(() => {
  const parsedDate = new Date(props.weddingDate)

  if (Number.isNaN(parsedDate.getTime())) return ''

  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'Asia/Jakarta',
  })
    .format(parsedDate)
    .toUpperCase()
})

const emit = defineEmits<{
  open: []
}>()

const toneClass = useSectionTone('opening')
</script>


<template>
  <Transition
    appear
    enter-active-class="transition-[opacity,transform] duration-[350ms] ease-[ease] motion-reduce:transition-none"
    leave-active-class="transition-[opacity,transform] duration-[350ms] ease-[ease] motion-reduce:transition-none"
    enter-from-class="opacity-0 [transform:translateY(-12px)]"
    leave-to-class="opacity-0 [transform:translateY(-12px)]"
  >
    <section
      class="relative flex min-h-svh flex-col items-center justify-center overflow-hidden bg-canvas px-[clamp(24px,7.2vw,116px)] py-8 text-ink mobile:px-6 mobile:py-7"
      :class="toneClass"
      :aria-label="COPY.opening.ariaLabel"
    >
      <!-- Main content -->
      <div
        class="flex w-full flex-1 flex-col items-center justify-center py-6 text-center mobile:py-4"
      >
        <span
          class="font-['DM_Mono',monospace] text-[10px] tracking-[0.16em] text-muted mobile:text-[9px]"
        >
          {{ COPY.opening.eyebrow }}
        </span>

        <h3
          class="mx-0 my-7 flex flex-col items-center font-['Playfair_Display',Georgia,serif] text-[length:clamp(2.75rem,7vw,5.5rem)] leading-[0.95] font-medium tracking-[-0.055em] mobile:my-6 mobile:text-[length:clamp(2.5rem,11vw,4rem)]"
        >
          {{ couple.partnerOne }}

          <span class="my-1 text-[0.45em] text-accent italic">
            {{ COPY.opening.ampersand }}
          </span>

          {{ couple.partnerTwo }}
        </h3>

        <p
          class="font-['DM_Mono',monospace] text-[16px] tracking-[0.2em] text-accent mobile:text-[9px]"
        >
          {{ COPY.opening.saveTheDate }}<template v-if="formattedDate"> · {{ formattedDate }}</template>
        </p>

        <MoleculesOrnamentDivider class="mt-6 mb-8 mobile:mt-5 mobile:mb-7" />

        <div class="flex flex-col items-center">
          <p
            class="mb-2 font-['DM_Mono',monospace] text-[10px] tracking-[0.16em] text-muted"
          >
            {{ COPY.opening.recipientLabel }}
          </p>

          <p
            class="font-['Playfair_Display',Georgia,serif] text-[length:clamp(1.5rem,3vw,2.5rem)] text-ink italic mobile:text-[1.5rem]"
          >
            {{ recipient }}
          </p>
        </div>

        <AtomsPillButton
          class="mt-9 mobile:mt-8"
          @click="emit('open')"
        >
          <span>{{ COPY.opening.openButton }}</span>
          <span aria-hidden="true">{{ COPY.opening.openButtonIcon }}</span>
        </AtomsPillButton>
      </div>

      <!-- Footer -->
      <div
        class="flex w-full shrink-0 items-end justify-between gap-4 border-t border-line pt-5 font-['DM_Mono',monospace] text-[9px] tracking-[0.12em] text-muted mobile:pt-4 mobile:text-[8px] mobile:tracking-[0.08em]"
      >
        <span class="max-w-[65%] leading-relaxed">
          {{ couple.shortIntro }}
        </span>

        <span class="shrink-0 text-right">
          {{ COPY.opening.footerNote }}
        </span>
      </div>
    </section>
  </Transition>
</template>

