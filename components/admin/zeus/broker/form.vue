<template>
  <div class="p-1 rounded-lg shadow-md mx-5 md:mx-5 lg:mx-10 xl:mx-20">
    <el-form
      ref="form"
      :model="broker"
      label-width="120px"
      v-loading="loading"
      :element-loading-svg="svg"
      element-loading-svg-view-box="-10, -10, 50, 50">
      <el-form-item label="Name" props="brokerName">
        <el-input v-model="broker.brokerName" placeholder="XP Inc" />
      </el-form-item>
      <el-form-item label="Url" props="brokerUrl">
        <el-input v-model="broker.brokerUrl" placeholder="https://www.xpi.com.br" />
      </el-form-item>
      <el-form-item label="Status">
        <el-switch
          v-model="broker.brokerEnabled"
          class="ml-2"
          inline-prompt
          style="
              --el-switch-on-color: #13ce66;
              --el-switch-off-color: #ff4949;
            "
          active-text="Enabled"
          inactive-text="Disabled"
        />
      </el-form-item>
      <el-form-item label="Deleted">
        <el-switch
          v-model="broker.brokerDeleted"
          class="ml-2"
          inline-prompt
          style="
              --el-switch-off-color: #13ce66;
              --el-switch-on-color: #ff4949;
            "
          active-text="Deleted"
          inactive-text="Not Deleted"
        />
      </el-form-item>
      <el-form-item label="Created At" props="brokerCreatedAt">
        <el-date-picker
          v-model="broker.brokerCreatedAt"
          type="datetime"
          placeholder="Create At"
          value-format="yyyy-MM-dd HH:mm:ss"
          :disabled="true"/>
      </el-form-item>
      <el-form-item label="Updated At" props="brokerUpdatedAt">
        <el-date-picker
          v-model="broker.brokerUpdatedAt"
          type="datetime"
          placeholder="Update At"
          value-format="yyyy-MM-dd HH:mm:ss"
          :disabled="true"/>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="submitForm"
          >{{ typeSave }}</el-button>
      </el-form-item>
    </el-form>
    <el-checkbox
      v-model="anotherCreate"
      v-if="typeSave === 'Create'"
      class="mt-5"
      label="Create another broker"
      />
  </div>

</template>

<script setup lang="ts">
import {CreateBrokerDto} from "~/entities/zeus/broker.entity";
import {BrokerService} from "~/service/zeus/broker.service";
import {emitEventBus} from "~/events/eventBus";

const loading = ref(false);
let svg = Loading().svg;
const anotherCreate = ref(false);

const brokerService = new BrokerService();

const props = defineProps({
  initialData: {
    type: Object,
    default: {},
  },
  typeSave: {
    type: String,
    default: 'Create',
  },
})

const broker: Ref<CreateBrokerDto> = ref({
  _id: props.initialData._id || "",
  brokerName: props.initialData.brokerName || "",
  brokerUrl: props.initialData.brokerUrl || "",
  brokerEnabled: props.initialData.brokerEnabled || true,
  brokerDeleted: props.initialData.brokerDeleted || false,
  brokerCreatedAt: props.initialData.brokerCreatedAt || "",
  brokerUpdatedAt: props.initialData.brokerUpdatedAt || "",
})

watch(() => props.initialData,
  (value) => {
    broker.value = {
      _id: value._id || "",
      brokerName: value.brokerName || "",
      brokerUrl: value.brokerUrl || "",
      brokerEnabled: value.brokerEnabled || true,
      brokerDeleted: value.brokerDeleted || false,
      brokerCreatedAt: value.brokerCreatedAt || undefined,
      brokerUpdatedAt: value.brokerUpdatedAt || undefined,
    }
  }
)

const submitForm = () => {
  loading.value = true;
  ElMessageBox.confirm(`Are you sure to ${props.typeSave} this Broker?`, {
    confirmButtonText: `${props.typeSave}`,
  }).then(async () => {
    let response;

    props.typeSave === 'Create'
      ? response = await brokerService.createBroker(broker.value)
      : response = await brokerService.updateBroker(broker.value);

    response
      ? ElMessage.success(`${props.typeSave} successfully`)
      : ElMessage.error(`Error to ${props.typeSave} this Broker`);

  }).catch((error:any) => {
    console.log(error);
    ElMessage.error(`Error to ${props.typeSave} this Broker`);
  }).finally(() => {
    emitEventBus("refreshBrokers", true);
    anotherCreate.value
      ? resetForm()
      : emitEventBus("dialogCreate", true);
    loading.value = false;
  })
}

const resetForm = () => {
  broker.value = {
    _id: "",
    brokerName: "",
    brokerUrl: "",
    brokerEnabled: true,
    brokerDeleted: false,
    brokerCreatedAt: undefined,
    brokerUpdatedAt: undefined,
  }
}
</script>
