<template>
  <div :class="[
    'fixed top-0 left-0 h-screen w-64 md:relative transition-all duration-300 ease-out shadow-[2px_0_12px_rgba(211,67,65,0.08)] bg-gradient-to-b from-white to-[#fff5f5]',
    isCollapsed ? 'w-20' : ''
  ]">
    <div class="flex flex-col h-full p-6 md:p-4 border-r border-[#d34341]/10">
      <!-- Header -->
      <div class="flex items-center justify-between mb-8 pb-6 border-b border-[#d34341]/10">
        <div class="flex items-center gap-3 min-w-0 flex-1">
          <div class="p-1  rounded-xl shadow-[0_4px_12px_rgba(211,67,65,0.3)] shrink-0">
            <img src="../../assets/img/prevLogo.png" alt="Logo" class="w-9 h-9 object-cover rounded-lg" />
          </div>
          <transition name="fade-slide">
            <div v-show="!isCollapsed" class="flex flex-col min-w-0">
              <span class="text-base font-bold text-gray-900">Sisma Admin</span>
              <p class="text-[0.7rem] text-[#d34341] font-medium mt-0.5">Healthcare Portal</p>
            </div>
          </transition>
        </div>
        <button @click="toggleSidebar"
          class="p-2 bg-white rounded-xl cursor-pointer shadow-[0_2px_8px_rgba(211,67,65,0.1)] hover:bg-[#d34341] hover:scale-105 transition-all">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5"
            stroke="currentColor" class="w-5 h-5 text-[#d34341] transition-all" :class="{ 'rotate-180': isCollapsed }">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12H12m-8.25 5.25h16.5" />
          </svg>
        </button>
      </div>

      <!-- Menu -->
      <div class="flex-1 overflow-y-auto overflow-x-hidden mt-4 menu-section">
        <transition name="fade-slide">
          <p v-show="!isCollapsed" class="text-[0.7rem] font-bold text-gray-500 tracking-widest mb-4 pl-2">
            MENU
          </p>
        </transition>

        <div class="flex flex-col gap-2 ">
          <div v-for="(menu, index) in menuItems" :key="index" class="w-full border">
            <!-- Menu with children -->
            <div v-if="menu.children">
              <button @click="toggleMenu(index)"
                class="w-full flex items-center justify-between px-4 py-3.5 rounded-xl text-gray-600 text-sm font-medium bg-white shadow-[0_1px_3px_rgba(0,0,0,0.05)] hover:bg-[#fff5f5] hover:text-[#d34341] transition-all"
                :class="{ 'bg-gradient-to-br from-[#d34341] to-[#ef5350] text-white font-semibold shadow-[0_4px_16px_rgba(211,67,65,0.3)]': openMenu.includes(index) || isChildActive(menu.children) }">
                <div class="flex items-center gap-3.5 min-w-0 flex-1">
                  <component :is="menu.icon" class="w-5 h-5 shrink-0" :stroke-width="2" />
                  <transition name="fade-slide">
                    <span v-show="!isCollapsed" class="whitespace-nowrap overflow-hidden text-ellipsis">{{ menu.name
                      }}</span>
                  </transition>
                </div>
                <transition name="fade-slide">
                  <span v-show="!isCollapsed" class="flex items-center transition-transform duration-300 shrink-0"
                    :class="{ 'rotate-90': openMenu.includes(index) }">
                    <ChevronRightIcon class="w-4 h-4" style="stroke-width: 2.5;" />
                  </span>
                </transition>
              </button>

              <!-- Submenu -->
              <transition name="submenu">
                <div v-show="openMenu.includes(index) && !isCollapsed"
                  class="flex border  flex-col gap-5 mt-1.5 ml-10 pl-4 border-l-2 border-[#d34341]/20">
                  <RouterLink v-for="(child, cindex) in menu.children" :key="cindex" :to="child.to"
                    class="flex border items-center gap-3 px-3.5 py-2.5 bg-white rounded-lg text-gray-600 text-[0.8125rem] font-medium hover:bg-[#fff5f5] hover:text-[#d34341] transition-all"
                    :class="{ 'bg-gradient-to-br from-[#d34341] to-[#ef5350] text-white font-semibold shadow-[0_2px_8px_rgba(211,67,65,0.25)]': $route.path === child.to }">
                    <div class="w-1.5 h-1.5 bg-current rounded-full shrink-0"></div>
                    <span class="whitespace-nowrap overflow-hidden text-ellipsis">{{ child.name }}</span>
                  </RouterLink>
                </div>
              </transition>
            </div>

            <!-- Single menu item -->
            <div v-else>
              <RouterLink :to="menu.to"
                class="w-full flex items-center justify-between px-4 py-3.5 rounded-xl text-gray-600 text-sm font-medium bg-white shadow-[0_1px_3px_rgba(0,0,0,0.05)] hover:bg-[#fff5f5] hover:text-[#d34341] transition-all"
                :class="{ 'bg-gradient-to-br from-[#d34341] to-[#ef5350] text-white font-semibold shadow-[0_4px_16px_rgba(211,67,65,0.3)]': $route.path === menu.to }">
                <div class="flex items-center gap-3.5 min-w-0 flex-1">
                  <component :is="menu.icon" class="w-5 h-5 shrink-0" :stroke-width="2" />
                  <transition name="fade-slide">
                    <span v-show="!isCollapsed" class="whitespace-nowrap overflow-hidden text-ellipsis">{{ menu.name
                      }}</span>
                  </transition>
                </div>
              </RouterLink>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="mt-auto pt-6 border-t border-[#d34341]/10">
        <div
          class="flex items-center gap-3.5 px-3.5 py-3.5 bg-white rounded-xl shadow-[0_2px_8px_rgba(211,67,65,0.1)] hover:-translate-y-0.5 transition-all">
          <div
            class="w-[42px] h-[42px] bg-gradient-to-br from-[#d34341] to-[#ef5350] rounded-full flex items-center justify-center shadow-[0_2px_8px_rgba(211,67,65,0.3)]">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="w-6 h-6 text-white">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
          </div>
          <transition name="fade-slide">
            <div v-show="!isCollapsed" class="flex flex-col min-w-0">
              <span class="text-sm font-semibold text-gray-900 overflow-hidden text-ellipsis">Admin User</span>
              <p class="text-[0.7rem] text-[#d34341] font-medium mt-0.5">Administrator</p>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { UsersIcon, ChevronRightIcon } from '@heroicons/vue/24/outline';
