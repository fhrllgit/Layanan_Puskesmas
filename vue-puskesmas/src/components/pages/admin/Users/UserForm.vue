<template>
  <div class="relative min-h-screen">
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute inset-0 opacity-[0.03]"
        style="background-image: linear-gradient(#039BE5 1px, transparent 1px), linear-gradient(90deg, #039BE5 1px, transparent 1px); background-size: 50px 50px;">
      </div>
      <div class="absolute top-40 right-20 w-32 h-32 border-2 border-[#039BE5]/10 rounded-2xl rotate-45 animate-float">
      </div>
      <div
        class="absolute bottom-30 rotate-90 left-1/3 w-32 h-32 border-2 border-[#039BE5]/10 rounded-2xl rotate-45 animate-float"
        style="animation-delay: 2s;">
      </div>
      <div class="absolute top-1/2 left-10 w-24 h-24 border-2 border-[#039BE5]/10 rounded-2xl rotate-12 animate-float"
        style="animation-delay: 4s;">
      </div>
      <div
        class="absolute bottom-40 right-1/4 w-28 h-28 border-2 border-[#039BE5]/10 rounded-2xl -rotate-12 animate-float"
        style="animation-delay: 6s;">
      </div>
      <div class="absolute top-20 left-20 w-16 h-16 border border-[#039BE5]/10 rounded-lg animate-float"
        style="animation-delay: 1s;"></div>
      <div class="absolute top-60 right-40 w-12 h-12 border border-[#039BE5]/10 rounded-lg animate-float"
        style="animation-delay: 3s;"></div>
      <div class="absolute bottom-20 left-1/2 w-14 h-14 border border-[#039BE5]/10 rounded-lg animate-float"
        style="animation-delay: 5s;"></div>
    </div>

    <div class="relative max-w-2xl mx-auto">
      <div
        class="bg-white rounded-3xl shadow-lg shadow-[#039BE5]/10 p-8 mb-6 backdrop-blur-sm border border-[#039BE5]/10">
        <div class="flex items-center gap-4 mb-2">
          <div class="bg-gradient-to-br from-[#039BE5] to-[#0288D1] p-3 rounded-2xl shadow-lg shadow-[#039BE5]/30">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>
            </svg>
          </div>
          <div>
            <h1 class="text-3xl font-bold text-gray-800">Tambah Pengguna Baru</h1>
            <p class="text-gray-500 text-sm mt-1">Daftarkan dokter atau apoteker baru</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-3xl shadow-lg shadow-[#039BE5]/10 p-8 backdrop-blur-sm border border-[#039BE5]/10">
        <form @submit.prevent="handleAddUser" class="space-y-5">
          <div class="space-y-2">
            <label class="block text-sm font-semibold text-gray-700 flex items-center gap-2">
              <svg class="w-4 h-4 text-[#039BE5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
              Nama Lengkap
            </label>
            <input v-model="nama" placeholder="Masukkan nama lengkap"
              class="w-full border-2 border-gray-200 focus:border-[#039BE5] focus:ring-4 focus:ring-[#039BE5]/10 px-4 py-3 rounded-xl outline-none transition-all bg-gray-50 hover:bg-white" />
          </div>
          <div class="space-y-2">
            <label class="block text-sm font-semibold text-gray-700 flex items-center gap-2">
              <svg class="w-4 h-4 text-[#039BE5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z">
                </path>
              </svg>
              Email
            </label>
            <input v-model="email" type="email" placeholder="nama@email.com"
              class="w-full border-2 border-gray-200 focus:border-[#039BE5] focus:ring-4 focus:ring-[#039BE5]/10 px-4 py-3 rounded-xl outline-none transition-all bg-gray-50 hover:bg-white" />
          </div>
          <div class="space-y-2">
            <label class="block text-sm font-semibold text-gray-700 flex items-center gap-2">
              <svg class="w-4 h-4 text-[#039BE5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z">
                </path>
              </svg>
              Password
            </label>
            <input v-model="password" type="password" placeholder="Minimal 8 karakter"
              class="w-full border-2 border-gray-200 focus:border-[#039BE5] focus:ring-4 focus:ring-[#039BE5]/10 px-4 py-3 rounded-xl outline-none transition-all bg-gray-50 hover:bg-white" />
          </div>
          <div class="space-y-2">
            <label class="block text-sm font-semibold text-gray-700 flex items-center gap-2">
              <svg class="w-4 h-4 text-[#039BE5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z">
                </path>
              </svg>
              Role Pengguna
            </label>
            <select v-model="role"
              class="w-full border-2 border-gray-200 focus:border-[#039BE5] focus:ring-4 focus:ring-[#039BE5]/10 px-4 py-3 rounded-xl outline-none transition-all bg-gray-50 hover:bg-white cursor-pointer">
              <option value="dokter">🩺 Dokter</option>
              <option value="apoteker">💊 Apoteker</option>
            </select>
          </div>
          <div v-if="role === 'dokter'" class="space-y-2 animate-fade-in">
            <label class="block text-sm font-semibold text-gray-700 flex items-center gap-2">
              <svg class="w-4 h-4 text-[#039BE5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4">
                </path>
              </svg>
              Pilih Poli
            </label>
            <select v-model="poli_id"
              class="w-full border-2 border-gray-200 focus:border-[#039BE5] focus:ring-4 focus:ring-[#039BE5]/10 px-4 py-3 rounded-xl outline-none transition-all bg-gray-50 hover:bg-white cursor-pointer">
              <option disabled value="">-- Pilih Poli --</option>
              <option v-for="p in poliList" :key="p.id" :value="p.id">
                {{ p.nama_poli }}
              </option>
            </select>
          </div>
          <div
            class="bg-gradient-to-r from-[#039BE5]/10 to-[#0288D1]/10 border border-[#039BE5]/20 rounded-2xl p-4 flex gap-3">
            <svg class="w-5 h-5 text-[#039BE5] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor"
              viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <div>
              <p class="text-sm text-gray-700 font-medium">Pastikan data yang dimasukkan sudah benar</p>
              <p class="text-xs text-gray-500 mt-1">Email akan digunakan untuk login ke sistem</p>
            </div>
          </div>
          <button type="submit"
            class="w-full bg-gradient-to-r from-[#039BE5] to-[#0288D1] hover:from-[#0288D1] hover:to-[#039BE5] text-white px-6 py-4 rounded-xl font-semibold text-lg shadow-lg shadow-[#039BE5]/30 transition-all duration-300 hover:shadow-xl hover:shadow-[#039BE5]/40 hover:-translate-y-0.5 flex items-center justify-center gap-2">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>
            </svg>
            Tambah Pengguna
          </button>
        </form>
        <div class="mt-6 text-center">
          <p class="text-xs text-gray-400">Semua data akan terenkripsi dengan aman</p>
        </div>
      </div>

      <div class="mt-6 grid grid-cols-3 gap-4">
        <div class="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-[#039BE5]/10 text-center">
          <div
            class="bg-gradient-to-br from-[#039BE5]/10 to-[#0288D1]/10 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-2">
            <svg class="w-6 h-6 text-[#039BE5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z">
              </path>
            </svg>
          </div>
          <p class="text-xs font-semibold text-gray-700">Aman</p>
        </div>
        <div class="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-[#039BE5]/10 text-center">
          <div
            class="bg-gradient-to-br from-[#039BE5]/10 to-[#0288D1]/10 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-2">
            <svg class="w-6 h-6 text-[#039BE5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z">
              </path>
            </svg>
          </div>
          <p class="text-xs font-semibold text-gray-700">Cepat</p>
        </div>
        <div class="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-[#039BE5]/10 text-center">
          <div
            class="bg-gradient-to-br from-[#039BE5]/10 to-[#0288D1]/10 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-2">
            <svg class="w-6 h-6 text-[#039BE5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4">
              </path>
            </svg>
          </div>
          <p class="text-xs font-semibold text-gray-700">Mudah</p>
        </div>
      </div>
    </div>
  </div>

</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import Swal from "sweetalert2";

const nama = ref("");
const email = ref("");
const password = ref("");
const role = ref("dokter");
const poli_id = ref("");

const poliList = ref([]);

const api_url = "http://localhost:3003";

const getPoli = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await axios.get(`${api_url}/api/poli`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    poliList.value = res.data.data;

  } catch (err) {
    console.error("Gagal memuat poli:", err.response?.data);
  }
};


