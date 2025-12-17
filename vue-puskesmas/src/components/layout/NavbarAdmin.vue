<template>
<header class="bg-gradient-to-r hidden lg:flex from-white via-gray-50 to-blue-50/20 border-b border-gray-200/50 flex justify-between items-center px-8 py-5 backdrop-blur-sm relative overflow-hidden">
  <div class="absolute top-0 right-20 w-32 h-32 border border-[#039BE5]/5 rounded-2xl rotate-12 -translate-y-1/2"></div>
  <div class="absolute -bottom-10 left-1/4 w-24 h-24 border border-[#039BE5]/5 rounded-2xl -rotate-6"></div>
  <div class="flex items-center gap-6 z-10">
    <div class="flex items-center gap-3">
      <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-[#039BE5]/10 to-[#0277BD]/10 flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-[#039BE5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
      </div>
      <div>
        <h1 class="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#039BE5] to-[#0277BD]">Dashboard Admin</h1>
        <p class="text-xs text-gray-500 font-light">Selamat Datang di Portal SISMA</p>
      </div>
    </div>
  </div>
  <div class="flex items-center gap-4 z-10">
    <button @click="handleLogout" class="flex cursor-pointer items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#039BE5] to-[#0277BD] text-white font-semibold shadow-xl shadow-[#039BE5]/30 hover:shadow-2xl hover:shadow-[#039BE5]/40 hover:scale-105 transition-all group">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 group-hover:rotate-12 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
      </svg>
      <span class="hidden sm:inline">Logout</span>
    </button>
  </div>
</header>
</template>


<script setup>
import { ref } from "vue";
import axios from "axios";
import Swal from "sweetalert2";

const api_url = "http://localhost:3003";

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
* {
  transition: all 0.3s ease;
}
</style>