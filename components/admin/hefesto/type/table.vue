<template>
  <el-dialog
    title="Type"
    v-model="dialogVisible"
    width="85%"
    :before-close="handleClose"
  >
    <span>
      <AdminHefestoTypeForm
        :key="componentKey"
        :initialData="typeModel"
        :typeSave="typeSave"
      />
    </span>
  </el-dialog>
  <el-table
    :data="types"
    class="custom-loading-svg w-full md:w-3/4 lg:w-1/2 xl:w-1/3 grid grid-flow-row auto-rows-max"
    v-loading="loading"
    :element-loading-svg="svg"
    element-loading-svg-view-box="-10, -10, 50, 50"
  >
    <el-table-column prop="typeName" label="Name" sortable />
    <el-table-column prop="typeCode" label="Code" sortable />
    <el-table-column prop="typeEnabled" label="Enable">
      <template #default="{ row }">
        <span>{{ row.typeEnabled ? "Enable" : "Disable" }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="typeDeleted" label="Deleted">
      <template #default="{ row }">
        <span>{{ row.typeDeleted ? "Deleted" : "" }}</span>
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
                  content="Edit Type"
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
                    row.typeEnabled ? 'Disable Type' : 'Enable Type'
                  "
                  placement="right"
                >
                  <el-button @click="toggle(row)">
                    <Icon
                      :name="
                        row.typeEnabled ? 'ic:sharp-block' : 'ic:sharp-check'
                      "
                    />
                  </el-button>
                </el-tooltip>
              </el-dropdown-item>
              <el-dropdown-item v-if="!row.typeDeleted">
                <el-tooltip
                  class="box-item"
                  effect="dark"
                  content="Delete Type"
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

<script setup lang="ts">
import { useEventBus } from "~/events/eventBus";
import { TypeModel } from "~/model/hefesto/TypeModel";
import { TypeService } from "~/service/hefesto/TypeService";

const dialogVisible = ref(false);
const componentKey = ref("");
const typeModel: Ref<TypeModel> = ref({} as TypeModel);
const typeSave = ref("");
const loading = ref(false);
const svg = Loading().svg;
const types: Ref<TypeModel[]> = ref([]);

const typeService = new TypeService();

onMounted(() => {
  fetchTypes();
});

const handleClose = (done: () => void) => {
  ElMessageBox.confirm(`Are you sure to close this Type?`)
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
  loading.value = false;
};

const edit = (row: TypeModel) => {
  loading.value = true;
  typeModel.value = row;
  componentKey.value = row.typeId;
  typeSave.value = "update";
  dialogVisible.value = true;
  //console.log(row);
};

const toggle = (row: TypeModel) => {
  loading.value = true;

  let response;
  ElMessageBox.confirm(
    `Are you sure to ${row.typeEnabled ? "disable" : "enable"} this Type?`
  )
    .then( async () => {
      row.typeEnabled
        ? (response = await typeService.disableType(row))
        : (response = await typeService.enableType(row));

      response
        ? PosseidonNotif(
            "success",
            `Type ${row.typeEnabled ? "disabled" : "enabled"} successfully.`
          )
        : null;
    })
    .catch((error) => {
      //console.log(error);
      PosseidonNotif("warning", `${error} this operation.`);
    }).finally(() => {
      fetchTypes();
      loading.value = false;
    });
};

const remove = (row: TypeModel) => {
  loading.value = true;

  ElMessageBox.confirm(`Are you sure to delete this Type?`)
    .then(async () => {
      const response = await typeService.deleteType(row);

      response
        ? PosseidonNotif("success", `Type deleted successfully.`)
        : null;
    })
    .catch((error) => {
      //console.log(error);
      PosseidonNotif("warning", `${error} this operation.`);
    }).finally(() => {
      fetchTypes();
      loading.value = false;
    });
};

const fetchTypes = async () => {
  loading.value = true;

  const response = await typeService.getAllTypes();

  types.value = await response.json();

  loading.value = false;
};

watch(
  () => useEventBus().value.refreshTypes,
  (newValue) => {
    if (newValue) {
      fetchTypes();
      hideDialog();
      useEventBus().value.refreshTypes = false;
    }
  }
);
</script>
