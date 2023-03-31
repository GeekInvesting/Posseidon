<template lang="">
  <div>Hello Country!</div>
  <div class="flex justify-between mx-5 w-auto">
    <el-form
      ref="formRef"
      :model="dynamicValidateForm"
      label-width="120px"
      class="demo-dynamic"
    >
    <el-form-item
      prop="email"
      label="Email"
      :rules="[
        {
          required: true,
          message: 'Please input email address',
          trigger: 'blur',
        },
        {
          type: 'email',
          message: 'Please input correct email address',
          trigger: ['blur', 'change'],
        },
      ]"
    >
      <el-input v-model="" />
    </el-form-item>  
  </el-form>
  </div>
</template>
<style lang="ts"></style>
