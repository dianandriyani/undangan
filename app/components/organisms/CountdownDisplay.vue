<script setup lang="ts">
import { COPY } from '~/constants/copy'
import { padNumber } from '~/utils/format'

const props = defineProps<{
  targetDate: string
}>()

const now = ref<number | null>(null)

let intervalId: ReturnType<typeof setInterval> | undefined

const targetTimestamp = computed(() => {
  const timestamp = new Date(props.targetDate).getTime()

  return Number.isFinite(timestamp) ? timestamp : null
})

const countdown = computed(() => {
  if (now.value === null || targetTimestamp.value === null) {
    return null
  }

  const difference = Math.max(0, targetTimestamp.value - now.value)
  const totalSeconds = Math.floor(difference / 1000)

  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  }
})

const isExpired = computed(() => {
  return countdown.value !== null &&
    countdown.value.days === 0 &&
    countdown.value.hours === 0 &&
    countdown.value.minutes === 0 &&
    countdown.value.seconds === 0
})

const units = computed(() => {
  if (!countdown.value) return []

  return [
    { label: COPY.countdown.units.days, value: countdown.value.days },
    { label: COPY.countdown.units.hours, value: countdown.value.hours },
    { label: COPY.countdown.units.minutes, value: countdown.value.minutes },
    { label: COPY.countdown.units.seconds, value: countdown.value.seconds },
  ]
})

onMounted(() => {
  now.value = Date.now()

  intervalId = setInterval(() => {
    now.value = Date.now()
  }, 1000)
})

onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId)
  }
})
</script>

<template>
  <section
    v-if="countdown"
    class="flex flex-col items-center px-(--ag-section-padding) pt-(--ag-space-6) pb-(--ag-space-7) mobile:pt-(--ag-space-5) mobile:pb-(--ag-space-6)"
    :aria-label="COPY.countdown.ariaLabel"
  >
    <div class="mb-[48px] flex w-full items-center justify-center gap-[20px] mobile:mb-[36px] mobile:gap-[12px]">
      <span class="h-px w-[clamp(24px,8vw,100px)] bg-line" />
      <p class="shrink-0 text-center font-mono text-(length:--ag-text-xs) tracking-(--ag-tracking-wide) text-muted mobile:text-[9px]">
        {{ isExpired ? COPY.countdown.headingExpired : COPY.countdown.heading }}
      </p>
      <span class="h-px w-[clamp(24px,8vw,100px)] bg-line" />
    </div>

    <div
      v-if="!isExpired"
      class="grid w-[min(100%,900px)] grid-cols-4"
    >
      <AtomsCountdownUnit
        v-for="unit in units"
        :key="unit.label"
        :value="padNumber(unit.value)"
        :label="unit.label"
      />
    </div>

    <p
      v-else
      class="text-center font-display text-[length:clamp(2rem,5vw,4rem)] text-ink italic"
    >
      {{ COPY.countdown.expiredMessage }}
    </p>
  </section>
</template>
