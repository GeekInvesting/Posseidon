<template lang="">
  <el-dialog
    v-model="dialogVisible"
    title="State"
    width="85%"
    :before-close="handleClose"
  >
    <span>
      <AdminStateForm :key="componentKey" :initial-data="stateDto" type-save="update" />
    </span>
  </el-dialog>
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
        <span>{{ row.stateEnabled ? "Enable" : "Disable" }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="stateDeleted" label="Deleted">
      <template #default="{ row }">
        <span>{{ row.stateDeleted ? "Deleted" : "" }}</span>
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
                  content="Edit State"
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
                    row.stateEnabled ? 'Disable State' : 'Enable State'
                  "
                  placement="right"
                >
                  <el-button @click="toggle(row)"
                    ><Icon
                      v-if="row.stateEnabled"
                      name="ic:twotone-person-add-disabled" />
                    <Icon v-else name="ic:twotone-person-add" /></el-button
                ></el-tooltip>
              </el-dropdown-item>
              <el-dropdown-item
                ><el-tooltip
                  class="box-item"
                  effect="dark"
                  content="Delete State"
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

<script setup lang="ts">
import { List } from "lodash";
import { useEventBus } from "~~/events/eventBus";
import { State } from "~/modelService/hera/State";
import { StateDto } from "~/modelService/hera/StateDto";
import { Notif } from "~/utils/Notif";
import { ApiHera } from "~~/utils/api/hera";
import { StateUtils } from "~/utils/modelUtils/StateUtils";

const componentKey: Ref<string> = ref('');
const dialogVisible = ref(false);

const handleClose = (done: () => void) => {
  ElMessageBox.confirm(`Are you sure to close this State?`)
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
    Notif().notfError("Error", `To fetch states ${error}`);
  }
  loading.value = false;
};

const refreshStates = () => {
  fetchStates();
  hideDialog();
};

watch(
  () => eventBus.value.refreshStates,
  (newValue) => {
    if (newValue) {
      refreshStates();
      eventBus.value.refreshStates = false;
    }
  }
);

const edit = (row: State) => {
  const data: StateDto = StateUtils().stateToDto(row);
  //console.log(data);
  stateDto.value = data;
  dialogVisible.value = true;
  componentKey.value = row.id;
};

const toggle = (row: State) => {
  if (row.stateEnabled) {
    request("disable", "PUT", row);
  } else {
    request("enable", "PUT", row);
  }
};

const remove = (row: State) => {
  ElMessageBox.confirm(`Are you sure to delete this State?`)
  .then(() => {
    request("delete", "DELETE", row);
}).catch((error) => {
  //console.log(error);
  Notif().notfWarn("Warn Delete", `${error} this operation.`);
})
};

const request = async (type: any, method: any, state: State) => {
  try {
    const response = await ApiHera().requestState(type, method, state);

    if (response.ok) {
      Notif().notfSuccess(
        "Success",
        `State ${state.stateName} ${type} with success`
      );
      refreshStates();
    } else {
      const data = await response.text();
      throw new Error(`Error to ${type} state ${state.stateName} - ${data}`);
    }
  } catch (error) {
    Notif().notfError("Error", `${error}`);
  }
};

const filters = [
  { text: "Ativo", value: "Ativo" },
  { text: "Inativo", value: "Inativo" },
];
</script>
