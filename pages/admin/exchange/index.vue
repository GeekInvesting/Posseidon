//pages/admin/exchange/index.vue
<template>
  <div class="p-3 rounded-lg">
    <AdminHeader title="Exchange" />
  </div>
  <div class="p-3 rounded-lg">
    <AdminHefestoExchangeTable />
  </div>
</template>

<script lang="ts" setup>

definePageMeta({
  middleware: "auth",
  name: "Exchange",
});

</script>
