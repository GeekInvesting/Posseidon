<template>
  <transition name="fade">
    <div
      v-if="showWelcome"
      class="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50"
    >
      <div
        class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md"
      >
        <p class="text-2xl font-bold mb-4">Bem-vindo, {{ userName }}!</p>
      </div>
    </div>
  </transition>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center">
    <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
      <p class="text-2xl font-bold mb-4">Entrar</p>
      <form
        @submit.prevent="handleSubmit"
        v-loading="loading"
        :element-loading-svg="svg"
        element-loading-svg-view-box="-10, -10, 50, 50"
        class="mb-4"
      >
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
            Email
          </label>
          <el-input
            v-model="email"
            type="email"
            placeholder="Email"
            class="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:shadow-outline"
          />
        </div>
        <div class="mb-6">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="password"
          >
            Senha
          </label>
          <el-input
            v-model="password"
            type="password"
            placeholder="Senha"
            class="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:shadow-outline"
          />
        </div>
        <div class="flex items-center justify-between">
          <el-button
            type="primary"
            native-type="submit"
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Entrar
          </el-button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { emitEventBus } from "~/events/eventBus";
import { User } from "~/model/atena/User";
import { authSignIn } from "~/utils/service/atena/AuthService";
import { Notification } from "~~/utils/Notification";

const router = useRouter();

const svg = Loading().svg;
let loading = ref(false);
const showWelcome = ref(false);
const userName = ref("");

const email = ref("");
const password = ref("");

const handleSubmit = async () => {
  loading.value = true;
  try {
    const response = await authSignIn(email.value, password.value);

    if (!response.ok) {
      throw new Error(await response.text());
    }
    const responseBody = await response.json();
    const { token, user } = responseBody;

    const userStorage = JSON.stringify(user);

    localStorage.setItem("user", userStorage);
    localStorage.setItem("token", token);

    emitEventBus("refreshLogin", true);

    showWelcome.value = true;
    userName.value = user.userName;

    setTimeout(() => {
      router.push("/");
    }, 2000);

  } catch (error) {
    Notification().notfError(`Error`, `${error}`);
  }
  loading.value = false;
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
