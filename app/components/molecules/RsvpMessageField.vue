<script setup lang="ts">
import { COPY } from '~/constants/copy'

defineProps<{
  id: string
}>()

const message = defineModel<string>({ required: true })
</script>

<template>
  <div class="flex flex-col gap-[14px]">
    <AtomsFieldLabel :for="id">
      {{ COPY.rsvp.messageLabel }} <span class="text-muted">{{ COPY.rsvp.messageOptional }}</span>
    </AtomsFieldLabel>

    <textarea
      :id="id"
      v-model="message"
      class="w-full resize-y rounded-none [border-width:0_0_1px] [border-style:none_none_solid] [border-color:currentColor_currentColor_var(--theme-line)] bg-transparent px-0 py-[14px] leading-(--ag-leading-body) text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
      maxlength="500"
      rows="3"
      :placeholder="COPY.rsvp.messagePlaceholder"
    />
  </div>
</template>
