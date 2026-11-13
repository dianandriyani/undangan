
import type { Component } from 'vue'

import CoverBlock from '../components/organisms/CoverBlock.vue'
import VerseBlock from '../components/organisms/VerseBlock.vue'
import StoryBlock from '../components/organisms/StoryBlock.vue'
import GalleryBlock from '../components/organisms/GalleryBlock.vue'
import EventBlock from '../components/organisms/EventBlock.vue'
import RsvpBlock from '../components/organisms/RsvpBlock.vue'
import ClosingBlock from '../components/organisms/ClosingBlock.vue'

import type { InvitationBlock } from '../../shared/types/invitation'

export type InvitationBlockType = InvitationBlock['type']

export const blockRegistry = {
  cover: CoverBlock,
  verse: VerseBlock,
  story: StoryBlock,
  gallery: GalleryBlock,
  event: EventBlock,
  rsvp: RsvpBlock,
  closing: ClosingBlock,
} satisfies Record<InvitationBlockType, Component>
