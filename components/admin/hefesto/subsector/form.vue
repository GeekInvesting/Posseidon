<template>
  <div class="p-4 bg-white rouded-lg shadow-md mx-5 md:mx-5 lg:mx-10 xl:mx-20">
    <el-form
      class="mb-4"
      v-loading="loading"
      :element-loading-svg="svg"
      element-loading-svg-view-box="-10, -10, 50, 50"
    >
      <el-form-item label="Subsector Name" prop="subsectorName" class="mb-4">
        <el-input
          v-model="subsector.subsectorName"
          class="shadow-sm"
          placeholder="Transmition"
        />
      </el-form-item>
      <el-form-item label="Sector" class="shadow-sm">
        <el-select
          v-model="sectorValue"
          placeholder="Select a sector"
          @change="onSelectSector"
          class="shadow-sm"
        >
          <el-option
            v-for="sector in sectors"
            :key="sector"
            :label="sector"
            :value="sector"
          />
        </el-select>
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
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { emitEventBus } from "~/events/eventBus";
import { Subsector, SubsectorDto } from "~/model/hefesto/Subsector";
import { SectorService } from "~/utils/service/hefesto/SectorService";
import { SubsectorService } from "~/utils/service/hefesto/SubsectorService";

const loading = ref(false);
const svg = Loading().svg;
const sectors = ref([]);
const sectorValue = ref<string>("");

const sectorService = new SectorService();
const subsectorService = new SubsectorService();

onMounted(() => {
  fetchSectorsNames();
});

const props = defineProps({
  initialData: {
    type: Object as PropType<SubsectorDto>,
    default: () => ({}),
  },
  typeSave: {
    type: String as PropType<"create" | "update">,
    default: "create",
  },
});

const subsector = ref<Partial<SubsectorDto>>({
  id: props.initialData.id || "",
  subsectorName: props.initialData.subsectorName || "",
  sectorName: props.initialData.sectorName || "",
  subsectorEnabled: props.initialData.subsectorEnabled || true,
  subsectorDeleted: props.initialData.subsectorDeleted || false,
});

watch(
  () => props.initialData,
  (value) => {
    subsector.value = {
      id: value.id || "",
      subsectorName: value.subsectorName || "",
      sectorName: value.sectorName || "",
      subsectorEnabled: value.subsectorEnabled || true,
      subsectorDeleted: value.subsectorDeleted || false,
    };
  },
  { immediate: true }
);

const submitForm = async () => {
  loading.value = true;
  let response;
  if (props.typeSave === "create")
    response = await subsectorService.createSubsector(subsector.value);
  //else response = await subsectorService.updateSubsector(subsector.value);

  if (response) {
    const data = await response.json();
    emitEventBus("refreshSubsectors", true);
    emptyForm();
    PosseidonNotif(`success`, `Subsector ${data.subsectorName} successfully`);
  }
  loading.value = false;
};

const onSelectSector = () => {
  subsector.value.sectorName = sectorValue.value;
};

const fetchSectorsNames = async () => {
  const response = await sectorService.getAllSectorsName();
  const data = await response.json();
  //console.log(data);
  sectors.value = data;

  if (props.typeSave === "update")
    sectorValue.value = subsector.value.sectorName as string;
  else sectorValue.value = "";
};

const emptyForm = () => {
  subsector.value = {
    id: "",
    subsectorName: "",
    sectorName: "",
    subsectorEnabled: true,
    subsectorDeleted: false,
  };
  sectorValue.value = "";
};
</script>
