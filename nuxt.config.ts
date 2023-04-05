// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxtjs/tailwindcss",
    "nuxt-icon",
    "nuxt-quasar-ui",
    "@element-plus/nuxt",
  ],

  plugins: [{ src: "~/plugins/element-plus", mode: "client" }],
});
