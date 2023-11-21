<template>
  <el-dialog
    v-model="dialogVisible"
    title="Country"
    width="85%"
    :before-close="handleClose"
  >
    <span>
      <AdminCountryForm :key="componentKey" :initial-data="country" type-save="update" />
    </span>
  </el-dialog>
  <el-table
    :data="countries"
    class="custom-loading-svg w-full"
    stripe
    v-loading="loading"
    :element-loading-svg="svg"
    element-loading-svg-view-box="-10, -10, 50, 50"
  >
    <el-table-column prop="countryName" label="Name" sortable></el-table-column>
    <el-table-column prop="countryCode" label="Code" sortable></el-table-column>
    <el-table-column prop="countryEnable" label="Enable" sortable>
      <template #default="{ row }">
        <span>{{ row.countryEnabled ? "True" : "False" }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="countryDelete" label="Delete">
      <template #default="{ row }">
        <span>{{ row.countryDeleted ? "Deleted" : "" }}</span>
      </template>
    </el-table-column>
    <el-table-column label="Actions">
      <template #default="{ row }" class="grid grid-cols-1 gap-3">
        <el-dropdown size="large" placement="top">
          <el-button circle>
            <Icon name="ic:baseline-format-list-bulleted" />
          </el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item
                ><el-tooltip
                  class="box-item"
                  effect="dark"
                  content="Edit Country"
                  placement="right"
                >
                  <el-button @click="edit(row)">
                    <Icon name="ic:twotone-mode-edit" />
                  </el-button>
                </el-tooltip>
              </el-dropdown-item>
              <el-dropdown-item
                ><el-tooltip
                  class="box-item"
                  effect="dark"
                  :content="
                    row.countryEnabled ? 'Disable Country' : 'Enable Country'
                  "
                  placement="right"
                >
                  <el-button @click="toggle(row)"
                    ><Icon
                      v-if="row.countryEnabled"
                      name="ic:twotone-person-add-disabled" />
                    <Icon v-else name="ic:twotone-person-add" /></el-button
                ></el-tooltip>
              </el-dropdown-item>
              <el-dropdown-item
                ><el-tooltip
                  class="box-item"
                  effect="dark"
                  content="Delete Country"
                  placement="right"
                >
                  <el-button @click="remove(row)"
                    ><Icon name="ic:outline-delete-forever" /></el-button
                ></el-tooltip>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts" setup>
import { useEventBus } from "~~/events/eventBus";
import { Country } from "~/entities/hera/Country";

import { Notif } from "~/utils/Notif";
import { ApiHera } from "~~/utils/api/hera";

const apiHera = ApiHera();
const svg = Loading().svg;
let loading = ref(false);
const eventBus = useEventBus();
let country: Ref<Country> = ref({} as Country);
const countries = ref([]);
const componentKey: Ref<string> = ref('');
const dialogVisible = ref(false);

const handleClose = (done: () => void) => {
  ElMessageBox.confirm(`Are you sure to close this Country?`)
    .then(() => {
      done();
    })
    .catch((error) => {
      //console.log(error);
      Notif().notfWarn("Warn", `${error} this operation.`);
    });
};

const hideDialog = () => {
  dialogVisible.value = false;
}

const fetchCountries = async () => {
  try {
    loading.value = true;
    const response = await apiHera.getAllCountry();
    const data = await response.json();

    console.log("Dados recebidos:", data);

    countries.value = data;
  } catch (error) {
    console.error("Erro ao buscar os dados:", error);
    Notif().notfError("Error", "Get data: " + error);
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
      hideDialog();
      eventBus.value.refreshCountries = false;
    }
  }
);

const edit = (row: Country) => {
  country.value = row;
  //console.log("Editando o país:", country);
  dialogVisible.value = true;
  componentKey.value = row.id;
};

const toggle = (row: Country) => {
  if (row.countryEnabled) {
    postRequest("disable", "PUT", row);
  } else {
    postRequest("enable", "PUT", row);
  }
};

const remove = (row: Country) => {
  ElMessageBox.confirm(`Are you sure to delete this Country?`)
  .then(() => {
  postRequest("delete", "DELETE", row);
}).catch((error) => {
  //console.log(error);
  Notif().notfWarn("Warn Delete", `${error} this operation.`);
})
};

const postRequest = async (type: any, method: any, country: Country) => {
  try {
    const response = await apiHera.requestCountry(type, method, country);

    if (response.ok) {
      const data = await response.json();
      //console.log(`Success ${data} Country: ${country.countryName}`);
      Notif().notfSuccess(
        "Success",
        `${type} Country: ${country.countryName}`
      );
      refreshCountries();
    } else {
      const data = await response.text();
      throw new Error(data);
    }
  } catch (error) {
    //console.error(error);
    Notif().notfError(
      "Error",
      `${type} Country: ${country.countryName} - ${error}`
    );
  }
};

const filters = [
  { text: "Ativo", value: "Ativo" },
  { text: "Inativo", value: "Inativo" },
];
</script>
