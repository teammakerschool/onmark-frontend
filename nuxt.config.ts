// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:5000'
    }
  },

  app: {
    head: {
      title: 'OnMark - 사진 워터마크 보호 서비스',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'OnMark로 사진을 안전하게 보호하세요' }
      ]
    }
  },

  css: ['~/assets/css/main.css'],

  modules: []
})