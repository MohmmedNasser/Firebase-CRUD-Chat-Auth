// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  typescript: {
    typeCheck: true
  },
  colorMode: {
    preference: 'light',
    classPrefix: '',
    classSuffix: '',
  },
  modules: ['shadcn-nuxt', '@nuxtjs/tailwindcss', '@nuxtjs/color-mode', '@nuxt/icon'],
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: './components/ui'
  },
  ssr: false,
})