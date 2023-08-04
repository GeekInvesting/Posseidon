<template>
  <div class="flex center">
    <el-table-v2
      :columns="columns"
      :data="calculateYield"
      :width="520"
      :height="400"
      class="overflow-scroll "
    />
  </div>
</template>

<script lang="tsx" setup>
import {YieldService} from "~/service/zeus/yield.service";
import dayjs from 'dayjs'
import { ElText, TableV2FixedDir} from 'element-plus'

const yieldService = new YieldService();

onMounted(() => {
  fetchYieldList().then(r => r);
})

const props = defineProps({
  investorId: {
    type: String,
    required: true,
  },
  ticketId: {
    type: String,
    required: true,
  },
  brokerId: {
    type: String,
    required: true,
  },
})

const calculateYield = ref([])

const fetchYieldList = async () => {
  const response = await yieldService.listYield(
    props.ticketId,
    props.brokerId,
    props.investorId,
  );
  calculateYield.value = await response.json();
  //console.log(calculateYield.value)
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
    key: 'datePay',
    title: 'Date Pay',
    dataKey: 'datePay',
    width: 100,
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
    key: 'value',
    title: 'Value',
    dataKey: 'value',
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
    cellRenderer: ({cellData: total}: { cellData: any }) => <ElText> {total.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    })}</ElText>,
  },
  {
    key: 'income',
    title: 'Income',
    dataKey: 'income',
    width: 80,
    align: 'center',
    cellRenderer: ({cellData: income}: { cellData: any }) => {
      const percentageValue = income / 100;
      return <ElText>{percentageValue.toLocaleString('pt-BR', {style: 'percent', minimumFractionDigits: 2})}</ElText>
    },
  }
])
</script>
