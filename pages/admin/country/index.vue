<template>
  <div class="p-3 rounded-lg flex justify-between w-auto">
    <NuxtLink to="/admin">
      <Icon name="ic:outline-arrow-back" /> Admin</NuxtLink
    >
    <Button
      class="px-4 py-2 text-white bg-green-500 rounded-md mx-5"
      @click="createCountry"
    >
      New Country
    </Button>
  </div>
  <AdminCountryForm v-if="hiddenCreate" class="max-w-max" />
  <br />
  <AdminCountryTable />
</template>

<script lang="ts" setup>
import { defineExpose } from 'vue';

let hiddenCreate: Ref<boolean> = ref(false);

const createCountry = () => {
  hiddenCreate.value = !hiddenCreate.value;
};

defineExpose({
  createCountry
});
</script>
