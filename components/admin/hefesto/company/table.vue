<template>
  <el-dialog
    :title="companySave === 'create' ? 'Create Company' : 'Edit Company'"
    v-model="dialogVisible"
    width="90%"
    :before-close="handleClose"
  >
    <span>
      <AdminHefestoCompanyForm
        :key="componentKey"
        :initialData="companyModel"
        :companySave="companySave"
      />
    </span>
  </el-dialog>
  <el-table
    :data="companies"
    class="custom-loading-svg w-full md:w-3/4 lg:w-1/2 xl:w-1/3 grid grid-flow-row auto-rows-max"
    v-loading="loading"
    :element-loading-svg="svg"
    element-loading-svg-view-box="-10, -10, 50, 50"
  >
    <el-table-column prop="companyName" label="Name" sortable />
    <el-table-column prop="companyCode" label="Code" sortable />
    <el-table-column prop="companyEnabled" label="Enable">
      <template #default="{ row }">
        <span>{{ row.companyEnabled ? "Enable" : "Disable" }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="companyDeleted" label="Deleted">
      <template #default="{ row }">
        <span>{{ row.companyDeleted ? "Deleted" : "" }}</span>
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
                    row.companyEnabled ? 'Disable Company' : 'Enable Company'
                  "
                  placement="right"
                >
                  <el-button @click="toggle(row)">
                    <Icon
                      :name="
                        row.companyEnabled ? 'ic:sharp-block' : 'ic:sharp-check'
                      "
                    />
                  </el-button>
                </el-tooltip>
              </el-dropdown-item>
              <el-dropdown-item v-if="!row.companyDeleted">
                <el-tooltip
                  class="box-item"
                  effect="dark"
                  content="Delete Company"
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

<script lang="ts" setup>
import { useEventBus } from "~/events/eventBus";
import { Company } from "~/entities/hefesto/Company";
import { CompanyService } from "~/service/hefesto/CompanyService";

const loading = ref(false);
const svg = Loading().svg;
const companySave = ref("");
const dialogVisible = ref(false);
const componentKey = ref("");
const companyModel: Ref<Company> = ref({} as Company);
const companies: Ref<Company[]> = ref([]);

const companyService = new CompanyService();

onMounted(() => {
  fetchCompanies();
});

const fetchCompanies = async () => {
  loading.value = true;

  let response = await companyService.getAllCompanies();

  response ? (companies.value = await response.json()) : (companies.value = []);

  loading.value = false;
};

const handleClose = () => {
  ElMessageBox.confirm("Are you sure to close this dialog Company?")
    .then(() => {
      hideDialog();
    })
    .catch(() => {});
};

const hideDialog = () => {
  dialogVisible.value = false;
  componentKey.value = "";
  loading.value = false;
};

const edit = (row: Company) => {
  dialogVisible.value = true;
  companySave.value = "update";
  companyModel.value = row;
  componentKey.value = row.id;
};

const toggle = (row: Company) => {
  //TODO: implement this method to toggle the company
  loading.value = true;

  ElMessageBox({
    message: `Are you ${row.companyEnabled ? "Disable" : "Enable"} this company?`,
    title: `Company ${row.companyName}`,
    confirmButtonText: `${row.companyEnabled ? "Disable" : "Enable"}`,
    cancelButtonText: "Cancel",
    type: "warning",
  }).then(async() => {
    let response;

    row.companyEnabled
      ? (response = await companyService.disableCompany(row))
      : (response = await companyService.enableCompany(row));

    response ? PosseidonNotif("success", `Company ${row.companyEnabled ? 'Disabled' : 'Enabled'}`) : null;
  }).catch((error) => {
    PosseidonNotif("warning", `${error} this operation!`);
  }).finally(() => {
    fetchCompanies();
    loading.value = false;
  });
};

const remove = (row: Company) => {
  loading.value = true;
  ElMessageBox.confirm(
    "Are you sure to delete this company?",
    `Delete ${row.companyName}`,
    { confirmButtonText: "Delete", cancelButtonText: "Cancel", type: "warning" }
  )
    .then(async () => {
      let response = await companyService.deleteCompany(row);

      response ? PosseidonNotif("success", "Company deleted") : null;
    })
    .catch((error) => {
      PosseidonNotif("warning", `${error} this operatin!`);
    })
    .finally(() => {
      fetchCompanies();
      loading.value = false;
    });
};

watch(
  () => useEventBus().value.refreshCompanies,
  (newValue) => {
    if (newValue) {
      //console.log(newValue);
      fetchCompanies();
      hideDialog();
      useEventBus().value.refreshCompanies = false;
      dialogVisible.value = false;
    }
  }
);
</script>
