<template>
  <el-dialog
    :title="investorSave === 'create' ? 'Create Investor' : 'Edit Investor'"
    v-model="dialogVisible"
    width="90%"
    :before-close="handleClose"
  >
    <span>
      <AdminHeraInvestorForm
        :key="componentKey"
        :initialData="investor"
        :investorSave="investorSave"
      />
    </span>
  </el-dialog>
  <el-table
    class="mb-4"
    v-loading="loading"
    :element-loading-svg="svg"
    element-loading-svg-view-box="-10, -10, 50, 50"
    :data="investors"
  >
    <el-table-column prop="investorName" label="Name" sortable />
    <el-table-column prop="investorDoc" label="Document" sortable />
    <el-table-column prop="investorCity.cityName" label="City" sortable />
    <el-table-column
      prop="investorCity.cityState.stateName"
      label="State"
      sortable
    />
    <el-table-column
      prop="investorCity.cityState.stateCountry.countryName"
      label="Country"
      sortable
    />
    <el-table-column prop="investorEnabled" label="Enabled" sortable>
      <template #default="{ row }">
        <el-tag
          :type="row.investorEnabled ? 'success' : 'danger'"
          size="default"
          >{{ row.investorEnabled ? "Yes" : "No" }}</el-tag
        >
      </template>
    </el-table-column>
    <el-table-column prop="investorDeleted" label="Deleted" sortable>
      <template #default="{ row }">
        <el-tag
          :type="row.investorDeleted ? 'danger' : 'success'"
          size="default"
          >{{ row.investorDeleted ? "Yes" : "No" }}</el-tag
        >
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
                  content="Edit Investor"
                  placement="right"
                >
                  <el-button @click="edit(row)">
                    <Icon name="ic:twotone-mode-edit" />
                  </el-button>
                </el-tooltip>
              </el-dropdown-item>
              <div v-if="!row.investorDeleted">
                <el-dropdown-item>
                  <el-tooltip
                    class="box-item"
                    effect="dark"
                    :content="
                      row.investorEnabled
                        ? 'Disable Investor'
                        : 'Enable Investor'
                    "
                    placement="right"
                  >
                    <el-button @click="toggle(row)">
                      <Icon
                        :name="
                          row.investorEnabled
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
                    content="Delete Investor"
                    placement="right"
                  >
                    <el-button @click="remove(row)">
                      <Icon name="ic:sharp-delete" />
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
import { useEventBus } from "~/events/eventBus";
import { InvestorHera } from "~/model/hera/InvestorHera";
import { InvestorHeraService } from "~/service/hera/InvestorService";

const investorSave = ref("update");
const dialogVisible = ref(false);
const componentKey = ref("");
const loading = ref(false);
const svg = Loading().svg;
let investor: InvestorHera = {} as InvestorHera;
let investors: InvestorHera[] = [];

const investorService = new InvestorHeraService();

onMounted(() => {
  fetchInvestors();
});

watch(
  () => useEventBus().value.refreshInvestors,
  (newValue) => {
    if (newValue) {
      fetchInvestors();
      hideDialog();
      useEventBus().value.refreshInvestors = false;
    }
  }
);

const fetchInvestors = async () => {
  loading.value = true;

  const response = await investorService.getAllInvestors();

  investors = await response.json();

  hideDialog();
  loading.value = false;
};

const handleClose = () => {
  ElMessageBox.confirm("Are you sure to close this dialog Investor?")
    .then(() => {
      hideDialog();
    })
    .catch((error) => {
      console.log(error);
      PosseidonNotif(`warning`, `${error} this Operation!`);
    });
};

const hideDialog = () => {
  dialogVisible.value = false;
  componentKey.value = "";
};

const edit = (row: InvestorHera) => {
  investor = row;
  investorSave.value = "update";
  dialogVisible.value = true;
  componentKey.value = row.id;
};

const toggle = (row: InvestorHera) => {
  loading.value = true;

  ElMessageBox.confirm(`Are you sure to ${row.investorEnabled ? "Disable" : "Enable"} this Investor?`,
  {
    title: `${row.investorEnabled ? "Disable" : "Enable"} ${row.investorName}!`,
    confirmButtonText: `${row.investorEnabled ? "Disable" : "Enable"}`,
    cancelButtonText: "Cancel",
    type: "warning",
  })
    .then(async () => {
      let response;

      row.investorEnabled
        ? (response = await investorService.disableInvestor(row))
        : (response = await investorService.enableInvestor(row));

      response ? PosseidonNotif(`success`, `Investor ${row.investorEnabled ? "Disabled" : "Enabled"}!`) : PosseidonNotif(`error`, `Investor Not ${row.investorEnabled ? "Disabled" : "Enabled"}!`);

    })
    .catch((error) => {
      //console.log(error);
      PosseidonNotif(`warning`, `${error} this Operation!`);
  }).finally(() => {
    fetchInvestors();
    loading.value = false;
  });
};

const remove = (row: InvestorHera) => {
  loading.value = true;

  ElMessageBox.confirm("Are you sure to delete this Investor?",
  {
    title: `Deleting ${row.investorName}!`,
    confirmButtonText: "Delete",
    cancelButtonText: "Cancel",
    type: "warning",
  })
    .then(async () => {
      const response = await investorService.deleteInvestor(row);

      response ? PosseidonNotif(`success`, `Investor Deleted!`) : PosseidonNotif(`error`, `Investor Not Deleted!`);

    })
    .catch((error) => {
      //console.log(error);
      PosseidonNotif(`warning`, `${error} this Operation!`);
  }).finally(() => {
    fetchInvestors();
    loading.value = false;
  });
};
</script>
