<template lang="">
  <v-dialog v-model="showDialog">
    <v-card>
      <v-card-title class="bg-primary text-white"> Update State </v-card-title>

      <v-card-text>
        <AdminStateForm :initial-data="stateDto" type-save="update" />
      </v-card-text>

      <v-card-actions>
        <v-btn
          text
          class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          @click="showDialog = false"
        >
          Cancel
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <el-table
    :data="states"
    class="custom-loading-svg w-full md:w-3/4 lg:w-1/2 xl:w-1/3 grid grid-flow-row auto-rows-max"
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
      <template #default="{ row }" class="grid grid-rown-1 flex justify-end">
        <el-button @click="edit(row)"
          ><Icon name="ic:twotone-mode-edit"
        /></el-button>
        <el-button @click="toggle(row)">
          <Icon v-if="row.stateEnabled" name="ic:twotone-person-add-disabled" />
          <Icon v-else name="ic:twotone-person-add" />
        </el-button>
        <el-button @click="remove(row)"
          ><Icon name="ic:outline-delete-forever"
        /></el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup lang="ts">
import { List } from "lodash";
import { useEventBus } from "~~/events/eventBus";
import { State } from "~~/model/State";
import { StateDto } from "~~/model/StateDto";
import { Notification } from "~~/utils/Notification";
import { ApiHera } from "~~/utils/api/hera";
import { StateUtils } from "~~/utils/models/StateUtils";

const svg = Loading().svg;
let loading = ref(false);

const eventBus = useEventBus();

let showUpdate: Ref<boolean> = ref(false);
let state: Ref<State> = ref({} as State);
let stateDto: Ref<StateDto> = ref({} as StateDto);

const states = ref([] as List<State>);

onMounted(() => {
  fetchStates();
});

const fetchStates = async () => {
  loading.value = true;
  try {
    const response = await ApiHera().getAllState();

    const data = await response.json();
    console.log(data);
    states.value = data;
  } catch (error) {
    Notification().notfError("Error", `Error to fetch states ${error}`);
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
  const data: StateDto = StateUtils().stateToDto(row);
  console.log(data);
  stateDto.value = data;
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

const request = async (type: any, method: any, state: State) => {
  try {
    const response = await ApiHera().requestState(type, method, state);

    if (response.ok) {
      Notification().notfSuccess(
        "Success",
        `State ${state.stateName} ${type} with success`
      );
      refreshStates();
    } else {
      const data = await response.text();
      throw new Error(`Error to ${type} state ${state.stateName} - ${data}`);
    }
  } catch (error) {
    Notification().notfError("Error", `${error}`);
  }
};

const filters = [
  { text: "Ativo", value: "Ativo" },
  { text: "Inativo", value: "Inativo" },
];
</script>
