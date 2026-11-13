<template>
  <button
    type="button"
    class="flex min-h-[58px] cursor-pointer items-center justify-center gap-[32px] rounded-[999px] border border-ink bg-ink px-[28px] py-0 font-['DM_Mono',monospace] text-[10px] tracking-[0.12em] text-canvas [transition:background_200ms_ease,color_200ms_ease,transform_200ms_ease] hover:bg-transparent hover:text-ink hover:[transform:translateY(-3px)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent mobile:min-h-[54px] mobile:w-full mobile:max-w-[280px] motion-reduce:[transition:none]"
  >
    <slot />
  </button>
</template>
