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
  //TODO : Implement Auth Middleware after correction of the bug login
  //middleware: "auth",
  name: "Wallet Admin"
});
</script>
