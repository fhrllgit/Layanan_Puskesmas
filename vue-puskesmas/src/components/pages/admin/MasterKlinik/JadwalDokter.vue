<template>
  <div class="min-h-screen">
    <div class="max-w-7xl mx-auto">
      <div class="mb-8">
        <div class="flex items-center gap-3 mb-2">
          <div
            class="w-14 h-14 bg-gradient-to-br from-[#039BE5] to-[#29B6F6] rounded-2xl flex items-center justify-center shadow-xl">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <h2 class="text-3xl font-bold bg-gradient-to-r from-[#039BE5] to-[#29B6F6] bg-clip-text text-transparent">
              Manajemen Jadwal Dokter
            </h2>
            <p class="text-sm text-gray-500 mt-1">Atur jadwal praktik dokter dengan mudah</p>
          </div>
        </div>
      </div>
      <form @submit.prevent="isEditing ? updateJadwal() : addJadwal()"
        class="bg-white rounded-2xl shadow-xl border border-gray-100 mb-8 overflow-hidden">
        <div class="bg-gradient-to-r from-[#039BE5] to-[#29B6F6] px-6 py-4">
          <h3 class="text-lg font-semibold text-white flex items-center gap-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            {{ isEditing ? 'Edit Jadwal Dokter' : 'Tambah Jadwal Baru' }}
          </h3>
        </div>
        <div class="p-6">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div class="space-y-2">
              <label class="block text-sm font-semibold text-gray-700">
                Dokter <span class="text-[#039BE5]">*</span>
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <select v-model="form.dokter_id"
                  class="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#039BE5] focus:ring-4 focus:ring-blue-100 transition-all outline-none bg-white appearance-none cursor-pointer">
                  <option value="">-- Pilih Dokter --</option>
                  <option v-for="dok in dokterList" :key="dok.id" :value="dok.id">
                    {{ dok.nama }}
                  </option>
                </select>
                <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
            <div class="space-y-2">
              <label class="block text-sm font-semibold text-gray-700">
                Poli <span class="text-[#039BE5]">*</span>
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <select v-model="form.poli_id"
                  class="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#039BE5] focus:ring-4 focus:ring-blue-100 transition-all outline-none bg-white appearance-none cursor-pointer">
                  <option value="">-- Pilih Poli --</option>
                  <option v-for="p in poliList" :key="p.id" :value="p.id">
                    {{ p.nama_poli }}
                  </option>
                </select>
                <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
            <div class="space-y-2">
              <label class="block text-sm font-semibold text-gray-700">
                Hari <span class="text-[#039BE5]">*</span>
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <select v-model="form.hari"
                  class="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#039BE5] focus:ring-4 focus:ring-blue-100 transition-all outline-none bg-white appearance-none cursor-pointer">
                  <option value="">-- Pilih Hari --</option>
                  <option>Senin</option>
                  <option>Selasa</option>
                  <option>Rabu</option>
                  <option>Kamis</option>
                  <option>Jumat</option>
                  <option>Sabtu</option>
                </select>
                <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
            <div class="space-y-2">
              <label class="block text-sm font-semibold text-gray-700">
                Jam Mulai <span class="text-[#039BE5]">*</span>
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <input type="time" v-model="form.jam_mulai"
                  class="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#039BE5] focus:ring-4 focus:ring-blue-100 transition-all outline-none" />
              </div>
            </div>
            <div class="space-y-2">
              <label class="block text-sm font-semibold text-gray-700">
                Jam Selesai <span class="text-[#039BE5]">*</span>
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <input type="time" v-model="form.jam_selesai"
                  class="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#039BE5] focus:ring-4 focus:ring-blue-100 transition-all outline-none" />
              </div>
            </div>
          </div>
          <div class="mt-6 flex flex-wrap gap-3">
            <button type="submit"
              class="bg-gradient-to-r from-[#039BE5] to-[#29B6F6] hover:from-[#0288D1] hover:to-[#039BE5] text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              {{ isEditing ? 'Update Jadwal' : 'Tambah Jadwal' }}
            </button>

            <button v-if="isEditing" type="button" @click="resetForm"
              class="bg-gray-500 hover:bg-gray-600 text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
              Batal
            </button>
          </div>
        </div>
      </form>
      <div class="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <div class="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
          <div class="flex items-center justify-between flex-wrap gap-3">
            <h3 class="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <svg class="w-5 h-5 text-[#039BE5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Daftar Jadwal Dokter
            </h3>
            <div class="text-sm text-gray-500 bg-white px-4 py-2 rounded-lg border border-gray-200">
              Total: <span class="font-bold text-[#039BE5]">{{ jadwalList.length }}</span> Jadwal
            </div>
          </div>
        </div>
        <div class="hidden lg:block overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gradient-to-r from-gray-50 to-gray-100">
              <tr>
                <th
                  class="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider border-b-2 border-gray-200">
                  No</th>
                <th
                  class="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider border-b-2 border-gray-200">
                  Nama Dokter</th>
                <th
                  class="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider border-b-2 border-gray-200">
                  Poli</th>
                <th
                  class="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider border-b-2 border-gray-200">
                  Hari</th>
                <th
                  class="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider border-b-2 border-gray-200">
                  Jam Mulai</th>
                <th
                  class="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider border-b-2 border-gray-200">
                  Jam Selesai</th>
                <th
                  class="px-6 py-4 text-center text-xs font-bold text-gray-600 uppercase tracking-wider border-b-2 border-gray-200">
                  Aksi</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              <tr v-for="(item, index) in jadwalList" :key="item.id" class="hover:bg-blue-50 transition-colors">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div
                    class="flex items-center justify-center w-8 h-8 bg-blue-100 text-[#039BE5] rounded-lg font-semibold text-sm">
                    {{ index + 1 }}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center gap-3">
                    <div
                      class="w-10 h-10 bg-gradient-to-br from-[#039BE5] to-[#29B6F6] rounded-xl flex items-center justify-center text-white font-bold text-sm">
                      {{ item.nama_dokter.charAt(0) }}
                    </div>
                    <span class="font-semibold text-gray-900">{{ item.nama_dokter }}</span>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="px-3 py-1 text-sm font-medium text-[#039BE5] bg-blue-100 rounded-full">
                    {{ item.nama_poli }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="font-medium text-gray-900">{{ item.hari }}</span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center gap-2 text-gray-700">
                    <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span class="font-medium">{{ item.jam_mulai }}</span>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center gap-2 text-gray-700">
                    <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span class="font-medium">{{ item.jam_selesai }}</span>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center justify-center gap-2">
                    <button @click="editJadwal(item)"
                      class="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-4 py-2 rounded-lg font-medium transition-all shadow hover:shadow-md flex items-center gap-1.5">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Edit
                    </button>
                    <button @click="deleteJadwal(item.id)"
                      class="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-4 py-2 rounded-lg font-medium transition-all shadow hover:shadow-md flex items-center gap-1.5">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Hapus
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="lg:hidden divide-y divide-gray-200">
          <div v-for="(item, index) in jadwalList" :key="item.id" class="p-4 hover:bg-blue-50 transition-colors">
            <div class="flex items-start justify-between mb-4">
              <div class="flex items-center gap-3">
                <div
                  class="w-12 h-12 bg-gradient-to-br from-[#039BE5] to-[#29B6F6] rounded-xl flex items-center justify-center text-white font-bold shrink-0">
                  {{ item.nama_dokter.charAt(0) }}
                </div>
                <div>
                  <h4 class="font-semibold text-gray-900">{{ item.nama_dokter }}</h4>
                  <p class="text-xs text-gray-500">No. {{ index + 1 }}</p>
                </div>
              </div>
            </div>
            <div class="space-y-3 mb-4">
              <div class="flex items-center gap-2">
                <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <span class="text-sm font-medium text-gray-700">Poli:</span>
                <span class="px-2 py-0.5 text-xs font-medium text-[#039BE5] bg-blue-100 rounded-full">
                  {{ item.nama_poli }}
                </span>
              </div>
              <div class="flex items-center gap-2">
                <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span class="text-sm font-medium text-gray-700">Hari:</span>
                <span class="text-sm font-semibold text-gray-900">{{ item.hari }}</span>
              </div>
              <div class="flex items-center gap-2">
                <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span class="text-sm font-medium text-gray-700">Waktu:</span>
                <span class="text-sm font-semibold text-gray-900">{{ item.jam_mulai }} - {{ item.jam_selesai }}</span>
              </div>
            </div>

            <div class="flex gap-2">
              <button @click="editJadwal(item)"
                class="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-3 py-2.5 rounded-lg font-medium transition-all shadow text-sm flex items-center justify-center gap-1.5">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Edit
              </button>
              <button @click="deleteJadwal(item.id)"
                class="flex-1 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-3 py-2.5 rounded-lg font-medium transition-all shadow text-sm flex items-center justify-center gap-1.5">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Hapus
              </button>
            </div>
          </div>
        </div>
        <div v-if="jadwalList.length === 0" class="p-12 text-center">
          <div
            class="w-20 h-20 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-10 h-10 text-[#039BE5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-gray-900 mb-2">Belum Ada Jadwal</h3>
          <p class="text-gray-500">Mulai tambahkan jadwal dokter menggunakan form di atas</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import Swal from "sweetalert2";


const api = axios.create({ baseURL: "http://localhost:3003/api" });
const token = localStorage.getItem("token");
const config = { headers: { Authorization: `Bearer ${token}` } };

const dokterList = ref([]);
const poliList = ref([]);
const jadwalList = ref([]);
const isEditing = ref(false);
const editId = ref(null);

const form = ref({
  dokter_id: "",
  poli_id: "",
  hari: "",
  jam_mulai: "",
  jam_selesai: "",
});

const getDokter = async () => {
  const res = await api.get("/dokter", config);
  dokterList.value = res.data || [];
};

const getPoli = async () => {
  console.log("getPoli() dijalankan ✅");
  try {
    const res = await api.get("/poli", config);
    console.log("Response poli:", res.data);
    poliList.value = res.data.data || [];
  } catch (err) {
    console.error("Gagal ambil poli:", err.response?.data || err.message);
  }
};

const getJadwal = async () => {
  const res = await api.get("/dokter/jadwal", config);
  jadwalList.value = res.data.data || [];
};

const addJadwal = async () => {
  try {
    await api.post("/dokter/jadwal", form.value, config);
    await getJadwal();
    Swal.fire({
      icon: "success",
      title: "Berhasil!",
      text: "Jadwal dokter berhasil ditambahkan",
      timer: 1500,
      showConfirmButton: false,
    });
    resetForm();
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Gagal",
      text: "Terjadi kesalahan saat menambah jadwal",
    });
  }
};

