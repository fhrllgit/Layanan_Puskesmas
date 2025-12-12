<template>
<div>
  <!-- Sidebar Desktop & Tablet -->
  <div class="hidden md:flex h-screen w-72 flex-col bg-gradient-to-b from-white to-red-50 border-r border-gray-200 shadow-lg">
    <!-- Header Logo -->
    <div class="px-5 py-6 border-b border-gray-200">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-12 h-12 bg-gradient-to-br from-[#d34341] to-[#b83735] rounded-xl flex items-center justify-center shadow-md">
            <img src="../../assets/img/logoS.png" alt="Logo" class="w-8 h-8 object-cover">
            <img src="" alt="">
          </div>
          <div class="flex flex-col">
            <span class="text-lg font-bold text-gray-800">Sisma Dokter</span>
            <p class="text-xs text-gray-500">Healthcare Portal</p>
          </div>
        </div>
        <button class="hidden lg:flex items-center justify-center w-9 h-9 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 transition-colors duration-150 shadow-sm">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-5 h-5 text-[#d34341]">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12H12m-8.25 5.25h16.5" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Navigation Menu -->
    <nav class="flex-1 px-3 py-6 space-y-2 overflow-y-auto">
      <RouterLink to="/apoteker/dashboard" 
        class="group flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-[#d34341] hover:text-white transition-all duration-200 ease-in-out">
        <span class="flex-shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25" />
          </svg>
        </span>
        <p class="text-sm font-semibold">Dashboard</p>
        <span class="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4">
            <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
          </svg>
        </span>
      </RouterLink>

      <RouterLink to="/apoteker/konsultasi-resep" 
        class="group flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-[#d34341] hover:text-white transition-all duration-200 ease-in-out">
        <span class="flex-shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
          </svg>
        </span>
        <p class="text-sm font-semibold">Resep Konsultasi</p>
        <span class="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4">
            <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
          </svg>
        </span>
      </RouterLink>
    </nav>

    <!-- Logout Button -->
    <div class="px-3 py-4 border-t border-gray-200">
      <button @click="handleLogout" 
        class="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-[#d34341] to-[#b83735] text-white rounded-xl font-semibold hover:shadow-lg hover:scale-[1.02] transition-all duration-200 ease-in-out">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
        </svg>
        Logout
      </button>
    </div>
  </div>

  <!-- Mobile Bottom Navigation -->
  <div class="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
    <div class="flex items-center justify-around py-2">
      <RouterLink to="/apoteker/dashboard" 
        class="flex flex-col items-center gap-1 px-4 py-2 text-gray-600 hover:text-[#d34341] transition-colors duration-150">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25" />
        </svg>
        <span class="text-xs font-medium">Dashboard</span>
      </RouterLink>

      <RouterLink to="/apoteker/konsultasi-resep" 
        class="flex flex-col items-center gap-1 px-4 py-2 text-gray-600 hover:text-[#d34341] transition-colors duration-150">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
        </svg>
        <span class="text-xs font-medium">Resep</span>
      </RouterLink>

      <button @click="handleLogout" 
        class="flex flex-col items-center gap-1 px-4 py-2 text-gray-600 hover:text-[#d34341] transition-colors duration-150">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
        </svg>
        <span class="text-xs font-medium">Logout</span>
      </button>
    </div>
  </div>

  <!-- Mobile Header -->
  <div class="md:hidden fixed top-0 left-0 right-0 bg-white border-b border-gray-200 shadow-sm z-40">
    <div class="flex items-center justify-between px-4 py-3">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 bg-gradient-to-br from-[#d34341] to-[#b83735] rounded-lg flex items-center justify-center shadow-md">
          <img src="../../assets/img/prevLogo.png" alt="Logo" class="w-6 h-6 object-cover">
        </div>
        <div class="flex flex-col">
          <span class="text-base font-bold text-gray-800">Sisma Dokter</span>
          <p class="text-xs text-gray-500">Healthcare Portal</p>
        </div>
      </div>
      <button class="flex items-center justify-center w-9 h-9 rounded-lg bg-red-50 hover:bg-red-100 transition-colors duration-150">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-5 h-5 text-[#d34341]">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
      </button>
    </div>
  </div>
</div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { RouterLink } from 'vue-router'
import axios from 'axios';
import Swal from 'sweetalert2';

const openMenu = ref([])
const api_url = "http://localhost:3003";

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

const handleLogout = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    Swal.fire({
      icon: "warning",
      title: "Oops...",
      text: "Kamu belum login!",
    });
    return;
  }

  try {
    await axios.post(
      `${api_url}/api/users/logout`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    Swal.fire({
      icon: "success",
      title: "Logout berhasil!",
      showConfirmButton: false,
      timer: 1500,
    }).then(() => {
      window.location.href = "/login";
    });
  } catch (err) {
    console.error("Logout gagal:", err);
    Swal.fire({
      icon: "error",
      title: "Gagal logout",
      text: "Terjadi kesalahan saat logout",
    });
  }
};
</script>

<style>
/* Active Link Styling */
.router-link-active {
  /* background: linear-gradient(135deg, #d34341 0%, #b83735 100%); */
  color: white;
}

.router-link-active svg {
  color: white;
}

/* Smooth transitions */
* {
  -webkit-tap-highlight-color: transparent;
}

/* Remove bottom nav space for content */
@media (max-width: 768px) {
  body {
    padding-bottom: 70px;
  }
}
</style>