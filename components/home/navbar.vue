<template>
  <nav class="bg-gray-800">
    <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
      <div class="relative flex items-center justify-between h-16">
        <!-- Logo -->
        <div class="flex-shrink-0 flex items-center">
          <img class="block lg:hidden h-8 w-auto" src="/logo.svg" alt="Logo">
          <img class="hidden lg:block h-8 w-auto" src="/logo.svg" alt="Logo">
        </div>
        
        <!-- Menu -->
        <div class=" md:block">
          <div class="ml-10 flex items-baseline space-x-4">
            <nuxt-link to="/" class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Home <Icon name="ic:sharp-home"/></nuxt-link>
            <nuxt-link to="/admin" class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Admin <Icon name="ic:baseline-construction"></Icon></nuxt-link>
          </div>
        </div>
      </div>
    </div>

</nav>
</template>

<script lang="ts">

</script>