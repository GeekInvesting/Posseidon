<template>
  <el-dialog
      :title="detailsScope ? `${ticketDetails} Details` : 'Update Wallet'"
      v-model="dialogVisible"
      width="90%"
      :before-close="handleClose">
    <span v-if="detailsScope">
      <WalletDetails
          :key="detailsKey"
          :initialData="walletAverage"
      />
    </span>
    <span v-else>
      <AdminZeusWalletForm
          :key="componentKey"
          typeSave="Update"
      />
    </span>
  </el-dialog>
  <el-table-v2
      :columns="columns"
      :data="walletList"
      :width="windowWidth * 0.95"
      :height="windowHeight * 0.8"
  />
</template>

<script lang="tsx" setup>

import {WalletService} from "~/service/zeus/wallet.service";
import {useEventBus} from "~/events/eventBus";
import {TableV2FixedDir, ElIcon, ElButton, ElText, ElTag} from "element-plus";
import {Timer, ArrowRightBold} from '@element-plus/icons-vue'
import dayjs from "dayjs";
import {Ref} from "vue";
import {AverageService} from "~/service/demeter/average.service";

const dialogVisible = ref(false);
const componentKey = ref('');
const detailsKey = ref('');
const walletAverage = ref({});
const walletList = ref([]);
const svg = Loading().svg;
const detailsScope = ref(false);
const ticketDetails = ref('');

const windowWidth = ref(window.innerWidth);
const windowHeight = ref(window.innerHeight);
const withColumns: Ref<number> = ref(150);

const averageService = new AverageService();

onMounted(() => {
  fetchWallet().then(r => {
    loading.close();
  });
  window.addEventListener('resize', () => {
    windowWidth.value = window.innerWidth;
    windowHeight.value = window.innerHeight;
  });
  updateWidth();
})

watch(() => useEventBus().value.refreshWalletAverage,
    (value) => {
      if (value) {
        fetchWallet();
      }
    }
)

watch(() => windowWidth.value, () => {
  updateWidth();
})

const updateWidth = () => {
  const limit = 1100
  if(windowWidth.value > limit) {
    withColumns.value = windowWidth.value * 0.95 / columns.value.length;
    return;
  }
  windowWidth.value = limit;
  withColumns.value = limit * 0.95 / columns.value.length;
}

const handleClose = () => {
  dialogVisible.value = false;
  componentKey.value = '';
}

const loading = ElLoading.service({
  lock: true,
  text: 'Loading',
  background: 'rgba(0, 0, 0, 0.7)',
  fullscreen: true,
})

const fetchWallet = async () => {
  dialogVisible.value = false;
  loading;
  const getInvestor = new GetInvestor();
  const investorId = getInvestor.investorId();
  const response = await averageService.averageCalculate(investorId);
  walletList.value = await response.json();
  //console.log(walletList.value);
}

const columns = computed(() => [
  {
    key: 'ticket',
    title: 'Ticket',
    dataKey: 'ticket',
    width: withColumns.value,
    align: 'center',
    fixed: TableV2FixedDir.LEFT,
  },
  {
    key: 'wallet',
    title: 'Details',
    width: 150,
    align: 'center',
    fixed: TableV2FixedDir.RIGHT,
    cellRenderer: ({rowData}: { rowData: any }) => (
        <ElButton circle size="large" onClick={() => details(rowData)}>
          <ElIcon>
            <ArrowRightBold/>
          </ElIcon>
        </ElButton>
    ),
  },
  {
    key: 'broker',
    title: 'Broker',
    dataKey: 'broker',
    width: withColumns.value,
    align: 'center',
  },
  {
    key: 'amount',
    title: 'Amount',
    dataKey: 'amount',
    width: withColumns.value,
    align: 'center',
  },
  {
    key: 'averagePrice',
    title: 'Average',
    dataKey: 'averagePrice',
    width: withColumns.value,
    align: 'center',
    cellRenderer: ({cellData: value}: { cellData: any }) => <ElText> {value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    })}</ElText>,
  },
  {
    key: 'currentPrice',
    title: 'Current Price',
    dataKey: 'currentPrice',
    width: withColumns.value,
    align: 'center',
    cellRenderer: ({cellData: value}: { cellData: any }) => <ElText> {value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    })}</ElText>,
  },
  {
    key: 'resultPercent',
    title: 'Percent',
    dataKey: 'resultPercent',
    width: withColumns.value,
    align: 'center',
    cellRenderer: ({cellData: value}) => {
      let colorClass = value >= 0 ? 'positive' : 'negative';
      return <ElText class={colorClass}>{value.toLocaleString('pt-BR', {style: 'percent', minimumFractionDigits: 2})}</ElText>
    },
  },
  {
    key: 'total',
    title: 'Total',
    dataKey: 'total',
    width: withColumns.value,
    align: 'center',
    cellRenderer: ({cellData: value}: { cellData: any }) => <ElText> {value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    })}</ElText>,
  },
  {
    key: 'result',
    title: 'Result',
    dataKey: 'result',
    width: withColumns.value,
    align: 'center',
    cellRenderer: ({cellData: value}: {cellData: any}) => {
      let colorClass = value >= 0 ? 'positive' : 'negative';
      return <ElText
          class={colorClass}>{value.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</ElText>
    },
  },
  {
    key: 'profit',
    title: 'Profit',
    dataKey: 'profit',
    width: withColumns.value,
    align: 'center',
    cellRenderer: ({cellData: value}) => {
      let colorClass = value >= 0 ? 'positive' : 'negative';
      return <ElText class={colorClass}>{value.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</ElText>
    },
  },
  {
    key: 'profitability',
    title: 'Profitability',
    dataKey: 'profitability',
    width: withColumns.value,
    align: 'center',
    cellRenderer: ({cellData: value}: {cellData: any}) => {
      let colorClass = value >= 0 ? 'positive' : 'negative';
      return <ElText class={colorClass}>{value.toLocaleString('pt-BR', {style: 'percent', minimumFractionDigits: 2})}</ElText>
    },
  },
]);

const details = (rowData: any) => {
  detailsScope.value = true;
  dialogVisible.value = true;
  detailsKey.value = rowData.ticketId;
  walletAverage.value = rowData;
  ticketDetails.value = rowData.Ticket.ticketCode;
}
</script>

<style>
.positive {
  color: green;
  font-weight: bold;
}

.negative {
  color: red;
  font-weight: bold;
}
</style>
