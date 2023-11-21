// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxtjs/tailwindcss",
    "nuxt-icon",
    "@element-plus/nuxt",
  ],

  plugins: [
    { src: "~/plugins/element-plus", mode: "client" },
    { src: "~/plugins/chartjs.client", mode: "client" },
  ],
});
