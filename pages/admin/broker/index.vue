<template>
  <div class="p-3 rounded-lg">
    <AdminHeader title="Broker"/>
    <div class="p-3 rounded-lg">
      <AdminZeusBrokerTable/>
    </div>
  </div>
</template>

<script setup lang="ts">

definePageMeta({
  title: 'Broker',
  auth: true,
  middleware: 'auth',
})

</script>
