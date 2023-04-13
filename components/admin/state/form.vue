<template>
  <div>
    <el-alert
      v-if="alertState"
      :title="alertTitle"
      :description="alertDescription"
      :type="alertType"
      :closable="false"
    />
    <br />
  </div>
  <div class="p-8 rounded-lg shadow-md mx-5">
    <el-form :model="state" ref="stateForm" label-width="120px">
      <el-form-item label="State Name" prop="stateName">
        <el-input v-model="state.stateName" />
      </el-form-item>
      <el-form-item label="State Code" prop="stateCode">
        <el-input v-model="state.stateCode" />
      </el-form-item>
      <el-form-item label="Country">
        <!--- //TODO:Substituir o select por um componente de autocoplete -->
        <el-select v-model="selectValue" placeholder="Selecione um país">
          <el-option
            v-for="country in countries"
            :key="country.id"
            :label="country.countryName"
            :value="country.id"
          ></el-option>
        </el-select>
        
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">Submit</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { State } from "~/model/State";
import { Country } from "~/model/Country";
import { emitEventBus } from "~~/events/eventBus";

const runtimeConfig = useRuntimeConfig();
const urlHera = runtimeConfig.apiHera;

let selectValue = ref("");

let urlApi: String = "";
let urlType: String = "";

let alertState: Ref<boolean> = ref(false);
let alertDescription: Ref<string> = ref("");
let alertTitle: Ref<string> = ref("");
let alertType: Ref<any> = ref("success");

const props = defineProps({
  initialData: {
    type: Object,
    default: () => ({}),
  },
  typeSave: {
    type: String,
    default: "create",
  },
});

const countries: Country[] = [
  // Insira os dados dos países aqui, exemplo:
  {
    id: "1",
    countryName: "Brasil",
    countryCode: "BR",
    countryEnabled: true,
    countryDeleted: false,
  },
  {
    id: "2",
    countryName: "Estados Unidos",
    countryCode: "US",
    countryEnabled: true,
    countryDeleted: false,
  },
];

let state: State = {
  id: props.initialData.id || "",
  stateName: props.initialData.stateName || "",
  stateCode: props.initialData.stateCode || "",
  stateCountry: props.initialData.stateCountry || countries,
  stateEnabled: props.initialData.stateEnabled || false,
  stateDeleted: props.initialData.stateDeleted || false,
};

watch(props.initialData, (newVal) => {
  state = {
    id: newVal.id || "",
    stateName: newVal.stateName || "",
    stateCode: newVal.stateCode || "",
    stateCountry: newVal.stateCountry || countries,
    stateEnabled: newVal.stateEnabled || false,
    stateDeleted: newVal.stateDeleted || false,
  };
});

let stateForm = ref(null);

const submitForm = async () => {
  // Implemente a lógica de envio do formulário aqui
  console.log("Formulário enviado:", state);
};
/*
    function resetForm() {
      stateForm.value.resetFields()
    }
    */
</script>
