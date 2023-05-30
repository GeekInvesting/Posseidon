<template>
  <div class="p-4 bg-white routed-lg shadow-md mx-5 md:mx-5 lg:mx-10 xl:mx-20">
    <el-form
      class="mb-4"
      v-loading="loading"
      :element-loading-svg="svg"
      element-loading-svg-view-box="-10, -10, 50, 50"
    >
    <el-form-item label="Type Name" prop="typeName" class="mb-4">
      <el-input
        v-model="typeModel.typeName"
        class="shadow-sm"
        placeholder="Real Estate Investment Trust"
      />
    </el-form-item>
    <el-form-item label="Type Code" prop="typeCode" class="mb-4">
      <el-input
        v-model="typeModel.typeCode"
        class="shadow-sm"
        placeholder="REIT"
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
    </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { emitEventBus } from '~/events/eventBus';
import { TypeModel } from '~/model/hefesto/TypeModel';
import { TypeService } from '~/service/hefesto/TypeService';

const loading = ref(false);
const svg = Loading().svg;

const typeService = new TypeService();

const props = defineProps({
  initialData: {
    type: Object as PropType<TypeModel>,
      default: () => ({}),
    },
    typeSave: {
      type: String,
      default: 'create',
    }
  });

  const typeModel: Ref<TypeModel> = ref({
    typeId: props.initialData.typeId || '',
    typeName: props.initialData.typeName || '',
    typeCode: props.initialData.typeCode || '',
    typeEnabled: props.initialData.typeEnabled || true,
    typeDeleted: props.initialData.typeDeleted || false,
  });

watch(() => props.initialData,
  (newValue) => {
    typeModel.value = {
      typeId: newValue.typeId || '',
      typeName: newValue.typeName || '',
      typeCode: newValue.typeCode || '',
      typeEnabled: newValue.typeEnabled || true,
      typeDeleted: newValue.typeDeleted || false,
    };
  }, { immediate: true }
);

const submitForm = async () => {
  loading.value = true;

  let response;
  props.typeSave === 'create'
    ? response = await typeService.createType(typeModel.value)
    : null // response = await typeService.updateType(typeModel.value);

  response
    ? PosseidonNotif(`success`, `Type ${typeModel.value.typeCode} ${props.typeSave === 'create' ? 'created' : 'updated'} successfully`)
    : null;

  emitEventBus('refreshTypes', true);
  emptyForm();
  loading.value = false;
}

const emptyForm = () => {
  typeModel.value = {
    typeId: '',
    typeName: '',
    typeCode: '',
    typeEnabled: true,
    typeDeleted: false,
  };
}
</script>