<template>
  <el-form
      ref="Scheduler"
      v-model="schedulerEntity"
      label-width="120px"
      v-loading="loading"
      :element-loading-svg="svg"
      element-loading-svg-view-box="-10, -10, 50, 50">
    <el-form-item label="User" v-if="isAdmin">
      <el-autocomplete
          v-model="userSelect"
          :fetch-suggestions="querySearchUser"
          clearable
          placeholder="Select User"
          class="inline-input w-50"
          @select="handleSelectUser"
          :disabled="userList.length === 0"
      />
    </el-form-item>
    <el-form-item label="Report Name">
      <el-select
          v-model="schedulerEntity.name"
          placeholder="Select Report Name"
          class="inline-input w-50"
          @change="handleQueueCreate"
      >
        <el-option
            v-for="item in nameList"
            :key="item"
            :label="item"
            :value="item"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="Type">
      <el-select
          v-model="schedulerEntity.type"
          placeholder="Select Type"
          class="inline-input w-50"
      >
        <el-option
            v-for="item in typeList"
            :key="item"
            :label="item"
            :value="item"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="Queue" v-if="isAdmin">
      <el-input
          v-model="schedulerEntity.queue"
          placeholder="Queue"
          disabled
          class="inline-input w-50"
      />
    </el-form-item>
    <el-form-item label="Mail">
      <el-switch
          v-model="schedulerEntity.mail"
          inline-prompt
          style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
          active-text="Send"
          inactive-text="Not Send"
      />
    </el-form-item>
    <el-form-item label="Enabled">
      <el-switch
          v-model="schedulerEntity.enabled"
          inline-prompt
          style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
          active-text="Enable"
          inactive-text="Disable"
      />
    </el-form-item>
    <el-form-item label="Deleted" v-if="isAdmin">
      <el-switch
          v-model="schedulerEntity.deleted"
          inline-prompt
          style="--el-switch-off-color: #13ce66; --el-switch-on-color: #ff4949"
          active-text="Delete"
          inactive-text="Not Delete"
          disabled
      />
    </el-form-item>
    <el-form-item label="Create At" v-if="isAdmin">
      <el-input
          v-model="schedulerEntity.createdAt"
          placeholder="Create At"
          disabled
          class="inline-input w-50"
      />
    </el-form-item>
    <el-form-item label="Update At" v-if="isAdmin">
      <el-input
          v-model="schedulerEntity.updatedAt"
          placeholder="Update At"
          disabled
          class="inline-input w-50"
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
      <el-button
          v-if="props.typeSave === 'Update'"
          type="danger"
          @click="submitDelete"
          class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      >
        {{ schedulerEntity.deleted ? 'Undelete' : 'Delete' }}
      </el-button>
    </el-form-item>
  </el-form>
  <el-checkbox v-model="anotherScheduler" label="Create another Scheduler" v-if="props.typeSave === 'Create'"/>
</template>

<script lang="tsx" setup>
import {SchedulerEntity} from "~/entities/atena/scheduler.entity";
import {CompleteItem} from "~/entities/complete.entity";
import {UserService} from "~/service/atena/UserService";
import {emitEventBus} from "~/events/eventBus";
import {SchedulerService} from "~/service/atena/scheduler.service";
import {User} from "~/entities/atena/User";

const loading = ref(false);
const svg = Loading().svg;
const isAdmin = ref(false);
const anotherScheduler = ref(false);

const userService = new UserService();
const schedulerService = new SchedulerService();

onMounted(async () => {
  fetchUser();
  updateUser();
  if (isAdmin.value) {
    nameListAdmin.forEach((item) => {
      nameList.push(item);
    })
  }
})

const props = defineProps({
  initialData: {
    type: Object,
    default: {}
  },
  typeSave: {
    type: String,
    default: 'Create'
  }
})

const schedulerEntity = ref<SchedulerEntity>({
  id: props.initialData.id || '',
  name: props.initialData.name || '',
  type: props.initialData.type || '',
  queue: props.initialData.queue || '',
  userId: props.initialData.userId || '',
  User: props.initialData.User || {} as User,
  enabled: props.initialData.enabled || true,
  deleted: props.initialData.deleted || false,
  createdAt: props.initialData.createdAt || '',
  updatedAt: props.initialData.updatedAt || '',
  mail: props.initialData.mail || false,
});

