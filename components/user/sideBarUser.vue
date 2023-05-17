<template>
  <div class="d-flex justify-center">
    <el-row class="tac">
      <el-col :span="17" class="hidden md:block">
        <el-menu
          default-active="2"
          class="d-flex justify-center"
          @open="handleOpen"
          @close="handleClose"
        >
          <el-sub-menu index="1">
            <template #title>
              <span>User</span>
            </template>
            <el-menu-item-group title="Group User">
              <el-menu-item index="1-1">
                <el-button
                  link
                  plain
                  @click="() => emitEventUser('showUserComponent', 1)"
                >
                  View
                </el-button>
              </el-menu-item>
              <el-menu-item index="1-2">
                <el-button
                  link
                  plain
                  @click="() => emitEventUser('showUserComponent', 2)"
                >
                  Edit
                </el-button>
              </el-menu-item>
              <el-menu-item index="1-3">
                <el-button
                  link
                  plain
                  @click="() => emitEventUser('showUserComponent', 3)"
                >
                  Add
                </el-button>
              </el-menu-item>
            </el-menu-item-group>
            <el-sub-menu index="1-4">
              <template #title>item four</template>
              <el-menu-item index="1-4-1">item one</el-menu-item>
            </el-sub-menu>
          </el-sub-menu>
          <el-sub-menu index="2">
            <template #title>
              <span>Investor</span>
            </template>
            <el-menu-item-group title="Group Investor">
              <el-menu-item index="1-1">item one</el-menu-item>
              <el-menu-item index="1-2">item two</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="Group Two">
              <el-menu-item index="1-3">item three</el-menu-item>
            </el-menu-item-group>
            <el-sub-menu index="1-4">
              <template #title>item four</template>
              <el-menu-item index="1-4-1">item one</el-menu-item>
            </el-sub-menu>
          </el-sub-menu>
          <el-menu-item index="4" disabled>
            <span>Change Password</span>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import { emitEventUser } from "~/events/eventUser";

const handleOpen = (key: string, keyPath: string[]) => {
  //console.log(key, keyPath);
};
const handleClose = (key: string, keyPath: string[]) => {
  //console.log(key, keyPath);
};
</script>
