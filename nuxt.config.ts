import tailwindcss from '@tailwindcss/vite'

import { COPY } from './app/constants/copy'

export default defineNuxtConfig({
  compatibilityDate: '2026-11-12',
  devtools: { enabled: false },
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [tailwindcss()],
  },
  typescript: {
    strict: true,
    typeCheck: true,
  },
  app: {
    head: {
      title: COPY.site.title,
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' },
        { name: 'theme-color', content: '#f5f2eb' },
        { name: 'description', content: COPY.site.description },
      ],
    },
  },
})
