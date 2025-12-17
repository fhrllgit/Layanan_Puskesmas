<template>
  <div v-if="isMobile || isCollapsed"
    class="h-screen relative w-20 z-50 bg-gradient-to-br from-white via-red-50 to-red-100/30 shadow-2xl border-r border-gray-200/50">
    <div class="flex flex-col items-center py-6 h-full">
      <div class="relative mb-8 group">
        <div class="absolute inset-0 bg-[#d34341] blur-xl opacity-30 group-hover:opacity-50 transition-opacity rounded-full"></div>
        <img src="../../../../assets/img/prevLogo.png" class="relative  w-12 h-12 rounded-2xl shadow-xl ring-2 ring-[#d34341]/20" />
        <div class="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-white shadow-lg shadow-emerald-500/50"></div>
      </div>
      <div v-if="!isMobile" @click="toggleSidebar"
        class="absolute z-20 mt-2 ml-23 cursor-pointer shadow-xl bg-white cursor-pointer w-7 h-7 flex items-center justify-center rounded-full hover:scale-110 transition-all border border-gray-200 hover:border-[#d34341]/30">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor" class="size-4 text-[#d34341]">
          <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
        </svg>
      </div>
      <div class="flex-1 flex flex-col items-center gap-4 mt-2 w-full px-2">
        <button v-for="menu in menuItems" :key="menu.name" @click="handleMobileMenu(menu)"
          class="w-14 h-14 cursor-pointer flex items-center justify-center rounded-2xl transition-all duration-300 relative group backdrop-blur-sm"
          :class="isActiveMobile(menu)
            ? 'bg-gradient-to-br from-[#d34341] to-[#b83735] text-white shadow-2xl shadow-[#d34341]/30 scale-105'
            : 'text-gray-600 hover:bg-white hover:text-[#d34341] hover:scale-105 hover:shadow-lg'">
          <component :is="menu.icon" class="w-6 h-6" />
          <div class="absolute left-full ml-4 px-4 py-2 bg-white text-gray-800 text-sm rounded-xl
                      opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50 shadow-2xl border border-gray-200">
            {{ menu.name }}
            <div class="absolute right-full top-1/2 -translate-y-1/2 border-8 border-transparent border-r-white"></div>
          </div>
        </button>
      </div>
      <button @click="handleLogout"
        class="w-10 h-10 mb-7 rounded-xl bg-red-50 hover:bg-red-100 flex items-center justify-center transition-all group/logout border border-red-200/50 hover:border-red-300">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5 text-red-500 group-hover/logout:text-red-600">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
        </svg>
      </button>
    </div>
    <transition name="overlay">
      <div v-if="mobileSubmenu" class="fixed inset-0 bg-black/50 backdrop-blur-md z-40" @click="mobileSubmenu = null" />
    </transition>
    <transition name="submenu">
      <div v-if="mobileSubmenu"
        class="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl p-6 z-50 shadow-2xl max-h-[70vh] overflow-y-auto border-t border-gray-200">
        <div class="flex items-center justify-between mb-6">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#d34341]/10 to-[#b83735]/10 flex items-center justify-center border border-[#d34341]/20">
              <component :is="mobileSubmenu.icon" class="w-6 h-6 text-[#d34341]" />
            </div>
            <h3 class="font-bold text-xl text-gray-800">{{ mobileSubmenu.name }}</h3>
          </div>
          <button @click="mobileSubmenu = null" class="w-10 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-all">
            <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div class="space-y-3">
          <RouterLink v-for="child in mobileSubmenu.children" :key="child.to" :to="child.to"
            @click="mobileSubmenu = null"
            class="block px-5 py-4 rounded-xl font-medium transition-all duration-300"
            :class="route.path === child.to
              ? 'bg-gradient-to-r from-[#d34341] to-[#b83735] text-white shadow-xl shadow-[#d34341]/30'
              : 'bg-gray-50 hover:bg-gray-100 text-gray-700 hover:text-gray-900'">
            {{ child.name }}
          </RouterLink>
        </div>
      </div>
    </transition>
  </div>

  <div v-else class="h-screen w-100 z-50  shadow-2xl border-r border-gray-200/50 relative overflow-hidden">
    <div class="absolute top-20 left-12 w-32 h-32 border-2 border-[#d34341]/10 rounded-2xl rotate-12 animate-float"></div>
    <div class="absolute top-1/3 right-10 w-24 h-24 border-2 border-[#d34341]/10 rounded-2xl -rotate-6 animate-float" style="animation-delay:2s;"></div>
    <div class="absolute bottom-40 left-1/4 w-28 h-28 border-2 border-[#d34341]/10 rounded-2xl rotate-45 animate-float" style="animation-delay:4s;"></div>
    <div class="flex relative flex-col h-full p-6 z-10">
      <div @click="toggleSidebar"
        class="absolute z-10 mt-3 right-0 mr-2 shadow-xl bg-white cursor-pointer w-7 h-7 flex items-center justify-center rounded-full hover:scale-110 transition-all border border-gray-200 hover:border-[#d34341]/30">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor" class="size-4 text-[#d34341]">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
        </svg>
      </div>
      <div class="flex items-center justify-between mb-8 pb-6 border-b border-gray-200/50">
        <div class="flex items-center gap-4">
          <div class="relative group">
            <div class="absolute inset-0 bg-[#d34341] blur-xl opacity-30 group-hover:opacity-50 transition-opacity rounded-2xl"></div>
            <img src="../../../../assets/img/prevLogo.png" class="relative w-14 h-14 rounded-2xl shadow-xl ring-2 ring-[#d34341]/20" />
            <div class="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-white shadow-lg shadow-emerald-500/50"></div>
          </div>
          <div>
            <p class="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#d34341] to-[#b83735] text-xl">Sisma Apoteker</p>
            <p class="text-sm text-gray-500 font-light">Healthcare Portal</p>
          </div>
        </div>
      </div>
      <div class="flex-1 space-y-2 overflow-y-auto pr-1 pl-1 menu-section">
        <div v-for="(menu, index) in menuItems" :key="index">
          <div v-if="menu.children">
            <button @click="toggleMenu(index)"
              class="w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 group"
              :class="isActiveDesktop(menu)
                ? 'bg-gradient-to-r from-[#d34341] to-[#b83735] text-white shadow-2xl shadow-[#d34341]/30 scale-[1.02]'
                : 'bg-white/80 hover:bg-white text-gray-700 hover:text-gray-900 hover:shadow-lg border border-gray-200/50 hover:border-[#d34341]/30'">
              <div class="flex items-center gap-3">
                <div class="w-9 h-9 rounded-xl flex items-center justify-center transition-all"
                  :class="isActiveDesktop(menu) ? 'bg-white/20' : 'bg-[#d34341]/10 group-hover:bg-[#d34341]/20'">
                  <component :is="menu.icon" class="w-5 h-5" />
                </div>
                <span class="font-semibold line-clamp-1 text-start text-sm">{{ menu.name }}</span>
              </div>
              <svg class="w-4 h-4 transition-transform duration-300" :class="{ 'rotate-90': openMenu.includes(index) }"
                fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <transition name="submenu-expand">
              <div v-show="openMenu.includes(index)" class="ml-6 mt-2 space-y-2 pl-5 border-l-2 border-[#d34341]/30">
                <RouterLink v-for="child in menu.children" :key="child.to" :to="child.to"
                  class="block px-5 py-3 rounded-xl text-sm transition-all mt-2 duration-300 font-medium"
                  :class="route.path === child.to
                    ? 'bg-gradient-to-r from-[#d34341] to-[#b83735] text-white shadow-xl shadow-[#d34341]/20'
                    : 'bg-white/60 hover:bg-white text-gray-600 hover:text-gray-900 border border-gray-200/50 hover:border-[#d34341]/30'">
                  {{ child.name }}
                </RouterLink>
              </div>
            </transition>
          </div>
          <RouterLink v-else :to="menu.to"
            class="flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all duration-300 group"
            :class="route.path === menu.to
              ? 'bg-gradient-to-r from-[#d34341] to-[#b83735] text-white shadow-2xl shadow-[#d34341]/30 scale-[1.02]'
              : 'bg-white/80 hover:bg-white text-gray-700 hover:text-gray-900 hover:shadow-lg border border-gray-200/50 hover:border-[#d34341]/30'">
            <div class="w-9 h-9 rounded-xl flex items-center justify-center transition-all"
              :class="route.path === menu.to ? 'bg-white/20' : 'bg-[#d34341]/10 group-hover:bg-[#d34341]/20'">
              <component :is="menu.icon" class="w-5 h-5" />
            </div>
            <span class="text-sm">{{ menu.name }}</span>
          </RouterLink>
        </div>
      </div>
      <div class="pt-6 mt-6 border-t border-gray-200/50">
        <div class="flex items-center gap-4 px-4 py-3 rounded-xl bg-white/80 border border-gray-200/50 hover:border-[#d34341]/30 hover:shadow-lg transition-all group">
          <div class="relative w-11 h-11 rounded-2xl bg-gradient-to-br from-[#d34341] to-[#b83735] flex items-center justify-center text-white font-bold text-base shadow-xl ring-2 ring-[#d34341]/30">
            A
          </div>
          <div class="flex-1 min-w-0">
            <p class="font-semibold text-gray-800 text-sm truncate">Apoteker User</p>
            <p class="text-xs text-gray-500 truncate">apoteker@sisma.com</p>
          </div>
          <button @click="handleLogout"
            class="w-9 h-9 cursor-pointer rounded-xl bg-red-50 hover:bg-red-100 flex items-center justify-center transition-all group/logout border border-red-200/50 hover:border-red-300">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
              stroke="currentColor" class="w-5 h-5 text-red-500 group-hover/logout:text-red-600">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  HomeIcon,
  ClipboardDocumentListIcon,
  DocumentTextIcon
} from '@heroicons/vue/24/outline'
import axios from 'axios';
import Swal from "sweetalert2";

const route = useRoute()
const router = useRouter()
const api_url = "http://localhost:3003"
const isMobile = ref(false)
const isCollapsed = ref(false)
const openMenu = ref([])
const mobileSubmenu = ref(null)

const menuItems = [
  { name: 'Dashboard', icon: HomeIcon, to: '/apoteker/dashboard' },
  { name: 'Resep Berobat', icon: ClipboardDocumentListIcon, to: '/apoteker/berobat-resep' },
  { name: 'Resep Konsultasi', icon: ClipboardDocumentListIcon, to: '/apoteker/konsultasi-resep' },
]

const handleLogout = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    Swal.fire({ icon: "warning", title: "Oops...", text: "Kamu belum login!" });
    return;
  }

  try {
    await axios.post(`${api_url}/api/users/logout`, {}, { headers: { Authorization: `Bearer ${token}` } });
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    Swal.fire({ icon: "success", title: "Logout berhasil!", showConfirmButton: false, timer: 1500 })
      .then(() => window.location.href = "/login");
  } catch (err) {
    Swal.fire({ icon: "error", title: "Gagal logout", text: "Terjadi kesalahan saat logout" });
  }
};

const checkMobile = () => {
  isMobile.value = window.innerWidth < 768;
  if (isMobile.value) {
    isCollapsed.value = false
    mobileSubmenu.value = null
  }
}

const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value
  if (isCollapsed.value) mobileSubmenu.value = null
}

const toggleMenu = (i) => {
  if (openMenu.value.includes(i)) openMenu.value = openMenu.value.filter(x => x !== i)
  else openMenu.value.push(i)
}

const handleMobileMenu = (menu) => {
  if (menu.children) mobileSubmenu.value = menu
  else router.push(menu.to)
}

const isActiveMobile = (menu) => menu.children ? menu.children.some(c => c.to === route.path) : route.path === menu.to
const isActiveDesktop = (menu) => menu.children ? menu.children.some(c => c.to === route.path) : false

onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
})
</script>