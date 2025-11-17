<template>
  <div class="min-h-screen h-full bg-white">
    <div class="flex">
      <SidebarPasien />
    </div>

    <div class="w-full border">
      <main class="">
        <router-view /> 
      </main>
    </div>
  </div>
</template>

<script setup>
import SidebarPasien from '@/components/pages/pasien/layout/SidebarPasien.vue'
</script>
