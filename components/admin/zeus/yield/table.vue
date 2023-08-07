<template>
  <el-dialog
    title="Yield"
    v-model="dialogVisible"
    width="90%"
    :before-close="handleClose"
    >
    <span>
      <AdminZeusYieldForm
        :key="componentKey"
        :initialData="yieldEntity"
        typeSave="Update"/>
    </span>
  </el-dialog>
  <el-table-v2
    :columns="columns"
    :data="yields"
    :width="1350"
    :height="800"
    :loading="loading"
    :element-loading-svg="svg"
    element-loading-svg-view-box="-10, -10, 50, 50"
  />
</template>

<script lang="tsx" setup>
import {YieldService} from "~/service/zeus/yield.service";
import {YieldEntity} from "~/model/zeus/yield.entity";

import dayjs from 'dayjs'
import {
  ElButton,
  ElIcon,
  ElTag,
  ElText,
  TableV2FixedDir,
} from 'element-plus'
import {Timer, ArrowRightBold} from '@element-plus/icons-vue'
import type {Column} from 'element-plus'
import {Ref} from "vue";
import {useEventBus} from "~/events/eventBus";

const yieldService = new YieldService();

const loading = ref(false);
const svg = Loading().svg;
const yields = ref([]);
const yieldEntity: Ref<YieldEntity> = ref({} as YieldEntity);
const dialogVisible = ref(false);
const componentKey = ref('');

onMounted(() => {
  fetchYields().then(r => r);
})

watch(() => useEventBus().value.refreshYields,
  (value) => {
    if (value) {
      fetchYields();
      useEventBus().value.refreshYields = false;
    }
  }
)

const fetchYields = async () => {
  dialogVisible.value = false;
  loading.value = true;
  const response = await yieldService.getAllYields();
  yields.value = await response.json();
  loading.value = false;
}

const columns: Column<any>[] = [
  {
    key: 'Ticket.ticketCode',
    title: 'Ticket',
    dataKey: 'Ticket.ticketCode',
    width: 150,
    fixed: TableV2FixedDir.LEFT,
    align: 'center',
  },
  {
    key: 'dateCom',
    title: 'Date Com',
    dataKey: 'dateCom',
    width: 150,
    align: 'center',
    cellRenderer: ({cellData: date}) => (
      <span class="flex items-center">
            <ElIcon class="mr-3">
              <Timer/>
            </ElIcon>
        {dayjs(date).format('YYYY/MM/DD')}
          </span>
    )
  },
  {
    key: 'datePay',
    title: 'Date Pay',
    dataKey: 'datePay',
    width: 150,
    align: 'center',
    cellRenderer: ({cellData: date}) => (
      <span class="flex items-center">
            <ElIcon class="mr-3">
              <Timer/>
            </ElIcon>
        {dayjs(date).format('YYYY/MM/DD')}
          </span>
    )
  },
  {
    key: 'Operation.operationName',
    title: 'Operation',
    dataKey: 'Operation.operationName',
    width: 150,
    align: 'center',
  },
  {
    key: 'value',
    title: 'Value',
    dataKey: 'value',
    width: 150,
    align: 'center',
    cellRenderer: ({cellData: value}) => <ElText> {value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    })}</ElText>,
  },
  {
    key: 'quotation',
    title: 'Quotation',
    dataKey: 'quotation',
    width: 150,
    align: 'center',
    cellRenderer: ({cellData: value}) => <ElText> {value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    })}</ElText>,
  },
  {
    key: 'income',
    title: 'Income',
    dataKey: 'income',
    width: 150,
    align: 'center',
    cellRenderer: ({cellData: value}) => {
      const percentageValue = value / 100;
      return <ElText>{percentageValue.toLocaleString('pt-BR', {style: 'percent', minimumFractionDigits: 2})}</ElText>
    },
  },
  {
    key: 'enabled',
    title: 'Enabled',
    dataKey: 'enabled',
    width: 150,
    align: 'center',
    cellRenderer: ({cellData: enabled}) => <ElTag
      type={enabled ? 'success' : 'danger'}>{enabled ? 'Enabled' : 'Disabled'}</ElTag>,
  },
  {
    key: 'yield',
    title: 'Actions',
    width: 150,
    align: 'center',
    fixed: TableV2FixedDir.RIGHT,
    cellRenderer: ({ rowData }) => (
      <ElButton circle size="large" onClick={() => details(rowData)}>
        <ElIcon>
          <ArrowRightBold />
        </ElIcon>
      </ElButton>
    ),
  },
];

const details = (rowData: YieldEntity) => {
  yieldEntity.value = rowData;
  componentKey.value = rowData.id;
  dialogVisible.value = true;
  //console.log(yieldEntity.value);
}

const handleClose = () => {
  dialogVisible.value = false
  ElMessageBox.confirm(`Are you sure to close this Yield.`, {
    confirmButtonText: "Yes",
    cancelButtonText: "No",
    type: "warning",
  })
    .then(() => {
      dialogVisible.value = false;
      fetchYields();
    })
    .catch((error) => {
      dialogVisible.value = true
      PosseidonNotif(`warning`, `${error} this Yield!`)
    })
}
</script>
