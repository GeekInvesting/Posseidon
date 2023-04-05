<template>
  <div
    class="p-3 rounded-lg shadow-md mx-5"
    :class="{
      ' bg-green-50': country.countryEnabled,
      ' bg-red-50': !country.countryEnabled,
    }"
  >
    <div class="flex justify-between mx-5 w-auto">
      <span class="text-gray-500">{{ country.countryCode }}</span>

      <span
        class="text-lg font-semibold"
        :class="{ 'line-through': country.countryDeleted }"
        >{{ country.countryName }}</span
      >

      <span class="text-gray-500">
        {{ country.countryEnabled ? "Ativo" : "Inativo" }}</span
      >

    </div>
    <br>
    <button
      class="px-4 py-2 text-white bg-blue-500 rounded-md mx-5"
      @click="editCountry"
    >
      Editar
    </button>
    <button
      :class="{ 'hidden': !country.countryEnabled }"
      class="px-4 py-2 text-white bg-blue-500 rounded-md mx-5"
      @click="enabledCountry"
    >
      Ativar
    </button>
    <button
      :class="{ 'hidden': country.countryDeleted }"
      class="px-4 py-2 text-white bg-blue-500 rounded-md mx-5"
      @click="disabledCountry"
    >
      Desativar
    </button>
    <button
      :class="{ 'hidden': country.countryDeleted }"
      class="px-4 py-2 text-white bg-red-500 rounded-md mx-5"
      @click="deleteCountry"
    >
      Excluir
    </button>
    <br />
    <div :class="{ 'hidden': !hiddenUpdate }">
      <AdminCountryForm :initial-data="country" />
    </div>
  </div>
</template>

<script lang="ts">
import { Country } from "~~/model/Country";

export default defineComponent({
  props: {
    country: {
      type: Object as () => Country,
      required: true,
    },
  },
  data() {
    return {
      hiddenUpdate: false,
    };
  },
  methods: {
    editCountry() {
      this.hiddenUpdate = !this.hiddenUpdate;
      // implementar a lógica para editar o país
    },
    deleteCountry() {
      // implementar a lógica para excluir o país
    },
    enabledCountry() {},
    disabledCountry() {},
  },
});
</script>
