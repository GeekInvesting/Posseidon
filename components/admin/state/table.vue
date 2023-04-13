<template lang="">
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
    <AdminStateForm :initial-data="state" type-save="update" />
  </div>
  <el-table
    :data="states"
    class="custom-loading-svg w-full"
    v-loading="loading"
    :element-loading-svg="svg"
    element-loading-svg-view-box="-10, -10, 50, 50"
  >
    <el-table-column prop="stateName" label="Name" sortable></el-table-column>
    <el-table-column prop="stateCode" label="Code" sortable></el-table-column>
    <el-table-column
      prop="stateCountry.countryName"
      label="Country"
      sortable
    ></el-table-column>
    <el-table-column prop="stateEnabled" label="Enable">
      <template #default="{ row }">
        <span>{{ row.stateEnabled ? "True" : "False" }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="stateDeleted" label="Deleted">
      <template #default="{ row }">
        <span>{{ row.stateDeleted ? "Deleted" : "" }}</span>
      </template>
      </el-table-column>
    <el-table-column label="Actions">
      <template #default="{ row }" class="grid grid-cols-1 gap-3">
        <el-button @click="edit(row)"
          ><Icon name="ic:twotone-mode-edit"
        /></el-button>
        <el-button @click="toggle(row)">
          <Icon v-if="row.stateEnabled" name="ic:twotone-person-add-disabled" />
          <Icon v-else name="ic:twotone-person-add" />
        </el-button>
        <el-button @click="remove(row)"
          ><Icon name="ic:outline-delete-forever" />
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup lang="ts">
import { List } from "lodash";
import { useEventBus } from "~~/events/eventBus";
import { State } from "~~/model/State";

const eventBus = useEventBus();
const runtimeConfig = useRuntimeConfig();

const urlHera = "http://localhost:8101/hera";

let alertCountry: Ref<boolean> = ref(false);
let alertDescription: Ref<string> = ref("");
let alertTitle: Ref<string> = ref("");
let alertType: Ref<any> = ref("success");

let showUpdate: Ref<boolean> = ref(false);
let state: Ref<State> = ref({} as State);

const states = ref([] as List<State>);

onMounted(() => {
  fetchStates();
});

const fetchStates = async () => {
  loading.value = true;
  console.log(`${urlHera}/state/all`)
  try {
    const response = await fetch(`${urlHera}/state/all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    
    console.log(response);

    const data = await response.json();
    states.value = data;
  } catch (error) {
    alertCountry.value = true;
    alertTitle.value = "Error";
    alertDescription.value = "Error to fetch states" + error;
    alertType.value = "error";
  }
  loading.value = false;
};

const refreshStates = () => {
  fetchStates();
};

watch(
  () => eventBus.value.refreshStates,
  (newValue) => {
    if (newValue) {
      refreshStates();
    }
  }
);

const edit = (row: State) => {
  state.value = row;

  showUpdate.value = !showUpdate.value;
};

const toggle = (row: State) => {
  if (row.stateEnabled) {
    request("disable", "PUT", row);
  } else {
    request("enable", "PUT", row);
  }
};

const remove = (row: State) => {
  request("delete", "DELETE", row);
};

const request =async (data:any, method: any, state:State) => {
  const url = `${urlHera}/state/${data}/${state.id}`;
  try { 
    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
    });

    if(response.ok){
      alertCountry.value = true;
      alertTitle.value = "Success";
      alertDescription.value = `State ${state.stateName} ${data} with success`;
      alertType.value = "success";
      refreshStates();
  } else { 
    throw new Error(`Error to ${data} state ${state.stateName}`)
  }
  } catch (error) {
    alertCountry.value = true;
    alertTitle.value = "Error";
    alertDescription.value = `${error}`;
    alertType.value = "error";
  }

  setTimeout(() => {
    alertCountry.value = false;
  }, 5000);
}

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
