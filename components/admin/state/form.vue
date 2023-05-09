<template>
  <div
    class="p-4 bg-white rounded-lg shadow-md mx-5 md:mx-5 lg:mx-10 xl:mx-20"
  >
    <el-form
      class="mb-4"
      v-loading="loading"
      :element-loading-svg="svg"
      element-loading-svg-view-box="-10, -10, 50, 50"
    >
      <el-form-item label="State Name" prop="stateName" class="mb-4">
        <el-input v-model="state.stateName" class="shadow-sm" placeholder="New York"/>
      </el-form-item>
      <el-form-item label="State Code" prop="stateCode" class="mb-4">
        <el-input v-model="state.stateCode" class="shadow-sm" placeholder="NY"/>
      </el-form-item>
      <el-form-item label="Country" class="mb-4">
        <!--- //TODO:Substituir o select por um componente de autocoplete -->
        <el-select
          v-model="selectValue"
          placeholder="Selecione um país"
          @change="onSelectChange"
          class="shadow-sm"
        >
          <el-option
            v-for="country in countries"
            :key="country"
            :label="country"
            :value="country"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="submitForm"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Submit
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { StateDto } from "~/model/hera/StateDto.js";
import { emitEventBus } from "~~/events/eventBus";
import { Notification } from "~/utils/Notif";

import { ApiHera } from "~~/utils/api/hera";

const apiHera = ApiHera();

const svg = Loading().svg;
let loading = ref(false);

let selectValue = ref("");

const props = defineProps({
  initialData: {
    type: Object,
    default: () => ({}),
  },
  typeSave: {
    type: String,
    default: "create",
  },
});

let countries: Ref<string[]> = ref([]);

let state: Ref<StateDto> = ref({
  id: props.initialData.id || "",
  stateName: props.initialData.stateName || "",
  stateCode: props.initialData.stateCode || "",
  countryName: props.initialData.countryName || "",
  stateEnabled: props.initialData.stateEnabled || false,
  stateDeleted: props.initialData.stateDeleted || false,
});

watch(props.initialData, (newVal) => {
  state.value = {
    id: newVal.id || "",
    stateName: newVal.stateName || "",
    stateCode: newVal.stateCode || "",
    countryName: newVal.countryName || "",
    stateEnabled: newVal.stateEnabled || false,
    stateDeleted: newVal.stateDeleted || false,
  };
});

onMounted(() => {
  getCountries();
  selectValue.value = state.value.countryName;
});

const getCountries = async () => {
  const response = await apiHera.getAllCountryName();
  const data = await response.json();
  //console.log("data: ", data);
  countries.value = data;
};

let stateForm = ref(null);

const onSelectChange = () => {
  //console.log('Select perdeu foco');
  state.value.countryName = selectValue.value;
};

const submitForm = async () => {
  console.log("Formulário enviado:", state.value);

  loading.value = true;
  try {
    const response = await ApiHera().postState(state.value, props.typeSave);

    if (!response.ok) {
      const responseBody = await response.text();
      throw new Error(`${response.status} - ${responseBody}`);
    }
    const data = await response.json();

    Notification().notfSuccess(
      "Success",
      `Save State: ${data.stateName}`
    );

    state.value = {
      id: "",
      stateName: "",
      stateCode: "",
      countryName: "",
      stateEnabled: false,
      stateDeleted: false,
    };
    selectValue.value = "";
  } catch (error) {
    Notification().notfError("Error", `Save State: ${error}`);
  }

  emitEventBus("refreshStates", true);
  loading.value = false;
};
</script>
