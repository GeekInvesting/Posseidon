<template>
  <div class="p-1 rounded-lg shadow-md mx-5 md:mx-5 lg:mx-10 xl:mx-20">
    <el-form
      ref="form"
      :model="operation"
      label-width="120px"
      v-loading="loading"
      :element-loading-svg="svg"
      element-loading-svg-view-box="-10, -10, 50, 50"
    >
      <el-form-item label="Name" props="operationName">
        <el-input v-model="operation.operationName" placeholder="SELL" />
      </el-form-item>
      <el-form-item label="System" props="operationSystem">
        <el-select v-model="operation.operationSystem" placeholder="WALLET">
          <el-option
            v-for="item in ['WALLET', 'YIELD']"
            :key="item"
            :label="item"
            :value="item"/>
        </el-select>
      </el-form-item>
      <el-form-item label="Status">
        <el-switch
          v-model="operation.operationEnabled"
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
          v-model="operation.operationDeleted"
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
      <el-form-item label="Created At" props="operationCreatedAt">
        <el-date-picker
          v-model="operation.operationCreatedAt"
          type="datetime"
          placeholder="Create At"
          value-format="yyyy-MM-dd HH:mm:ss"
          :disabled="true"/>
      </el-form-item>
      <el-form-item label="Updated At" props="operationUpdatedAt">
        <el-date-picker
          v-model="operation.operationUpdatedAt"
          type="datetime"
          placeholder="Update At"
          value-format="yyyy-MM-dd HH:mm:ss"
          :disabled="true"/>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="submitForm"
        >
          {{ typeSave }}
        </el-button>
      </el-form-item>
    </el-form>
  </div>
  <el-checkbox
    v-if="props.typeSave === 'Create'"
    v-model="anotherOperation"
    label="Create Another Operation"
    class="mb-4"
  />
</template>

<script lang="ts" setup>
import {Operation} from "~/entities/zeus/operation.entity";
import {Ref} from "vue";
import {OperationService} from "~/service/zeus/operation.service";
import {emitEventBus} from "~/events/eventBus";

const loading = ref(false);
const svg = Loading().svg;
const anotherOperation = ref(false);

const operationService = new OperationService();

const props = defineProps({
  initialData: {
    type: Object,
    default: () => ({}),
  },
  typeSave: {
    type: String,
    default: "Create",
  },
});

const operation: Ref<Operation> = ref({
  _id: props.initialData._id || "",
  operationName: props.initialData.operationName || "",
  operationSystem: props.initialData.operationSystem || "",
  operationEnabled: props.initialData.operationEnabled || true,
  operationDeleted: props.initialData.operationDeleted || false,
  operationCreatedAt: props.initialData.operationCreatedAt || undefined,
  operationUpdatedAt: props.initialData.operationUpdatedAt || undefined,
});

watch(
  () => props.initialData,
  (newVal) => {
    operation.value = {
      _id: newVal._id || "",
      operationName: newVal.operationName || "",
      operationSystem: newVal.operationSystem || "",
      operationEnabled: newVal.operationEnabled || true,
      operationDeleted: newVal.operationDeleted || false,
      operationCreatedAt: newVal.operationCreatedAt || undefined,
      operationUpdatedAt: newVal.operationUpdatedAt || undefined,
    };
  }
);

const submitForm = () => {
  loading.value = true;
  ElMessageBox.confirm(`Are you sure to ${props.typeSave} this Operation.`, {
    confirmButtonText: `${props.typeSave}`,
    cancelButtonText: "Cancel",
  }).then(async () => {
    let response;

    props.typeSave === "Create"
      ? (response = await operationService.createOperation(operation.value))
      : (response = await operationService.updateOperation(operation.value));

    response ? PosseidonNotif("success", `${props.typeSave} Operation Success`) : null;

    emitEventBus("refreshOperations", true);
    resetForm();
  }).catch((error) => {
    //console.log(error);
    PosseidonNotif("error", `${error} Operation Failed`);
  }).finally(() => {
    loading.value = false;
  })
}

const resetForm = () => {
  //console.log(`${anotherOperation.value} new Operation`)
   if (anotherOperation.value) {
     operation.value = {
     _id: "",
       operationName: "",
       operationSystem: "",
       operationEnabled: true,
       operationDeleted: false,
       operationCreatedAt: undefined,
       operationUpdatedAt: undefined,
     }
   } else {
     emitEventBus("dialogCreate", true)
   }
}
</script>
