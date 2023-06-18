<template>
  <div class="p-3 rounded-lg">
    <AdminHeader title="Sector" />
  </div>
  <div class="p-3 rounded-lg">
    <AdminHefestoSectorTable />
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: "auth",
  name: "Sector",
});
</script>
