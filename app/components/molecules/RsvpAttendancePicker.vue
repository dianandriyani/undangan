<script setup lang="ts">
import { COPY } from '~/constants/copy'

defineProps<{
  value: 'yes' | 'no' | ''
}>()

const emit = defineEmits<{
  select: [value: 'yes' | 'no']
}>()
</script>

<template>
  <div
    role="group"
    :aria-label="COPY.rsvp.attendanceAriaLabel"
  >
    <span>{{ COPY.rsvp.attendanceLabel }}</span>

    <div class="flex flex-wrap gap-[10px] mobile:flex-col">
      <AtomsOptionButton
        :selected="value === 'yes'"
        @click="emit('select', 'yes')"
      >
        {{ COPY.rsvp.accept }}
      </AtomsOptionButton>

      <AtomsOptionButton
        :selected="value === 'no'"
        @click="emit('select', 'no')"
      >
        {{ COPY.rsvp.decline }}
      </AtomsOptionButton>
    </div>
  </div>
</template>
