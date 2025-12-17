<template>
  <div class="p-4 sm:p-6 lg:p-8 mt-15 min-h-screen">
    <div class="max-w-7xl mx-auto">
      <div class="mb-8">
        <h2 class="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
          Antrian Pasien {{ namaPoli }}
        </h2>
        <p class="text-gray-600">Kelola antrian dan rekam medis pasien</p>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
        <div
          class="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-[#d34341] hover:shadow-xl transition-shadow duration-300">
          <div class="flex items-start justify-between">
            <div class="flex-1">
              <div class="flex items-center space-x-3 mb-3">
                <div class="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                  <svg class="w-6 h-6 text-[#d34341]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z">
                    </path>
                  </svg>
                </div>
              </div>
              <h3 class="text-sm font-medium text-gray-600 mb-1">Total Pasien Hari Ini</h3>
              <p class="text-3xl font-bold text-gray-800">{{ totalPasien }}</p>
            </div>
          </div>
        </div>
        <div
          class="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-orange-500 hover:shadow-xl transition-shadow duration-300">
          <div class="flex items-start justify-between">
            <div class="flex-1">
              <div class="flex items-center space-x-3 mb-3">
                <div class="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                  <svg class="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"></path>
                  </svg>
                </div>
              </div>
              <h3 class="text-sm font-medium text-gray-600 mb-1">Nomor Giliran Berikutnya</h3>
              <p class="text-3xl font-bold text-gray-800">{{ nomorBerikutnya }}</p>
            </div>
          </div>
        </div>
        <div
          class="bg-gradient-to-br from-[#d34341] to-[#b83331] rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 sm:col-span-2 lg:col-span-1">
          <div class="flex items-start justify-between">
            <div class="flex-1">
              <div class="flex items-center space-x-3 mb-3">
                <div class="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z">
                    </path>
                  </svg>
                </div>
              </div>
              <h3 class="text-sm font-medium text-white/90 mb-1">Pasien Dipanggil</h3>
              <p class="text-3xl font-bold text-white">{{ pasienDipanggil?.nomor_antrian || '-' }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="mb-6">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-xl font-bold text-gray-800 flex items-center">
            <div class="w-8 h-8 bg-[#d34341] rounded-lg flex items-center justify-center mr-3">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2">
                </path>
              </svg>
            </div>
            Daftar Antrian
          </h3>
          <span class="text-sm text-gray-500 bg-white px-3 py-1 rounded-lg shadow">
            {{ antrian.length }} Pasien
          </span>
        </div>

        <div class="space-y-4">
          <div v-for="a in antrian" :key="a.id"
            class="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100">

            <div class="p-5 sm:p-6">
              <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div class="flex-1">
                  <div class="flex items-start space-x-4">
                    <div class="flex-shrink-0">
                      <div
                        class="w-14 h-14 bg-gradient-to-br from-[#d34341] to-[#b83331] rounded-xl flex items-center justify-center shadow-md">
                        <span class="text-white font-bold text-xl">{{ a.nomor_antrian }}</span>
                      </div>
                    </div>
                    <div class="flex-1 min-w-0">
                      <h4 class="text-lg font-semibold text-gray-800 mb-1">
                        {{ a.pasien_nama }}
                      </h4>
                      <div class="flex items-center space-x-2">
                        <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium" :class="{
                          'bg-yellow-100 text-yellow-800': a.status === 'menunggu',
                          'bg-blue-100 text-blue-800': a.status === 'dipanggil',
                          'bg-green-100 text-green-800': a.status === 'selesai'
                        }">
                          <span class="w-1.5 h-1.5 rounded-full mr-1.5" :class="{
                            'bg-yellow-500': a.status === 'menunggu',
                            'bg-blue-500': a.status === 'dipanggil',
                            'bg-green-500': a.status === 'selesai'
                          }"></span>
                          {{ a.status.charAt(0).toUpperCase() + a.status.slice(1) }}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="flex flex-wrap gap-2 sm:flex-nowrap">
                  <template v-if="a.status === 'menunggu'">
                    <button @click="panggilPasien(a)"
                      class="flex-1 sm:flex-initial inline-flex items-center justify-center px-4 py-2.5 bg-[#d34341] text-white rounded-xl hover:bg-[#b83331] transition-colors duration-200 font-medium shadow-md hover:shadow-lg">
                      <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z">
                        </path>
                      </svg>
                      Panggil
                    </button>
                    <button @click="hapusAntrian(a)"
                      class="flex-1 sm:flex-initial inline-flex items-center justify-center px-4 py-2.5 bg-white text-red-600 border-2 border-red-200 rounded-xl hover:bg-red-50 transition-colors duration-200 font-medium">
                      <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12">
                        </path>
                      </svg>
                      Batal
                    </button>
                  </template>
                  <template v-if="a.status === 'dipanggil'">
                    <button @click="batalPasien(a)"
                      class="flex-1 sm:flex-initial inline-flex items-center justify-center px-4 py-2.5 bg-white text-yellow-600 border-2 border-yellow-200 rounded-xl hover:bg-yellow-50 transition-colors duration-200 font-medium">
                      <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"></path>
                      </svg>
                      Batal Panggil
                    </button>
                    <button @click="openModal(a)"
                      class="flex-1 sm:flex-initial inline-flex items-center justify-center px-4 py-2.5 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors duration-200 font-medium shadow-md hover:shadow-lg">
                      <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      Selesai
                    </button>
                  </template>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- modal sep -->
      <div v-if="showModal"
        class="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
        <div class="bg-white w-full max-w-2xl rounded-3xl shadow-2xl max-h-[90vh] overflow-y-auto">
          <div class="sticky top-0 bg-gradient-to-r from-[#d34341] to-[#b83331] px-6 sm:px-8 py-6 rounded-t-3xl">
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-3">
                <div class="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z">
                    </path>
                  </svg>
                </div>
                <h2 class="text-xl sm:text-2xl font-bold text-white">
                  Input Rekam Medis & Resep
                </h2>
              </div>
            </div>
          </div>

          <div class="px-6 sm:px-8 py-6 space-y-6">
            <div class="space-y-4">
              <h3 class="text-lg font-semibold text-gray-800 flex items-center">
                <div class="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center mr-2">
                  <svg class="w-4 h-4 text-[#d34341]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z">
                    </path>
                  </svg>
                </div>
                Rekam Medis
              </h3>

              <div class="space-y-3">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Keluhan</label>
                  <textarea v-model="form.keluhan"
                    class="w-full border-2 border-gray-200 rounded-xl p-3 focus:border-[#d34341] focus:ring-2 focus:ring-[#d34341]/20 transition-colors resize-none"
                    placeholder="Masukkan keluhan pasien..." rows="3"></textarea>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Diagnosis</label>
                  <textarea v-model="form.diagnosis"
                    class="w-full border-2 border-gray-200 rounded-xl p-3 focus:border-[#d34341] focus:ring-2 focus:ring-[#d34341]/20 transition-colors resize-none"
                    placeholder="Masukkan diagnosis..." rows="3"></textarea>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Tindakan</label>
                  <textarea v-model="form.tindakan"
                    class="w-full border-2 border-gray-200 rounded-xl p-3 focus:border-[#d34341] focus:ring-2 focus:ring-[#d34341]/20 transition-colors resize-none"
                    placeholder="Masukkan tindakan yang dilakukan..." rows="3"></textarea>
                </div>
              </div>
            </div>
            <hr class="border-gray-200">
            <div>
              <h3 class="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <div class="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-2">
                  <svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10">
                    </path>
                  </svg>
                </div>
                Resep Obat
              </h3>

              <div class="space-y-3">
                <div v-for="(obat, index) in form.obatList" :key="index"
                  class="bg-gray-50 rounded-xl p-4 border-2 border-gray-200">
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label class="block text-xs font-medium text-gray-600 mb-1">Nama Obat</label>
                      <input v-model="obat.nama_obat" placeholder="Nama Obat"
                        class="w-full border-2 border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-[#d34341] focus:ring-2 focus:ring-[#d34341]/20 transition-colors" />
                    </div>

                    <div>
                      <label class="block text-xs font-medium text-gray-600 mb-1">Dosis</label>
                      <input v-model="obat.dosis" placeholder="cth: 3x1"
                        class="w-full border-2 border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-[#d34341] focus:ring-2 focus:ring-[#d34341]/20 transition-colors" />
                    </div>

                    <div>
                      <label class="block text-xs font-medium text-gray-600 mb-1">Jumlah</label>
                      <input type="number" v-model="obat.jumlah" placeholder="Jumlah"
                        class="w-full border-2 border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-[#d34341] focus:ring-2 focus:ring-[#d34341]/20 transition-colors" />
                    </div>

                    <div>
                      <label class="block text-xs font-medium text-gray-600 mb-1">Keterangan</label>
                      <input v-model="obat.keterangan" placeholder="Keterangan"
                        class="w-full border-2 border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-[#d34341] focus:ring-2 focus:ring-[#d34341]/20 transition-colors" />
                    </div>
                  </div>
                </div>
              </div>

              <button @click="addObat"
                class="mt-4 inline-flex items-center text-[#d34341] font-medium hover:text-[#b83331] transition-colors group">
                <div
                  class="w-6 h-6 bg-red-100 rounded-lg flex items-center justify-center mr-2 group-hover:bg-red-200 transition-colors">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                  </svg>
                </div>
                Tambah Obat
              </button>
            </div>
          </div>

          <div class="sticky bottom-0 bg-gray-50 px-6 sm:px-8 py-5 rounded-b-3xl border-t border-gray-200">
            <div class="flex flex-col-reverse sm:flex-row justify-end gap-3">
              <button @click="showModal = false"
                class="w-full sm:w-auto px-6 py-3 rounded-xl border-2 border-gray-300 text-gray-700 font-medium hover:bg-gray-100 transition-colors">
                Batal
              </button>
              <button @click="submitForm"
                class="w-full sm:w-auto px-6 py-3 rounded-xl bg-green-600 text-white font-medium hover:bg-green-700 transition-colors shadow-lg hover:shadow-xl">
                <span class="flex items-center justify-center">
                  <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Simpan Data
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, reactive } from "vue";
import axios from "axios";
import Swal from "sweetalert2";
import { io } from "socket.io-client";