import { UserIcon } from 'lucide-vue-next';
import { RouterLink, useRoute } from 'vue-router';

const route = useRoute();
const openMenu = ref([]);
const isCollapsed = ref(false);

const menuItems = [
  { name: "Dashboard", icon: UserIcon, to: "/admin/dashboard" },
  {
    name: "Manajemen Pengguna", icon: UsersIcon, children: [
      { name: "Daftar Semua Pengguna", to: "/admin/users/list" },
      { name: "Verifikasi Pendaftaran", to: "/admin/users/verify" },
      { name: "Tambah Pengguna Baru", to: "/admin/users/add" }
    ]
  },
  {
    name: "Master Data Klinik", icon: UsersIcon, children: [
      { name: "Data Poli", to: "/admin/poli" },
      { name: "Data Obat", to: "/admin/obat" },
      { name: "Data Dokter", to: "/admin/data-dokter" },
      { name: "Jadwal Dokter", to: "/admin/jadwal-dokter" },
      { name: "Kouta", to: "/admin/kouta" }
    ]
  },
  { name: "Manajemen Antrian", icon: UserIcon, to: "/admin/man-antrian" },
  { name: "Rekam Medis", icon: UserIcon, to: "/admin/rekam-medis" },
  { name: "Education", icon: UserIcon, to: "/admin/berita-input" }
];

onMounted(() => {
  const savedMenus = localStorage.getItem("openMenus");
  const savedCollapsed = localStorage.getItem("sidebarCollapsed");

  if (savedMenus) {
    try { openMenu.value = JSON.parse(savedMenus); } catch { openMenu.value = []; }
  }
  if (savedCollapsed) isCollapsed.value = savedCollapsed === 'true';
});

watch(openMenu, (val) => localStorage.setItem("openMenus", JSON.stringify(val)), { deep: true });
watch(isCollapsed, (val) => localStorage.setItem("sidebarCollapsed", val.toString()));

const toggleMenu = (index) => {
  if (openMenu.value.includes(index)) openMenu.value = openMenu.value.filter(i => i !== index);
  else openMenu.value.push(index);
};

const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value;
  if (isCollapsed.value) openMenu.value = [];
};

const isChildActive = (children) => children.some(child => route.path === child.to);
</script>

<style scoped>
/* Scrollbar */
.menu-section::-webkit-scrollbar {
  width: 4px;
}

.menu-section::-webkit-scrollbar-track {
  background: transparent;
}

.menu-section::-webkit-scrollbar-thumb {
  background: rgba(211, 67, 65, 0.2);
  border-radius: 9999px;
}

.menu-section::-webkit-scrollbar-thumb:hover {
  background: rgba(211, 67, 65, 0.3);
}

/* Animations */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateX(-10px);
}

.submenu-enter-active,
.submenu-leave-active {
  transition: all 0.3s ease;
}

.submenu-enter-from,
.submenu-leave-to {
  opacity: 0;
  max-height: 0;
  transform: translateY(-10px);
}

.submenu-enter-to,
.submenu-leave-from {
  opacity: 1;
  max-height: 500px;
  transform: translateY(0);
}
</style>
