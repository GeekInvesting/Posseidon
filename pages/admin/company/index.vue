<template>
  <div class="p-3 rounded-lg">
    <AdminHeader title="Company" />
  </div>
  <div class="p-3 rounded-lg">
    <AdminHefestoCompanyTable />
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: "auth",
  name: "Company",
});
</script>
