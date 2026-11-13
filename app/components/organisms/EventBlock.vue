<script setup lang="ts">
import { COPY } from '~/constants/copy'
import type {
  EventBlock as EventBlockData,
} from '../../../shared/types/invitation'

const props = defineProps<{
  block: EventBlockData
}>()
</script>

<template>
  <section
    class="grid grid-cols-[minmax(130px,0.7fr)_minmax(0,2fr)] gap-[clamp(36px,8vw,140px)] px-(--ag-section-padding) mobile:grid-cols-[1fr] mobile:gap-[38px] border-t border-t-line pt-[160px] pb-[180px] mobile:pt-[100px] mobile:pb-[110px]"
    :data-variant="props.block.variant"
  >
    <MoleculesSectionMeta
      :label="block.eyebrow"
      :detail="COPY.event.sectionDetail"
    />

    <div>
      <h2 class="mx-0 mt-0 mb-[85px] font-display text-[length:clamp(54px,8vw,112px)] leading-[0.99] font-medium tracking-(--ag-tracking-tight) whitespace-pre-line mobile:text-[length:clamp(52px,14vw,82px)] mobile:mb-[50px]">
        {{ block.title }}
      </h2>

      <div class="border-t border-t-line">
        <MoleculesEventItem
          v-for="(event, index) in block.events"
          :key="event.id"
          :event="event"
          :index="index"
        />
      </div>
    </div>
  </section>
</template>
