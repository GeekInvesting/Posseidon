<template>
  <el-dialog
    title="Wallet"
    v-model="dialogVisible"
    width="90%"
    :before-close="handleClose">
    <span>
      <AdminZeusWalletForm
        :key="componentKey"
        :initialData="walletEntity"
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
import {TableV2FixedDir, ElIcon, ElButton, ElText, ElTag} from "element-plus";
import {Timer, ArrowRightBold} from '@element-plus/icons-vue'
import dayjs from "dayjs";
import {useEventBus} from "~/events/eventBus";

const dialogVisible = ref(false);
const componentKey = ref('');
const walletEntity = ref({});
const walletList = ref([]);
const svg = Loading().svg;

const windowWidth = ref(window.innerWidth);
const windowHeight = ref(window.innerHeight);
const withColumns: Ref<number> = ref(150);

const walletService = new WalletService();

onMounted(() => {
  fetchWallet().then(r => r);
  window.addEventListener('resize', () => {
    windowWidth.value = window.innerWidth;
    windowHeight.value = window.innerHeight;
  });
  updateWidth();
})

watch(() => useEventBus().value.refreshWallets,
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
  windowWidth.value = window.innerWidth;
  withColumns.value = windowWidth.value * 0.95 / columns.value.length;
}

const handleClose = () => {
  dialogVisible.value = false;
  componentKey.value = '';
}

const loading = ElLoading.service({
  lock: true,
  text: 'Loading',
  background: 'rgba(0, 0, 0, 0.7)',
})

const fetchWallet = async () => {
  dialogVisible.value = false;
  loading;
  const response = await walletService.findAllWallets();
  walletList.value = await response.json();
  loading.close();
  console.log(walletList.value);
}

const columns = computed(() => [
  {
    key: 'dateOperation',
    title: 'Date Operation',
    dataKey: 'dateOperation',
    width: withColumns.value,
    align: 'center',
    fixed: TableV2FixedDir.LEFT,
    cellRenderer: ({cellData: date}: { cellData: Date }) => (
      <span class="flex items-center">
        {dayjs(date).format('YYYY/MM/DD')}
      </span>
    )
  },
  {
    key: 'wallet',
    title: 'Actions',
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
    key: 'investorId.investorName',
    title: 'Investor',
    dataKey: 'investorId.investorName',
    width: withColumns.value,
    align: 'center',
  },
  {
    key: 'brokerId.brokerName',
    title: 'Broker',
    dataKey: 'brokerId.brokerName',
    width: withColumns.value,
    align: 'center',
  },
  {
    key: 'ticketId.ticketCode',
    title: 'Ticket',
    dataKey: 'ticketId.ticketCode',
    width: withColumns.value,
    align: 'center',
  },
  {
    key: 'operationId.operationName',
    title: 'Operation',
    dataKey: 'operationId.operationName',
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
    key: 'price',
    title: 'Price',
    dataKey: 'price',
    width: withColumns.value,
    align: 'center',
    cellRenderer: ({cellData: value}: { cellData: any }) => <ElText> {value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    })}</ElText>,
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
    key: 'ir',
    title: 'IR',
    dataKey: 'ir',
    width: withColumns.value,
    align: 'center',
    cellRenderer: ({cellData: value}: { cellData: any }) => <ElText> {value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    })}</ElText>,
  },
  {
    key: 'enabled',
    title: 'Enabled',
    dataKey: 'enabled',
    width: withColumns.value,
    align: 'center',
    cellRenderer: ({cellData: enabled}: {cellData: boolean}) => <ElTag
      type={enabled ? 'success' : 'danger'}>{enabled ? 'Enabled' : 'Disabled'}</ElTag>,
  }
]);

const details = (rowData: any) => {
  dialogVisible.value = true;
  componentKey.value = 'details';
  walletEntity.value = rowData;
}
</script>
