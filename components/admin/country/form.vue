<template>
  <div>
    <el-alert
      v-if="alertCountry"
      :title="alertTitle"
      :type="alertType"
      :description="alertDescription"
      show-icon
    />
    <br/>
  </div>
  <div class="p-4 rounded-lg shadow-md mx-5">
    <form
      @submit.prevent="submitForm"
      v-loading="loading"
      :element-loading-svg="svg"
      element-loading-svg-view-box="-10, -10, 50, 50"
    >
      <br />
      <el-form-item label="Nome">
        <el-input v-model="country.countryName" />
      </el-form-item>
      <br />
      <el-form-item label="Code">
        <el-input v-model="country.countryCode" />
      </el-form-item>
      <br />
      <el-button type="primary" native-type="submit">Submit</el-button>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { Country } from "~~/model/Country";
import { defineEmits } from 'vue';
import { emitEventBus } from '~~/events/eventBus';

const runtimeConfig = useRuntimeConfig();
const urlHera = runtimeConfig.apiHera 

let urlApi:String = "";
let urlType:String = "";
let alertCountry: Ref<boolean> = ref(false);
let alertDescription: Ref<string> = ref("");
let alertTitle: Ref<string> = ref("");
let alertType: Ref<any> = ref("success");

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

const country = ref({
  id: props.initialData.id || "",
  countryName: props.initialData.countryName || "",
  countryCode: props.initialData.countryCode || "",
  countryEnabled: props.initialData.countryEnabled || false,
});

watch(props.initialData, (newVal) => {
  country.value = {
    id: props.initialData.id || "",
    countryName: newVal.countryName || "",
    countryCode: newVal.countryCode || "",
    countryEnabled: newVal.countryEnabled || true,
  };
});

const submitForm = async () => {
  console.log(JSON.stringify(country.value));
  loading.value = true;

  try {
    if (props.typeSave == "create") {
      urlApi = `${urlHera}/country`;
      urlType = "POST";
    } else if (props.typeSave == "update") {
      urlApi = `${urlHera}/country/${country.value.id}`;
      urlType = "PUT";
    }
    const response = await fetch(`${urlApi}`, {
      method: `${urlType}`,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(country.value),
    });

    if (!response.ok) {
      const responseBody = await response.text();
      throw new Error(`${responseBody}`);
    }

    const responseBody = await response.json();

    alertType.value = "success";
    alertTitle.value = "Success Save Country";
    alertDescription.value = `Country saved successfully: ${responseBody.countryName}`;

    country.value = {
      id: "",
      countryName: "",
      countryCode: "",
      countryEnabled: true,
    };
  } catch (error: any) {
    alertType.value = "error";
    alertTitle.value = "Error Save Country";
    alertDescription.value = ref(error);
    console.error(error);
  }

  alertCountry.value = true;
  loading.value = false;

  emitEventBus("refreshCountries", true)
  
  setTimeout(() => {
    alertCountry.value = false;
  }, 5000);
};


let loading = ref(false);
const svg = `
        <path class="path" d="
          M 30 15
          L 28 17
          M 25.61 25.61
          A 15 15, 0, 0, 1, 15 30
          A 15 15, 0, 1, 1, 27.99 7.5
          L 15 15
        " style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>
      `;
</script>

<style></style>
