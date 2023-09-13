<template>
  <el-form
    ref="WalletForm"
    v-model="walletEntity"
    label-width="120px"
    v-loading="loading"
    :element-loading-svg="svg"
    element-loading-svg-view-box="-10, -10, 50, 50">
    <el-form-item label="Investor" v-if="isAdmin">
      <el-autocomplete
        v-model="investorSelect"
        :fetch-suggestions="querySearchInvestor"
        clearable
        class="inline-input w-50"
        placeholder="Select Investor"
        @select="handleSelectInvestor"
        :disabled="investorsNames.length === 0"
      />
    </el-form-item>
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
    <el-form-item label="Broker">
      <el-autocomplete
        v-model="brokerSelect"
        :fetch-suggestions="querySearchBroker"
        clearable
        class="inline-input w-50"
        placeholder="Select Broker"
        @select="handleSelectBroker"
        :disabled="brokersNames.length === 0"
      />
    </el-form-item>
    <el-form-item label="Operation">
      <el-autocomplete
        v-model="operationSelect"
        :fetch-suggestions="querySearchOp"
        clearable
        class="inline-input w-50"
        placeholder="Select Operation"
        @select="handleSelectOp"
        :disabled="operationsNames.length === 0"
      />
    </el-form-item>
    <el-form-item label="Date Operation" prop="dateOperation">
      <el-date-picker
        v-model="walletEntity.dateOperation"
        type="date"
        placeholder="Select date"
        class="inline-input w-50"
      />
    </el-form-item>
    <el-form-item label="Amount" prop="amount">
      <el-input-number
        v-model="walletEntity.amount"
        class="inline-input w-50"
        :precision="0"
        :controls="true"
        :min="0"
        @change="calTotal"
      />
    </el-form-item>
    <el-form-item label="Price" prop="price">
      <el-input-number
        v-model="walletEntity.price"
        class="inline-input w-50"
        :precision="2"
        :controls="false"
        :min="0"
        @change="calTotal"
      />
    </el-form-item>
    <el-form-item label="Tax" prop="tax">
      <el-input-number
        v-model="walletEntity.tax"
        class="inline-input w-50"
        :precision="2"
        :controls="false"
        :min="0"
        @change="calTotal"
      />
    </el-form-item>
    <el-form-item label="Total" prop="total">
      <el-input-number
        v-model="walletEntity.total"
        class="inline-input w-50"
        :precision="2"
        :controls="false"
        :min="0"
        :disabled="true"
      />
    </el-form-item>
    <el-form-item label="IR" prop="ir" v-if="sellAction">
      <el-input-number
        v-model="walletEntity.ir"
        class="inline-input w-50"
        :precision="2"
        :controls="false"
        :min="0"
        :disabled="true"/>
    </el-form-item>
    <el-form-item label="Enabled" prop="enabled">
      <el-switch
        v-model="walletEntity.enabled"
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
        v-model="walletEntity.createdAt"
        type="date"
        placeholder="Create Date"
        class="inline-input w-50"
        :disabled="true"
      />
    </el-form-item>
    <el-form-item label="Updated At" prop="updatedAt">
      <el-date-picker
        v-model="walletEntity.updatedAt"
        type="date"
        placeholder="Update Date"
        class="inline-input w-50"
        :disabled="true"
      />
    </el-form-item>
    <el-form-item>
      <el-button-group>
        <el-button
          type="primary"
          @click="submit"
          :disabled="!walletEntity.investorId || !walletEntity.ticketId || !walletEntity.brokerId || !walletEntity.operationId || !walletEntity.dateOperation || !walletEntity.amount || !walletEntity.price">
          {{ typeSave }}
        </el-button>
        <el-button
          type="danger"
          v-if="typeSave === 'Update'"
          @click="deleteWallet"
        >
          Delete
        </el-button>
      </el-button-group>
    </el-form-item>
  </el-form>
  <el-form-item
    v-if="typeSave === 'Create'">
    <el-checkbox
      inline
      v-model="anotherWallet"
      label="Create another wallet"/>
  </el-form-item>
