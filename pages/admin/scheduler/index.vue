<template>
  <div class="p-3 rounded-lg">
    <AdminHeader title="Scheduler"/>
    <div class="p-3 rounded-lg">
      <AdminAtenaSchedulerTable/>
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  name: "Scheduler Admin"
});
</script>
