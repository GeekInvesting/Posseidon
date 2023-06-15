<template>
  <div class="p-1 rounded-lg shadow-md mx-5 md:mx-5 lg:mx-10 xl:mx-20">
    <div class="text-center p-1 md-10"> {{ typeSave }} User</div>
    <el-form
      ref="form"
      :model="user"
      label-width="120px"
      v-loading="loading"
      :element-loading-svg="svg"
      element-loading-svg-view-box="-10, -10, 50, 50"
    >
      <el-form-item label="Name">
        <el-input v-model="user.userName" placeholder="Name"/>
      </el-form-item>
      <el-form-item label="Email">
        <el-input v-model="user.userEmail"  type="email" placeholder="teste@teste.com"/>
      </el-form-item>
      <el-form-item label="Password">
        <el-input
          v-model="user.userPassword"
          type="password"
          placeholder="Please input password"
          show-password
        />
      </el-form-item>
      <el-form-item label="Confirm Pass">
        <el-input
          v-model="userConfirmPassword"
          type="password"
          placeholder="Please repeat password"
          show-password
        />
      </el-form-item>
      <template v-if="isAdmin">
        <el-form-item label="Role">
          <el-select v-model="user.userRole" placeholder="Select Role">
            <el-option label="Admin" value="admin" />
            <el-option label="User" value="user" />
          </el-select>
        </el-form-item>
        <el-form-item label="Status">
          <el-switch
            v-model="user.userEnabled"
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
        <el-form-item label="Delete">
          <el-switch
            v-model="user.userDeleted"
            class="ml-2"
            inline-prompt
            style="
              --el-switch-on-color: #13ce66;
              --el-switch-off-color: #ff4949;
            "
            active-text="Actived"
            inactive-text="Deleted"
          />
        </el-form-item>
        <el-form-item label="Created At">
          <el-date-picker
            v-model="user.userCreatedAt"
            type="date"
            placeholder="Created At"
            size="large"
            :disabled="true"
          />
        </el-form-item>
        <el-form-item label="Updated At">
          <el-date-picker
            v-model="user.userUpdatedAt"
            type="date"
            placeholder="Updated At"
            size="large"
            :disabled="true"
          />
        </el-form-item>
      </template>
      <el-form-item>
        <el-button type="primary" @click="submit">Submit</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { User } from "~/model/atena/User";
import { Notif } from "~/utils/Notif";
import { UserService, createUser } from "~/service/atena/UserService";
import { emitEventBus, useEventBus } from "~/events/eventBus";
import { AuthService } from "~/service/atena/AuthService";

const svg = Loading().svg;
let loading = ref(false);
const userConfirmPassword = ref("");
const isAdmin = ref(false);
const userAuth: Ref<Partial<User>> = ref({});

const userService = new UserService();
const authService = new AuthService();

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

const user: Ref<User> = ref({
  id: props.initialData.id || "",
  userName: props.initialData.userName || "",
  userEmail: props.initialData.userEmail || "",
  userPassword: props.initialData.userPassword || "",
  userRole: props.initialData.userRole || "",
  userEnabled: props.initialData.userEnabled || false,
  userDeleted: props.initialData.userDeleted || false,
  userCreatedAt: props.initialData.userCreatedAt || "",
  userUpdatedAt: props.initialData.userUpdatedAt || "",
});

watch(() => props.initialData, (newVal) => {
  user.value = {
    id: newVal.id || "",
    userName: newVal.userName || "",
    userEmail: newVal.userEmail || "",
    userPassword: newVal.userPassword || "",
    userRole: newVal.userRole || "",
    userEnabled: newVal.userEnabled || true,
    userDeleted: newVal.userDeleted || false,
    userCreatedAt: newVal.userCreatedAt || "",
    userUpdatedAt: newVal.userUpdatedAt || "",
  };
});

onMounted(() => {
  const userStorage = localStorage.getItem("user");
  if (userStorage) {
    userAuth.value = JSON.parse(userStorage);
    validUser();
    //console.log(userStorage);
  }
});


const submit = () => {
  loading.value = true;
  ElMessageBox.confirm('Are you sure to save this user?', 'Warning', {
    confirmButtonText: 'Save',
    cancelButtonText: 'Cancel',}
    ).then( async () => {
      if (user.value.userPassword != userConfirmPassword.value) {
        PosseidonNotif("error", "Password and Confirm Password are different");
        return;
      }

      let response;
      props.typeSave == "Create"
        ? response = await userService.createUser(user.value)
        : null;

      response ? PosseidonNotif("success", "User saved successfully") : PosseidonNotif("error", "Error saving user");
      emitEventBus("dialogInvestor", true);
    }).catch((error) => {
      PosseidonNotif("warning", `${error} this operation.`);
    });
  loading.value = false;
};

const validUser = async () => {
  const response = await authService.validateToken();

  if (response.ok) {
    const responseBody = await response.json();
    if (responseBody.userRole == "ADMIN") {
      isAdmin.value = true;
    }
  }
}
</script>
