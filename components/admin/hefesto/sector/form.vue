<template>
  <div class="p-4 bg-white rouded-lg shadow-md mx-5 md:mx-5 lg:mx-10 xl:mx-20">
    <el-form
      class="mb-4"
      v-loading="loading"
      :element-loading-svg="svg"
      element-loading-svg-view-box="-10, -10, 50, 50"
    >
      <el-form-item label="Sector Name" prop="sectorName" class="mb-4">
        <el-input
          v-model="sector.sectorName"
          class="shadow-sm"
          placeholder="Eletric"
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
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { emitEventBus } from "~/events/eventBus";
import { Sector } from "~/model/hefesto/Sector";
import { SectorService } from "~/utils/service/hefesto/SectorService";

const loading = ref(false);
const svg = Loading().svg;

const sectorService = new SectorService();

const props = defineProps({
  initialData: {
    type: Object as PropType<Sector>,
    default: () => ({} as Sector),
    },
  typeSave: {
    type: String as PropType<"create" | "update">,
    default: "create",
  },
});

const sector = ref<Sector>({
  sectorId: props.initialData.sectorId || '' ,
  sectorName: props.initialData.sectorName || "",
  sectorEnabled: props.initialData.sectorEnabled || true,
  sectorDeleted: props.initialData.sectorDeleted || false,
});

watch(
  () => props.initialData,
  (value) => {
    sector.value = {
      sectorId: value.sectorId || "",
      sectorName: value.sectorName || "",
      sectorEnabled: value.sectorEnabled || true,
      sectorDeleted: value.sectorDeleted || false,
    };
  }
);

const submitForm = async () => {
  loading.value = true;
  if (props.typeSave === "create") {
    const response = await sectorService.createSector(sector.value);

    if(response) {
    const body = await response.json();
    PosseidonNotif(`success`, `Sector ${body.sectorName} created!`);
    //console.log(body);
    emptyForm();
    }
  } else {
    const response = await sectorService.updateSector(sector.value);

    if(response) {
    const body = await response.json();
    PosseidonNotif(`success`, `Sector ${body.sectorName} updated!`);
    //console.log(body);
    emptyForm();
    }
  }

  emitEventBus("refreshSectors", true);
  loading.value = false;
};

const emptyForm = () => {
  sector.value = {
    sectorId: "",
    sectorName: "",
    sectorEnabled: true,
    sectorDeleted: false,
  };
};
</script>
