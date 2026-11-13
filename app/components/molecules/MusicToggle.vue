<script setup lang="ts">
import { COPY } from '~/constants/copy'

const props = defineProps<{
  src: string
}>()

const audio = ref<HTMLAudioElement | null>(null)
const isPlaying = ref(false)
const isLoading = ref(false)
const hasError = ref(false)

async function togglePlayback() {
  if (!audio.value || isLoading.value) return

  if (isPlaying.value) {
    audio.value.pause()
    return
  }

  try {
    isLoading.value = true
    hasError.value = false

    await audio.value.play()
  } catch {
    hasError.value = true
    isPlaying.value = false
  } finally {
    isLoading.value = false
  }
}

function handlePlay() {
  isPlaying.value = true
  hasError.value = false
}

function handlePause() {
  isPlaying.value = false
}

function handleError() {
  hasError.value = true
  isPlaying.value = false
  isLoading.value = false
}

onBeforeUnmount(() => {
  audio.value?.pause()
})
</script>

<template>
  <div class="fixed right-[32px] bottom-[32px] z-50 mobile:right-[20px] mobile:bottom-[20px]">
    <audio
      ref="audio"
      :src="props.src"
      loop
      preload="none"
      @play="handlePlay"
      @pause="handlePause"
      @error="handleError"
    />

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
