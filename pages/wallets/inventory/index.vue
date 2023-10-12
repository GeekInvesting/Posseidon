<template>
  <div class="p-3 rounded-lg">
    <WalletHeader title="Inventory"/>
    <div class="p-3 rounded-lg">
      Hello Inventory
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: "auth",
  name: "Investory"
});
</script>
