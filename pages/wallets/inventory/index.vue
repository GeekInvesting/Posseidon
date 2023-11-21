<template>
  <div class="p-3 rounded-lg">
    <WalletHeader title="Inventory"/>
    <div class="p-3 rounded-lg">
      <AdminZeusWalletTable/>
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: "auth-user",
  name: "Investory"
});
</script>
