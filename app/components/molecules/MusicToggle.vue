<script setup lang="ts">
import { COPY } from '~/constants/copy'

const props = defineProps<{
  src: string
}>()

const { isPlaying, isLoading, hasError, play, pause, toggle } = useBackgroundMusic()

const interactionEvents = ['click', 'touchend', 'keydown'] as const

function startOnFirstInteraction() {
  removeInteractionListeners()
  void play(props.src)
}

function removeInteractionListeners() {
  for (const event of interactionEvents) {
    document.removeEventListener(event, startOnFirstInteraction)
  }
}

onMounted(async () => {
  // Already started by the "Open invitation" click, or autoplay allowed.
  if (isPlaying.value || await play(props.src)) return

  // Autoplay blocked: start on the visitor's first tap/click/key press.
  for (const event of interactionEvents) {
    document.addEventListener(event, startOnFirstInteraction, { once: true })
  }
})

onBeforeUnmount(() => {
  removeInteractionListeners()
  pause()
})

function togglePlayback() {
  removeInteractionListeners()
  toggle(props.src)
}
</script>

<template>
  <div class="fixed right-[32px] bottom-[32px] z-50 mobile:right-[20px] mobile:bottom-[20px]">
    <button
      type="button"
      class="flex min-h-[52px] cursor-pointer items-center gap-[12px] rounded-[999px] border border-line bg-canvas px-[20px] py-0 text-ink [transition:background-color_var(--ag-duration-fast)_var(--ag-ease-standard),color_var(--ag-duration-fast)_var(--ag-ease-standard),transform_var(--ag-duration-fast)_var(--ag-ease-standard)] hover:enabled:bg-ink hover:enabled:text-canvas hover:enabled:[transform:translateY(-3px)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent disabled:cursor-wait disabled:opacity-65 mobile:min-h-[46px] mobile:gap-[10px] mobile:px-[16px] motion-reduce:[transition:none]"
      :aria-label="isPlaying ? COPY.music.pauseAriaLabel : COPY.music.playAriaLabel"
      :aria-pressed="isPlaying"
      :disabled="isLoading"
      @click="togglePlayback"
    >
      <span
        class="flex h-[16px] w-[14px] items-center justify-center gap-[3px]"
        aria-hidden="true"
      >
        <span
          v-for="delay in ['', '[animation-delay:180ms]', '[animation-delay:350ms]']"
          :key="delay"
          class="h-[5px] w-[2px] origin-center rounded-[2px] bg-current"
          :class="isPlaying && ['animate-equalizer motion-reduce:animate-none motion-reduce:[transform:scaleY(1.5)]', delay]"
        />
      </span>

      <span class="font-mono text-[9px] font-medium tracking-[0.12em] whitespace-nowrap mobile:text-[8px]">
        {{ hasError ? COPY.music.unavailable : isLoading ? COPY.music.loading : isPlaying ? COPY.music.pause : COPY.music.play }}
      </span>
    </button>
  </div>
</template>
