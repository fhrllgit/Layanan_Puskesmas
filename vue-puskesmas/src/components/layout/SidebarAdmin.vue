<template>
  <div class="w-68 h-screen bg-[#be42400e]">
    <div class="py-5 h-full flex flex-col border-r border-r-[#b7b6b66d] px-5">
      <div class=" flex  items-center justify-between">
        <div class="flex items-center gap-2.5">
          <div class="p-0.5 bg-white rounded-full">
            <img src="../../assets/img/prevLogo.png" alt="" class="w-8 h-auto object-cover">
          </div>
          <div class="flex flex-col -space-y-1">
            <span class="text-md font-semibold text-black">Sisma Admin</span>
            <p class="text-xs text-black">Healthcare Portal</p>
          </div>
        </div>
        <span class="flex rotate-180 rounded-lg shadow-white p-1 cursor-pointer bg-white">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5"
            stroke="currentColor" class="size-5 text-black">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12H12m-8.25 5.25h16.5" />
          </svg>
        </span>
      </div>
      <div class="flex flex-col  mt-8">
        <p class="text-sm text-[#555555]">MENU</p>
        <div v-for="(menu, index) in menuItems" :key="index" class="mt-3 space-y-2.5">
          <div v-if="menu.children">
            <button @click="toggleMenu(index)"
              class="w-full px-2.5 flex cursor-pointer justify-between items-center py-3 text-gray-700 rounded-xl"
              :class="openMenu.includes(index) ? 'bg-[#d3434129] text-[#d34341]' : 'bg-white'">
              <div class="flex items-center gap-2">
                <component :is="menu.icon" class="size-5" />
                <span class="text-sm font-semibold">{{ menu.name }}</span>
              </div>
              <span class="transition-transform duration-300" :class="{ 'rotate-90': openMenu.includes(index) }">
                <ChevronRightIcon class="size-4" style="stroke-width: 2.5;" />
              </span>
            </button>

            <transition name="fade" class="ml-9">
              <div v-if="openMenu.includes(index)" class="flex flex-col mt-1 space-y-1">
                <RouterLink v-for="(child, cindex) in menu.children" :key="cindex" :to="child.to"
                  class="flex items-center gap-3 py-2 text-sm rounded-lg bg-transparent" :class="{
                    'text-[#d34341] bg-white font-semibold': $route.path === child.to,
                    'text-gray-700': $route.path !== child.to
                  }">
                  <CircleDot class="size-1.5" />
                  <span>{{ child.name }}</span>
                </RouterLink>
              </div>
            </transition>
          </div>
          <div v-else>
            <RouterLink :to="menu.to"
              class="w-full flex px-2.5 items-center gap-2 py-3 rounded-xl" :class="{
                'text-[#d34341] bg-[#d3434129]': $route.path === menu.to,
                'text-black hover:text-[#d34341] hover:bg-[#d3434129]': $route.path !== menu.to,
              }">
              <component :is="menu.icon" class="size-5" :stroke-width="1.5"/>
              <span class="text-sm">{{ menu.name }}</span>
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { UsersIcon, ChevronRightIcon } from '@heroicons/vue/24/outline'
import { CircleDot, MapPin, Target, UserIcon } from 'lucide-vue-next'
import { RouterLink } from 'vue-router'

const openMenu = ref([])

const menuItems = [
  {
    name: "Dashboard",
    icon: UserIcon,
    to: "/admin/dashboard"
  },
  {
    name: "Manajemen Pengguna",
    icon: UsersIcon,
    children: [
      { name: "Daftar Semua Pengguna", to: "/admin/users/list" },
      { name: "Verifikasi Pendaftaran", to: "/admin/users/verify" },
      { name: "Tambah Pengguna Baru", to: "/admin/users/add" }
    ]
  },
  {
    name: "Master Data Klinik",
    icon: UsersIcon,
    children: [
      { name: "Data Poli", to: "/admin/poli" },
      { name: "Data Obat", to: "/admin/obat" },
      { name: "Data Dokter", to: "/admin/data-dokter" },
      { name: "Jadwal Dokter", to: "/admin/jadwal-dokter" },
      { name: "Kouta", to: "/admin/kouta" }
    ]
  },
  {
    name: "Manajemen Antrian",
    icon: UserIcon,
    to: "/admin/man-antrian"
  },
  {
    name: "Rekam Medis",
    icon: UserIcon,
    to: "/admin/rekam-medis"
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
<!-- 
<style scoped>
.router-link-active {
  /* background-color: #fff; */
  color: #d81b60;
  font-weight: 500;
}
</style> -->
