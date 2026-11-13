
export type InvitationThemeId = 'avant-garde' | 'sage-botanical'

export type InvitationStatus = 'draft' | 'published'

export interface CoupleProfile {
  partnerOne: string
  partnerTwo: string
  shortIntro: string
}

export interface InvitationEvent {
  id: string
  label: string
  date: string
  startTime: string
  endTime?: string
  venue: string
  address: string
}

export interface InvitationSettings {
  showCountdown: boolean
  showMusicToggle: boolean
  musicUrl?: string
  allowRsvp: boolean
}

export interface BaseInvitationBlock {
  id: string
  eyebrow?: string
}

export interface CoverBlock extends BaseInvitationBlock {
  type: 'cover'
  variant: 'typography' | 'photographic'
  eyebrow: string
  headline: string
  supportingText: string
}

export interface StoryBlock extends BaseInvitationBlock {
  type: 'story'
  variant: 'editorial' | 'timeline'
  eyebrow: string
  title: string
  body: string
  year: string
}

export interface GalleryImage {
  id: string
  src: string
  alt: string
  caption?: string
}

export interface GalleryBlock extends BaseInvitationBlock {
  type: 'gallery'
  variant: 'grid' | 'masonry'
  eyebrow: string
  title: string
  images: GalleryImage[]
}

export interface EventBlock extends BaseInvitationBlock {
  type: 'event'
  variant: 'minimal' | 'cards'
  eyebrow: string
  title: string
  events: InvitationEvent[]
}

export interface RsvpBlock extends BaseInvitationBlock {
  type: 'rsvp'
  variant: 'classic'
  eyebrow: string
  title: string
  description: string
  maxGuests?: number
}

export interface ClosingBlock extends BaseInvitationBlock {
  type: 'closing'
  variant: 'statement'
  message: string
  signature: string
}

export type InvitationBlock =
  | CoverBlock
  | StoryBlock
  | GalleryBlock
  | EventBlock
  | RsvpBlock
  | ClosingBlock

export interface Invitation {
  id: string
  slug: string
  status: InvitationStatus
  theme: InvitationThemeId
  title: string
  couple: CoupleProfile
  weddingDate: string
  settings: InvitationSettings
  blocks: InvitationBlock[]
}
