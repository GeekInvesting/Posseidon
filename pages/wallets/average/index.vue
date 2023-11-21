<template>
  <div class="p-3 rounded-lg">
    <WalletHeader title="Average"/>
    <div class="p-3 rounded-lg">
      <WalletAverage/>
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: "auth-user",
  name: "Average"
});
</script>
