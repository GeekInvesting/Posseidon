<template>
  <div class="p-3 rounded-lg">
    <AdminHeader title="Rate IR"/>
    <div class="p-3 rounded-lg">
      <AdminZeusRateIrTable/>
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  title: 'Rate IR',
  middleware: 'auth',
})
</script>
