<template>
  <div class="p-3 rounded-lg">
    <AdminHeader title="Ticket" />
  </div>
  <div class="p-3 rounded-lg">
    <AdminHefestoTicketTable />
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  //TODO : Implement Auth Middleware after correction of the bug login
  //middleware: "auth",
  name: "Ticket",
});
</script>
