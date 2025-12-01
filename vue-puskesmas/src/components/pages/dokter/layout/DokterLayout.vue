<template>
  <div class="flex w-full min-h-screen bg-gray-50">
    <SidebarAdmin />

    <div class="w-full">
      <main class="w-full overflow-y-auto">
        <router-view /> 
      </main>
    </div>
  </div>
</template>

<script setup>
import SidebarAdmin from '@/components/pages/dokter/layout/SidebarDokter.vue'
</script>
