<template>
  <div class="flex flex-col h-screen">
    <span class="w-full h-16 fixed top-0">
      <NavBar />
    </span>
    <div class="flex flex-grow mt-16">
      <span v-if="isLoged" class="ml-5 w-60 h-full fixed py-5">
        <UserSideBarUser />
      </span>
      <span class="w-full ml-64 py-5">
        <NuxtPage />
      </span>
    </div>
  </div>
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
