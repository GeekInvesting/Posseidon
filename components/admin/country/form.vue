<template>
  <div
    class="p-8 bg-white rounded-lg shadow-md mx-5 md:mx-10 lg:mx-20 xl:mx-40"
  >
    <form
      @submit.prevent="submitForm"
      v-loading="loading"
      :element-loading-svg="svg"
      element-loading-svg-view-box="-10, -10, 50, 50"
      class="mb-4"
    >
      <el-form-item label="Country Name" class="mb-4">
        <el-input v-model="country.countryName" class="shadow-sm" />
      </el-form-item>
      <el-form-item label="Country Code" class="mb-4">
        <el-input v-model="country.countryCode" class="shadow-sm" />
      </el-form-item>
      <el-button
        type="primary"
        @click="submitForm"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Submit
      </el-button>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { emitEventBus } from "~~/events/eventBus";
import { Country } from "~~/model/Country";

import { Loading } from "~~/utils/Loading";
import { Notification } from "~~/utils/Notification";
import { ApiHera } from "~~/utils/api/hera";

const apiHera = ApiHera();

const svg = Loading().svg;
let loading = ref(false);


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

const country: Ref<Country> = ref({
  id: props.initialData.id || "",
  countryName: props.initialData.countryName || "",
  countryCode: props.initialData.countryCode || "",
  countryEnabled: props.initialData.countryEnabled || false,
  countryDeleted: props.initialData.countryDeleted || false,
});

watch(props.initialData, (newVal) => {
  country.value = {
    id: props.initialData.id || "",
    countryName: newVal.countryName || "",
    countryCode: newVal.countryCode || "",
    countryEnabled: newVal.countryEnabled || true,
    countryDeleted: newVal.countryDeleted || false,
  };
});

const submitForm = async () => {
  console.log(JSON.stringify(country.value));
  loading.value = true;

  try {
    const response = await apiHera.postCountry(country.value, props.typeSave);

    if (!response.ok) {
      const responseBody = await response.text();
      throw new Error(`${responseBody}`);
    }

    const responseBody = await response.json();

    Notification().notfSuccess("Success", `Country saved successfully: ${responseBody.countryName}`);

    country.value = {
      id: "",
      countryName: "",
      countryCode: "",
      countryEnabled: true,
      countryDeleted: false,
    };
  } catch (error: any) {
    Notification().notfError("Error", `Error saving country: ${error}`);
    //console.error(error);
  }

  loading.value = false;

  emitEventBus("refreshCountries", true);
};

</script>
