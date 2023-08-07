<template>
  <el-page-header @back="goToHome">
    <template #content>
      <div class="flex items-center py-4">
        <span class="text-large font-600 mr-3">{{ props.title }}</span>
      </div>
    </template>
    <template #extra>
      <div class="flex items-center py4">
        <el-button
          @click="create"
          type="success"
          class="ml-2"
          circle
          size="large"
          ><Icon name="ic:baseline-plus"
        /></el-button>
      </div>
    </template>
  </el-page-header>
  <el-dialog
    v-model="dialogVisible"
    :title="title"
    width="90%"
    :before-close="handleClose"
  >
    <span class="flex-center">
      <AdminZeusWalletForm
        class="max-w-screen-md mx-auto"
      />
    </span>
  </el-dialog>
</template>

<script setup lang="ts">
import { emitEventBus, useEventBus } from "~~/events/eventBus";

const title = ref("");
const router = useRouter();

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
});

onMounted(() => {
  title.value = props.title;
});

const dialogVisible = ref(false);

const handleClose = (done: () => void) => {
  ElMessageBox.confirm(`Are you sure to close this ${props.title}?`)
    .then(() => {
      done();

      dialogVisible.value = false;
    })
    .catch((error:any) => {
      console.log(error);
    });
};

const create = () => {
  dialogVisible.value = true;
  //console.log(dialogVisible.value);
};

const goToHome = () => {
  router.push("/");
};

watch(
  () => useEventBus().value.dialogCreate,
  (newValue) => {
    if (newValue) {
      dialogVisible.value = false;
      useEventBus().value.dialogCreate = false;
    }
  }
);
</script>
