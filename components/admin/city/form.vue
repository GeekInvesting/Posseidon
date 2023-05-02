<template lang="">
  <div
    class="p-4 bg-white rounded-lg shadow-md mx-5 md:mx-10 lg:mx-20 xl:mx-40"
  >
    <el-form
      class="mb-4"
      v-loading="loading"
      :element-loading-svg="svg"
      element-loading-svg-view-box="-10, -10, 50, 50"
    >
      <el-form-item label="City Name" prop="cityName" class="mb-4">
        <el-input
          v-model="city.cityName"
          class="shadow-sm"
          placeholder="New York"
        />
      </el-form-item>
      <el-form-item label="City Code" prop="cityCode" class="mb-4">
        <el-input
          v-model="city.cityCode"
          class="shadow-sm"
          placeholder="87540000"
        />
      </el-form-item>
      <el-form-item label="Country" class="mb-4">
        <el-select
          v-model="countryValue"
          placeholder="Selecione um país"
          @change="onSelectCountry"
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
      <el-form-item label="State" class="mb-4">
        <el-select
          v-model="stateValue"
          placeholder="Selecione um estado"
          @change="onSelectState"
          class="shadow-sm"
        >
          <el-option
            v-for="state in states"
            :key="state"
            :label="state"
            :value="state"
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
import { CityDto } from "~/model/hera/CityDto.js";
import { emitEventBus } from "~~/events/eventBus";
import { Notification } from "~~/utils/Notification";

import { ApiHera } from "~~/utils/api/hera";

const apiHera = ApiHera();

const svg = Loading().svg;
let loading = ref(false);
let countryValue: Ref<string> = ref("");
let stateValue: Ref<string> = ref("");
let countries = ref<string[]>([]);
let states = ref<string[]>([]);

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

let city = ref<CityDto>({
  id: props.initialData.id || "",
  cityName: props.initialData.cityName || "",
  cityCode: props.initialData.cityCode || null,
  cityState: props.initialData.cityState || null,
  cityCountry: props.initialData.cityCountry || "",
  cityEnabled: props.initialData.cityEnabled || false,
  cityDeleted: props.initialData.cityDeleted || false,
});

watch(props.initialData, (newVal) => {
  city.value = {
    id: newVal.id || "",
    cityName: newVal.cityName || "",
    cityCode: newVal.cityCode || null,
    cityState: newVal.cityState || null,
    cityCountry: newVal.cityCountry || "",
    cityEnabled: newVal.cityEnabled || false,
    cityDeleted: newVal.cityDeleted || false,
  };
});

onMounted( () => {
  loading.value = true;
  
  getCountryName();

  if (props.typeSave == "update") {
    countryValue.value = props.initialData.cityCountry;
    stateValue.value = props.initialData.cityState;
    console.log(stateValue.value, countryValue.value);
  }

  loading.value = false;
});

const getCountryName = async () => {
  try {
    const response = await apiHera.getAllCountryName();
    const data = await response.json();
    countries.value = data;
  } catch (error) {
    Notification().notfError("Error", `${error}`);
  }
};

const onSelectCountry = async () => {
  loading.value = true;
  try {
    stateValue.value = "";
    const response = await apiHera.getAllStateName(countryValue.value);
    if (!response.ok) throw new Error("Fail to get states");
    const data = await response.json();
    states.value = data;
  } catch (error) {
    Notification().notfError("Error", `${error}`);
  }
  loading.value = false;
};

const onSelectState = () => {
  city.value.cityState = stateValue.value;
};

const submitForm = async () => {
  loading.value = true;
  try {
    if (props.typeSave == "create") {
      const response = await apiHera.createCity(city.value);
      if (!response.ok) throw new Error(await response.text());
      Notification().notfSuccess(
        "Success",
        `City created ${city.value.cityName.toUpperCase()}`
      );
    } else {
      const response = await apiHera.updateCity(city.value);
      if (!response.ok) throw new Error(await response.text());
      Notification().notfSuccess(
        "Success",
        `City updated ${city.value.cityName.toUpperCase()}`
      );
    }

    emptyForm();
    emitEventBus("refreshCities", true);
  } catch (error) {
    Notification().notfError("Error", `${error}`);
  }
  loading.value = false;
};

const emptyForm = () => {
  city.value = {
    id: "",
    cityName: "",
    cityCode: null,
    cityState: "",
    cityCountry: "",
    cityEnabled: false,
    cityDeleted: false,
  };
  countryValue.value = "";
  stateValue.value = "";
};
</script>
