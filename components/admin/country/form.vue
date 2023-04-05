<template>
  <div class="p-4 rounded-lg shadow-md mx-5">
    <form @submit.prevent="submitForm">
      <br>
      <el-form-item label="Nome">
        <el-input v-model="country.countryName" />
      </el-form-item>
      <br>
      <el-form-item label="countryCode">
        <el-input v-model="country.countryCode" />
      </el-form-item>
      <br>
      <el-button type="primary" native-type="submit">Enviar</el-button>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { Country } from '~~/model/Country';

const props = defineProps({
  initialData: {
    type: Object,
    default: () => ({})
  }
})

const country = ref({
  countryName: props.initialData.countryName || '',
  countryCode: props.initialData.countryCode || '',
  countryEnabled: props.initialData.countryEnabled || false
})

watch(props.initialData, newVal => {
  country.value = {
    countryName: newVal.countryName || '',
    countryCode: newVal.countryCode || '',
    countryEnabled: newVal.countryEnabled || false
  }
})

const submitForm = () => {
  // Lógica de submissão do formulário
  console.log(country.value);

  
  location.reload();
};
</script>

<style>
</style>
