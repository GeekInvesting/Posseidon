<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 m-3">
    <el-card class="card">
      <template #header>
        <div class="card-header text-center font-bold text-xl">
          <span>Hera</span>
        </div>
      </template>
      <div
        class="card-content text-center grid grid-cols-3 justify-items-stretch gap-3"
      >
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
        <NuxtLink
          to="/admin/investor"
          class="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Investor
        </NuxtLink>
      </div>
    </el-card>
    <el-card class="card">
      <template #header>
        <div class="card-header text-center font-bold text-xl">
          <span>Hefesto</span>
        </div>
      </template>
      <div
        class="card-content text-center grid grid-cols-3 justify-items-stretch gap-3"
      >
        <NuxtLink
          to="/admin/exchange"
          class="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Exchange
        </NuxtLink>
        <NuxtLink
          to="/admin/sector"
          class="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Sector
        </NuxtLink>
        <NuxtLink
          to="/admin/subsector"
          class="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Subsector
        </NuxtLink>
        <NuxtLink
          to="/admin/type"
          class="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Type
        </NuxtLink>
        <NuxtLink
          to="/admin/company"
          class="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Company
        </NuxtLink>
        <NuxtLink
          to="/admin/ticket"
          class="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Ticket
        </NuxtLink>
      </div>
    </el-card>
    <el-card class="card">
      <template #header>
        <div class="card-header text-center font-bold text-xl">
          <span>Atena</span>
        </div>
      </template>
      <div
        class="card-content text-center grid grid-cols-3 justify-items-stretch gap-3"
      >
        <NuxtLink
          to="/admin/user"
          class="bg-blue-500 text-white px-4 py-2 rounded"
        >
          User
        </NuxtLink>
        <NuxtLink
          to="admin/scheduler"
          class="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Scheduler
        </NuxtLink>
      </div>
    </el-card>
    <el-card class="card">
      <template #header>
        <div class="card-header text-center font-bold text-xl">
          <span>Zeus</span>
        </div>
      </template>
      <div
        class="card-content text-center grid grid-cols-3 justify-items-stretch gap-3"
      >
        <NuxtLink
          to="/admin/operation"
          class="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Operation
        </NuxtLink>
        <NuxtLink
          to="/admin/broker"
          class="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Broker
        </NuxtLink>
        <NuxtLink
          to="admin/yield"
          class="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Yield
        </NuxtLink>
        <NuxtLink
          to="admin/wallet"
          class="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Wallet
        </NuxtLink>
        <NuxtLink
          to="admin/rateIr"
          class="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Rate IR
        </NuxtLink>
      </div>
    </el-card>
  </div>
</template>
<script lang="ts" setup>
definePageMeta({
  middleware: "auth",
  name: "Admin Panel"
});
</script>
