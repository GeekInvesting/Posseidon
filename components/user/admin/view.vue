<!-- user/admin.vue -->
<template>
  <div class=" p-3 rounded-md shadow-md mx-5 md:mx-5 lg:mx-10 xl:mx-20">
    <h2 class="text-xl font-semibold mb-4">Dados do usuário</h2>
    <dl class="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
      <template v-for="(value, key) in userView" :key="key">
        <dt class="font-medium text-gray-600">{{ key }}</dt>
        <dd class="text-gray-900">{{ value }}</dd>
      </template>
    </dl>
  </div>
</template>

<script lang="ts" setup>
import { User } from "~/entities/atena/User";

const userView = ref({})

const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
});

onMounted(async () => {
  const user = props.user as User;

  userView.value = {
    "Name": user.userName,
    "E-mail": user.userEmail,
    "Enabled": user.userEnabled ? "Yes" : "Not",
    "Created at": user.userCreatedAt,
  }
});

</script>
