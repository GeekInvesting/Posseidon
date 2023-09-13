<template>
  <el-dialog
    title="Sector"
    v-model="dialogVisible"
    width="85%"
    :before-close="handleClose"
  >
    <span>
      <AdminHefestoSectorForm
        :key="componentKey"
        :initialData="sector"
        :typeSave="typeSave"
      />
    </span>
  </el-dialog>
  <el-table
    :data="sectors"
    class="custom-loading-svg w-full md:w-3/4 lg:w-1/2 xl:w-1/3 grid grid-flow-row auto-rows-max"
    v-loading="loading"
    :element-loading-svg="svg"
    element-loading-svg-view-box="-10, -10, 50, 50"
  >
    <el-table-column prop="sectorName" label="Name" sortable />
    <el-table-column prop="sectorEnabled" label="Enable">
      <template #default="{ row }">
        <span>{{ row.sectorEnabled ? "Enable" : "Disable" }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="sectorDeleted" label="Deleted">
      <template #default="{ row }">
        <span>{{ row.sectorDeleted ? "Deleted" : "" }}</span>
      </template>
    </el-table-column>
    <el-table-column label="Actions">
      <template #default="{ row }">
        <el-dropdown size="large" placement="auto-end">
          <el-button circle>
            <Icon name="ic:baseline-format-list-bulleted" />
          </el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>
                <el-tooltip
                  class="box-item"
                  effect="dark"
                  content="Edit Sector"
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
                    row.sectorEnabled ? 'Disable Sector' : 'Enable Sector'
                  "
                  placement="right"
                >
                  <el-button @click="toggle(row)">
                    <Icon
                      v-if="row.sectorEnabled"
                      name="ic:twotone-person-add-disabled"
                    />
                    <Icon v-else name="ic:twotone-person-add" />
                  </el-button>
                </el-tooltip>
              </el-dropdown-item>
              <el-dropdown-item v-if="!row.sectorDeleted">
                <el-tooltip
                  class="box-item"
                  effect="dark"
                  content="Delete Sector"
                  placement="right"
                >
                  <el-button @click="remove(row)">
                    <Icon name="ic:baseline-delete-forever" />
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

<script lang="ts" setup>
import { useEventBus } from "~/events/eventBus";
import { Sector } from "~/entities/hefesto/Sector";
import { SectorService } from "~/service/hefesto/SectorService";

const dialogVisible: Ref<boolean> = ref(false);
const componentKey: Ref<string> = ref("");
const sector: Ref<Sector> = ref({} as Sector);
const typeSave: Ref<"create" | "update"> = ref("update");
const svg = Loading().svg;
const loading: Ref<boolean> = ref(false);
const sectors: Ref<Sector[]> = ref([]);
const sectorService = new SectorService();

onMounted(() => {
  fetchSectors();
});

const handleClose = (done: () => void) => {
  ElMessageBox.confirm(`Are you sure to close this Sector?`)
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
  sector.value = {} as Sector;
  typeSave.value = "update";
};

const edit = (row: Sector) => {
  dialogVisible.value = true;
  componentKey.value = row.id as string;
  sector.value = row;
  typeSave.value = "update";
};

const toggle = (row: Sector) => {
  loading.value = true;

  ElMessageBox.confirm(
    `Are you sure to ${row.sectorEnabled ? "disable" : "enable"} this Sector ${
      row.sectorName
    } ?`
  )
    .then(async () => {
      let response;
      if (row.sectorEnabled) {
        response = await sectorService.disableSector(row.id as string);
      } else {
        response = await sectorService.enableSector(row.id as string);
      }

      if (response) {
        const data = await response.json();
        if (data) {
          PosseidonNotif(
            "success",
            `Sector ${row.sectorName} ${
              row.sectorEnabled ? "disabled" : "enabled"
            }.`
          );
        }
      }
    })
    .catch((error) => {
      //console.log(error);
      PosseidonNotif("warning", `${error} this operation.`);
    })
    .finally(() => {
      fetchSectors();
      loading.value = false;
    });
};

const remove = (row: Sector) => {
  loading.value = true;
  console.log(row);
  ElMessageBox.confirm(`Are you sure to delete this Sector ${row.sectorName} ?`)
    .then(async () => {
      const response = await sectorService.deleteSector(row.id as string);
      if (response) {
        const data = await response.json();
        if (data) {
          PosseidonNotif("success", `Sector ${row.sectorName} deleted.`);
          fetchSectors();
        }
      }
    })
    .catch((error) => {
      //console.log(error);
      PosseidonNotif("warning", `${error} this operation.`);
    })
    .finally(() => {
      loading.value = false;
    });
};

const fetchSectors = async () => {
  loading.value = true;

  const response = await sectorService.getAllSectors();
  if (response) {
    sectors.value = await response.json();
  }

  loading.value = false;
};

watch(
  () => useEventBus().value.refreshSectors,
  (newValue) => {
    if (newValue) {
      fetchSectors();
      hideDialog();
      useEventBus().value.refreshSectors = false;
    }
  }
);
</script>
