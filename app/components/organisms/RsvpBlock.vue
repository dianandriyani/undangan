<script setup lang="ts">
import { COPY } from '~/constants/copy'
import { motion } from 'motion-v'

import type {
  RsvpBlock as RsvpBlockData,
} from '../../../shared/types/invitation'

const props = defineProps<{
  block: RsvpBlockData
}>()

const guestNameId = useId()
const guestCountId = useId()
const messageId = useId()

const guestName = ref('')
const attendance = ref<'yes' | 'no' | ''>('')
const guestCount = ref(1)
const message = ref('')
const submitted = ref(false)

const maxGuests = computed(() => {
  return Math.max(1, props.block.maxGuests ?? 2)
})

const canSubmit = computed(() => {
  return Boolean(guestName.value.trim() && attendance.value)
})

const formattedAttendance = computed(() => {
  return attendance.value === 'yes'
    ? COPY.rsvp.accept
    : COPY.rsvp.decline
})

function selectAttendance(value: 'yes' | 'no') {
  attendance.value = value

  if (value === 'no') {
    guestCount.value = 0
  } else {
    guestCount.value = 1
  }
}

function submitRsvp() {
  if (!canSubmit.value) return

  submitted.value = true
}
</script>

<template>
  <section class="grid grid-cols-[minmax(130px,0.7fr)_minmax(0,2fr)] gap-[clamp(36px,8vw,140px)] px-(--ag-section-padding) mobile:grid-cols-[1fr] mobile:gap-[38px] border-t border-t-line pt-[150px] pb-[170px] mobile:pt-[100px] mobile:pb-[110px]">
    <MoleculesSectionMeta
      :label="props.block.eyebrow"
      :detail="COPY.rsvp.sectionDetail"
    />

    <div class="max-w-[800px]">
      <h2 class="m-0 font-display text-[length:clamp(54px,8vw,112px)] leading-[0.99] font-medium tracking-(--ag-tracking-tight) whitespace-pre-line mobile:text-[length:clamp(52px,14vw,82px)]">
        {{ props.block.title }}
      </h2>

      <p class="mx-0 mt-[35px] mb-[55px] max-w-[380px] text-[14px] leading-[1.8] text-muted mobile:mt-[28px] mobile:mb-[42px]">
        {{ props.block.description }}
      </p>

      <motion.form
        class="flex max-w-[520px] flex-col gap-[13px]"
        :initial="{ opacity: 0, y: 20 }"
        while-in-view="visible"
        :viewport="{ once: true }"
        :variants="{
          hidden: {
            opacity: 0,
            y: 20,
          },
          visible: {
            opacity: 1,
            y: 0,
            transition: {
              duration: 0.7,
            },
          },
        }"
        @submit.prevent="submitRsvp"
      >
        <template v-if="!submitted">
          <AtomsFieldLabel :for="guestNameId">
            {{ COPY.rsvp.nameLabel }}
          </AtomsFieldLabel>

          <input
            :id="guestNameId"
            v-model="guestName"
            class="rounded-none [border-width:0_0_1px] [border-style:none_none_solid] [border-color:currentColor_currentColor_var(--theme-line)] bg-transparent px-0 py-[14px] text-ink [outline:none] [transition:border-color_var(--ag-duration-fast,180ms)_ease] focus:border-ink"
            autocomplete="name"
            maxlength="100"
            :placeholder="COPY.rsvp.namePlaceholder"
            required
          >

          <MoleculesRsvpAttendancePicker
            :value="attendance"
            @select="selectAttendance"
          />

          <MoleculesRsvpGuestCounter
            v-if="attendance === 'yes'"
            :id="guestCountId"
            v-model="guestCount"
            :max="maxGuests"
          />

          <MoleculesRsvpMessageField
            :id="messageId"
            v-model="message"
          />

          <button
            class="mt-[22px] flex cursor-pointer items-center justify-between border border-line bg-ink px-[18px] py-[17px] font-mono text-[10px] leading-[normal] font-normal tracking-[0.06em] text-canvas not-italic [transition:background-color_var(--ag-duration-fast,180ms)_ease,color_var(--ag-duration-fast,180ms)_ease,border-color_var(--ag-duration-fast,180ms)_ease] hover:opacity-82"
            type="submit"
            :disabled="!canSubmit"
          >
            {{ COPY.rsvp.submit }} <span>{{ COPY.rsvp.submitIcon }}</span>
          </button>
        </template>

        <MoleculesRsvpSuccess
          v-else
          :guest-name="guestName.trim()"
          :attendance-label="formattedAttendance"
          :is-attending="attendance === 'yes'"
          :guest-count="guestCount"
          :message="message.trim()"
        />
      </motion.form>

      <p class="mt-[20px] font-mono text-[9px] leading-[normal] font-normal tracking-[0.08em] text-muted not-italic">
        {{ COPY.rsvp.demoNotice }}
      </p>
    </div>
  </section>
</template>
