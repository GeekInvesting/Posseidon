<template>
  <div class="p-3 rounded-lg">
    <AdminHeader title="User" />
  </div>
  <div class="p-3 rounded-lg">
    <UserAdminTable />
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: 'auth',
  name: 'User',
})
</script>
