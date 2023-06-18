//city.vue
<template>
  <div class="p-3 rounded-lg">
    <AdminHeader title="City" />
  </div>
  <div class="p-3 rounded-lg">
    <AdminCityTable />
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: "auth",
  name: "City",
});
</script>
