<template>
  <el-dialog
    title="Rate IR"
    v-model="dialogVisible"
    width="90%"
    :before-close="handleClose">
    <span>
      <AdminZeusRateIrForm
        :key="componentKey"
        :initialData="rateIrEntity"
        typeSave="Update"/>
    </span>
  </el-dialog>
  <el-table-v2
    :columns="columns"
    :data="rateIrList"
    :width="windowWidth * 0.95"
    :height="800"
    :loading="loading"
    :element-loading-svg="svg"
    element-loading-svg-view-box="-10, -10, 50, 50" />
</template>

<script lang="tsx" setup>
import {RateIrService} from "~/service/zeus/RateIr.service";
import {useEventBus} from "~/events/eventBus";
import {TableV2FixedDir, ElText, ElButton, ElIcon, ElTag} from "element-plus";
import {Timer, ArrowRightBold} from '@element-plus/icons-vue'
import dayjs from "dayjs";
import {RateIrEntity} from "~/entities/zeus/rateIr.entity";

const rateIrService = new RateIrService();

const loading = ref(false);
const svg = Loading().svg;
const dialogVisible = ref(false);
const componentKey = ref('');
const rateIrList = ref([]);
const rateIrEntity = ref({});

const windowWidth = ref(window.innerWidth);
const withColumns: Ref<number> = ref(150);

onMounted(() => {
  fetchRateIr().then(r => r);
  window.addEventListener('resize', () => {
    windowWidth.value = window.innerWidth;
  });
  updateWidth();
})

watch(() => useEventBus().value.refreshRatesIr,
  (value) => {
    if (value) {
      fetchRateIr();
    }
  }
)

watch(() => windowWidth.value, () => {
  updateWidth();
})

const updateWidth = () => {
  windowWidth.value = window.innerWidth;
  withColumns.value = (windowWidth.value * 0.95) / columns.value.length;
};

const fetchRateIr = async () => {
  loading.value = true;
  const response = await rateIrService.findAll();
  rateIrList.value = await response.json();
  console.log(rateIrList.value);
  loading.value = false;
}

const handleClose = () => {
  dialogVisible.value = false;
}

const columns = computed(() => [
  {
    key: 'system',
    title: 'System',
    dataKey: 'system',
    width: withColumns.value,
    align: 'center',
    fixed: TableV2FixedDir.LEFT
  },
  {
    key: 'Operation.operationName',
    title: 'Operation',
    dataKey: 'Operation.operationName',
    width: withColumns.value,
    align: "center",
  },
  {
    key: 'Type.typeCode',
    title: 'Type',
    dataKey: 'Type.typeCode',
    width: withColumns.value,
    align: "center",
  },
  {
    key: 'rate',
    title: 'Rate',
    dataKey: 'rate',
    width: withColumns.value,
    align:"center",
    cellRenderer: ({ cellData: value }: { cellData: any }) => <ElText> {value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    })}</ElText>,
  },
  {
    key: 'limit',
    title: 'Limit',
    dataKey: 'limit',
    width: withColumns.value,
    align:"center",
    cellRenderer: ({ cellData: value }: { cellData: any }) => <ElText> {value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    })}</ElText>,
  },
  {
    key: 'valid',
    title: 'Valid',
    dataKey: 'valid',
    width: withColumns.value,
    align: "center",
    cellRenderer: ({cellData: date}: {cellData: Date}) => (
      <span class="flex items-center">
            <ElIcon class="mr-3">
              <Timer/>
            </ElIcon>
        {dayjs(date).format('YYYY/MM/DD')}
          </span>
    )
  },
  {
    key: 'enabled',
    title: 'Enabled',
    dataKey: 'enabled',
    width: 150,
    align: 'center',
    cellRenderer: ({cellData: enabled}: {cellData: boolean}) => <ElTag
      type={enabled ? 'success' : 'danger'}>{enabled ? 'Enabled' : 'Disabled'}</ElTag>,
  },
  {
    key: 'rateIr',
    title: 'Actions',
    width: 150,
    align: 'center',
    fixed: TableV2FixedDir.RIGHT,
    cellRenderer: ({ rowData }: {rowData: any}) => (
      <ElButton circle size="large" onClick={() => details(rowData)}>
        <ElIcon>
          <ArrowRightBold />
        </ElIcon>
      </ElButton>
    ),
  },
]);

const details = (rowData: RateIrEntity) => {
  rateIrEntity.value = rowData;
  dialogVisible.value = true;
  componentKey.value = rowData.id;
}
</script>
