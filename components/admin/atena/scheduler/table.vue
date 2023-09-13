<template>
  <el-dialog
      title="Scheduler"
      v-model="dialogVisible"
      width="90%"
      :before-close="handleClose">
    <span>
      <AdminAtenaSchedulerForm
          :key="componentKey"
          :initialData="schedulerEntity"
          typeSave="Update"
      />
    </span>
  </el-dialog>
  <el-table-v2
      :columns="columns"
      :data="schedulerList"
      :width="windowWidth * 0.95"
      :height="windowHeight * 0.8"
  />
</template>

<script lang="tsx" setup>
import {SchedulerService} from "~/service/atena/scheduler.service";
import {useEventBus} from "~/events/eventBus";
import {TableV2FixedDir, ElIcon, ElButton, ElText, ElTag, ElSwitch} from "element-plus";
import {Timer, ArrowRightBold} from '@element-plus/icons-vue'
import {SchedulerEntity} from "~/entities/atena/scheduler.entity";
import {User} from "~/entities/atena/User";

const dialogVisible = ref(false);
const componentKey = ref('');
const schedulerEntity = ref({} as SchedulerEntity);
const schedulerList = ref([]);
const isAdmin = ref(false);
const userId = ref('');

const windowWidth = ref(1000);
const windowHeight = ref(800);
const withLimit = ref(700);
const withColumns: Ref<number> = ref(150);

const schedulerService = new SchedulerService();

onMounted(() => {
  Loading();
  updateUser();
  fetchScheduler().then(() => {
    loading.close();
  }).catch((error) => {
    loading.close();
    PosseidonNotif(`warning`, `${error} this Yield!`)
  });
  updateWidth();
})

onBeforeMount(() => {
  windowWidth.value = window.innerWidth;
  windowHeight.value = window.innerHeight;
  window.addEventListener('resize', () => {
    windowWidth.value = window.innerWidth;
    windowHeight.value = window.innerHeight;
  });
})

watch(() => useEventBus().value.refreshSchedulers,
    (value) => {
      if (value) {
        fetchScheduler();
        dialogVisible.value = false;
      }
    }
)

watch(() => windowWidth.value, () => {
  updateWidth();
})

const updateUser = () => {
  const getLogin = new GetLogin();
  isAdmin.value = getLogin.isAdmin();
  userId.value = getLogin.getUserId();
  //console.log(isAdmin.value);
}

const updateWidth = () => {
  windowWidth.value = window.innerWidth;
  if (windowWidth.value < withLimit.value) {
    withLimit.value = windowWidth.value;
  }
  withColumns.value = windowWidth.value * 0.95 / columns.value.length;
}

const handleClose = (done: () => void) => {
  dialogVisible.value = false
  ElMessageBox.confirm(`Are you sure to close this Scheduler.`, {
    confirmButtonText: "Yes",
    cancelButtonText: "No",
    type: "warning",
  })
      .then(() => {
        dialogVisible.value = false;
        fetchScheduler();
      })
      .catch((error) => {
        dialogVisible.value = true
        PosseidonNotif(`warning`, `${error} this Yield!`)
      })
}

const loading = ElLoading.service({
  lock: true,
  text: 'Loading',
  background: 'rgba(0, 0, 0, 0.7)',
})

const fetchScheduler = async () => {
  dialogVisible.value = false;
  let response;
  //console.log(isAdmin.value);
  isAdmin.value
      ? response = await schedulerService.findAll()
      : response = await schedulerService.findAllNotAdmin(userId.value);

  schedulerList.value = await response.json();
  //console.log(schedulerList.value);
}

const details = (rowData: any) => {
  schedulerEntity.value = rowData;
  dialogVisible.value = true;
  componentKey.value = schedulerEntity.value.id;
}

const switchEnabled = (rowData: SchedulerEntity) => {
  schedulerService.update(rowData).then(() => {
    fetchScheduler();
  })
  //console.log(rowData);
}

const columns = computed(() => {
  let cols = [
    {
      key: 'name',
      title: 'Name',
      dataKey: 'name',
      width: withColumns.value,
      align: 'center',
      fixed: TableV2FixedDir.LEFT,
    },
    {
      key: 'type',
      title: 'Type',
      dataKey: 'type',
      width: withColumns.value,
      align: 'center',
    },
    {
      key: 'User',
      title: 'User',
      dataKey: 'User.userName',
      width: withColumns.value,
      align: 'center',
    },
    {
      key: 'mail',
      title: 'Mail',
      dataKey: 'mail',
      width: withColumns.value,
      align: 'center',
      cellRenderer: ({cellData: mail}: { cellData: boolean }) => <ElTag
          type={mail ? 'success' : 'danger'}>{mail ? 'Send' : 'Not Send'}</ElTag>,
    },
    {
      key: 'Scheduler',
      title: 'Status',
      width: withColumns.value,
      align: 'center',
      fixed: TableV2FixedDir.RIGHT,
      cellRenderer: ({rowData}: { rowData: SchedulerEntity }) => (
          <ElSwitch
              v-model={rowData.enabled}
              inline-prompt
              style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
              active-text="Enable"
              inactive-text="Disable"
              onChange={() => switchEnabled(rowData)}
          />
      ),
    },
    {
      key: 'Scheduler',
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
  ];

  if (isAdmin.value) {
    cols.push({
      key: 'queue',
      title: 'Queue',
      dataKey: 'queue',
      width: withColumns.value,
      align: 'center',
    });
  }

  return cols;
});

</script>
