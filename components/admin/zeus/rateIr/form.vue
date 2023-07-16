<template>
  <div class="p-1 rounded-lg shadow-md mx-5 md:mx-5 lg:mx-10 xl:mx-20">
    <el-form
      ref="rateIr"
      v-model="rateIrEntity"
      label-width="120px"
      v-loading="loading"
      :element-loading-svg="svg"
      element-loading-svg-view-box="-10, -10, 50, 50">
      <el-form-item label="System" prop="system">
        <el-select
          v-model="rateIrEntity.system"
          placeholder="Select System"
          @change="fetchOperation">
          <el-option
            v-for="item in ['WALLET', 'YIELD']"
            :key="item"
            :label="item"
            :value="item"/>
        </el-select>
      </el-form-item>
      <el-form-item label="Operation" prop="operationId">
        <el-autocomplete
          v-model="operationSelect"
          :fetch-suggestions="querySearchOp"
          clearable
          class="inline-input w-50"
          :placeholder="operationsNames.length === 0 ? `Select System first` : `Select Operation`"
          @select="handleSelectOp"
          :disabled="operationsNames.length === 0"
        />
      </el-form-item>
      <el-form-item label="Type" prop="typeId">
        <el-autocomplete
          v-model="typeSelect"
          :fetch-suggestions="querySearchType"
          clearable
          class="inline-input w-50"
          placeholder="Select Type"
          @select="handleSelectType"
          :disabled="typesCodes.length === 0"
        />
      </el-form-item>
      <el-form-item label="Rate" prop="rate">
        <el-input-number
          v-model="rateIrEntity.rate"
          class="inline-input w-50"
          :precision="2"
          :controls="false"
          :min="0"
        />
      </el-form-item>
      <el-form-item label="Limit" prop="limit">
        <el-input-number
          v-model="rateIrEntity.limit"
          class="inline-input w-50"
          :precision="2"
          :controls="false"
          :min="0"
        />
      </el-form-item>
      <el-form-item label="Valid" prop="valid">
        <el-date-picker
          v-model="rateIrEntity.valid"
          type="date"
          placeholder=" YYYY-MM-DD "
          class="inline-input w-50"
        />
      </el-form-item>
      <el-form-item label="Enabled" prop="enabled">
        <el-switch
          v-model="rateIrEntity.enabled"
          inline-prompt
          style="
              --el-switch-on-color: #13ce66;
              --el-switch-off-color: #ff4949;
            "
          active-text="Enabled"
          inactive-text="Disabled"
        />
      </el-form-item>
      <el-form-item label="Created At" prop="createdAt">
        <el-date-picker
          v-model="rateIrEntity.createdAt"
          type="date"
          placeholder=" YYYY-MM-DD "
          class="inline-input w-50"
          :disabled="true"
        />
      </el-form-item>
      <el-form-item label="Updated At" prop="updatedAt">
        <el-date-picker
          v-model="rateIrEntity.updatedAt"
          type="date"
          placeholder=" YYYY-MM-DD "
          class="inline-input w-50"
          :disabled="true"
        />
      </el-form-item>
      <el-form-item>
        <el-button-group>
          <el-button
            type="primary"
            @click="submitForm"
            :disabled="!rateIrEntity.system || !rateIrEntity.operationId || !rateIrEntity.rate">
            {{ typeSave }}
          </el-button>
          <el-button
            v-if="props.typeSave !== `Create`"
            @click="removeRateIr"
            type="danger"
            :loading="loading"
            :disable="loading">
            Delete
          </el-button>
        </el-button-group>
      </el-form-item>
    </el-form>
    <el-form-item v-if="typeSave === 'Create'">
      <el-checkbox
        v-model="anotherRateIr"
        label="Create another Rate IR"
        class="inline-input w-50"
      />
    </el-form-item>
  </div>
</template>

<script lang="ts" setup>
import {CreateRateIrDto} from "~/model/zeus/rateIr.entity";
import {OperationService} from "~/service/zeus/operation.service";
import {CompleteItem} from "~/model/complete.entity";
import {RateIrService} from "~/service/zeus/RateIr.service";
import {emitEventBus} from "~/events/eventBus";
import {TypeService} from "~/service/hefesto/TypeService";

const loading = ref(false);
const svg = Loading().svg;
const anotherRateIr = ref(false);

const operationService = new OperationService();
const typeService = new TypeService();
const rateIrService = new RateIrService();

const props = defineProps({
  initialData: {
    type: Object,
    default: () => ({}),
  },
  typeSave: {
    type: String,
    default: "Create",
  },
})

