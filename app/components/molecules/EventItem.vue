<script setup lang="ts">
import { COPY } from '~/constants/copy'
import { motion } from 'motion-v'

import { getMapsUrl, padNumber } from '../../utils/format'

import type { InvitationEvent } from '../../../shared/types/invitation'

defineProps<{
  event: InvitationEvent
  index: number
}>()
</script>

<template>
  <motion.article
    class="grid grid-cols-[44px_1fr_auto] [align-items:start] gap-[20px] border-b border-b-line px-0 py-[34px] mobile:grid-cols-[28px_1fr] mobile:gap-[12px]"
    :initial="{ opacity: 0, x: 20 }"
    while-in-view="visible"
    :viewport="{ once: true, amount: 0.3 }"
    :variants="{
      hidden: {
        opacity: 0,
        x: 20,
      },
      visible: {
        opacity: 1,
        x: 0,
        transition: {
          duration: 0.6,
          delay: index * 0.15,
        },
      },
    }"
  >
    <span class="font-mono text-[10px] leading-[normal] font-normal tracking-[0.08em] text-muted not-italic">
      {{ padNumber(index + 1) }}
    </span>

    <div>
      <span class="font-mono text-[10px] leading-[normal] font-normal tracking-[0.08em] text-muted not-italic">
        {{ event.label }}
      </span>

      <h3 class="mx-0 my-[12px] font-display text-[30px] leading-[normal] font-medium not-italic mobile:text-[26px]">{{ event.venue }}</h3>

      <p class="mx-0 my-[7px] text-[13px] text-muted">
        {{ event.date }} · {{ event.startTime }}
        <template v-if="event.endTime">
          —{{ event.endTime }}
        </template>
      </p>

      <p class="mx-0 my-[7px] text-[13px] text-muted">{{ event.address }}</p>
    </div>

    <AtomsTextLink
      class="mobile:col-[2] mobile:mt-[10px]"
      :href="getMapsUrl(event.address)"
      :aria-label="COPY.event.directionsAriaLabel(event.venue)"
    >
      {{ COPY.event.directions }}
    </AtomsTextLink>
  </motion.article>
</template>
