<template>
  <div class="p-1 rounded-lg shadow-md mx-5 md:mx-5 lg:mx-10 xl:mx-20">
    <el-form
      ref="yield"
      v-model="yieldEntity"
      label-width="120px"
      v-loading="loading"
      :element-loading-svg="svg"
      element-loading-svg-view-box="-10, -10, 50, 50">
      <el-form-item label="Ticket">
        <client-only>
          <el-autocomplete
            v-model="ticketSelect"
            :fetch-suggestions="querySearchTicket"
            clearable
            class="inline-input w-50"
            placeholder="Select Ticket"
            @select="handleSelectTicket"
            :disabled="ticketsCodes.length === 0"
          />
          <!-- TODO Implement create ticket with not found -->
        </client-only>
      </el-form-item>
      <el-form-item label="Operation">
        <client-only>
          <el-autocomplete
            v-model="operationSelect"
            :fetch-suggestions="querySearchOp"
            clearable
            class="inline-input w-50"
            placeholder="Select Operation"
            @select="handleSelectOp"
            :disabled="operationsNames.length === 0"
          />
        </client-only>
      </el-form-item>
      <el-form-item label="Date Com" prop="dateCom">
        <el-date-picker
          v-model="yieldEntity.dateCom"
          type="date"
          placeholder="Select date"
          class="inline-input w-50"
        />
      </el-form-item>
      <el-form-item label="Date Pay" prop="datePay">
        <el-date-picker
          v-model="yieldEntity.datePay"
          type="date"
          placeholder="Select date"
          class="inline-input w-50"
        />
      </el-form-item>
      <el-form-item label="Value" prop="value">
        <el-input-number
          v-model="yieldEntity.value"
          class="inline-input w-50"
          :precision="2"
          :controls="false"
          :min="0"
          @change="calIncome"
        />
      </el-form-item>
      <el-form-item label="Quotation" prop="quotation">
        <el-input-number
          v-model="yieldEntity.quotation"
          class="inline-input w-50"
          :precision="2"
          :controls="false"
          :min="0"
          @change="calIncome"
        />
      </el-form-item>
      <el-form-item label="Income %" prop="income">
        <el-input-number
          v-model="yieldEntity.income"
          class="inline-input w-50"
          :precision="3"
          :controls="false"
          :min="0"
          :disabled="true"
        />
      </el-form-item>
      <el-form-item label="Enabled" prop="enabled">
        <el-switch
          v-model="yieldEntity.enabled"
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
          v-model="yieldEntity.createdAt"
          type="date"
          placeholder="--/--/----"
          class="inline-input w-50"
          :disabled="true"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="submit"
          :loading="loading"
          :disabled="loading"
        >
          {{typeSave}}
        </el-button>
      </el-form-item>
    </el-form>
    <el-form-item
      v-if="typeSave === 'Create'">
      <el-checkbox
        v-model="anotherYield"
        label="Create another Yield"
      />
    </el-form-item>
  </div>
</template>

<script lang="ts" setup>
import {CreateYieldDto} from "~/model/zeus/yield.entity";
import {TicketService} from "~/service/hefesto/TicketService";
import {OperationService} from "~/service/zeus/operation.service";
import {Operation} from "~/model/zeus/operation.entity";
import {Ticket} from "~/model/hefesto/Ticket";
import {CompleteItem} from "~/model/complete.entity";
import {copyProperties} from "~/utils/copyProperties.utils";
import {YieldService} from "~/service/zeus/yield.service";
import {emitEventBus} from "~/events/eventBus";

const loading = ref(false);
const svg = Loading().svg;
const operationSelect = ref("");
const ticketSelect = ref("");
const operationsNames = ref<CompleteItem[]>([])
const ticketsCodes = ref<CompleteItem[]>([]);
const anotherYield = ref(false);

let operations: Operation[];
let codes: Ticket[];

const ticketService = new TicketService();
const operationService = new OperationService();
const yieldService = new YieldService();

onMounted(async () => {
  await datas();

  ticketSelect.value = props.initialData.Ticket?.ticketCode || "";
  operationSelect.value = props.initialData.Operation?.name || "";
})

const props = defineProps({
  initialData: {
    type: Object,
    default: {},
  },
  typeSave: {
    type: String,
    default: 'Create',
  },
})

