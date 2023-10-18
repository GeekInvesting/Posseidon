<template>
  <div class="p-3 rounded-lg">
    <WalletHeader title="Wallet"/>
    <div class="p-3 rounded-lg">
      Hello Wallet
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: "auth",
  name: "Wallets"
});
</script>
