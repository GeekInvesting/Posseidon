<template>
  <div>
    <el-alert
      v-if="alertCountry"
      :title="alertTitle"
      :type="alertType"
      :description="alertDescription"
      show-icon
    />
    <br />
  </div>
  <div v-if="showUpdate">
    <AdminCountryForm :initial-data="country" type-save="update" />
    <br />
  </div>
  <el-table
    :data="countries"
    class="custom-loading-svg w-full"
    stripe
    height="90%"
    v-loading="loading"
    :element-loading-svg="svg"
    element-loading-svg-view-box="-10, -10, 50, 50"
  >
    <el-table-column prop="countryName" label="Name" sortable></el-table-column>
    <el-table-column prop="countryCode" label="Code" sortable></el-table-column>
    <el-table-column prop="countryEnable" label="Enable">
      <template #default="{ row }">
        <span>{{ row.countryEnabled ? "True" : "False" }}</span>
      </template>
    </el-table-column>
    <el-table-column label="Actions">
      <template #default="{ row }" class="grid grid-cols-1 gap-3">
        <el-button @click="edit(row)"
          ><Icon name="ic:twotone-mode-edit"
        /></el-button>
        <el-button @click="toggle(row)">
          <Icon
            v-if="row.countryEnabled"
            name="ic:twotone-person-add-disabled"
          />
          <Icon v-else name="ic:twotone-person-add" />
        </el-button>
        <el-button @click="remove(row)"
          ><Icon name="ic:outline-delete-forever"
        /></el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts" setup>
import { Country } from "~~/model/Country";
import { useEventBus } from "~~/events/eventBus";

const eventBus = useEventBus();

let alertCountry: Ref<boolean> = ref(false);
let alertDescription: Ref<string> = ref("");
let alertTitle: Ref<string> = ref("");
let alertType: Ref<any> = ref("success");
let showUpdate: Ref<boolean> = ref(false);
let country: Ref<Country> = ref({} as Country);
//const urlApi = process.env.API_HERA;

const countries = ref([]);

const fetchCountries = async () => {
  try {
    loading.value = true;
    //const response = await fetch(`${urlApi}/country`);
    const response = await fetch("http://localhost:8101/hera/country/all");
    const data = await response.json();

    //console.log("Dados recebidos:", data);

    countries.value = data;
  } catch (error) {
    //console.error("Erro ao buscar os dados:", error);
    alertCountry.value = true;
    alertTitle.value = "Error";
    alertDescription.value = "Erro ao buscar os dados." + error;
    alertType.value = "error";
  }

  loading.value = false;
};

onMounted(() => {
  fetchCountries();
});

const refreshCountries = () => {
  fetchCountries();
};

watch(
  () => eventBus.value.refreshCountries,
  (newValue) => {
    if (newValue) {
      refreshCountries();
      eventBus.value.refreshCountries = false;
    }
  }
);

const edit = (row: Country) => {
  //console.log("Editando o país:", country);

  country.value = row;

  showUpdate.value = !showUpdate.value;
};

const toggle = (row: Country) => {
  if (row.countryEnabled) {
    postRequest("disable", "PUT", row);
  } else {
    postRequest("enable", "PUT", row);
  }
};

const remove = (row: Country) => {
  postRequest("delete", "DELETE", row);
};

const postRequest = async (data: any, method: any, country: Country) => {
  const url = `http://localhost:8101/hera/country/${data}/${country.id}`;
  try {
    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();
      //console.log(`Success ${data} Country: ${country.countryName}`);
      alertCountry.value = true;
      alertTitle.value = "Success";
      alertDescription.value = `Success ${data} Country: ${country.countryName}`;
      alertType.value = "success";
      refreshCountries();
    } else {
      throw new Error(`Error ${data} Country: ${country.countryName}`);
    }
  } catch (error) {
    console.error(error);
    alertCountry.value = true;
    alertTitle.value = "Error";
    alertDescription.value = `Error ${data} Country: ${country.countryName}`;
    alertType.value = "error";
  }

  setTimeout(() => {
    alertCountry.value = false;
  }, 5000);
};

const filters = [
  { text: "Ativo", value: "Ativo" },
  { text: "Inativo", value: "Inativo" },
];

let loading = ref(true);
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

<style scoped></style>
