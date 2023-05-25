<template>
  <div class="p-4 bg-white rouded-lg shadow-md mx-5 md:mx-5 lg:mx-10 xl:mx-20">
    <el-form
      class="mb-4"
      v-loading="loading"
      :element-loading-svg="svg"
      element-loading-svg-view-box="-10, -10, 50, 50"
    >
      <el-form-item label="Exchange Name" prop="exchangeName" class="mb-4">
        <el-input
          v-model="exchange.exchangeName"
          class="shadow-sm"
          placeholder="New York Stock Exchange"
        />
      </el-form-item>
      <el-form-item label="Exchange Code" prop="exchangeCode" class="mb-4">
        <el-input
          v-model="exchange.exchangeCode"
          class="shadow-sm"
          placeholder="NYSE"
        />
      </el-form-item>
      <el-form-item label="Currency" prop="exchangeCurrency" class="mb-4">
        <el-input
          v-model="exchange.exchangeCurrency"
          class="shadow-sm"
          placeholder="USD"
        />
      </el-form-item>
      <el-form-item label="Country" class="mb-4">
        <!--- //TODO:Substituir o select por um componente de autocoplete -->
        <el-select
          v-model="selectValue"
          placeholder="Selecione um país"
          @change="onSelectChange"
          class="shadow-sm"
        >
          <el-option
            v-for="country in countries"
            :key="country"
            :label="country"
            :value="country"
          ></el-option>
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
import { emitEventBus } from "~~/events/eventBus";
import { Exchange } from "~/model/hefesto/Exchange";
import { ApiHera } from "~/utils/api/hera";
import {
  createExchange,
  updateExchange,
} from "~/utils/service/hefesto/ExchangeService";

const svg = Loading().svg;
const loading = ref(false);

let selectValue = ref("");
let countries: Ref<string[]> = ref([]);

const props = defineProps({
  initialData: {
    type: Object as PropType<Exchange>,
    required: true,
  },
  typeSave: {
    type: String as PropType<"create" | "update">,
    default: "create",
  },
});

const exchange: Ref<Exchange> = ref({
  exchangeId: props.initialData.exchangeId,
  exchangeName: props.initialData.exchangeName,
  exchangeCode: props.initialData.exchangeCode,
  exchangeCurrency: props.initialData.exchangeCurrency,
  exchangeCountry: props.initialData.exchangeCountry,
  exchangeEnabled: props.initialData.exchangeEnabled,
  exchangeDeleted: props.initialData.exchangeDeleted,
});

watch(props.initialData, (value) => {
  exchange.value = {
    exchangeId: value.exchangeId,
    exchangeName: value.exchangeName,
    exchangeCode: value.exchangeCode,
    exchangeCurrency: value.exchangeCurrency,
    exchangeCountry: value.exchangeCountry,
    exchangeEnabled: value.exchangeEnabled,
    exchangeDeleted: value.exchangeDeleted,
  };
});

onMounted(() => {
  getCountries();
  selectValue.value = exchange.value.exchangeCountry;
});

const getCountries = async () => {
  const response = await ApiHera().getAllCountryName();
  const data = await response.json();
  //console.log("data: ", data);
  countries.value = data;
};

const onSelectChange = () => {
  exchange.value.exchangeCountry = selectValue.value;
};

const submitForm = async () => {
  loading.value = true;
  if (props.typeSave === "create") {
    const response = await createExchange(exchange.value);
    if (response.status != 201) {
      const responsebody = await response.text();
      console.log("responsebody: ", responsebody);
      PosseidonNotif(`error`, `${responsebody}`);
      return;
    }
    PosseidonNotif(
      `success`,
      `Exchange ${exchange.value.exchangeName} created!`
    );
  } else {
    const response = await updateExchange(exchange.value);
    if (response.status != 200) {
      const responsebody = await response.text();
      console.log("responsebody: ", responsebody);
      PosseidonNotif(`error`, `${responsebody}`);
      return;
    }
    PosseidonNotif(
      `success`,
      `Exchange ${exchange.value.exchangeName} updated!`
    );
  }

  emitEventBus("refreshExchange", true);
  emitEventBus("dialogExchange", true);

  emptyForm();

  loading.value = false;
};

const emptyForm = () => {
  exchange.value = {
    exchangeId: '',
    exchangeName: "",
    exchangeCode: "",
    exchangeCurrency: "",
    exchangeCountry: "",
    exchangeEnabled: true,
    exchangeDeleted: false,
  };
  selectValue.value = "";
};
</script>
