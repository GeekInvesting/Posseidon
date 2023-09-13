<template>
  <el-dialog
    title="Edit User"
    v-model="dialogVisible"
    width="90%"
    :before-close="handleClose"
  >
    <span>
      <UserAdminRegister
        :key="componentKey"
        :initialData="user"
        :typeSave="userSave"
      />
    </span>
  </el-dialog>
  <el-table
    class="mb-4"
    :flexible="true"
    v-loading="loading"
    :element-loading-svg="svg"
    element-loading-svg-view-box="-10, -10, 50, 50"
    :data="users"
  >
    <el-table-column prop="userName" label="Name" sortable />
    <el-table-column prop="userEmail" label="Email" sortable />
    <el-table-column prop="userRole" label="Role" sortable >
      <template #default="{ row }">
        <el-tag
          :type="row.userRole === 'ADMIN' ? 'success' : 'info'"
          size="default"
          >{{ row.userRole === 'ADMIN' ? "Admin" : "User" }}</el-tag
        >
      </template>
    </el-table-column>
    <el-table-column prop="userEnabled" label="Enabled" sortable>
      <template #default="{ row }">
        <el-tag
          :type="row.userEnabled ? 'success' : 'danger'"
          size="default"
          >{{ row.userEnabled ? "Yes" : "No" }}</el-tag
        >
      </template>
    </el-table-column>
    <el-table-column prop="userDeleted" label="Deleted" sortable>
      <template #default="{ row }">
        <el-tag
          :type="row.userDeleted ? 'danger' : 'success'"
          size="default"
          >{{ row.userDeleted ? "Yes" : "No" }}</el-tag
        >
      </template>
    </el-table-column>
    <el-table-column label="Actions">
      <template #default="{ row }">
        <el-dropdown size="lager" placement="auto-end">
          <el-button circle>
            <Icon name="ic:baseline-format-list-bulleted" />
          </el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>
                <el-tooltip
                  class="box-item"
                  effect="dark"
                  content="Edit User"
                  placement="right"
                >
                  <el-button @click="edit(row)">
                    <Icon name="ic:twotone-mode-edit" />
                  </el-button>
                </el-tooltip>
              </el-dropdown-item>
              <div v-if="!row.userDeleted">
                <el-dropdown-item>
                  <el-tooltip
                    class="box-item"
                    effect="dark"
                    :content="
                      row.userEnabled
                        ? 'Disable User'
                        : 'Enable User'
                    "
                    placement="right"
                  >
                    <el-button @click="toggle(row)">
                      <Icon
                        :name="
                          row.userEnabled
                            ? 'ic:sharp-block'
                            : 'ic:sharp-check'
                        "
                      />
                    </el-button>
                  </el-tooltip>
                </el-dropdown-item>
                <el-dropdown-item>
                  <el-tooltip
                    class="box-item"
                    effect="dark"
                    content="Delete User"
                    placement="right"
                  >
                    <el-button @click="remove(row)">
                      <Icon name="ic:sharp-delete" />
                    </el-button>
                  </el-tooltip>
                </el-dropdown-item>
              </div>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts" setup>
import { useEventBus } from '~/events/eventBus';
import { User } from '~/entities/atena/User';
import { UserService } from '~/service/atena/UserService';

const svg = Loading().svg;
const dialogVisible = ref(false);
const componentKey = ref("");
const userSave = ref("Update");
const loading = ref(false);
const user: Ref<User> = ref({} as User);
const users: Ref<User[]> = ref([]);

const userService = new UserService();

onMounted(() => {
  fetchUsers();
})

const fetchUsers = async () => {
  loading.value = true;
  const response = await userService.findAll();
  response ? (users.value = await response.json()) : (users.value = []);
  loading.value = false;
}

watch(() => useEventBus().value.refreshUsers,
(newValue) => {
  if (newValue) {
    fetchUsers();
    dialogVisible.value = false;
    useEventBus().value.refreshUsers = false;
  }
})

const edit = (row: User) => {
  user.value = row;
  componentKey.value = row.id;
  dialogVisible.value = true;
}

const toggle = async (row: User) => {
  loading.value = true;
  ElMessageBox.confirm(`Are you sure ${row.userEnabled ? "disable" : "enable"} this user?`, "Warning", {
    confirmButtonText: `${row.userEnabled ? "DISABLE" : "ENABLE"}`,
    cancelButtonText: "CANCEL",
  }).then(async () => {
      let response;

      row.userEnabled
        ? (response = await userService.disableUser(row))
        : (response = await userService.enableUser(row));

      response
        ? PosseidonNotif("success", `User ${row.userEnabled ? "disabled" : "enabled"} successfully.`)
        : PosseidonNotif("error", `Error ${row.userEnabled ? "disabling" : "enabling"} user.`);

    }).catch((error) => {
      PosseidonNotif("warning", `${error} ${row.userEnabled ? "disabling" : "enabling"} user.`);
    }).finally(() => {
      fetchUsers();
      loading.value = false;
    });
}

const remove = async (row: User) => {
  loading.value = true;
  ElMessageBox.confirm("Are you sure to remove this user?", "Warning", {
    confirmButtonText: "REMOVE",
    cancelButtonText: "CANCEL",
  }).then(async () => {
      const response = await userService.removeUser(row);

      response
        ? PosseidonNotif("success", "User removed successfully.")
        : PosseidonNotif("error", "Error removing user.");
    }).catch((error) => {
      PosseidonNotif("warning", `${error} removing user.`);
    }).finally(() => {
      fetchUsers();
      loading.value = false;
    });
}

const handleClose = () => {
  ElMessageBox.confirm("Are you sure to close this dialog?")
    .then(() => {
      dialogVisible.value = false;
      user.value = {} as User;
      componentKey.value = "";
    })
    .catch((error) => {
      PosseidonNotif("warning", `${error} this dialog.`);
    });
}
</script>