// const user = JSON.parse(localStorage.getItem("user"));
// const dokterPoli = ref({
//   id: user.poli_id,
//   nama_poli: user.nama_poli
// });

const api = axios.create({ baseURL: "http://localhost:3003/api/dokter" });
const socket = io("http://localhost:3003", {
  transports: ["websocket"],
});
const showModal = ref(false);
const selectedPasien = ref(null);
const form = reactive({
  keluhan: "",
  diagnosis: "",
  tindakan: "",
  obatList: [
    { nama_obat: "", dosis: "", jumlah: 1, keterangan: "" }
  ]
});
const antrian = ref([]);
const namaPoli = ref([])
const pasienDipanggil = ref(null);

socket.on("connect", () => console.log("✅ Socket connected:", socket.id));
socket.on("disconnect", () => console.log("❌ Socket disconnected"));
socket.on("antrian:baru", () => fetchAntrian());

const fetchAntrian = async () => {
  try {
    const res = await api.get("/antrian", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    antrian.value = res.data.data;
    namaPoli.value = res.data.nama_poli;
    pasienDipanggil.value = antrian.value.find(a => a.status === "dipanggil");
  } catch (err) {
    console.error("Gagal ambil antrian:", err);
  }
};

// const fetchAntrian = async () => {
//   try {
//     const user = JSON.parse(localStorage.getItem("user"));
//     const dokter_id = user.id; 

//     const res = await api.get(`/antrian/${dokter_id}`, {
//       headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//     });

//     antrian.value = res.data.data;
//     namaPoli.value = res.data.nama_poli;
//     pasienDipanggil.value = antrian.value.find(a => a.status === "dipanggil");
//   } catch (err) {
//     console.error("Gagal ambil antrian:", err);
//   }
// };


socket.on("antrian:update", () => fetchAntrian());
onMounted(() => fetchAntrian());

const totalPasien = computed(() => antrian.value.length);
const nomorBerikutnya = computed(() => {
  const menunggu = antrian.value.filter(a => a.status === 'menunggu');
  return menunggu.length ? menunggu[0].nomor_antrian : "-";
});

const panggilPasien = async (a) => {
  try {
    await api.post(`/antrian/panggil/${a.id}`, {}, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });
    Swal.fire("Dipanggil!", `Pasien ${a.nomor_antrian} dipanggil`, "success");
  } catch (err) {
    Swal.fire("Error", err.response?.data?.message || "Gagal panggil pasien", "error");
  }
};

