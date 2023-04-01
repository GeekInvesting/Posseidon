<template>
  <div class="p-4 rounded-lg shadow-md mx-5">
    <form @submit.prevent="submitForm">
      <br>
      <el-form-item label="Nome">
        <el-input v-model="country.name" />
      </el-form-item>
      <br>
      <el-form-item label="Sigla">
        <el-input v-model="country.sigla" />
      </el-form-item>
      <br>
      <el-button type="primary" native-type="submit">Enviar</el-button>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'

const props = defineProps({
  initialData: {
    type: Object,
    default: () => ({})
  }
})

const country = ref({
  name: props.initialData.name || '',
  sigla: props.initialData.sigla || '',
  enabled: props.initialData.enabled || false
})

watch(props.initialData, newVal => {
  country.value = {
    name: newVal.name || '',
    sigla: newVal.sigla || '',
    enabled: newVal.enabled || false
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
