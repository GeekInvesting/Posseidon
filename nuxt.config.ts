// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxtjs/tailwindcss",
    "nuxt-icon",
    "nuxt-quasar-ui",
    "@element-plus/nuxt",
  ],

  build: {
    transpile: ["primevue"],
  },
  css: [
    "primevue/resources/themes/lara-light-blue/theme.css",
    "primevue/resources/primevue.css",
    "primeicons/primeicons.css",
  ],

  plugins: [{ src: "~/plugins/element-plus", mode: "client" }],
});