const batalPasien = async (a) => {
  try {
    await api.post(`/antrian/batal/${a.id}`, {}, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });
    Swal.fire("Batal!", `Pasien ${a.nomor_antrian} dikembalikan ke menunggu`, "info");
  } catch (err) {
    Swal.fire("Error", err.response?.data?.message || "Gagal batal pasien", "error");
  }
};

const addObat = () => {
  form.obatList.push({ nama_obat: "", dosis: "", jumlah: 1, keterangan: "" });
};

const openModal = (pasien) => {
  selectedPasien.value = pasien;
  showModal.value = true;
};

const submitForm = async () => {
  if (!form.keluhan || !form.diagnosis || !form.tindakan) {
    Swal.fire("Peringatan", "Semua field rekam medis wajib diisi!", "warning");
    return;
  }
  if (form.obatList.filter(o => o.nama_obat.trim() !== "").length === 0) {
    Swal.fire("Peringatan", "Minimal satu obat harus diisi!", "warning");
    return;
  }

  try {
    await api.post(`/antrian/selesai/${selectedPasien.value.id}`, {
      keluhan: form.keluhan,
      diagnosis: form.diagnosis,
      tindakan: form.tindakan,
      items: form.obatList,
    }, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    });

    Swal.fire("Selesai!", `Pasien ${selectedPasien.value.nomor_antrian} selesai diperiksa`, "success");
    showModal.value = false;
  } catch (err) {
    console.error("Error submitForm:", err.response || err);
    Swal.fire("Error", err.response?.data?.message || "Gagal update pasien", "error");
  }
};

