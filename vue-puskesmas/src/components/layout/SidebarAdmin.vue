<template>
  <!-- mobile jalan-jalan hh -->
  <div v-if="isMobile || isCollapsed"
    class="h-screen relative w-20 bg-gradient-to-b from-[#f5f5fb] to-white shadow-xl border-r border-gray-200">
    <div class="flex flex-col items-center py-4 h-full">
      <div class="relative mb-6">
        <img src="../../assets/img/prevLogo.png" class="w-10 h-10 rounded-full shadow-md" />
        <div class="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
      </div>
      <div v-if="!isMobile" @click="toggleSidebar"
        class="absolute z-20 mt-2 ml-20 shadow-xl bg-white cursor-pointer w-6 flex items-center justify-center h-6 rounded-full">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor"
          class="size-4 text-[#d34341]">
          <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
        </svg>
      </div>
      <div class="flex-1 flex flex-col items-center gap-3 mt-2  w-full px-2">
        <button v-for="menu in menuItems" :key="menu.name" @click="handleMobileMenu(menu)"
          class="w-12 h-12 cursor-pointer flex items-center justify-center rounded-xl transition-all duration-200 relative group"
          :class="isActiveMobile(menu)
            ? 'bg-gradient-to-r from-[#d34341] to-[#ff5a57] text-white shadow-lg scale-105'
            : 'text-gray-600 hover:bg-white hover:shadow-md'">
          <component :is="menu.icon" class="w-5 h-5" />

          <div class="absolute left-full ml-3 px-3 py-1.5 bg-gray-900 text-white text-xs rounded-lg
                      opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
            {{ menu.name }}
            <div class="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-900">
            </div>
          </div>
        </button>
      </div>
      <div
        class="w-10 h-10 cursor-pointer rounded-full bg-gradient-to-r from-[#d34341] to-[#ff5a57] flex items-center justify-center text-white font-bold">
        A
      </div>
    </div>

    <transition name="overlay">
      <div v-if="mobileSubmenu" class="fixed inset-0 bg-black/60 backdrop-blur-sm z-40" @click="mobileSubmenu = null" />
    </transition>
    <transition name="submenu">
      <div v-if="mobileSubmenu"
        class="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl p-6 z-50 shadow-2xl max-h-[70vh] overflow-y-auto">
        <div class="flex  items-center justify-between">
          <div class="flex items-center gap-3">
            <component :is="mobileSubmenu.icon" class="w-6 h-6 text-[#d34341]" />
            <h3 class="font-bold text-lg text-gray-800">{{ mobileSubmenu.name }}</h3>
          </div>
          <button @click="mobileSubmenu = null"
            class="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div class="space-y-5">
          <RouterLink v-for="child in mobileSubmenu.children" :key="child.to" :to="child.to"
            @click="mobileSubmenu = null" class="block px-4 py-3.5 rounded-xl font-medium transition-all duration-200"
            :class="route.path === child.to
              ? 'bg-gradient-to-r from-[#fff1f1] to-[#ffe5e5] text-[#d34341] shadow-sm'
              : 'hover:bg-gray-50 text-gray-700'">
            {{ child.name }}
          </RouterLink>
        </div>
      </div>
    </transition>
  </div>

  <!-- dekstop -->
  <div v-else class="h-screen w-72 bg-white shadow-xl border-r border-gray-200">
    <div class="flex relative flex-col h-full p-6">
      <div @click="toggleSidebar"
        class="absolute z-20 mt-3.5 right-0 -mr-4 shadow-xl bg-white cursor-pointer w-6 flex items-center justify-center h-6 rounded-full">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor"
          class="size-4 text-[#d34341]">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
        </svg>
      </div>
      <div class="flex items-center justify-between mb-8 pb-6 border-b border-gray-100">
        <div class="flex items-center gap-3">
          <div class="relative">
            <img src="../../assets/img/prevLogo.png" class="w-12 h-12 rounded-xl shadow-md" />
            <div class="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white"></div>
          </div>
          <div>
            <p class="font-bold text-[#d34341] text-lg">Sisma Admin</p>
            <p class="text-xs text-gray-500">Healthcare Portal</p>
          </div>
        </div>
      </div>
      <div class="flex-1 space-y-5 overflow-y-auto pr-2 menu-section">
        <div v-for="(menu, index) in menuItems" :key="index">
          <div v-if="menu.children">
            <button @click="toggleMenu(index)"
              class="w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200" :class="isActiveDesktop(menu)
                ? 'bg-gradient-to-r from-[#fff1f1] to-[#ffe5e5] text-[#d34341] shadow-sm'
                : 'hover:bg-gray-50 text-gray-700'">
              <div class="flex items-center gap-3">
                <component :is="menu.icon" class="w-5 h-5" />
                <span class="font-medium line-clamp-1 text-start">{{ menu.name }}</span>
              </div>
              <svg class="w-4 h-4 transition-transform duration-200" :class="{ 'rotate-90': openMenu.includes(index) }"
                fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <transition name="submenu-expand">
              <div v-show="openMenu.includes(index)" class="ml-4 mt-1 space-y-3 pl-4 border-l-2 border-[#b5b4b48f]">
                <RouterLink v-for="child in menu.children" :key="child.to" :to="child.to"
                  class="block px-4 py-2.5 rounded-lg text-sm transition-all mt-3 duration-200" :class="route.path === child.to
                    ? 'bg-[#d34341] text-white shadow-md font-medium'
                    : 'hover:bg-gray-50 text-gray-600'">
                  {{ child.name }}
                </RouterLink>
              </div>
            </transition>
          </div>
          <RouterLink v-else :to="menu.to"
            class="flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200" :class="route.path === menu.to
              ? 'bg-gradient-to-r from-[#d34341] to-[#ff5a57] text-white shadow-lg'
              : 'hover:bg-gray-50 text-gray-700'">
            <component :is="menu.icon" class="w-5 h-5" />
            {{ menu.name }}
          </RouterLink>
        </div>
      </div>
      <div class="pt-6 mt-6 border-t border-gray-100">
        <div class="flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100">
          <div
            class="w-10 h-10 rounded-full bg-gradient-to-r from-[#d34341] to-[#ff5a57] flex items-center justify-center text-white font-bold">
            A
          </div>
          <div class="flex-1">
            <p class="font-medium text-gray-800 text-sm">Admin User</p>
            <p class="text-xs text-gray-500">admin@sisma.com</p>
          </div>
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
  UsersIcon,
  BuildingOfficeIcon,
  ClipboardDocumentListIcon,
  DocumentTextIcon,
  AcademicCapIcon
} from '@heroicons/vue/24/outline'

