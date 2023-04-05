<template>
    <div class="flex h-screen">
      <aside class="w-64 bg-gray-800 text-white">
        <el-menu
          default-active="1"
          class="text-white"
          background-color="transparent"
          router
        >
          <el-menu-item index="1" route="admin/country">Country</el-menu-item>
          <el-menu-item index="2" route="admin/state">State</el-menu-item>
        </el-menu>
      </aside>
      <div class="flex-1">
        <NuxtPage />
      </div>
    </div>
  </template>
  