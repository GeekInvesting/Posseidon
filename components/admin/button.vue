<template>
    <button @click="goToPage" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
      {{ buttonText }}
    </button>
  </template>
  
  <script lang="ts" >
  import { defineComponent } from 'vue'
  import { useRouter } from 'vue-router'
  
  export default defineComponent({
    props: {
      buttonText: {
        type: String,
        required: true,
      },
      route: {
        type: String,
        required: true,
      },
    },
    setup(props) {
      const router = useRouter()
  
      const goToPage = () => {
        router.push(props.route)
      }
  
      return {
        goToPage,
      }
    },
  })
  </script>
  