const handleAddUser = async () => {
  try {
    const token = localStorage.getItem("token");

    if (role.value === "dokter" && !poli_id.value) {
      Swal.fire({ icon: "warning", title: "Pilih Poli!", text: "Dokter wajib memilih poli." });
      return;
    }

    const res = await axios.post(
      `${api_url}/api/users/add-user`,
      {
        nama: nama.value,
        email: email.value,
        password: password.value,
        role: role.value,
        poli_id: role.value === "dokter" ? poli_id.value : null
      },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    Swal.fire({
      icon: "success",
      title: "Berhasil!",
      text: res.data.message,
      timer: 1500,
      showConfirmButton: false
    });

    nama.value = "";
    email.value = "";
    password.value = "";
    role.value = "dokter";
    poli_id.value = "";

  } catch (err) {
    Swal.fire({
      icon: "error",
      title: "Gagal!",
      text: err.response?.data?.message || "Terjadi kesalahan"
    });
  }
};

onMounted(() => {
  getPoli();
});
</script>

<style>
@keyframes float {

  0%,
  100% {
    transform: translateY(0) rotate(45deg);
  }

  50% {
    transform: translateY(-20px) rotate(45deg);
  }
}

@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-fade-in {
  animation: fade-in 0.3s ease-out;
}
</style>
