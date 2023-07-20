<template>
  <el-dialog
    title="Broker"
    v-model="brokerVisible"
    width="90%"
    :before-close="handleClose">
    <span>
      <AdminZeusBrokerForm
        :key="componentKey"
        :initialData="broker"
        typeSave="Update"/>
    </span>
  </el-dialog>
  <el-table
    class="mb-4"
    v-loading="loading"
    :element-loading-svg="svg"
    element-loading-svg-view-box="-10, -10, 50, 50"
    :data="brokers">
    <el-table-column prop="brokerName" label="Name" sortable/>
    <el-table-column label="Url" prop="brokerUrl" sortable/>
    <el-table-column prop="brokerEnabled" label="Enabled" sortable>
      <template #default="{ row }">
        <el-tag
          :type="row.brokerEnabled ? 'success' : 'danger'"
          size="default">
          {{ row.brokerEnabled ? "Yes" : "No" }}
        </el-tag>
      </template>
    </el-table-column>
    <el-table-column prop="brokerDeleted" label="Deleted" sortable>
      <template #default="{ row }">
        <el-tag
          :type="row.brokerDeleted ? 'danger' : 'success'"
          size="default">
          {{ row.brokerDeleted ? "Yes" : "No" }}
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
                  content="Edit Broker"
                  placement="right"
                >
                  <el-button @click="edit(row)">
                    <Icon name="ic:twotone-mode-edit"/>
                  </el-button>
                </el-tooltip>
              </el-dropdown-item>
              <div v-if="!row.brokerDeleted">
                <el-dropdown-item>
                  <el-tooltip
                    class="box-item"
                    effect="dark"
                    :content="
                      row.brokerEnabled
                        ? 'Disable Broker'
                        : 'Enable Broker'
                    "
                    placement="right"
                  >
                    <el-button @click="toggle(row)">
                      <Icon
                        :name="
                          row.brokerEnabled
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
                    content="Delete Broker"
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

<script setup lang="ts">
import {BrokerEntity} from "~/model/zeus/broker.entity";
import {BrokerService} from "~/service/zeus/broker.service";
import {useEventBus} from "~/events/eventBus";

const brokerVisible = ref(false)
const brokers = ref([])
const broker = ref({})
const loading = ref(false)
const svg = Loading().svg
const componentKey = ref('')

const brokerService = new BrokerService()

onMounted(() => {
  fetchBrokers()
})

watch(() => useEventBus().value.refreshBrokers,
  (value) => {
    if (value) {
      fetchBrokers();
      useEventBus().value.refreshBrokers = false;
    }
  }
)

const fetchBrokers = async () => {
  loading.value = true;
  const response = await brokerService.getAllBrokers();
  brokers.value = await response.json();
  brokerVisible.value = false;
  loading.value = false;
}

const handleClose = () => {
  brokerVisible.value = false
  ElMessageBox.confirm(`Are you sure to close this Broker.`, {
    confirmButtonText: "Yes",
    cancelButtonText: "No",
    type: "warning",
  })
    .then(() => {
      brokerVisible.value = false;
      fetchBrokers();
    })
    .catch((error) => {
      brokerVisible.value = true
      PosseidonNotif(`warning`, `${error} this Broker!`)
    })
}

const edit = (row: BrokerEntity) => {
  loading.value = true;
  broker.value = row;
  componentKey.value = row.id;
  brokerVisible.value = true;
}

const toggle = (row: BrokerEntity) => {
  loading.value = true;
  ElMessageBox.confirm(`Are you sure to ${row.brokerEnabled ? "Disable" : "Enable"} this Broker.`, {
    confirmButtonText: `${row.brokerEnabled ? "Disable" : "Enable"}`,
  }).then(async () => {
    let response;

    row.brokerEnabled
      ? (response = await brokerService.disableBroker(row.id))
      : (response = await brokerService.enableBroker(row.id));

    response
      ? PosseidonNotif(`success`, `${row.brokerEnabled ? "Disable" : "Enable"}d this Broker!`)
      : PosseidonNotif(`error`, `${row.brokerEnabled ? "Disable" : "Enable"}d this Broker!`)
  }).catch((error) => {
    PosseidonNotif(`warning`, `${error} this Broker!`)
  }).finally(() => {
    fetchBrokers();
  })
}

const remove = (row: BrokerEntity) => {
  loading.value = true;
  ElMessageBox.confirm(`Are you sure to delete this Broker.`, {
    confirmButtonText: "Yes",
    cancelButtonText: "No",
    type: "warning",
  })
    .then(async () => {
      const response = await brokerService.deleteBroker(row.id);
      response
        ? PosseidonNotif(`success`, `Deleted this Broker!`)
        : PosseidonNotif(`error`, `Deleted this Broker!`)
    })
    .catch((error) => {
      PosseidonNotif(`warning`, `${error} this Broker!`)
    })
    .finally(() => {
      fetchBrokers();
    })
}
</script>