const route = useRoute()
const router = useRouter()

const isMobile = ref(false)
const isCollapsed = ref(false)
const openMenu = ref([])
const mobileSubmenu = ref(null)

const menuItems = [
  { name: 'Dashboard', icon: HomeIcon, to: '/admin/dashboard' },
  {
    name: 'Manajemen Pengguna',
    icon: UsersIcon,
    children: [
      { name: 'Daftar Semua Pengguna', to: '/admin/users/list' },
      { name: 'Verifikasi Pendaftaran', to: '/admin/users/verify' },
      { name: 'Tambah Pengguna Baru', to: '/admin/users/add' }
    ]
  },
  {
    name: 'Master Data Klinik',
    icon: BuildingOfficeIcon,
    children: [
      { name: 'Data Poli', to: '/admin/poli' },
      { name: 'Data Obat', to: '/admin/obat' },
      { name: 'Data Dokter', to: '/admin/data-dokter' },
      { name: 'Jadwal Dokter', to: '/admin/jadwal-dokter' },
      { name: 'Kuota', to: '/admin/kouta' }
    ]
  },
  { name: 'Manajemen Antrian', icon: ClipboardDocumentListIcon, to: '/admin/man-antrian' },
  { name: 'Rekam Medis', icon: DocumentTextIcon, to: '/admin/rekam-medis' },
  { name: 'Education', icon: AcademicCapIcon, to: '/admin/berita-input' }
]

const checkMobile = () => {
  const mobile = window.innerWidth < 768
  isMobile.value = mobile

  if (mobile) {
    isCollapsed.value = false
    mobileSubmenu.value = null
  }
}

const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value
  if (isCollapsed.value) {
    mobileSubmenu.value = null
  }
}

const toggleMenu = (i) => {
  if (openMenu.value.includes(i)) {
    openMenu.value = openMenu.value.filter(x => x !== i)
  } else {
    openMenu.value.push(i)
  }
}

const handleMobileMenu = (menu) => {
  if (menu.children) {
    mobileSubmenu.value = menu
  } else {
    router.push(menu.to)
  }
}

const isActiveMobile = (menu) => {
  if (menu.children) {
    return menu.children.some(c => c.to === route.path)
  }
  return route.path === menu.to
}

const isActiveDesktop = (menu) => {
  if (menu.children) {
    return menu.children.some(c => c.to === route.path)
  }
  return false
}

onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
})
</script>

<style scoped>
.menu-section::-webkit-scrollbar {
  width: 4px;
}

.menu-section::-webkit-scrollbar-thumb {
  background: rgba(211, 67, 65, 0.3);
  border-radius: 10px;
}

.menu-section::-webkit-scrollbar-track {
  background: transparent;
}

.overlay-enter-active,
.overlay-leave-active {
  transition: opacity 0.3s ease;
}

.overlay-enter-from,
.overlay-leave-to {
  opacity: 0;
}

.submenu-enter-active,
.submenu-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.submenu-enter-from,
.submenu-leave-to {
  transform: translateY(100%);
  opacity: 0;
}

.submenu-expand-enter-active,
.submenu-expand-leave-active {
  transition: all 0.3s ease;
  overflow: hidden;
}

.submenu-expand-enter-from,
.submenu-expand-leave-to {
  max-height: 0;
  opacity: 0;
}

.submenu-expand-enter-to,
.submenu-expand-leave-from {
  max-height: 500px;
  opacity: 1;
}
</style>