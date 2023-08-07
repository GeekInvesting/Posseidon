<template>
  <div class="flex center">
    <el-table-v2
      :columns="columns"
      :data="listTickets"
      :width="460"
      :height="400"
      class="overflow-scroll "
    />
  </div>
</template>

<script lang="tsx" setup>
import dayjs from 'dayjs'
import { ElText, TableV2FixedDir} from 'element-plus'
import {WalletService} from "~/service/zeus/wallet.service";

const listTickets = ref([])

const walletService = new WalletService();

onMounted(() => {
  fetchListTickets().then(r => r);
})

const props = defineProps({
  investorId: {
    type: String,
    required: true,
  },
  brokerId: {
    type: String,
    required: true,
  },
  ticketId: {
    type: String,
    required: true,
  },
})

const fetchListTickets = async () => {
  const response = await walletService.listTickets(
    props.investorId,
    props.brokerId,
    props.ticketId,
  );
  listTickets.value = await response.json();
  //console.log(listTickets.value)
}

const columns = computed(() => [
    {
        key: 'Operation.operationName',
        title: 'Operation',
        dataKey: 'Operation.operationName',
        width: 100,
        align: 'center',
        fixed: TableV2FixedDir.LEFT,
    },
    {
        key: 'dateOperation',
        title: 'Date',
        dataKey: 'dateOperation',
        width: 120,
        align: 'center',
        cellRenderer: ({cellData: date}: {cellData: Date}) => (
            <span class="flex items-center">
        {dayjs(date).format('YYYY/MM/DD')}
          </span>
        )
    },
    {
        key: 'amount',
        title: 'Amount',
        dataKey: 'amount',
        width: 80,
        align: 'center',
    },
    {
        key: 'price',
        title: 'Price',
        dataKey: 'price',
        width: 80,
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
        width: 80,
        align: 'center',
        cellRenderer: ({cellData: value}: { cellData: any }) => <ElText> {value.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        })}</ElText>,
    },
])
</script>
