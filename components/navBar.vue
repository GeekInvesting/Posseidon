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
          <el-menu-item index="2-1"
            ><NuxtLink to="/admin/country">Country</NuxtLink></el-menu-item
          >
          <el-menu-item index="2-2"
            ><NuxtLink to="/admin/state">State</NuxtLink></el-menu-item
          >
          <el-menu-item index="2-3"
            ><NuxtLink to="/admin/city">City</NuxtLink></el-menu-item
          >
        </el-sub-menu>
        <el-menu-item index="3"
          ><NuxtLink to="about">About</NuxtLink></el-menu-item
        >
      </el-menu>
    </div>
    <div class="md:flex items-center">
      <el-dropdown size="large">
        <el-button circle>
          <el-avatar
            src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
          />
        </el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <template #default v-if="isLoged">
              <el-dropdown-item>
                <button>
                  <NuxtLink to="/auth/signin">
                    <Icon name="ic:round-assignment-ind" />
                    User
                  </NuxtLink>
                </button>
              </el-dropdown-item>
              <el-dropdown-item>
                <button @click="logout">
                  <Icon name="memory:logout" />
                  Logout
                </button>
              </el-dropdown-item>
            </template>
            <template #default v-else>
              <el-dropdown-item>
                <button>
                  <NuxtLink to="/auth/signin">
                    <Icon name="memory:login" />
                    Sing In
                  </NuxtLink>
                </button>
              </el-dropdown-item>
              <el-dropdown-item>
                <button>
                  <NuxtLink to="/user">
                    <Icon name="ic:round-assignment-ind" />
                    Sing Up
                  </NuxtLink>
                </button>
              </el-dropdown-item>
            </template>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </nav>
</template>

<script lang="ts" setup>
import { useEventBus } from '~/events/eventBus';

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
    isLoged.value = user && user.userRole === "admin" || user.userRole === "user";
  }
}

watch(
  () => eventBus.value.refreshLogin,
  (newValue) => {
    if (newValue) {
      setLogin();
      eventBus.value.refreshLogin = false;
    }
  }
);


const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  window.location.reload();
};
</script>
