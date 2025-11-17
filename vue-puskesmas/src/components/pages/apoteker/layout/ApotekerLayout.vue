<template>
  <div class="flex min-h-screen bg-gray-50">
    <SidebarAdmin />

    <div class="">
      <main class="p-6 flex-1 overflow-y-auto">
        <router-view /> 
      </main>
    </div>
  </div>
</template>

<script setup>
import SidebarAdmin from '@/components/pages/apoteker/layout/SidebarApoteker.vue'
</script>
