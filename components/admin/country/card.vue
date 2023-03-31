<template>
  <div
    class="p-3 rounded-lg shadow-md mx-5"
    :class="{
      ' bg-green-50': country.enabled,
      ' bg-red-50': !country.enabled,
    }"
  >
    <div class="flex justify-between mx-5 w-auto">
      <span class="text-gray-500">{{ country.sigla }}</span>

      <span
        class="text-lg font-semibold"
        :class="{ 'line-through': country.deleted }"
        >{{ country.name }}</span>

      <span class="text-gray-500">
        {{ country.enabled ? "Ativo" : "Inativo" }}</span>

      <div class="mt-4 space-x-2"></div>
    
    </div>
    <button
      class="px-4 py-2 text-white bg-blue-500 rounded-md mx-5"
      @click="editCountry"
    >
      Editar
    </button>
    <button
      :class="{ hidden: country.deleted }"
      class="px-4 py-2 text-white bg-red-500 rounded-md mx-5"
      @click="deleteCountry"
    >
      Excluir
    </button>
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
  methods: {
    editCountry() {
      // implementar a lógica para editar o país
    },
    deleteCountry() {
      // implementar a lógica para excluir o país
    },
  },
});
</script>