watch(() => props.initialData, (value) => {
  schedulerEntity.value = {
    id: value.id || '',
    name: value.name || '',
    type: value.type || '',
    queue: value.queue || '',
    userId: value.userId || '',
    User: value.User || {} as User,
    enabled: value.enabled || true,
    deleted: value.deleted || false,
    createdAt: value.createdAt || '',
    updatedAt: value.updatedAt || '',
    mail: value.mail || false,
  }
  userSelect.value = schedulerEntity.value.User.userName;
})

const typeList = [
  'Minute',
  'Hour',
  'Daily',
  'Weekly',
  'Monthly',
  'Yearly',
]

let nameList = [
  'Average',
  'Price',
  'GetData'
]

const nameListAdmin = [
  'Price',
  'GetData'
]

const updateUser = () => {
  const getLogin = new GetLogin();
  isAdmin.value = getLogin.isAdmin();
  if (userSelect.value) {
    null;
  } else {
    userSelect.value = getLogin.userName();
    schedulerEntity.value.userId = getLogin.getUserId();
  }
}

const fetchUser = async () => {
  const response = await userService.listAltoComplete()
  userList.value = copyProperties(await response.json());
  //console.log(userList.value);
}

const userList = ref<CompleteItem[]>([]);
const userSelect = ref('');
const querySearchUser = (queryString: string, cb: any) => {
  const result = queryString
      ? userList.value.filter(createFilter(queryString))
      : userList.value;
  cb(result);
}

const createFilter = (queryString: string) => {
  return (restaurant: CompleteItem) => {
    return (
        restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
    )
  }
}

const handleSelectUser = (item: CompleteItem) => {
  schedulerEntity.value.userId = item.value;
}

const handleQueueCreate = () => {
  switch (schedulerEntity.value.name) {
    case 'Average':
      schedulerEntity.value.queue = 'SchedulerToAverage';
      break;
    case 'Price':
      schedulerEntity.value.queue = 'SchedulerToPrice';
      break;
    case 'GetData':
      schedulerEntity.value.queue = 'SchedulerToGetData';
      break;
    default:
      schedulerEntity.value.queue = '';
      break;
  }
}

const submitForm = async () => {
  loading.value = true;
  ElMessageBox.confirm(`Are you sure to ${props.typeSave} this Scheduler.`, {
    confirmButtonText: `${props.typeSave}`,
  }).then(async () => {
    await sendRequest(props.typeSave);
  }).catch((error) => {
    PosseidonNotif('warning', `${error} this Scheduler!`);
  }).finally(() => {
    emitEventBus('refreshSchedulers', true);
    anotherScheduler.value
        ? emptyForm()
        : emitEventBus('dialogCreate', true)
    loading.value = false;
  })
}

const submitDelete = async () => {
  loading.value = true;
  ElMessageBox.confirm(`Are you sure to delete this Scheduler.`, {
    confirmButtonText: `Delete`,
  }).then(async () => {
    schedulerEntity.value.deleted = !schedulerEntity.value.deleted;
    await sendRequest('Delete');
  }).catch((error) => {
    PosseidonNotif('warning', `${error} this Scheduler!`);
  }).finally(() => {
    emitEventBus('refreshSchedulers', true);
    loading.value = false;
  })
}

const sendRequest = async (operation: string) => {
  let response;
  props.typeSave === 'Create'
      ? response = await schedulerService.create(schedulerEntity.value)
      : response = await schedulerService.update(schedulerEntity.value);

  response
      ? PosseidonNotif('success', `${operation} this Scheduler!`)
      : PosseidonNotif('error', `${operation} this Scheduler!`);
}

const emptyForm = () => {
  schedulerEntity.value = {
    id: '',
    name: '',
    type: '',
    queue: '',
    userId: '',
    User: {} as User,
    enabled: true,
    deleted: false,
    createdAt: '',
    updatedAt: '',
    mail: false,
  }
  updateUser()
}
</script>
