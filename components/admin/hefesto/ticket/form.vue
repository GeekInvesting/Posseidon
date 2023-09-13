<template>
  <div class="p-4 bg-white routed-lg shadow-md mx-5 md:mx-5 lg:mx-10 xl:mx-20">
    <el-form
      v-loading="loading"
      :element-loading-svg="svg"
      element-loading-svg-view-box="-10, -10, 50, 50"
    >
      <el-form-item label="Ticket" prop="ticketCode" class="mb-4">
        <el-input
          v-model="ticket.ticketCode"
          class="shadow-sm"
          placeholder="CPEL6"
        />
      </el-form-item>
      <el-form-item label="Company" prop="ticketCompanyName" class="mb-4">
        <el-select
          v-model="companyValue"
          class="shadow-sm"
          placeholder="COPEL"
          @change="
            () => {
              ticket.ticketCompanyName = companyValue;
            }
          "
        >
          <el-option
            v-for="item in companies"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="Type" prop="ticketTypeCode" class="mb-4">
        <el-select
          v-model="typeValue"
          class="shadow-sm"
          placeholder="ACAO"
          @change="
            () => {
              ticket.ticketTypeCode = typeValue;
            }
          "
        >
          <el-option
            v-for="item in types"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="Exchange" prop="ticketExchangeCode" class="mb-4">
        <el-select
          v-model="exchangeValue"
          class="shadow-sm"
          placeholder="B3"
          @change="
            () => {
              ticket.ticketExchangeCode = exchangeValue;
            }
          "
        >
          <el-option
            v-for="item in exchanges"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="Subsector" prop="ticketSubsectorName" class="mb-4">
        <el-select
          v-model="subsectorValue"
          class="shadow-sm"
          placeholder="Transmition"
          @change="
            () => {
              ticket.ticketSubsectorName = subsectorValue;
            }
          "
        >
          <el-option
            v-for="item in subsectors"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="Alpha" prop="ticketAlpha" class="mb-4">
        <el-input
          v-model="ticket.ticketAlpha"
          class="shadow-sm"
          placeholder="PETR4.SAO"
        />
      </el-form-item>
      <el-form-item label="CVM Code" prop="ticketCvmCode" class="mb-4">
        <el-input
          v-model="ticket.ticketCvmCode"
          class="shadow-sm"
          placeholder="PETR4"
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
      <el-form-item v-if="props.ticketSave === 'create'">
        <el-checkbox v-model="anotherTicket" label="Create Another Ticket" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { Ticket, TicketDTO } from "~/entities/hefesto/Ticket";
import { CompanyService } from "~/service/hefesto/CompanyService";
import { TypeService } from "~/service/hefesto/TypeService";
import { ExchangeService } from "~/service/hefesto/ExchangeService";
import { SubsectorService } from "~/service/hefesto/SubsectorService";
import { TicketService } from "~/service/hefesto/TicketService";
import { emitEventBus } from "~/events/eventBus";

const loading = ref(false);
const svg = Loading().svg;
const anotherTicket = ref(false);

const ticketService = new TicketService();

onMounted(() => {
  loading.value = true;

  fetchCompanies();
  fetchTypes();
  fetchExchanges();
  fetchSubsectors();

  loading.value = false;
});

const props = defineProps({
  initialData: {
    type: Object as PropType<Ticket>,
    default: () => ({}),
  },
  ticketSave: {
    type: String,
    default: "create",
  },
});

const ticket = ref<TicketDTO>({
  id: props.initialData.id || "",
  ticketCode: props.initialData.ticketCode || "",
  ticketCompanyName: props.initialData.ticketCompany?.companyName || "",
  ticketTypeCode: props.initialData.ticketType?.typeCode || "",
  ticketExchangeCode: props.initialData.ticketExchange?.exchangeCode || "",
  ticketSubsectorName: props.initialData.ticketSubsector?.subsectorName || "",
  ticketAlpha: props.initialData.ticketAlpha || "",
  ticketCvmCode: props.initialData.ticketCvmCode || "",
  ticketEnabled: props.initialData.ticketEnabled || true,
  ticketDeleted: props.initialData.ticketDeleted || false,
});

watch(props.initialData, (newValue) => {
  ticket.value = {
    id: newValue.id || "",
    ticketCode: newValue.ticketCode || "",
    ticketCompanyName: newValue.ticketCompany?.companyName || "",
    ticketTypeCode: newValue.ticketType?.typeCode || "",
    ticketExchangeCode: newValue.ticketExchange?.exchangeCode || "",
    ticketSubsectorName: newValue.ticketSubsector?.subsectorName || "",
    ticketAlpha: newValue.ticketAlpha || "",
    ticketCvmCode: newValue.ticketCvmCode || "",
    ticketEnabled: newValue.ticketEnabled || true,
    ticketDeleted: newValue.ticketDeleted || false,
  };
});

const submitForm = () => {
  loading.value = true;

  ElMessageBox.confirm(`Are you sure to ${props.ticketSave} this ticket?`, {
    title: `${props.ticketSave} Ticket`,
    confirmButtonText: "OK",
    cancelButtonText: "Cancel",
    type: "warning",
  })
    .then(async () => {
      let response;

      props.ticketSave === "create"
        ? (response = await ticketService.createTicket(ticket.value))
        : (response = await ticketService.updateTicket(ticket.value));

      response
        ? PosseidonNotif(`success`, `${props.ticketSave}d this ticket!`)
        : null;

        emitEventBus("refreshTickets", true);
      anotherTicket.value ? emptyForm() : emitEventBus("dialogCreate", true);
    })
    .catch((error) => {
      //console.log(error);
      PosseidonNotif(`warning`, `${error} this operation!`);
    });

    loading.value = false;
};

const emptyForm = () => {
  ticket.value = {
    id: "",
    ticketCode: "",
    ticketCompanyName: "",
    ticketTypeCode: "",
    ticketExchangeCode: "",
    ticketSubsectorName: "",
    ticketAlpha: "",
    ticketCvmCode: "",
    ticketEnabled: true,
    ticketDeleted: false,
  };
  companyValue.value = "";
  typeValue.value = "";
  exchangeValue.value = "";
  subsectorValue.value = "";
};

const companies = ref([]);
const companyValue = ref<string>("");
const companyService = new CompanyService();
const fetchCompanies = async () => {
  const response = await companyService.listCompanyName();
  const data = await response.json();
  companies.value = data;
  companyValue.value = props.initialData.ticketCompany?.companyName || "";
};

const types = ref([]);
const typeValue = ref<string>("");
const typeServce = new TypeService();
const fetchTypes = async () => {
  const response = await typeServce.listTypeCode();
  const data = await response.json();
  types.value = data;
  typeValue.value = props.initialData.ticketType?.typeCode || "";
};

const exchanges = ref([]);
const exchangeValue = ref<string>("");
const exchangeService = new ExchangeService();
const fetchExchanges = async () => {
  const response = await exchangeService.listExchangeCode();
  const data = await response.json();
  exchanges.value = data;
  exchangeValue.value = props.initialData.ticketExchange?.exchangeCode || "";
};

const subsectors = ref([]);
const subsectorValue = ref<string>("");
const subsectorService = new SubsectorService();
const fetchSubsectors = async () => {
  const response = await subsectorService.listSubsectorName();
  const data = await response.json();
  subsectors.value = data;
  subsectorValue.value = props.initialData.ticketSubsector?.subsectorName || "";
};
</script>
