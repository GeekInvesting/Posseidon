<template>
  <div class="p-3 rounded-lg">
    <AdminHeader title="Investor" />
  </div>
  <div class="p-3 rounded-lg">
    <AdminHeraInvestorTable />
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: 'auth',
  name: 'Investor',
})

</script>
