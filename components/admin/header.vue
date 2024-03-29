<template>
  <el-page-header @back="goToAdmin">
    <template #content>
      <div class="flex items-center py-4">
        <span class="text-large font-600 mr-3"> {{ props.title }} </span>
      </div>
    </template>
    <template #extra>
      <div class="flex items-center py4">
        <el-button
          @click="create"
          type="success"
          class="ml-2"
          circle
          size="large"
          ><Icon name="ic:baseline-plus"
        /></el-button>
      </div>
    </template>
  </el-page-header>
  <el-dialog
    v-model="dialogVisible"
    :title="title"
    width="90%"
    :before-close="handleClose"
  >
    <span class="flex-center">
      <AdminStateForm
        v-if="props.title == 'State'"
        class="max-w-screen-md mx-auto"
      />
      <AdminCountryForm
        v-else-if="props.title == 'Country'"
        class="max-w-screen-md mx-auto"
      />
      <AdminCityForm
        v-else-if="props.title == 'City'"
        class="max-w-screen-md mx-auto"
      />
      <AdminHefestoExchangeForm
        v-else-if="props.title == 'Exchange'"
        class="max-w-screen-md mx-auto"
      />
      <AdminHefestoSectorForm
        v-else-if="props.title == 'Sector'"
        class="max-w-screen-md mx-auto"
      />
      <AdminHefestoSubsectorForm
        v-else-if="props.title == 'Subsector'"
        class="max-w-screen-md mx-auto"
      />
      <AdminHefestoTypeForm
        v-else-if="props.title == 'Type'"
        class="max-w-screen-md mx-auto"
      />
      <AdminHefestoCompanyForm
        v-else-if="props.title == 'Company'"
        class="max-w-screen-md mx-auto"
      />
      <AdminHefestoTicketForm
        v-else-if="props.title == 'Ticket'"
        class="max-w-screen-md mx-auto"
      />
      <AdminHeraInvestorForm
        v-else-if="props.title == 'Investor'"
        class="max-w-screen-md mx-auto"
      />
      <UserAdminRegister
        v-else-if="props.title == 'User'"
        class="max-w-screen-md mx-auto"
      />
      <AdminZeusOperationForm
        v-else-if="props.title == 'Operation'"
        class="max-w-screen-md mx-auto"
      />
      <AdminZeusBrokerForm
        v-else-if="props.title == 'Broker'"
        class="max-w-screen-md mx-auto"
      />
      <AdminZeusYieldForm
        v-else-if="props.title == 'Yield'"
        class="max-w-screen-md mx-auto"
      />
      <AdminZeusWalletForm
        v-else-if="props.title == 'Wallet'"
        class="max-w-screen-md mx-auto"
      />
      <AdminZeusRateIrForm
        v-else-if="props.title == 'Rate IR'"
        class="max-w-screen-md mx-auto"
      />
      <AdminAtenaSchedulerForm
        v-else-if="props.title == 'Scheduler'"
        class="max-w-screen-md mx-auto"
      />
    </span>
  </el-dialog>
</template>

<script setup lang="ts">
import { emitEventBus, useEventBus } from "~~/events/eventBus";

const title = ref("");
const router = useRouter();

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
});

onMounted(() => {
  title.value = props.title;
});

const dialogVisible = ref(false);

const handleClose = (done: () => void) => {
  ElMessageBox.confirm(`Are you sure to close this ${props.title}?`)
    .then(() => {
      done();
      if (props.title == "State") {
        emitEventBus("refreshStates", true);
      } else if (props.title == "Country") {
        emitEventBus("refreshCountries", true);
      } else if (props.title == "City") {
        emitEventBus("refreshCities", true);
      } else if (props.title == "Exchange") {
        emitEventBus("refreshExchange", true);
      } else if (props.title == "Sector") {
        emitEventBus("refreshSectors", true);
      } else if (props.title == "Subsector") {
        emitEventBus("refreshSubsectors", true);
      } else if (props.title == "Type") {
        emitEventBus("refreshTypes", true);
      } else if (props.title == "Company") {
        emitEventBus("refreshCompanies", true);
      } else if (props.title == "Ticket") {
        emitEventBus("refreshTickets", true);
      } else if (props.title == "Investor") {
        emitEventBus("refreshInvestors", true);
      } else if (props.title == "User") {
        emitEventBus("refreshUsers", true);
      } else if (props.title == "Operation") {
        emitEventBus("refreshOperations", true);
      } else if (props.title == "Broker") {
        emitEventBus("refreshBrokers", true);
      } else if (props.title == "Yield") {
        emitEventBus("refreshYields", true);
      } else if (props.title == "Wallet") {
        emitEventBus("refreshWallets", true);
      } else if (props.title == "Rate IR") {
        emitEventBus("refreshRatesIr", true);
      } else if (props.title == "Scheduler") {
        emitEventBus("refreshSchedulers", true);
      }

      dialogVisible.value = false;
    })
    .catch((error:any) => {
      console.log(error);
    });
};

const create = () => {
  dialogVisible.value = true;
  //console.log(dialogVisible.value);
};

const goToAdmin = () => {
  router.push("/admin");
};

watch(
  () => useEventBus().value.dialogCreate,
  (newValue) => {
    if (newValue) {
      dialogVisible.value = false;
      useEventBus().value.dialogCreate = false;
    }
  }
);
</script>
