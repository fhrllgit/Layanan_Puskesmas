<template>
  <div>
    <div
      class="relative min-h-screen flex flex-col md:items-center md:justify-center bg-white md:bg-[url('@/assets/img/bgUtama.png')] md:bg-cover md:bg-center md:bg-no-repeat">
      <div
        class="relative w-full h-64 bg-[url('@/assets/img/bgUtama.png')] bg-cover bg-center flex justify-center items-center md:hidden">
        <div class="bg-white p-3 rounded-full shadow-lg">
          <img src="../../../assets/img/logoP.png" alt="Logo" class="w-16 h-16">
        </div>
      </div>

      <div
        class="bg-white rounded-t-3xl md:rounded-md w-full max-w-6xl md:h-[70vh] md:shadow-2xl flex flex-col md:flex-row overflow-hidden md:mt-0 -mt-10 md:relative z-10">
        <div class="flex-1 flex flex-col items-center justify-center px-4 py-8 md:py-10 md:px-6 overflow-y-auto">
          <div class="w-full max-w-xs">
            <h2 class="text-red-700 text-2xl md:text-3xl font-semibold mb-6 md:mb-8 text-center">Login Pasien</h2>
            <form @submit.prevent="handleLogin" class="space-y-5">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input v-model="email" type="email" placeholder="Email" required
                  class="w-full px-4 py-3 border-2 border-red-500 rounded-3xl focus:ring-2 focus:ring-red-500 outline-none transition duration-200" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <input v-model="password" type="password" placeholder="Password" required
                  class="w-full px-4 py-3 border-2 border-red-500 rounded-3xl focus:ring-2 focus:ring-red-500 outline-none transition duration-200" />
              </div>
              <div class="pt-2 flex items-center justify-center">
                <button type="submit"
                  class="border-2 w-max border-red-700 text-white bg-red-700 font-semibold py-2 px-10 shadow-lg rounded-full focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transform transition duration-200 hover:scale-105 hover:bg-red-800">
                  Login
                </button>
              </div>
            </form>
            <p v-if="message" class="mt-4 text-center text-sm text-red-600 font-medium">{{ message }}</p>
            <div class="mt-6 text-center">
              <p class="text-sm text-gray-600">
                Belum punya akun?
                <router-link to="/register" class="text-red-700 font-semibold hover:underline">Daftar di
                  sini</router-link>
              </p>
            </div>
          </div>
        </div>
        <div class="hidden md:flex flex-1 overflow-hidden">
          <img src="../../../assets/img/imageLogin.png" class="w-full h-full object-cover" alt="Login Image">
        </div>
      </div>
      <div class="hidden md:block absolute top-0 right-0 p-3">
        <div class="p-3 overflow-hidden bg-white rounded-full shadow-md">
          <img src="../../../assets/img/logoP.png" class="w-16 h-16" alt="Logo">
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Swal from "sweetalert2";

const email = ref("");
const password = ref("");
const api_url = "http://localhost:3003";

const handleLogin = async () => {
  if (!email.value || !password.value) {
    Swal.fire({
      icon: "warning",
      title: "Oops...",
      text: "Isi email dan password dulu ya!",
    });
    return;
  }

  try {
    const res = await fetch(`${api_url}/api/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email.value, password: password.value })
    });

    const result = await res.json();

    if (!res.ok) {
      Swal.fire({
        icon: "error",
        title: "Login gagal",
        text: result.message || "Terjadi kesalahan saat login",
      });
      return;
    }

    localStorage.setItem("token", result.token);
    localStorage.setItem("user", JSON.stringify(result.user));

    Swal.fire({
      icon: "success",
      title: "Login berhasil!",
      showConfirmButton: false,
      timer: 1500
    }).then(() => {
      const user = result.user;
      if (user.role === "admin") window.location.href = "/admin/dashboard";
      else if (user.role === "dokter") window.location.href = "/dokter/dashboard";
      else if (user.role === "apoteker") window.location.href = "/apoteker/dashboard";
      else if (user.role === "pasien") window.location.href = "/pasien/dashboard";
    });

  } catch (err) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Terjadi kesalahan server. Coba lagi nanti!",
    });
  }
};
</script>
