<template lang="">
  <div class="p-3 rounded-lg flex justify-between w-auto">
    <NuxtLink to="/admin">
      <Icon name="ic:outline-arrow-back" /> Admin</NuxtLink
    >
    <Button
      class="px-4 py-2 text-white bg-green-500 rounded-md mx-5"
      @click="create"
    >
      New State
    </Button>
  </div>
  <AdminStateForm v-if="hiddenCreate" class="max-w-max" />
  <br/>
  <AdminStateTable />
</template>

<script setup lang="ts">
let hiddenCreate: Ref<boolean> = ref(false);

const create = () => {
  hiddenCreate.value = !hiddenCreate.value;
};

</script>