onMounted(() => {
  fetchType();
  setCompletes(props.initialData);
})

const rateIrEntity = ref<CreateRateIrDto>({
  id: props.initialData.id || "",
  system: props.initialData.system || "",
  operationId: props.initialData.operationId || "",
  typeId: props.initialData.typeId || "",
  rate: props.initialData.rate || 0,
  limit: props.initialData.limit || 0,
  valid: new Date(props.initialData.valid) || new Date(31/12/9999),
  enabled: props.initialData.enabled || true,
  createdAt: new Date(props.initialData.createdAt) || "",
  updatedAt: new Date(props.initialData.updatedAt) || "",
});

watch(() => props.initialData,
  (value) => {
    rateIrEntity.value = {
      id: value.id || "",
      system: value.system || "",
      operationId: value.operationId || "",
      typeId: value.typeId || "",
      rate: value.rate || 0,
      limit: value.limit || 0,
      valid: new Date(value.valid) || new Date(31/12/9999),
      enabled: value.enabled || true,
      createdAt: new Date(value.createdAt) || "",
      updatedAt: new Date(value.updatedAt) || "",
    }
    setCompletes(value);
  })

const operationsNames = ref<CompleteItem[]>([]);
const operationSelect = ref<string>("");
const querySearchOp = (queryString: string, cb: any) => {
  const result = queryString
    ? operationsNames.value.filter(createFilter(queryString))
    : operationsNames.value;
  cb(result);
}
const handleSelectOp = (item: CompleteItem) => {
  rateIrEntity.value.operationId = item.link;
}

const typesCodes = ref<CompleteItem[]>([]);
const typeSelect = ref<string>("");
const querySearchType = (queryString: string, cb: any) => {
  const result = queryString
    ? typesCodes.value.filter(createFilter(queryString))
    : typesCodes.value;
  cb(result);
}
const handleSelectType = (item: CompleteItem) => {
  rateIrEntity.value.typeId = item.link;
}

const createFilter = (queryString: string) => {
  return (restaurant: CompleteItem) => {
    return (
      restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
    )
  }
}

const fetchOperation = async () => {
  let responseOp;
  rateIrEntity.value.system
    ? responseOp = await operationService.getOperationBySystem(rateIrEntity.value.system)
    : responseOp = await operationService.getOperationBySystem("WALLET");
  operationsNames.value = copyProperties(await responseOp.json());
  //console.log(operationsNames.value);
}

const fetchType = async () => {
  const responseType = await typeService.listTypeCodeAutocomplete();
  typesCodes.value = copyProperties(await responseType.json());
  //console.log(typesCodes.value);
}

const submitForm = async () => {
  loading.value = true;
  ElMessageBox.confirm(`Are you sure to ${props.typeSave} this Rate`, {
    confirmButtonText: `${props.typeSave}`,
  }).then(async () => {
    //console.log(rateIrEntity.value);
    let response;
    props.typeSave === "Create"
      ? response = await rateIrService.createRateIr(rateIrEntity.value)
      : response = await rateIrService.updateRateIr(rateIrEntity.value);

    response
      ? PosseidonNotif('success', `The Rate IR was ${props.typeSave}d successfully`)
      : PosseidonNotif('error', `The Rate IR was not ${props.typeSave}d`);

    anotherRateIr.value
      ? emptyForm()
      : emitEventBus("dialogCreate", true);
  }).catch(() => {
    PosseidonNotif('warning', `You cancel the ${props.typeSave} action`);
  }).finally(() => {
    emitEventBus("refreshRatesIr", true);
    loading.value = false;
  })
}

const emptyForm = () => {
  rateIrEntity.value = {
    id: "",
    system: "",
    operationId: "",
    rate: 0,
    limit: 0,
    valid: "",
    enabled: true,
    createdAt: "",
    updatedAt: "",
  }
}

const setCompletes = (value: CreateRateIrDto) => {
  if (props.typeSave !== "Create") {
    operationSelect.value = value.Operation?.operationName || "";
    typeSelect.value = value.Type?.typeCode || "";
    fetchOperation();
  }
}

const removeRateIr = async () => {
  loading.value = true;
  const response = await rateIrService.removeRateIr(rateIrEntity.value)

  response
    ? PosseidonNotif('success', `Rate Ir Removed Success!`)
    : PosseidonNotif('error', `Rate Ir Removed Faill`);

  emitEventBus('refreshRatesIr', true);
  loading.value = false;
}
</script>
