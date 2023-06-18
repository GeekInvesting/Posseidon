<template>
  <transition name="fade">
    <div
      v-if="showWelcome"
      class="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50"
    >
      <div
        class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md"
      >
        <p class="text-2xl font-bold mb-4">Welcome, {{ userName }}!</p>
        <div v-if="existInvestor" class="flex justify-space-between mb-4 flex-wrap gap-4">
          <div>
            <p>Select the investor profile: </p>
          </div>
          <br>
          <div v-for="investor in investors">
            <UserInvestorButton :investor="investor" origin="signin"/>
          </div>
        </div>
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
import { InvestorHera } from "~/model/hera/InvestorHera";
import { AuthService } from "~/service/atena/AuthService";
import { InvestorHeraService } from "~/service/hera/InvestorService";

const router = useRouter();

const investors: Ref<Array<Partial<InvestorHera>>> = ref([]);
const existInvestor: Ref<boolean> = ref(false);

const svg = Loading().svg;
let loading = ref(false);
const showWelcome = ref(false);
const userName = ref("");

const email = ref("");
const password = ref("");

const investorService = new InvestorHeraService();
const authService = new AuthService();

const handleSubmit = async () => {
  loading.value = true;

  const response = await authService.login(email.value, password.value);
  try {
    const responseBody = await response.json();
    const { token, user } = responseBody;

    const userStorage = JSON.stringify(user);
    //console.log(userStorage, token);
    await localStorage.setItem("user", userStorage);
    await localStorage.setItem("token", token);
    
    await emitEventBus("refreshLogin", true);

    const responseInvestor = await investorService.getInvestorByUser(user.userName);
    if (!responseInvestor.ok) {
      const msg = await responseInvestor.json();
      throw new Error(msg.message);
    }

    const listInvestor = await responseInvestor.json();

    investors.value = JSON.parse(JSON.stringify(listInvestor));

    showWelcome.value = true;
    userName.value = user.userName;

    existInvestor.value = investors.value.length > 0;
    if (!existInvestor) {
      setTimeout(() => {
        router.push("/");
      }, 2000);
    }

  } catch (error) {
    Notif().notfError(`Error`, `${error}`);
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
