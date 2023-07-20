<template>
  <div class="p-3 rounded-lg">
    <AdminHeader title="Wallet"/>
    <div class="p-3 rounded-lg">
      <AdminZeusWalletTable/>
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: "auth",
  name: "Wallet Admin"
});
</script>