</template>

<script lang="ts" setup>
import {CreateWalletDto} from "~/entities/zeus/wallet.entity";
import {CompleteItem} from "~/entities/complete.entity";
import {InvestorHeraService} from "~/service/hera/InvestorService";
import {TicketService} from "~/service/hefesto/TicketService";
import {BrokerService} from "~/service/zeus/broker.service";
import {OperationService} from "~/service/zeus/operation.service";
import {WalletService} from "~/service/zeus/wallet.service";
import {emitEventBus} from "~/events/eventBus";
import {RateIrService} from "~/service/zeus/RateIr.service";
import {Ticket} from "~/entities/hefesto/Ticket";
import {RateIrEntity} from "~/entities/zeus/rateIr.entity";

const investorService = new InvestorHeraService();
const ticketService = new TicketService();
const brokerService = new BrokerService();
const operationService = new OperationService();
const walletService = new WalletService();
const rateIrService = new RateIrService();
const getInvestor = new GetInvestor();
const getLogin = new GetLogin();

const loading = ref(false);
const svg = Loading().svg;
const isAdmin = ref(false);
const anotherWallet = ref(false);
const sellAction = ref(false);

//TODO:  implements IR calculate to sell wallets

onMounted(() => {
  isAdmin.value = getLogin.isAdmin();

  fetchInvestor().then(r => r);
  fetchTicket().then(r => r);
  fetchBroker().then(r => r);
  fetchOperation().then(r => r);

  setCompletes(props.initialData);
  getInvestorData();
})

const props = defineProps({
  initialData: {
    type: Object,
    default: {}
  },
  typeSave: {
    type: String,
    default: "Create"
  }
})

const walletEntity = ref<CreateWalletDto>({
  id: props.initialData.id || "",
  investorId: props.initialData.investorId || "",
  ticketId: props.initialData.ticketId || "",
  operationId: props.initialData.operationId || "",
  brokerId: props.initialData.brokerId || "",
  dateOperation: props.initialData.dateOperation || "",
  amount: props.initialData.amount || 0,
  price: props.initialData.price || 0,
  tax: props.initialData.tax || 0,
  total: props.initialData.total || 0,
  ir: props.initialData.ir || 0,
  enabled: props.initialData.enabled || true,
  createdAt: props.initialData.createdAt || "",
  updatedAt: props.initialData.updatedAt || ""
});

watch(() => props.initialData, (value) => {
  walletEntity.value = {
    id: value.id || "",
    investorId: value.investorId || "",
    ticketId: value.ticketId || "",
    operationId: value.operationId || "",
    brokerId: value.brokerId || "",
    dateOperation: value.dateOperation || "",
    amount: value.amount || 0,
    price: value.price || 0,
    tax: value.tax || 0,
    total: value.total || 0,
    ir: value.ir || 0,
    enabled: value.enabled || true,
    createdAt: value.createdAt || "",
    updatedAt: value.updatedAt || ""
  };
  setCompletes(value);
})

const setCompletes = (value: any) => {
  investorSelect.value = value.Investor?.investorName || "";
  ticketSelect.value = value.Ticket?.ticketCode || "";
  operationSelect.value = value.Operation?.operationName || "";
  brokerSelect.value = value.Broker?.brokerName || "";
}

const fetchInvestor = async () => {
  let responseInvestors = await investorService.getInvestorComplete();
  investorsNames.value = copyProperties(await responseInvestors.json());
  //console.log(investorsNames.value);
}
const fetchTicket = async () => {
  let responseTickets = await ticketService.getAllTicketCode();
  ticketsCodes.value = copyProperties(await responseTickets.json());
  //console.log(ticketsCodes.value);
}
const fetchBroker = async () => {
  let responseBrokers = await brokerService.getBrokerComplete();
  brokersNames.value = copyProperties(await responseBrokers.json());
  //console.log(brokersNames.value);
}
const fetchOperation = async () => {
  let responseOperations = await operationService.getOperationBySystem('WALLET');
  operationsNames.value = copyProperties(await responseOperations.json());
  //console.log(operationsNames.value);
}

