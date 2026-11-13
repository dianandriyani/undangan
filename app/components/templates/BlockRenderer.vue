
<script setup lang="ts">

import { blockRegistry } from '../../registries/block-registry'
import type { InvitationBlock } from '../../../shared/types/invitation'

const props = defineProps<{
  block: InvitationBlock
}>()

const component = computed<Component | null>(() => {
  return blockRegistry[props.block.type] ?? null
})
</script>

<template>
  <component
    :is="component"
    :block="block"
  />
</template>
