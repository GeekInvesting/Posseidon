<template>
  <el-dialog
    title="Subsectors"
    v-model="dialogVisible"
    width="85%"
    :before-close="handleClose"
  >
    <span>
      <AdminHefestoSubsectorForm
        :key="componentKey"
        :initialData="subsector"
        :typeSave="typeSave"
      />
    </span>
  </el-dialog>
  <el-table
    :data="subsectors"
    class="custom-loading-svg w-full md:w-3/4 lg:w-1/2 xl:w-1/3 grid grid-flow-row auto-rows-max"
    v-loading="loading"
    :element-loading-svg="svg"
    element-loading-svg-view-box="-10, -10, 50, 50"
  >
    <el-table-column prop="subsectorName" label="Name" sortable />
    <el-table-column prop="sectorModel.sectorName" label="Sector" sortable />
    <el-table-column prop="subsectorEnabled" label="Enable">
      <template #default="{ row }">
        <span>{{ row.subsectorEnabled ? "Enable" : "Disable" }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="subsectorDeleted" label="Deleted">
      <template #default="{ row }">
        <span>{{ row.subsectorDeleted ? "Deleted" : "" }}</span>
      </template>
    </el-table-column>
    <el-table-column label="Actions">
      <template #default="{ row }">
        <el-dropdown size="lager" placement="auto-end">
          <el-button circle>
            <Icon name="ic:baseline-format-list-bulleted" />
          </el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>
                <el-tooltip
                  class="box-item"
                  effect="dark"
                  content="Edit Subsector"
                  placement="right"
                >
                  <el-button @click="edit(row)">
                    <Icon name="ic:twotone-mode-edit" />
                  </el-button>
                </el-tooltip>
              </el-dropdown-item>
              <el-dropdown-item>
                <el-tooltip
                  class="box-item"
                  effect="dark"
                  :content="
                    row.subsectorEnabled
                      ? 'Disable Subsector'
                      : 'Enable Subsector'
                  "
                  placement="right"
                >
                  <el-button @click="toggle(row)">
                    <Icon
                      :name="
                        row.subsectorEnabled
                          ? 'ic:sharp-block'
                          : 'ic:sharp-check'
                      "
                    />
                  </el-button>
                </el-tooltip>
              </el-dropdown-item>
              <el-dropdown-item v-if="!row.subsectorDeleted">
                <el-tooltip
                  class="box-item"
                  effect="dark"
                  content="Delete Subsector"
                  placement="right"
                >
                  <el-button @click="remove(row)">
                    <Icon name="ic:sharp-delete" />
                  </el-button>
                </el-tooltip>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </template>
    </el-table-column>
  </el-table>
</template>

//components/admin/hefesto/subsector/form.vue
<script lang="ts" setup>
import { useEventBus } from "~/events/eventBus";
import { Subsector } from "~/entities/hefesto/Subsector";
import { SubsectorService } from "~/service/hefesto/SubsectorService";

const dialogVisible = ref(false);
const componentKey = ref("");
const subsector: Ref<Subsector> = ref({} as Subsector);
const typeSave: Ref<"create" | "update"> = ref("update");
const loading = ref(false);
const svg = Loading().svg;
const subsectors = ref<Subsector[]>([]);

const subsectorService = new SubsectorService();

onMounted(() => {
  fetchSubsectors();
});

const handleClose = (done: () => void) => {
  ElMessageBox.confirm(`Are you sure to close this Subsector?`)
    .then(() => {
      hideDialog();
      done();
    })
    .catch((error) => {
      //console.log(error);
      PosseidonNotif("warning", `${error} this operation.`);
    });
};

const hideDialog = () => {
  dialogVisible.value = false;
  componentKey.value = "";
  typeSave.value = "update";
};

const fetchSubsectors = async () => {
  loading.value = true;

  const response = await subsectorService.getSubsectors();

  if (response) subsectors.value = await response.json();

  loading.value = false;
};

const edit = (row: Subsector) => {
  dialogVisible.value = true;
  componentKey.value = row.id;
  typeSave.value = "update";
  subsector.value = row;
};

const toggle = async (row: Subsector) => {
  loading.value = true;

  ElMessageBox.confirm(
    `Are you sure to ${row.subsectorEnabled ? "Disable" : "Enable"} this Subsector?`
  )
    .then(async () => {
      let response;

      row.subsectorEnabled
        ? (response = await subsectorService.disableSubsector(row))
        : (response = await subsectorService.enableSubsector(row));

      response
        ? PosseidonNotif("success", `Subsector ${row.subsectorName} ${row.subsectorEnabled ? "Disabled" : "Enabled"}!`)
        : null;
    })
    .catch((error) => {
      //console.log(error);
      PosseidonNotif("warning", `${error} this operation.`);
    });


  fetchSubsectors();
  loading.value = false;
};

const remove = async (row: Subsector) => {
  loading.value = true;

  ElMessageBox.confirm(`Are you sure to delete this Subsector?`)
    .then(async () => {
      const response = await subsectorService.deleteSubsector(row);
      response ? PosseidonNotif("success", `Subsector ${row.subsectorName} Deleted!`) : null;
    })
    .catch((error) => {
      //console.log(error);
      PosseidonNotif("warning", `${error} this operation.`);
    });

  fetchSubsectors();
  loading.value = false;
};

watch(
  () => useEventBus().value.refreshSubsectors,
  (newValue) => {
    if (newValue) {
      fetchSubsectors();
      hideDialog();
      useEventBus().value.refreshSubsectors = false;
    }
  }
);
</script>
