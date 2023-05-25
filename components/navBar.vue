<template>
  <nav
    class="flex flex-wrap items-center justify-between w-full py-4 md:py-0 px-4 text-lg text-gray-700 bg-white"
  >
    <div class="flex items-center md:w-auto">
      <NuxtLink to="/" class="text-xl font-bold text-indigo-500">Logo</NuxtLink>
    </div>
    <div class="md:flex-wrap items-center justify-center md:w-auto">
      <el-menu
        mode="horizontal"
        class="md:flex-row md:items-center hover:transition-all"
      >
        <el-menu-item index="1"><NuxtLink to="/">Home</NuxtLink></el-menu-item>
        <el-sub-menu v-if="isAdmin" index="2">
          <template #title><NuxtLink to="/admin">Admin</NuxtLink></template>
          <el-sub-menu index="2-1">
            <template #title>Hera</template>
            <el-menu-item index="2-1-1"
              ><NuxtLink to="/admin/country">Country</NuxtLink></el-menu-item
            >
            <el-menu-item index="2-1-2"
              ><NuxtLink to="/admin/state">State</NuxtLink></el-menu-item
            >
            <el-menu-item index="2-1-3"
              ><NuxtLink to="/admin/city">City</NuxtLink></el-menu-item
            >
          </el-sub-menu>
          <el-sub-menu index="2-2">
            <template #title>Hefesto</template>
            <el-menu-item index="2-2-1"
              ><NuxtLink to="/admin/exchange">Exchange</NuxtLink></el-menu-item
            >
            <el-menu-item index="2-2-2"
              ><NuxtLink to="/admin/sector">Sector</NuxtLink></el-menu-item
            >
          </el-sub-menu>
        </el-sub-menu>
        <el-menu-item index="3"
          ><NuxtLink to="/about">About</NuxtLink></el-menu-item
        >
      </el-menu>
    </div>
    <div>
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
  if (process.client) {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    isAdmin.value = user && user.userRole === "admin";
    isLoged.value =
      (user && user.userRole === "admin") || user.userRole === "user";
  }
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
