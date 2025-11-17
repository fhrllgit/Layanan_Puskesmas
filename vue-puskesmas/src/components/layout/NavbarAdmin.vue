<template>
  <header class="bg-white shadow flex justify-between items-center p-4">
    <h1 class="text-lg font-semibold">Dashboard Admin</h1>
    <div class="flex items-center gap-3">
      <img src="../../assets/img/logoP.png" alt="avatar" class="w-8 h-8 rounded-full" />
      <button @click="handleLogout" class="text-white bg-[#d34341] px-5 py-2 rounded-3xl shadow-xl  hover:underline">Logout</button>
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
