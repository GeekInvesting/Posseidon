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
          v-model="subsectorDto.subsectorName"
          class="shadow-sm"
          placeholder="Transmition"
        />
      </el-form-item>
      <el-form-item label="Sector" class="mb-4">
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
import { SectorService } from "~/service/hefesto/SectorService";
import { SubsectorService } from "~/service/hefesto/SubsectorService";

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
    type: Object as PropType<Subsector>,
    default: () => ({}),
  },
  typeSave: {
    type: String as PropType<"create" | "update">,
    default: "create",
  },
});

const subsectorDto = ref<Partial<SubsectorDto>>({
  id: props.initialData.id || "",
  subsectorName: props.initialData.subsectorName || "",
  sectorName: props.initialData.sectorModel?.sectorName || "",
  subsectorEnabled: props.initialData.subsectorEnabled || true,
  subsectorDeleted: props.initialData.subsectorDeleted || false,
});

watch(
  () => props.initialData,
  (value) => {
    subsectorDto.value = {
      id: value.id || "",
      subsectorName: value.subsectorName || "",
      sectorName: value.sectorModel?.sectorName || "",
      subsectorEnabled: value.subsectorEnabled || true,
      subsectorDeleted: value.subsectorDeleted || false,
    };
  },
  { immediate: true }
);

const submitForm = async () => {
  loading.value = true;
  let response;
  if (props.typeSave === "create") response = await subsectorService.createSubsector(subsectorDto.value);
  else response = await subsectorService.updateSubsector(subsectorDto.value);

  if (response) {
    const data = await response.json();
    emitEventBus("refreshSubsectors", true);
    emptyForm();
    PosseidonNotif(`success`, `Subsector ${data.subsectorName} successfully`);
  }
  loading.value = false;
};

const onSelectSector = () => {
  subsectorDto.value.sectorName = sectorValue.value;
};

const fetchSectorsNames = async () => {
  const response = await sectorService.getAllSectorsName();
  const data = await response.json();
  //console.log(data);
  sectors.value = data;

  if (props.typeSave === "update")
    sectorValue.value = subsectorDto.value.sectorName as string;
  else sectorValue.value = "";
};

const emptyForm = () => {
  subsectorDto.value = {
    id: "",
    subsectorName: "",
    sectorName: "",
    subsectorEnabled: true,
    subsectorDeleted: false,
  };
  sectorValue.value = "";
};
</script>
