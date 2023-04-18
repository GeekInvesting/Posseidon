<template>
  <el-page-header @back="goToAdmin">
    <template #content>
      <div class="flex items-center py-4">
        <span class="text-large font-600 mr-3"> {{ props.title }} </span>
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
    :title="props.title"
    width="85%"
    :before-close="handleClose"
  >
    <span>
      <AdminStateForm
        v-if="props.title == 'State'"
        class="max-w-screen-md mx-auto"
      />
      <AdminCountryForm
        v-else-if="props.title == 'Country'"
        class="max-w-screen-md mx-auto"
      />
      <AdminCityForm
        v-else-if="props.title == 'City'"
        class="max-w-screen-md mx-auto"
        />
    </span>
  </el-dialog>
</template>

<script setup lang="ts">
import { emitEventBus } from "~~/events/eventBus";

const router = useRouter();

const props = defineProps({
  title: {
    type: String,
    required: true,
  }
});

const dialogVisible = ref(false);

const handleClose = (done: () => void) => {
  ElMessageBox.confirm(`Are you sure to close this ${ props.title }?`)
    .then(() => {
      done();
      if(props.title == 'State') {
        emitEventBus("refreshStates", true);
      } else if (props.title == 'Country') {
        emitEventBus("refreshCountries", true);
      } 
    })
    .catch((error) => {
      console.log(error)
    });
};

const create = () => {
  dialogVisible.value = true;
  //console.log(dialogVisible.value);
};

const goToAdmin = () => {
  router.push("/admin");
};
</script>
