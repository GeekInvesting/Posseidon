<template>
  <div class="p-3 rounded-lg">
    <WalletHeader title="Wallet"/>
    <div class="p-3 rounded-lg">
      <WalletAverage />
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: "auth",
  name: "Wallet Admin"
});
</script>
