<template>
  <div class="flex min-h-screen bg-gray-50">
    <SidebarAdmin />

    <div class="flex-1 max-h-screen h-full flex flex-col">
      <NavbarAdmin />
      <main class="p-6 flex-1 overflow-y-auto">
        <router-view /> 
      </main>
    </div>
  </div>
</template>

<script setup>
import SidebarAdmin from '@/components/layout/SidebarAdmin.vue'
import NavbarAdmin from '@/components/layout/NavbarAdmin.vue'
</script>
