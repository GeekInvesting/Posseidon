<template>
  <nav
    class="flex flex-wrap items-center justify-between w-full py-4 md:py-0 px-4 text-lg text-gray-700 bg-white"
  >
    <div class="flex items-center md:w-auto">
      <NuxtLink to="/" class="text-xl font-bold text-indigo-500">Logo</NuxtLink>
    </div>
    <div class="md:flex-wrap items-center justify-center md:w-auto">
      <el-menu
        mode="horizontal"
        class="md:flex-row md:items-center hover:transition-all"
      >
        <el-menu-item index="1"><NuxtLink to="/">Home</NuxtLink></el-menu-item>
        <el-sub-menu index="2">
          <template #title><NuxtLink to="/admin">Admin</NuxtLink></template>
          <el-menu-item index="2-1"
            ><NuxtLink to="/admin/country">Country</NuxtLink></el-menu-item
          >
          <el-menu-item index="2-2"
            ><NuxtLink to="/admin/state">State</NuxtLink></el-menu-item
          >
          <el-menu-item index="2-3"
            ><NuxtLink to="/admin/city">City</NuxtLink></el-menu-item>
        </el-sub-menu>
        <el-menu-item index="3"
          ><NuxtLink to="about">About</NuxtLink></el-menu-item
        >
      </el-menu>
    </div>
    <div class="md:flex items-center">
      <el-avatar
        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
      />
    </div>
  </nav>
</template>
