<template>
  <div class="p-3 rounded-lg">
    <AdminHeader title="Country" />
  </div>
  <AdminCountryForm v-if="hiddenCreate" class="max-w-max" />
  <br />
  <AdminCountryTable />
</template>

<script lang="ts" setup>
let hiddenCreate: Ref<boolean> = ref(false);

const createCountry = () => {
  hiddenCreate.value = !hiddenCreate.value;
};
</script>
