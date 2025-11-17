<template>
  <div>
    <div class="h-screen w-68 py-5 flex flex-col bg-red-50">
      <div class="px-2.5 flex  items-center justify-between ">
        <div class="flex items-center gap-2.5">
          <img src="../../assets/img/prevLogo.png" alt="" class="w-10 h-auto object-cover">
          <div class="flex flex-col -space-y-1">
            <span class="text-md font-semibold">Sisma Dokter</span>
            <p class="text-xs">Healthcare Portal</p>
          </div>
        </div>
        <span class="flex rotate-180 rounded-lg shadow-white p-1 cursor-pointer bg-white">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5"
            stroke="currentColor" class="size-5 text-pink-700">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12H12m-8.25 5.25h16.5" />
          </svg>
        </span>
      </div>
      <RouterLink to="/dokter/dashboard" class="flex gap-2 px-5 items-center py-2 mt-10 rounded-lg">
        <span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="size-5">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25" />
          </svg>
        </span>
        <p class="text-sm font-semibold">Dashboard</p>
      </RouterLink>
      <RouterLink to="/dokter/jadwal-dokter" class="flex gap-2 px-5 items-center py-2 mt-10 rounded-lg">
        <span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="size-5">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25" />
          </svg>
        </span>
        <p class="text-sm font-semibold">Jadwal Saya</p>
      </RouterLink>
      <RouterLink to="/dokter/dokter-pasien" class="flex gap-2 px-5 items-center py-2 mt-10 rounded-lg">
        <span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="size-5">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25" />
          </svg>
        </span>
        <p class="text-sm font-semibold">Antrian Pasien</p>
      </RouterLink>
      <RouterLink to="/dokter/rekam-medis" class="flex gap-2 px-5 items-center py-2 mt-10 rounded-lg">
        <span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="size-5">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25" />
          </svg>
        </span>
        <p class="text-sm font-semibold">Rekam Medis</p>
      </RouterLink>
      <RouterLink to="/dokter/profil" class="flex gap-2 px-5 items-center py-2 mt-10 rounded-lg">
        <span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="size-5">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25" />
          </svg>
        </span>
        <p class="text-sm font-semibold">Profil</p>
      </RouterLink>
      <button @click="handleLogout" class="px-4 py-2 bg-red-600 cursor-pointer text-white rounded hover:bg-red-700">
        Logout
      </button>
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

<style scoped>
.router-link-active {
  /* background-color: #fff; */
  color: #d81b60;
  font-weight: 500;
}
</style>