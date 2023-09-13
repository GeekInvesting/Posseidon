<template>
  <div class="p-4 bg-white routed-lg shadow-md mx-5 md:mx-5 lg:mx-10 xl:mx-20">
    <el-form
      class="mb-4"
      v-loading="loading"
      :element-loading-svg="svg"
      element-loading-svg-view-box="-10, -10, 50, 50"
    >
      <el-form-item label="Name" prop="companyName" class="mb-4">
        <el-input
          v-model="company.companyName"
          class="shadow-sm"
          placeholder="PETROLEO BRASILEIRO SA PETROBRAS"
        />
      </el-form-item>
      <el-form-item label="Code" prop="companyCode" class="mb-4">
        <el-input
          v-model="company.companyCode"
          class="shadow-sm"
          placeholder="33.000.167/0001-01"
        />
      </el-form-item>
      <el-form-item label="Website RI" prop="companySiteRi" class="mb-4">
        <el-input
          v-model="company.companySiteRi"
          class="shadow-sm"
          placeholder="http://www.petrobras.com.br/ri"
        />
      </el-form-item>
      <el-form-item label="Logo" prop="companyLogo" class="mb-4">
        <div class="flex items-center flex-grow">
          <el-input
            v-model="company.companyLogo"
            class="shadow-sm"
            placeholder="https://s3-symbol-logo.tradingview.com/brasileiro-petrobras--big.svg"
            @change="fetchLogo"
          />
          <img
            v-if="logo"
            :src="logo"
            class="w-10 h-10 ml-2"
            alt="Company Logo"
          />
        </div>
      </el-form-item>

      <el-form-item
        label="Main Activity"
        prop="companyMainActivity"
        class="mb-4"
      >
        <el-input
          v-model="company.companyMainActivity"
          class="shadow-sm"
          placeholder="Oil and Gas"
        />
      </el-form-item>
      <el-form-item label="About" prop="companyAbout" class="mb-4">
        <el-input
          v-model="company.companyAbout"
          class="shadow-sm"
          placeholder="Petrobras is a semi-public Brazilian multinational corporation in the petroleum industry headquartered in Rio de Janeiro, Brazil. The company's name translates to Brazilian Petroleum Corporation — Petrobras."
          type="textarea"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="submitForm"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Submit
        </el-button>
      </el-form-item>
      <el-form-item v-if="props.companySave === 'create'" >
        <el-checkbox v-model="anotherCompany" label="Create Another Company" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { emitEventBus } from "~/events/eventBus";
import { Company } from "~/entities/hefesto/Company";
import { CompanyService } from "~/service/hefesto/CompanyService";

const loading = ref(false);
const svg = Loading().svg;
const logo = ref("");
const anotherCompany = ref(false);

const companyService = new CompanyService();

onMounted(() => {
  fetchLogo();
});

const props = defineProps({
  initialData: {
    type: Object as PropType<Company>,
    default: () => ({}),
  },
  companySave: {
    type: String,
    default: "create",
  },
});

const company = ref<Company>({
  id: props.initialData.id || "",
  companyName: props.initialData.companyName || "",
  companyCode: props.initialData.companyCode || "",
  companySiteRi: props.initialData.companySiteRi || "",
  companyLogo: props.initialData.companyLogo || "",
  companyMainActivity: props.initialData.companyMainActivity || "",
  companyAbout: props.initialData.companyAbout || "",
  companyEnabled: props.initialData.companyEnabled || true,
  companyDeleted: props.initialData.companyDeleted || false,
});

watch(props.initialData, (newValue) => {
  company.value.id = newValue.id || "";
  company.value.companyName = newValue.companyName || "";
  company.value.companyCode = newValue.companyCode || "";
  company.value.companySiteRi = newValue.companySiteRi || "";
  company.value.companyLogo = newValue.companyLogo || "";
  company.value.companyMainActivity = newValue.companyMainActivity || "";
  company.value.companyAbout = newValue.companyAbout || "";
  company.value.companyEnabled = newValue.companyEnabled || true;
  company.value.companyDeleted = newValue.companyDeleted || false;
});

const submitForm = () => {
  loading.value = true;

  ElMessageBox.confirm(
    `Are you sure to ${props.companySave} this Company?`,
    "Warning",
    {
      confirmButtonText: "OK",
      cancelButtonText: "Cancel",
      type: "warning",
    }
  )
    .then(async () => {
      let response;

      props.companySave === "create"
        ? (response = await companyService.createCompany(company.value))
        : (response = await companyService.updateCompany(company.value));

      response
        ? PosseidonNotif(`success`, `${props.companySave}d successfully!`)
        : null;

        emitEventBus("refreshCompanies", true);
        anotherCompany.value ? null : emitEventBus("dialogCreate", true);
        loading.value = false;
        emptyForm();
    })
    .catch((error) => {
      PosseidonNotif(`warning`, `${error} this operation!`);
    });
};

const fetchLogo = async () => {
  if (company.value.companyLogo) {
    const response = await fetch(company.value.companyLogo);
    const blob = await response.blob();
    //console.log(blob);
    logo.value = URL.createObjectURL(blob);
  }
};

const emptyForm = () => {
  company.value = {
    id: "",
    companyName: "",
    companyCode: "",
    companySiteRi: "",
    companyLogo: "",
    companyMainActivity: "",
    companyAbout: "",
    companyEnabled: true,
    companyDeleted: false,
  };
  logo.value = "";
};
</script>
