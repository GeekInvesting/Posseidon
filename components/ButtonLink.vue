<template>
    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
      {{ buttonText }}
    </button>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    props: {
      buttonText: {
        type: String,
        default: 'ButtonLink'
      },
      pageUrl: {
        type: String,
        required: true
      }
    },
    methods: {
      goToPage() {
        this.$router.push(this.pageUrl)
      }
    }
  })
</script>

