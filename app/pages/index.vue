<script setup lang="ts">
import { COPY } from '~/constants/copy'

const route = useRoute()
const { getDefault } = useInvitation()

const invitation = getDefault()

if (!invitation) {
  throw createError({
    statusCode: 404,
    statusMessage: COPY.errors.invitationNotFound,
  })
}

const recipient = computed(() => {
  const value = route.query.for

  if (typeof value !== 'string' || !value.trim()) {
    return null
  }

  return value
    .trim()
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .replace(/\b\p{L}/gu, (character) => character.toUpperCase())
})

const isOpening = ref(false)

const pageTitle = computed(
  () =>
    COPY.seo.pageTitle(
      invitation.couple.partnerOne,
      invitation.couple.partnerTwo,
      invitation.title,
    ),
)

const pageDescription = computed(
  () => invitation.couple.shortIntro,
)

useSeoMeta({
  title: pageTitle,
  description: pageDescription,
  ogTitle: pageTitle,
  ogDescription: pageDescription,
  twitterCard: 'summary_large_image',
})

const { play: playMusic } = useBackgroundMusic()
const { showMusicToggle, musicUrl } = invitation.settings

async function openInvitation() {
  // Start music inside the click handler itself (before any await),
  // so browsers — Safari especially — accept it as user-initiated.
  if (showMusicToggle && musicUrl) {
    void playMusic(musicUrl)
  }

  isOpening.value = true

  await nextTick()

  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'instant',
  })
}
</script>

<template>
  <TemplatesThemeProvider :theme="invitation.theme">
    <OrganismsInvitationOpening
      v-if="recipient && !isOpening"
      :couple="invitation.couple"
      :recipient="recipient"
      :wedding-date="invitation.weddingDate"
      @open="openInvitation"
    />

    <TemplatesInvitationTemplate
      v-else
      :invitation="invitation"
    />
  </TemplatesThemeProvider>
</template>
