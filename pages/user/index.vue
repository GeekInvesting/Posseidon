<template>
<div v-if="componenteShow == 0" > </div>
<UserAdminView v-else-if="componenteShow == 1" :user="user" />
<UserAdminRegister v-else-if="componenteShow == 2" :initial-data="user" type-save="Update" />
<UserAdminRegister v-else-if="componenteShow == 3" />
</template>

<script lang="ts" setup>
import { useEventUser } from "~/events/eventUser";
import { User } from "~/model/atena/User";
import { getUser } from "~/utils/service/atena/UserService";

const eventUser = useEventUser();
const componenteShow = ref(0);
const user: Ref<Partial<User>> = ref({});

watch (
  () => eventUser.value.showUserComponent,
  (newValue) => {
    if (newValue) {
      componenteShow.value = newValue;
      console.log(`newValue: ${componenteShow.value}`);
    }
  }
);

onMounted(() => {
  getUserData();
});

const getUserData = async () => {
  try {
    const response = await getUser();

    if (!response.ok) {
      const msg = await response.json();
      throw new Error(`Erro ao buscar dados do usuário: ${msg.message}`);
    }
    user.value = await response.json();
    console.log(`user: ${JSON.stringify(user.value)}`);
  } catch (error) {
    console.error(error);
    Notif().notfError(`Error`, `${error}`);
  }
};

definePageMeta({
  layout: "layout-user",
  middleware: "auth",
});
</script>