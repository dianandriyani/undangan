/**
 * Single shared background-music player.
 *
 * Browsers block audio with sound until the visitor interacts with the page,
 * and Safari only allows `play()` when it is called *synchronously* inside a
 * click/tap handler. Keeping one shared `Audio` instance here lets the
 * "Open invitation" button start the music directly in its click handler,
 * while the floating MusicToggle reads and controls the same player.
 */

// Module-level state is only ever mutated in the browser (see guards below).
const audio = shallowRef<HTMLAudioElement | null>(null)
const isPlaying = ref(false)
const isLoading = ref(false)
const hasError = ref(false)

function getAudio(src: string): HTMLAudioElement | null {
  if (!import.meta.client) return null

  if (audio.value?.dataset.src === src) return audio.value

  audio.value?.pause()

  const element = new Audio(src)
  element.loop = true
  element.preload = 'auto'
  element.dataset.src = src

  element.addEventListener('play', () => {
    isPlaying.value = true
    hasError.value = false
  })
  element.addEventListener('pause', () => {
    isPlaying.value = false
  })
  element.addEventListener('error', () => {
    hasError.value = true
    isPlaying.value = false
    isLoading.value = false
  })

  audio.value = element

  return element
}

export function useBackgroundMusic() {
  /**
   * Starts playback. Call it straight from a click/tap handler (no `await`
   * before it) so the browser treats it as user-initiated.
   * Resolves to false when the browser blocks autoplay.
   */
  async function play(src: string): Promise<boolean> {
    const element = getAudio(src)

    if (!element || isLoading.value || isPlaying.value) return isPlaying.value

    isLoading.value = true
    hasError.value = false

    try {
      await element.play()

      return true
    } catch (error) {
      // NotAllowedError = autoplay blocked, not a broken file.
      if (!(error instanceof DOMException && error.name === 'NotAllowedError')) {
        hasError.value = true
      }

      return false
    } finally {
      isLoading.value = false
    }
  }

  function pause() {
    audio.value?.pause()
  }

  function toggle(src: string) {
    if (isPlaying.value) {
      pause()
      return
    }

    void play(src)
  }

  return {
    isPlaying: readonly(isPlaying),
    isLoading: readonly(isLoading),
    hasError: readonly(hasError),
    play,
    pause,
    toggle,
  }
}