// const selesaiPasien = async (a) => {
//   let obatList = [];

//   const addObatInput = () => {
//     const container = document.getElementById("obat-container");
//     const div = document.createElement("div");
//     div.classList.add("mb-2");
//     div.innerHTML = `
//       <input class="swal2-input" placeholder="Nama Obat" name="nama_obat">
//       <input class="swal2-input" placeholder="Dosis (cth: 3x1)" name="dosis">
//       <input class="swal2-input" type="number" placeholder="Jumlah" name="jumlah">
//       <input class="swal2-input" placeholder="Keterangan" name="keterangan">
//     `;
//     container.appendChild(div);
//   };

//   const { value: formValues } = await Swal.fire({
//     title: "Input Rekam Medis & Resep",
//     html: `
//       <textarea id="swal-keluhan" class="swal2-textarea" placeholder="Keluhan"></textarea>
//       <textarea id="swal-diagnosis" class="swal2-textarea" placeholder="Diagnosis"></textarea>
//       <textarea id="swal-tindakan" class="swal2-textarea" placeholder="Tindakan"></textarea>
//       <hr>
//       <div id="obat-container"></div>
//       <button type="button" id="add-obat-btn" class="swal2-confirm swal2-styled" style="background:#3085d6">+ Tambah Obat</button>
//     `,
//     didOpen: () => {
//       addObatInput(); 
//       document.getElementById("add-obat-btn").addEventListener("click", addObatInput);
//     },
//     preConfirm: () => {
//       const keluhan = document.getElementById("swal-keluhan").value;
//       const diagnosis = document.getElementById("swal-diagnosis").value;
//       const tindakan = document.getElementById("swal-tindakan").value;

//       const obatInputs = document.querySelectorAll("#obat-container div");
//       obatList = Array.from(obatInputs).map(div => ({
//         nama_obat: div.querySelector('[name="nama_obat"]').value,
//         dosis: div.querySelector('[name="dosis"]').value,
//         jumlah: div.querySelector('[name="jumlah"]').value || 1,
//         keterangan: div.querySelector('[name="keterangan"]').value,
//       })).filter(obat => obat.nama_obat.trim() !== "");

//       if (!keluhan || !diagnosis || !tindakan)
//         Swal.showValidationMessage("Semua field rekam medis wajib diisi");

//       if (obatList.length === 0)
//         Swal.showValidationMessage("Minimal satu obat harus diisi");

//       return { keluhan, diagnosis, tindakan, items: obatList };
//     },
//   });

//   if (!formValues) return;

//   try {
//     await api.post(`/antrian/selesai/${a.id}`, formValues, {
//       headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//     });
//     Swal.fire("Selesai!", `Pasien ${a.nomor_antrian} selesai diperiksa`, "success");
//   } catch (err) {
//     Swal.fire("Error", err.response?.data?.message || "Gagal update pasien", "error");
//   }
// };

const hapusAntrian = async (a) => {
  const konfirmasi = await Swal.fire({
    title: "Batalkan Antrian?",
    text: `Yakin ingin membatalkan antrian ${a.nomor_antrian}?`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Ya",
  });
  if (!konfirmasi.isConfirmed) return;
  const { value: keterangan } = await Swal.fire({
    title: "Alasan Pembatalan",
    input: "textarea",
    inputPlaceholder: "Masukkan alasan pembatalan...",
    inputLabel: "Keterangan",
    showCancelButton: true,
    confirmButtonText: "Simpan",
  });

  if (!keterangan || keterangan.trim() === "") {
    Swal.fire("Oops!", "Keterangan wajib diisi.", "warning");
    return;
  }

  try {
    await api.put(
      `/antrian/delete/${a.id}`,
      { keterangan },
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    );
    Swal.fire("Dibatalkan!", `Antrian ${a.nomor_antrian} telah dibatalkan.`, "success");
    fetchAntrian();
  } catch (err) {
    Swal.fire("Error", err.response?.data?.message || "Gagal membatalkan antrian", "error");
  }
};
</script>