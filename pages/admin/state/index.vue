<template>
  <div class="p-3 rounded-lg flex justify-between w-auto">
    <NuxtLink to="/admin" class="flex items-center text-blue-500 hover:text-blue-700">
      <Icon name="ic:outline-arrow-back" />
      <span class="ml-2">Admin</span>
    </NuxtLink>
    <Button
      class="px-4 py-2 text-white bg-green-500 hover:bg-green-700 rounded-md"
      @click="create"
    >
      New State
    </Button>
  </div>
  <AdminStateForm v-if="hiddenCreate" class="max-w-screen-md mx-auto" />
  <div class="mt-4">
    <AdminStateTable />
  </div>
</template>


<script setup lang="ts">
let hiddenCreate: Ref<boolean> = ref(false);

const create = () => {
  hiddenCreate.value = !hiddenCreate.value;
};

</script>