const investorsNames = ref<CompleteItem[]>([]);
const investorSelect = ref<string>("");
const querySearchInvestor = (queryString: string, cb: any) => {
  const result = queryString
    ? investorsNames.value.filter(createFilter(queryString))
    : investorsNames.value;
  cb(result);
}
const handleSelectInvestor = (item: CompleteItem) => {
  walletEntity.value.investorId = item.link;
}

const ticketsCodes = ref<CompleteItem[]>([]);
const ticketSelect = ref<string>("");
const querySearchTicket = (queryString: string, cb: any) => {
  const result = queryString
    ? ticketsCodes.value.filter(createFilter(queryString))
    : ticketsCodes.value;
  cb(result);
}
const handleSelectTicket = (item: CompleteItem) => {
  walletEntity.value.ticketId = item.link;
}

const brokersNames = ref<CompleteItem[]>([]);
const brokerSelect = ref<string>("");
const querySearchBroker = (queryString: string, cb: any) => {
  const result = queryString
    ? brokersNames.value.filter(createFilter(queryString))
    : brokersNames.value;
  cb(result);
}
const handleSelectBroker = (item: CompleteItem) => {
  walletEntity.value.brokerId = item.link;
}

const operationsNames = ref<CompleteItem[]>([]);
const operationSelect = ref<string>("");
const querySearchOp = (queryString: string, cb: any) => {
  const result = queryString
    ? operationsNames.value.filter(createFilter(queryString))
    : operationsNames.value;
  cb(result);
}
const handleSelectOp = (item: CompleteItem) => {
  walletEntity.value.operationId = item.link;
}

const createFilter = (queryString: string) => {
  return (restaurant: CompleteItem) => {
    return (
      restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
    )
  }
}

const calTotal = () => {
  walletEntity.value.total = (walletEntity.value.amount || 0) * (walletEntity.value.price || 0) + (walletEntity.value.tax || 0);
}

const submit = async () => {
  loading.value = true;
  ElMessageBox.confirm(`Are you to ${props.typeSave} this wallet?`, {
    confirmButtonText: `${props.typeSave}`,
  }).then(async () => {
    let response;

    props.typeSave === "Create"
      ? response = await walletService.createWallet(walletEntity.value)
      : response = await walletService.updateWallet(walletEntity.value);

    response
      ? PosseidonNotif('success', `${props.typeSave} wallet successfully`)
      : PosseidonNotif('error', `Error to ${props.typeSave} wallet`);
  }).catch(() => {
    PosseidonNotif('info', `Canceled ${props.typeSave} wallet`);
  }).finally(() => {
    emitEventBus('refreshWallets', true);
    emitEventBus('refreshWalletAverage', true);
    anotherWallet.value
      ? emptyForm()
      : emitEventBus('dialogCreate', true);
    loading.value = false;
  })
}

const emptyForm = () => {
  walletEntity.value = {
    id: "",
    ticketId: "",
    operationId: "",
    brokerId: "",
    dateOperation: "",
    amount: 0,
    price: 0,
    tax: 0,
    total: 0,
    ir: 0,
    enabled: true,
    createdAt: "",
    updatedAt: ""
  };
  ticketSelect.value = "";
  operationSelect.value = "";
  brokerSelect.value = "";
}

const deleteWallet = async () => {
  loading.value = true;
  ElMessageBox.confirm(`Are you to delete this wallet?`, {
    confirmButtonText: `Delete`,
  }).then(async () => {
    let response = await walletService.removeWallet(walletEntity.value);
    response
      ? PosseidonNotif('success', `Delete wallet successfully`)
      : PosseidonNotif('error', `Error to delete wallet`);
  }).catch(() => {
    PosseidonNotif('info', `Canceled delete wallet`);
  }).finally(() => {
    emitEventBus('refreshWallets', true);
    loading.value = false;
  })
}

const getInvestorData = () => {
  walletEntity.value.investorId = getInvestor.investorId()
  investorSelect.value = getInvestor.investorName();
}
</script>
