// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxtjs/tailwindcss",
    "nuxt-icon",
    "@element-plus/nuxt",
    '@nuxtjs/eslint-module',
  ],

  plugins: [{ src: "~/plugins/element-plus", mode: "client" }],
});
