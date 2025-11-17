<template>
<div class="w-64 shadow-2xl h-screen fixed md:relative overflow-hidden border border-rose-200/20" 
     style="background: linear-gradient(160deg, #FFF5F7 0%, #FFE1E9 15%, #FFC1D3 35%, #FF9BB5 60%, #E64980 85%, #C2255C 100%);">
    
    <!-- Medical cross pattern overlay -->
    <div class="absolute inset-0 opacity-[0.03]" 
         style="background-image: repeating-linear-gradient(0deg, #fff 0px, #fff 1px, transparent 1px, transparent 40px), repeating-linear-gradient(90deg, #fff 0px, #fff 1px, transparent 1px, transparent 40px);"></div>
    
    <!-- Soft glow effect -->
    <div class="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-white/30 to-transparent"></div>
    <div class="absolute bottom-0 left-0 w-full h-1/4 bg-gradient-to-t from-black/5 to-transparent"></div>
    
    <div class="relative z-10 h-full flex flex-col">
        <!-- Header -->
        <div class="px-5 pt-8 pb-6">
            <div class="flex items-center justify-between mb-2">
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-xl bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 text-rose-600">
                            <path d="M11.25 5.337c0-.355-.186-.676-.401-.959a1.647 1.647 0 01-.349-1.003c0-1.036 1.007-1.875 2.25-1.875S15 2.34 15 3.375c0 .369-.128.713-.349 1.003-.215.283-.401.604-.401.959 0 .332.278.598.61.578 1.91-.114 3.79-.342 5.632-.676a.75.75 0 01.878.645 49.17 49.17 0 01.376 5.452.657.657 0 01-.66.664c-.354 0-.675-.186-.958-.401a1.647 1.647 0 00-1.003-.349c-1.035 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401.31 0 .557.262.534.571a48.774 48.774 0 01-.595 4.845.75.75 0 01-.61.61c-1.82.317-3.673.533-5.555.642a.58.58 0 01-.611-.581c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.035-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959a.641.641 0 01-.658.643 49.118 49.118 0 01-4.708-.36.75.75 0 01-.645-.878c.293-1.614.504-3.257.629-4.924A.53.53 0 005.337 15c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.036 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.369 0 .713.128 1.003.349.283.215.604.401.959.401a.656.656 0 00.659-.663 47.703 47.703 0 00-.31-4.82.75.75 0 01.83-.832c1.343.155 2.703.254 4.077.294a.64.64 0 00.657-.642z" />
                        </svg>
                    </div>
                    <div>
                        <h2 class="text-white font-bold text-base tracking-wide drop-shadow-lg">Admin Klinik</h2>
                        <p class="text-white/70 text-xs font-medium">Healthcare Portal</p>
                    </div>
                </div>
                <button class="bg-white/20 hover:bg-white/30 p-2 rounded-lg backdrop-blur-md transition-all duration-300 shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="size-4 text-white">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12H12m-8.25 5.25h16.5" />
                    </svg>
                </button>
            </div>
        </div>
        
        <!-- Navigation -->
        <nav class="flex-1 px-4 space-y-1 overflow-y-auto">
            <RouterLink to="/admin/dashboard" 
                        class="group flex items-center gap-3 px-4 py-3.5 mb-3 text-white font-semibold rounded-2xl bg-white/25 backdrop-blur-md hover:bg-white/35 transition-all duration-300 shadow-lg hover:shadow-xl border border-white/20">
                <span class="text-xl group-hover:scale-110 transition-transform">🏥</span>
                <span class="group-hover:translate-x-0.5 transition-transform">Dashboard</span>
            </RouterLink>
            
            <div v-for="(menu, index) in menuItems" :key="index" class="mb-1">
                <button @click="toggleMenu(index)"
                        class="group w-full flex items-center gap-3 px-4 py-3 cursor-pointer text-white/95 rounded-xl hover:bg-white/15 backdrop-blur-sm transition-all duration-300">
                    <div class="flex items-center gap-3 flex-1">
                        <span class="text-lg group-hover:scale-110 transition-transform">{{ menu.icon }}</span>
                        <span :class="openMenu.includes(index) ? 'font-bold' : 'font-medium'" class="group-hover:translate-x-0.5 transition-transform">
                            {{ menu.name }}
                        </span>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5"
                         stroke="currentColor" 
                         class="size-4 text-white/80 transition-transform duration-300"
                         :class="{ 'rotate-90': openMenu.includes(index) }">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                </button>
                
                <transition name="slide-fade">
                    <div v-if="openMenu.includes(index)" class="ml-11 mt-1.5 space-y-0.5 border-l-2 border-white/30 pl-4">
                        <RouterLink v-for="(child, cIndex) in menu.children" :key="cIndex" :to="child.to"
                                    class="block px-3 py-2.5 text-sm text-white/90 rounded-lg hover:bg-white/20 hover:text-white hover:pl-4 transition-all duration-200 font-medium">
                            {{ child.name }}
                        </RouterLink>
                    </div>
                </transition>
            </div>
        </nav>
        
        <!-- Footer User Info -->
        <div class="p-4 border-t border-white/20">
            <div class="flex items-center gap-3 px-3 py-2.5 bg-white/15 backdrop-blur-md rounded-xl">
                <div class="w-9 h-9 rounded-full bg-white/90 flex items-center justify-center text-rose-600 font-bold shadow-lg">
                    A
                </div>
                <div class="flex-1">
                    <p class="text-white text-sm font-semibold">Admin</p>
                    <p class="text-white/60 text-xs">Online</p>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { RouterLink } from 'vue-router'

const openMenu = ref([])

const menuItems = [
  {
    name: "Manajemen Pengguna",
    icon: "👥",
    children: [
      { name: "Daftar Semua Pengguna", to: "/admin/users/list" },
      { name: "Verifikasi Pendaftaran", to: "/admin/users/verify" },
      { name: "Tambah Pengguna Baru", to: "/admin/users/add" }
    ]
  },
  {
    name: "Master Data Klinik",
    icon: "🩺",
    children: [
      { name: "Data Poli", to: "/admin/poli" },
      { name: "Data Obat", to: "/admin/obat" },
      { name: "Data Dokter", to: "/admin/dokter" },
      { name: "Jadwal Dokter", to: "/admin/jadwal" }
    ]
  }
]

onMounted(() => {
  const saved = localStorage.getItem("openMenus")
  if (saved) {
    try {
      openMenu.value = JSON.parse(saved)
    } catch (e) {
      openMenu.value = []
    }
  }
})

watch(openMenu, (val) => {
  localStorage.setItem("openMenus", JSON.stringify(val))
}, { deep: true })

const toggleMenu = (index) => {
  if (openMenu.value.includes(index)) {
    openMenu.value = openMenu.value.filter((i) => i !== index)
  } else {
    openMenu.value.push(index)
  }
}
</script>

<style scoped>
.router-link-active {
  background-color: #fff;
  color: #d81b60;
  font-weight: 500;
}
</style>
