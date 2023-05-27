<template>
  <div class="p-3 rounded-lg">
    <AdminHeader title="Subsector" />
  </div>
  <div class="p-3 rounded-lg">
    <AdminHefestoSubsectorTable />
  </div>
</template>

<script lang="ts" setup>

definePageMeta({
  middleware: "auth",
  name: "Subsector",
});
</script>