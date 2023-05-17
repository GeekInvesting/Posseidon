<template>
  <div>
    <Suspense>
      <template #default>
        <NuxtLayout />
      </template>
      <template #fallback>
        <div>Loading...</div>
      </template>
    </Suspense>
  </div>
</template>
<script setup lang="ts">
</script>
