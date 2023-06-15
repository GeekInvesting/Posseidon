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
                <NuxtLink to="/user">
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
              <button @click="showUser">
                <Icon name="ic:round-assignment-ind" />
                Sing Up
              </button>
            </el-dropdown-item>
          </template>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
  <el-dialog
    :title="dialogType"
    v-model="selectDialog"
    width="80%"
    :before-close="() => (selectDialog = false)"
  >
    <div v-if="dialogType == 'Investor'">
      <div>
        <p>Select the investor profile:</p>
      </div>
      <br />
      <div v-for="investor in investors">
        <UserInvestorButton :investor="investor" origin="navUser" />
      </div>
    </div>
    <div v-else-if="dialogType == 'User'">
      <UserAdminRegister />
    </div>
  </el-dialog>
</template>

<script lang="ts" setup>
import { useEventBus } from "~/events/eventBus";
import { InvestorHeraService } from "~/service/hera/InvestorService";

const eventBus = useEventBus();

const isAdmin = ref(false);
const isLoged = ref(false);
const selectDialog = ref(false);
const investors = ref([]);
const dialogType = ref("");
const investorService = new InvestorHeraService();

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
      selectDialog.value = false;
      eventBus.value.dialogInvestor = false;
    }
  }
);

const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  localStorage.removeItem("investor");
  window.location.reload();
};

const showInvestors = async () => {
  dialogType.value = "Investor";
  try {
    const getLogin = new GetLogin();
    const responseInvestor = await investorService.getInvestorByUser(
      getLogin.userName()
    );

    if (!responseInvestor.ok) {
      const msg = await responseInvestor.json();
      throw new Error(msg.message);
    }

    investors.value = await responseInvestor.json();

    selectDialog.value = true;
  } catch (error) {
    console.log(error);
    Notif().notfError(`Error`, `${error}`);
  }
};

const closeDialogInvestor = () => {
  selectDialog.value = false;
};

const showUser = () => {
  dialogType.value = "User";
  selectDialog.value = true;
  console.log("showUser", selectDialog.value, dialogType.value);
};
</script>
