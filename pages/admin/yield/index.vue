<template>
  <div class="p-3 rounded-lg">
    <AdminHeader title="Yield"/>
    <div class="p-3 rounded-lg">
      <AdminZeusYieldTable/>
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: "auth",
});
</script>
