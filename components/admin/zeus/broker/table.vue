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
    <el-table-column label="Url" prop="brockerUrl" sortable/>
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

const brokerVisible = ref(false)
const brokers = ref([])
const broker = ref({})
const loading = ref(false)
const svg = Loading().svg
const componentKey = ref('')

const brockerService = new BrokerService()

onMounted(() => {
  fetchBrokers()
})

const fetchBrokers = async () => {
  loading.value = true;
  const response = await brockerService.getAllBrokers();
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
      brokerVisible.value = false
    })
    .catch((error) => {
      brokerVisible.value = true
      PosseidonNotif(`warning`, `${error} this Broker!`)
    })
}

const edit = (row: BrokerEntity) => {
  //TODO edit broker
}

const toggle = (row: BrokerEntity) => {
  //TODO toggle broker
}

const remove = (row: BrokerEntity) => {
  //TODO remove broker
}
</script>
