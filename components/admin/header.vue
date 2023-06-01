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
    :title="props.title"
    width="85%"
    :before-close="handleClose"
  >
    <span>
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
    </span>
  </el-dialog>
</template>

<script setup lang="ts">
import { EventBusType, emitEventBus } from "~~/events/eventBus";

const router = useRouter();

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
});

const dialogVisible = ref(false);

function isValidEventName(eventName: string): eventName is keyof EventBusType {
  return ["refreshCountries", "refreshStates", "refreshCities", "refreshLogin", "dialogInvestor", "refreshExchange", "refreshSectors", "refreshSubsectors", "refreshTypes", "refreshCompanies"].includes(eventName);
}

const handleClose = (done: () => void) => {
  ElMessageBox.confirm(`Are you sure to close this ${props.title}?`)
    .then(() => {
      done();

      const eventMap: { [key: string]: string | undefined } = {
        "State": "refreshStates",
        "Country": "refreshCountries",
        "City": "refreshCities",
        "Exchange": "refreshExchange",
        "Sector": "refreshSectors",
        "Subsector": "refreshSubsectors",
        "Type": "refreshTypes",
        "Company": "refreshCompanies",
      };

      const eventName = eventMap[props.title];
      if (eventName && isValidEventName(eventName)) {
        emitEventBus(eventName, true);
      }

      dialogVisible.value = false;
    })
    .catch((error) => {
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
</script>
