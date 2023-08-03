<template>
  <nav
    class="flex flex-wrap items-center justify-between w-full py-4 md:py-0 px-4 text-lg text-gray-700 bg-white"
  >
    <div class="flex items-center md:w-auto">
      <NuxtLink to="/" class="text-xl font-bold text-indigo-500">Kronos Invest</NuxtLink>
    </div>
    <div class="md:flex md:flex-wrap items-center justify-center md:w-auto">
      <el-menu
        mode="horizontal"
        class="md:flex-row md:items-center hover:transition-all"
        :ellipsis="false"
      >
        <el-menu-item index="1"><NuxtLink to="/">Home</NuxtLink></el-menu-item>
        <el-sub-menu v-if="isAdmin" index="2">
          <template #title><NuxtLink to="/admin">Admin</NuxtLink></template>
          <el-sub-menu index="2-1">
            <template #title>Hera</template>
            <el-menu-item index="2-1-1"
              ><NuxtLink to="/admin/country">Country</NuxtLink>
            </el-menu-item>
            <el-menu-item index="2-1-2"
              ><NuxtLink to="/admin/state">State</NuxtLink>
            </el-menu-item>
            <el-menu-item index="2-1-3"
              ><NuxtLink to="/admin/city">City</NuxtLink>
            </el-menu-item>
            <el-menu-item index="2-1-4">
              <NuxtLink to="/admin/investor">Investor</NuxtLink>
            </el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="2-2">
            <template #title>Hefesto</template>
            <el-menu-item index="2-2-1"
              ><NuxtLink to="/admin/exchange">Exchange</NuxtLink>
            </el-menu-item>
            <el-menu-item index="2-2-2"
              ><NuxtLink to="/admin/sector">Sector</NuxtLink>
            </el-menu-item>
            <el-menu-item index="2-2-3"
              ><NuxtLink to="/admin/subsector">Subsector</NuxtLink>
            </el-menu-item>
            <el-menu-item index="2-2-4"
              ><NuxtLink to="/admin/type">Type</NuxtLink>
            </el-menu-item>
            <el-menu-item index="2-2-5">
              <NuxtLink to="/admin/company">Company</NuxtLink>
            </el-menu-item>
            <el-menu-item index="2-2-6">
              <NuxtLink to="/admin/ticket">Ticket</NuxtLink>
            </el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="2-3">
            <template #title>Atena</template>
            <el-menu-item index="2-3-1">
              <NuxtLink to="/admin/user">User</NuxtLink>
            </el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="2-4">
            <template #title>Zeus</template>
            <el-menu-item index="2-4-1">
              <NuxtLink to="/admin/operation">Operation</NuxtLink>
            </el-menu-item>
            <el-menu-item index="2-4-2">
              <NuxtLink to="/admin/broker">Broker</NuxtLink>
            </el-menu-item>
            <el-menu-item index="2-4-3">
              <NuxtLink to="admin/yield">Yield</NuxtLink>
            </el-menu-item>
            <el-menu-item index="2-4-4">
              <NuxtLink to="/admin/wallet">Wallet</NuxtLink>
            </el-menu-item>
            <el-menu-item index="2-4-5">
              <NuxtLink to="/admin/rateIr">Rate IR</NuxtLink>
            </el-menu-item>
          </el-sub-menu>
        </el-sub-menu>
        <el-menu-item index="3" v-if="isLoged">
          <NuxtLink to="/wallet">Wallet</NuxtLink>
        </el-menu-item>
        <el-menu-item index="4">
          <NuxtLink to="/about">About</NuxtLink>
        </el-menu-item>
        <el-menu-item index="5">
          <NuxtLink to="/contact">Contact</NuxtLink>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="flex-shrink-0">
      <UserNavUser />
    </div>
  </nav>
</template>

<script lang="ts" setup>
import { useEventBus } from "~/events/eventBus";

const eventBus = useEventBus();

const isAdmin = ref(false);
const isLoged = ref(false);

onMounted(() => {
  setLogin();
});

const setLogin = () => {
  const getLogin = new GetLogin();
  isAdmin.value = true //getLogin.isAdmin();
  isLoged.value = true //getLogin.isLoged();
};

watch(
  () => eventBus.value.refreshLogin,
  (newValue) => {
    if (newValue) {
      setLogin();
    }
  }
);
</script>
