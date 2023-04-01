<template>
  <div class="p-3 rounded-lg flex justify-between w-auto">
    <NuxtLink to="/admin"> <Icon name="ic:outline-arrow-back"/> Admin</NuxtLink>
    <Button 
    class="px-4 py-2 text-white bg-green-500 rounded-md mx-5"
    @click="createCountry" > 
    Novo
    </Button>
  </div>
  <AdminCountryForm 
  :class="{'hidden max-w-max': !hiddenCreate}" />
  <br>
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
      hiddenCreate: false,

      countries: [
        { id: 1, name: "Brasil", sigla: "BRA", enabled: true, deleted: false },
        { id: 2, name: "Estados Unidos", sigla: "USA", enabled: false, deleted: false },
        { id: 3, name: "Argentina", sigla: "ARG", enabled: false, deleted: true },
      ] as Country[],

    };
  },
  methods: {
    createCountry() {
      this.hiddenCreate = !this.hiddenCreate;
      // implementar a lógica para editar o país
    },
  }
});
</script>
