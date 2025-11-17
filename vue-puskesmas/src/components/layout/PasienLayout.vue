<template>
    <h1>Hai pasien waras</h1>
    <button @click="handleLogout" class="px-4 py-2 bg-red-600 cursor-pointer text-white rounded hover:bg-red-700">
        Logout
    </button>
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

