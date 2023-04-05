<template>
  <div class="p-3 rounded-lg flex justify-between w-auto">
    <NuxtLink to="/admin">
      <Icon name="ic:outline-arrow-back" /> Admin</NuxtLink
    >
    <Button
      class="px-4 py-2 text-white bg-green-500 rounded-md mx-5"
      @click="createCountry"
    >
      Novo
    </Button>
  </div>
  <AdminCountryForm :class="{ 'hidden max-w-max': !hiddenCreate }" />
  <br />
  <div v-if="isLoading">Carregando...</div>
  <div v-else>
    <div class="space-y-5">
      <AdminCountryCard
        v-for="country in countries"
        :key="country.id"
        :country="country"
      />
    </div>
  </div>
</template>

<script lang="ts">

import { defineComponent } from "vue";
import { Country } from "~~/model/Country";

export default defineComponent({
  data() {
    return {
      hiddenCreate: false,
      isLoading: true,
      countries: [] as Country[],
    };
  },
  async fetch() {
    try {
      const response = await $fetch("http://localhost:8101/hera/country");
      if (!response.ok) {
        throw new Error("Erro ao carregar os países");
      }
      const data = await response.json();
      console.log(data);
      this.countries = data;
      this.isLoading = false;
    } catch (error) {
      console.error(error);
    }
  },
  methods: {
    createCountry() {
      this.hiddenCreate = !this.hiddenCreate;
      // implementar a lógica para editar o país
    },
  },
});

/*
Old version
import { defineComponent } from "vue";
import { Country } from "~~/model/Country";

export default defineComponent({
  data() {
    return {
      hiddenCreate: false,

      countries: [
        { id: '1', countryName: "Brasil", countryCode: "BRA", countryEnabled: true, countryDeleted: false },
        { id: '2', countryName: "Estados Unidos", countryCode: "USA", countryEnabled: false, countryDeleted: false },
        { id: '3', countryName: "Argentina", countryCode: "ARG", countryEnabled: false, countryDeleted: true },
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
*/
</script>
