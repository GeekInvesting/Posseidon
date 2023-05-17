<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 m-3">
    <el-card class="card">
      <template #header>
        <div class="card-header text-center font-bold text-xl">
          <span>Hera</span>
        </div>
      </template>
      <div class="card-content text-center grid grid-cols-3 justify-items-stretch gap-3">
        <NuxtLink
          to="/admin/country"
          class="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Country
        </NuxtLink>
        <NuxtLink
          to="/admin/state"
          class="bg-blue-500 text-white px-4 py-2 rounded"
        >
          State
        </NuxtLink>
        <NuxtLink
          to="/admin/city"
          class="bg-blue-500 text-white px-4 py-2 rounded"
        >
          City
        </NuxtLink>
      </div>
    </el-card>
    <el-card class="card">
      <template #header>
        <div class="card-header text-center font-bold text-xl">
          <span>Hefesto</span>
        </div>
      </template>
      <div class="card-content text-center grid grid-cols-3 justify-items-stretch gap-3">
        <NuxtLink
          to="/admin/country"
          class="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Exchange
        </NuxtLink>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts" setup>

definePageMeta({
  middleware: 'auth',
})
</script>

<style>
</style>