const yieldEntity: Ref<CreateYieldDto> = ref({
  id: props.initialData.id || "",
  ticketId: props.initialData.ticketId || "",
  operationId: props.initialData.operationId || "",
  dateCom: new Date(props.initialData.dateCom) || "",
  datePay: new Date(props.initialData.datePay)|| "",
  value: props.initialData.value || 0,
  quotation: props.initialData.quotation || 0,
  income: props.initialData.income || 0,
  enabled: props.initialData.enabled || true,
  createdAt: props.initialData.createdAt || "",
  updatedAt: props.initialData.updatedAt || ""
})

watch(() => props.initialData,
  (value) => {
    console.log(`new Value ${value}`);
    yieldEntity.value = {
      id: value.id || "",
      ticketId: value.ticketId || "",
      operationId: value.operationId || "",
      dateCom: new Date(value.dateCom) || "",
      datePay: new Date(value.datePay) || "",
      value: value.value || 0,
      quotation: value.quotation || 0,
      income: value.income || 0,
      enabled: value.enabled || true,
      createdAt: value.createdAt || "",
      updatedAt: value.updatedAt || ""
    }
    ticketSelect.value = value.Ticket.ticketCode;
    operationSelect.value = value.Operation.operationName;
  }
)

async function datas() {
  const responseTicket = await ticketService.getAllTicketCode();
  const responseOperation = await operationService.getOperationBySystem('YIELD')

  codes = await responseTicket.json();
  ticketsCodes.value = copyProperties(codes);
  //console.log(codes, ticketsCodes.value);

  operations = await responseOperation.json();
  operationsNames.value = copyProperties(operations);
  //console.log(operations, operationsNames.value);

}

const querySearchOp = (queryString: string, cb: any) => {
  const results = queryString
    ? operationsNames.value.filter(createFilter(queryString))
    : operationsNames.value
  // call callback function to return suggestions
  cb(results)
}
const createFilter = (queryString: string) => {
  return (restaurant: CompleteItem) => {
    return (
      restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
    )
  }
}

const handleSelectOp = (item: CompleteItem) => {
  yieldEntity.value.operationId = item.link;
}

const querySearchTicket = (queryString: string, cb: any) => {
  const results = queryString
    ? ticketsCodes.value.filter(createFilter(queryString))
    : ticketsCodes.value
  cb(results)
}

const handleSelectTicket = (item: CompleteItem) => {
  yieldEntity.value.ticketId = item.link;
}

const calIncome = () => {
  if (yieldEntity.value.value && yieldEntity.value.quotation) {
    yieldEntity.value.income = (yieldEntity.value.value / yieldEntity.value.quotation) * 100;
  }
}

const submit = async () => {
  const {createdAt, updatedAt, ...yieldDto} = yieldEntity.value;
  loading.value = true;
  ElMessageBox.confirm(`Are you sure to ${props.typeSave?.toLocaleLowerCase()} this Yield?`, {
    confirmButtonText: `${props.typeSave?.toLocaleLowerCase()}`,
  }).then(async () => {
    let response;
    props.typeSave === 'Create'
      ? response = await yieldService.createYield(yieldDto)
      : response = await yieldService.updateYield(yieldDto);

    response
      ? PosseidonNotif( 'success', `Yield ${props.typeSave?.toLocaleLowerCase()}d successfully`)
      : PosseidonNotif( 'error', `Yield ${props.typeSave?.toLocaleLowerCase()}d failed`);
  }).catch((error) => {
    PosseidonNotif('warning', `Yield ${props.typeSave?.toLocaleLowerCase()}d ${error}`);
  }).finally(() => {
    anotherYield
      ? emptyForm()
      : emitEventBus('dialogCreate', true);

    emitEventBus('refreshYields', true);
    loading.value = false;
  })
}

const emptyForm = () => {
  yieldEntity.value = {
    id: "",
    ticketId: "",
    operationId: "",
    dateCom: undefined,
    datePay: undefined,
    value: 0,
    quotation: 0,
    income: 0,
    enabled: true,
    createdAt: undefined,
    updatedAt: undefined
  };
  operationSelect.value = "";
  ticketSelect.value = "";
}
</script>
