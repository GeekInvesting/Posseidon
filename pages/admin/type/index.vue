<template>
  <div class="p-3 rounded-lg">
    <AdminHeader title="Type" />
  </div>
  <div class="p-3 rounded-lg">
    <AdminHefestoTypeTable />
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: "auth",
  name: "Type",
});
</script>
