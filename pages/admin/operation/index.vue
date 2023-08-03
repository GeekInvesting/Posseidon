<template>
  <div class="p-3 rounded-lg">
    <AdminHeader title="Operation"/>
    <div class="p-3 rounded-lg">
      <AdminZeusOperationTable/>
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  //TODO : Implement Auth Middleware after correction of the bug login
  //middleware: 'auth',
  name: 'Operation',
})
</script>