const editJadwal = (item) => {
  isEditing.value = true;
  editId.value = item.id;
  form.value = {
    dokter_id: item.dokter_id,
    poli_id: item.poli_id,
    hari: item.hari,
    jam_mulai: item.jam_mulai,
    jam_selesai: item.jam_selesai,
  };
};

const updateJadwal = async () => {
  try {
    await api.put(`/dokter/jadwal/${editId.value}`, form.value, config);
    await getJadwal();

    Swal.fire({
      icon: "success",
      title: "Berhasil!",
      text: "Jadwal dokter berhasil diperbarui",
      timer: 1500,
      showConfirmButton: false,
    });

    resetForm();

  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Gagal",
      text: "Terjadi kesalahan saat mengupdate jadwal",
    });
  }
};


const deleteJadwal = async (id) => {
  const confirmDelete = await Swal.fire({
    title: "Hapus Jadwal?",
    text: "Data yang dihapus tidak bisa dikembalikan.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#e53e3e",
    cancelButtonColor: "#718096",
    confirmButtonText: "Ya, hapus!",
    cancelButtonText: "Batal",
  });

  if (confirmDelete.isConfirmed) {
    try {
      await api.delete(`/dokter/jadwal/${id}`, config);
      await getJadwal();

      Swal.fire({
        icon: "success",
        title: "Terhapus!",
        text: "Jadwal dokter berhasil dihapus.",
        timer: 1500,
        showConfirmButton: false,
      });

    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: "Terjadi kesalahan saat menghapus jadwal",
      });
    }
  }
};


const resetForm = () => {
  form.value = { dokter_id: "", poli_id: "", hari: "", jam_mulai: "", jam_selesai: "" };
  isEditing.value = false;
  editId.value = null;
};

onMounted(() => {
  getDokter();
  getPoli();
  getJadwal();
});
</script>
