//navUser.vue
<template>
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
              <button @click="showInvestors">
                <Icon name="ic:round-account-circle" />
                Investor
              </button>
            </el-dropdown-item>
            <el-divider />
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
  <el-dialog
    title="Investor"
    v-model="selectInvestor"
    width="50%"
    :before-close="() => (selectInvestor = false)"
  >
    <div>
      <p>Select the investor profile:</p>
    </div>
    <br />
    <div v-for="investor in investors">
      <UserInvestorButton :investor="investor" origin="navUser" />
    </div>
  </el-dialog>
</template>

<script lang="ts" setup>
import { useEventBus } from "~/events/eventBus";
import { getbyUser } from "~/utils/service/atena/InvestorService";

const eventBus = useEventBus();

const isAdmin = ref(false);
const isLoged = ref(false);
const selectInvestor = ref(false);
const investors = ref([]);

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
      eventBus.value.refreshLogin = false;
    }
  }
);

watch(
  () => eventBus.value.dialogInvestor,
  (newValue) => {
    if (newValue) {
      selectInvestor.value = false;
      eventBus.value.dialogInvestor = false;
    }
  }
)

const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  localStorage.removeItem("investor");
  window.location.reload();
};

const showInvestors = async () => {
  try {
    const responseInvestor = await getbyUser();

    if (!responseInvestor.ok) {
      const msg = await responseInvestor.json();
      throw new Error(msg.message);
    }

    investors.value = await responseInvestor.json();

    selectInvestor.value = true;
  } catch (error) {
    console.log(error);
    Notif().notfError(`Error`, `${error}`);
  }
};

const closeDialogInvestor = () => {
  selectInvestor.value = false;
};
</script>
