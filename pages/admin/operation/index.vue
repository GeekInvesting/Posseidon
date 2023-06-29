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
  middleware: 'auth',
  name: 'Operation',
})
</script>
