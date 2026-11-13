<script setup lang="ts">
import { COPY } from '~/constants/copy'
import {
  getWhatsAppUrl,
  normalizeWhatsAppNumber,
  toRecipientParam,
} from '~/utils/whatsapp'

const { getDefault } = useInvitation()
const requestUrl = useRequestURL()

const invitation = getDefault()

if (!invitation) {
  throw createError({
    statusCode: 404,
    statusMessage: COPY.errors.invitationNotFound,
  })
}

useSeoMeta({
  title: COPY.dashboard.pageTitle,
  robots: 'noindex, nofollow',
})

const nameId = useId()
const phoneId = useId()
const linkId = useId()
const messageId = useId()

const guestName = ref('')
const phone = ref('')

const trimmedName = computed(() => guestName.value.trim().replace(/\s+/g, ' '))

const normalizedPhone = computed(() => normalizeWhatsAppNumber(phone.value))

const showPhoneError = computed(() => {
  return phone.value.trim().length > 0 && !normalizedPhone.value
})

const invitationLink = computed(() => {
  if (!trimmedName.value) return ''

  const url = new URL('/', requestUrl.origin)
  url.searchParams.set('for', toRecipientParam(trimmedName.value))

  return url.toString()
})

const message = computed(() => {
  if (!invitationLink.value) return ''

  return COPY.dashboard.message({
    guestName: trimmedName.value,
    link: invitationLink.value,
    coupleNames: `${invitation.couple.partnerOne} & ${invitation.couple.partnerTwo}`,
  })
})

const canSend = computed(() => Boolean(message.value && normalizedPhone.value))

function sendToWhatsApp() {
  if (!canSend.value || !normalizedPhone.value) return

  window.open(
    getWhatsAppUrl(normalizedPhone.value, message.value),
    '_blank',
    'noopener,noreferrer',
  )
}

const inputClass = 'w-full rounded-none [border-width:0_0_1px] [border-style:none_none_solid] [border-color:currentColor_currentColor_var(--theme-line)] bg-transparent px-0 py-[14px] text-ink [outline:none] [transition:border-color_var(--ag-duration-fast,180ms)_ease] focus:border-ink'
</script>

<template>
  <TemplatesThemeProvider :theme="invitation.theme">
    <main class="mx-auto grid max-w-(--ag-container) grid-cols-[minmax(130px,0.7fr)_minmax(0,2fr)] gap-[clamp(36px,8vw,140px)] px-(--ag-section-padding) pt-[120px] pb-[140px] mobile:grid-cols-[1fr] mobile:gap-[38px] mobile:pt-[64px] mobile:pb-[90px]">
      <MoleculesSectionMeta
        :label="COPY.dashboard.eyebrow"
        :detail="invitation.title.toUpperCase()"
      />

      <div class="max-w-[640px]">
        <h1 class="m-0 font-display text-[clamp(48px,7vw,96px)] leading-[0.99] font-medium tracking-(--ag-tracking-tight) whitespace-pre-line mobile:text-[clamp(44px,12vw,72px)]">
          {{ COPY.dashboard.heading }}
        </h1>

        <p class="mx-0 mt-[30px] mb-[50px] max-w-[420px] text-[14px] leading-[1.8] text-muted">
          {{ COPY.dashboard.description }}
        </p>

        <form
          class="flex flex-col gap-[13px]"
          @submit.prevent="sendToWhatsApp"
        >
          <AtomsFieldLabel :for="nameId">
            {{ COPY.dashboard.nameLabel }}
          </AtomsFieldLabel>

          <input
            :id="nameId"
            v-model="guestName"
            :class="inputClass"
            autocomplete="off"
            maxlength="100"
            :placeholder="COPY.dashboard.namePlaceholder"
            required
          >

          <AtomsFieldLabel :for="phoneId">
            {{ COPY.dashboard.phoneLabel }}
          </AtomsFieldLabel>

          <input
            :id="phoneId"
            v-model="phone"
            :class="inputClass"
            type="tel"
            inputmode="tel"
            autocomplete="off"
            maxlength="20"
            :placeholder="COPY.dashboard.phonePlaceholder"
            :aria-invalid="showPhoneError"
            required
          >

          <span
            class="font-mono text-[10px] tracking-[0.04em]"
            :class="showPhoneError ? 'text-accent' : 'text-muted'"
          >
            {{ showPhoneError ? COPY.dashboard.phoneInvalid : COPY.dashboard.phoneHint }}
          </span>

          <AtomsFieldLabel :for="linkId">
            {{ COPY.dashboard.linkLabel }}
          </AtomsFieldLabel>

          <input
            :id="linkId"
            :value="invitationLink"
            :class="inputClass"
            class="cursor-not-allowed text-muted"
            :placeholder="COPY.dashboard.linkPlaceholder"
            disabled
          >

          <template v-if="message">
            <AtomsFieldLabel :for="messageId">
              {{ COPY.dashboard.messageLabel }}
            </AtomsFieldLabel>

            <textarea
              :id="messageId"
              :value="message"
              class="mt-[6px] w-full resize-none border border-line bg-surface p-[16px] font-sans text-[13px] leading-[1.7] text-ink"
              rows="12"
              readonly
            />
          </template>

          <button
            class="mt-[22px] flex cursor-pointer items-center justify-between border border-line bg-ink px-[18px] py-[17px] font-mono text-[10px] leading-[normal] font-normal tracking-[0.06em] text-canvas not-italic [transition:opacity_var(--ag-duration-fast,180ms)_ease] hover:enabled:opacity-82 disabled:cursor-not-allowed disabled:opacity-40"
            type="submit"
            :disabled="!canSend"
          >
            {{ COPY.dashboard.send }} <span aria-hidden="true">{{ COPY.dashboard.sendIcon }}</span>
          </button>
        </form>
      </div>
    </main>
  </TemplatesThemeProvider>
</template>
