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
          v-model="user.userConfirmPassword"
          type="password"
          placeholder="Please repeat password"
          show-password
        />
      </el-form-item>
      <template v-if="userAuth.userRole == 'admin'">
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
            v-model="user.UserCreatedAt"
            type="date"
            placeholder="Created At"
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
import { Notification } from "~/utils/Notification";
import { createUser } from "~/utils/service/atena/UserService";

const svg = Loading().svg;
let loading = ref(false);
const userAuth: Ref<Partial<User>> = ref({});

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
  userId: props.initialData.userId || "",
  userName: props.initialData.userName || "",
  userEmail: props.initialData.userEmail || "",
  userPassword: props.initialData.userPassword || "",
  userConfirmPassword: props.initialData.userConfirmPassword || "",
  userRole: props.initialData.userRole || "",
  userEnabled: props.initialData.userEnabled || false,
  userDeleted: props.initialData.userDeleted || false,
  UserCreatedAt: props.initialData.UserCreatedAt || "",
});

watch(props.initialData, (newVal) => {
  user.value = {
    userId: props.initialData.userId || "",
    userName: newVal.userName || "",
    userEmail: newVal.userEmail || "",
    userPassword: newVal.userPassword || "",
    userConfirmPassword: newVal.userConfirmPassword || "",
    userRole: newVal.userRole || "",
    userEnabled: newVal.userEnabled || true,
    userDeleted: newVal.userDeleted || false,
    UserCreatedAt: newVal.UserCreatedAt || "",
  };
});

onMounted(() => {
  const userStorage = localStorage.getItem("user");
  if (userStorage) {
    userAuth.value = JSON.parse(userStorage);
    console.log(userStorage);
  }
});


const submit = async () => {
  loading.value = true;
  try {
    if (user.value.userPassword != user.value.userConfirmPassword) {
      Notification().notfError(
        "Error",
        "Password and Confirm Password must be the same"
      );
      loading.value = false;
      return;
    }

    const response = await createUser(user.value);

    const responseBody = await response.json();

    if (!response.ok) {
      throw new Error(responseBody.message);
    }

    Notification().notfSuccess(
      "Success",
      `Saved User: ${responseBody.userName}`
    );
  } catch (error) {
    Notification().notfError("Error", `${error}`);
  }
  loading.value = false;
};
</script>
