<template>
  <div class="p-3 rounded-lg flex justify-between w-auto">
    <NuxtLink to="/admin"> <Icon name="ic:outline-arrow-back"/> Admin</NuxtLink>
    <AdminButton button-text="Criar" route="/admin/country"></AdminButton>
  </div>
  <div class="space-y-5">
    <AdminCountryCard
      v-for="country in countries"
      :key="country.id"
      :country="country"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Country } from "~~/model/Country";

export default defineComponent({
  data() {
    return {
      countries: [
        { id: 1, name: "Brasil", sigla: "BRA", enabled: true, deleted: false },
        { id: 2, name: "Estados Unidos", sigla: "USA", enabled: false, deleted: false },
        { id: 3, name: "Argentina", sigla: "ARG", enabled: false, deleted: true },
      ] as Country[],
    };
  },
});
</script>
