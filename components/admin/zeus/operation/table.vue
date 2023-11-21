<template>
  <el-dialog
    title="Update Operation"
    v-model="dialogVisible"
    width="90%"
    :before-close="handleClose">
    <span>
      <AdminZeusOperationForm
        :key="componentKey"
        :initialData="operation"
        typeSave="Update"/>
    </span>
  </el-dialog>
  <el-table
    class="mb-4"
    v-loading="loading"
    :element-loading-svg="svg"
    element-loading-svg-view-box="-10, -10, 50, 50"
    :data="operations">
    <el-table-column prop="operationName" label="Name" sortable/>
    <el-table-column prop="operationSystem" label="System" sortable/>
    <el-table-column prop="operationEnabled" label="Enabled" sortable>
      <template #default="{ row }">
        <el-tag
          :type="row.operationEnabled ? 'success' : 'danger'"
          size="default">
          {{ row.operationEnabled ? "Yes" : "No" }}
        </el-tag>
      </template>
    </el-table-column>
    <el-table-column prop="operationDeleted" label="Deleted" sortable>
      <template #default="{ row }">
        <el-tag
          :type="row.operationDeleted ? 'danger' : 'success'"
          size="default">
          {{ row.operationDeleted ? "Yes" : "No" }}
        </el-tag>
      </template>
    </el-table-column>
    <el-table-column label="Actions">
      <template #default="{ row }">
        <el-dropdown size="lager" placement="auto-end">
          <el-button circle>
            <Icon name="ic:baseline-format-list-bulleted"/>
          </el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>
                <el-tooltip
                  class="box-item"
                  effect="dark"
                  content="Edit Operation"
                  placement="right"
                >
                  <el-button @click="edit(row)">
                    <Icon name="ic:twotone-mode-edit"/>
                  </el-button>
                </el-tooltip>
              </el-dropdown-item>
              <div v-if="!row.operationDeleted">
                <el-dropdown-item>
                  <el-tooltip
                    class="box-item"
                    effect="dark"
                    :content="
                      row.operationEnabled
                        ? 'Disable Operation'
                        : 'Enable Operation'
                    "
                    placement="right"
                  >
                    <el-button @click="toggle(row)">
                      <Icon
                        :name="
                          row.operationEnabled
                            ? 'ic:sharp-block'
                            : 'ic:sharp-check'
                        "
                      />
                    </el-button>
                  </el-tooltip>
                </el-dropdown-item>
                <el-dropdown-item>
                  <el-tooltip
                    class="box-item"
                    effect="dark"
                    content="Delete Operation"
                    placement="right"
                  >
                    <el-button @click="remove(row)">
                      <Icon name="ic:sharp-delete"/>
                    </el-button>
                  </el-tooltip>
                </el-dropdown-item>
              </div>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts" setup>
import {Operation} from "~/entities/zeus/operation.entity";
import {OperationService} from "~/service/zeus/operation.service";
import {useEventBus} from "~/events/eventBus";

const dialogVisible = ref(false);
const loading = ref(false);
let operation: Operation;
let componentKey = "";
let svg = Loading().svg;
let operations: Operation[] = [];

const operationService = new OperationService();

onMounted(() => {
  fetchOperations();
});

const fetchOperations = async () => {
  loading.value = true;
  const response = await operationService.getAllOperations();
  operations = await response.json();
  hideDialog();
  //console.log(operations)
  loading.value = false;
};

watch(
  () => useEventBus().value.refreshOperations,
  (value) => {
    if (value) {
      fetchOperations();
      hideDialog();
      useEventBus().value.refreshOperations = false;
    }
  });

const handleClose = () => {
  ElMessageBox.confirm("Are you sure to close this dialog Operation?")
    .then(() => {
      hideDialog();
    })
    .catch((error) => {
      //console.log(error);
      PosseidonNotif(`warning`, `${error} this Operation!`);
    });
};

const hideDialog = () => {
  dialogVisible.value = false;
  componentKey = "";
};

const edit = (row: Operation) => {
  operation = row;
  componentKey = row._id;
  dialogVisible.value = true;
}

const toggle = (row: Operation) => {
  ElMessageBox.confirm(`Are you sure to ${row.operationEnabled ? "Disable" : "Enable"} this Operation?`,
    {
      confirmButtonText: `${row.operationEnabled ? "Disable" : "Enable"}`,
    }).then(async () => {
      let response;

      row.operationEnabled = !row.operationEnabled;
      response = await operationService.updateOperation(row);

      response
        ? PosseidonNotif(`success`, `${row.operationEnabled ? "Disabled" : "Enabled"} this Operation!`)
        : null;

      fetchOperations();
  }).catch((error) => {
    //console.log(error);
    PosseidonNotif(`warning`, `${error} this Operation!`);
  });
}

const remove = (row: Operation) => {
  loading.value = true;
  ElMessageBox.confirm(`Are you sure to delete this Operation?`, {
    confirmButtonText: `Delete`,
  }).then(async () => {
    row.operationDeleted = !row.operationDeleted
    const response = await operationService.updateOperation(row);
    response
      ? PosseidonNotif(`success`, `Deleted this Operation!`)
      : null;

    fetchOperations();
  }).catch((error) => {
    //console.log(error);
    PosseidonNotif(`warning`, `${error} this Operation!`);
  })
}
</script>
