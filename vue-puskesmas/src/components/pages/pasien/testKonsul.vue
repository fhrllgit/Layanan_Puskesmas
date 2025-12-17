<template>
  <div>
    <div class="fixed inset-0 flex flex-col bg-gradient-to-br from-gray-50 to-red-50">
      <div class="flex items-center gap-3 p-4 bg-gradient-to-r from-[#d34341] to-[#b83331] text-white shadow-lg">
        <button @click="$router.back()" class="p-2 hover:bg-white/20 rounded-full transition-colors">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
        </button>
        <img v-if="dokter.foto" :src="dokter.foto"
          class="w-12 h-12 rounded-full object-cover border-2 border-white/30 shadow-md" />
        <div v-else
          class="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white font-bold text-xl shadow-md border-2 border-white/30">
          {{ dokter.nama?.charAt(0).toUpperCase() || "D" }}
        </div>
        <div class="flex-1 min-w-0">
          <p class="font-bold text-lg truncate">{{ dokter.nama || "Dokter" }}</p>
          <p class="text-sm flex items-center gap-1.5 transition-all"
            :class="statusDokter === 'online' ? 'text-white' : 'text-gray-400'">
            <span v-if="statusDokter === 'online'" class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            <span v-else class="w-2 h-2 bg-gray-400 rounded-full"></span>
            {{ statusDokter === 'online' ? 'Online' : 'Offline' }}
          </p>
        </div>
      </div>
      <div class="flex-1 overflow-y-auto p-4 md:p-6 space-y-3" ref="chatBox">
        <div v-for="msg in messages" :key="msg.id" :class="msg.sender === 'pasien' ? 'justify-end' : 'justify-start'"
          class="flex items-end gap-2 animate-fade-in">
          <div
            :class="msg.sender === 'pasien'
              ? 'bg-gradient-to-br from-[#d34341] to-[#b83331] text-white rounded-tl-2xl rounded-tr-md rounded-bl-2xl rounded-br-2xl ml-auto shadow-lg'
              : 'bg-white text-gray-800 rounded-tl-md rounded-tr-2xl rounded-bl-2xl rounded-br-2xl shadow-md border border-gray-200'"
            class="max-w-[85%] md:max-w-md lg:max-w-lg px-4 py-3 break-words">
            <span v-if="msg.type === 'resep' && msg.resep_id" @click="handleResepClick(msg.resep_id)" class="">
              <span class="text-blue-600 font-semibold underline cursor-pointer">{{ msg.pesan }}</span> <span
                class="text-black">Klick untuk melihat resep</span>
            </span>
            <span v-else>{{ msg.pesan }}</span>
            <div class="flex items-center justify-end gap-1.5 mt-1.5">
              <span :class="msg.sender === 'pasien' ? 'text-white/70' : 'text-gray-400'" class="text-xs font-medium">
                12:34
              </span>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white border-t border-gray-200 p-4 md:p-5 flex-shrink-0 shadow-lg">
        <div class="flex gap-3 items-center max-w-5xl mx-auto">
          <input v-model="pesan" @keyup.enter="kirimPesan" :disabled="statusDokter !== 'online'" :class="[
            'flex-1 bg-gray-100 text-gray-800 placeholder-gray-400 border-none p-3 rounded-xl transition-all',
            statusDokter !== 'online' ? 'cursor-not-allowed opacity-50' : ''
          ]" placeholder="Ketik pesan..." />

          <button @click="kirimPesan" :disabled="statusDokter !== 'online'" :class="[
            'bg-gradient-to-r from-[#d34341] to-[#b83331] text-white p-3.5 rounded-xl font-semibold transition-all shadow-md',
            statusDokter !== 'online'
              ? 'cursor-not-allowed opacity-40'
              : 'hover:scale-105 active:scale-95'
          ]">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
            </svg>
          </button>
        </div>
      </div>

      <div v-if="showResepModal"
        class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
        <div class="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden animate-slide-up">
          <div class="bg-gradient-to-r from-[#d34341] to-[#b83331] px-6 py-4  flex items-center justify-between">
            <div>
              <h2 class="text-xl font-bold text-white">Detail Resep</h2>
              <p class="text-white/90 text-sm mt-1">Informasi obat yang diresepkan</p>
            </div>
            <span @click="showResepModal = false"
              class="flex cursor-pointer items-center justify-center p-2 bg-[#8f8e8e54] rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3"
                stroke="currentColor" class="size-5 text-white">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </span>
          </div>
          <div class="space-y-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar mb-6">
            <div v-for="(item, index) in resepItems" :key="index"
              class="border-2 border-gray-200 p-4 rounded-xl bg-gradient-to-br from-gray-50 to-white hover:border-[#d34341]/30 transition-all duration-200 shadow-sm">

              <div class="flex items-center gap-3 mb-3 pb-3 border-b border-gray-200">
                <div
                  class="bg-gradient-to-br from-[#d34341] to-[#b83331] text-white w-10 h-10 rounded-full flex items-center justify-center font-bold shadow-md">
                  {{ index + 1 }}
                </div>
                <h3 class="text-lg font-bold text-gray-800">{{ item.nama_obat }}</h3>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div class="flex items-start gap-3">
                  <div class="bg-blue-100 p-2 rounded-lg">
                    <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <div>
                    <p class="text-xs font-medium text-gray-500 mb-0.5">Dosis</p>
                    <p class="text-sm font-semibold text-gray-800">{{ item.dosis }}</p>
                  </div>
                </div>
                <div class="flex items-start gap-3">
                  <div class="bg-green-100 p-2 rounded-lg">
                    <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                  </div>
                  <div>
                    <p class="text-xs font-medium text-gray-500 mb-0.5">Jumlah</p>
                    <p class="text-sm font-semibold text-gray-800">{{ item.jumlah }}</p>
                  </div>
                </div>
              </div>
              <div class="mt-3 pt-3 border-t border-gray-200">
                <div class="flex items-start gap-3">
                  <div class="bg-purple-100 p-2 rounded-lg">
                    <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div class="flex-1">
                    <p class="text-xs font-medium text-gray-500 mb-0.5">Keterangan</p>
                    <p class="text-sm text-gray-700 leading-relaxed">{{ item.keterangan }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t-2 border-gray-100">
            <button @click="tebusPuskesmas"
              class="bg-gradient-to-r from-[#d34341] to-[#b83331] hover:from-[#b83331] hover:to-[#a02927] text-white px-6 py-3 rounded-lg font-semibold shadow-lg shadow-red-500/30 transition-all duration-200 flex items-center justify-center gap-2 order-1">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              Tebus di Puskesmas
            </button>
            <button @click="tebusLuar"
              class="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2 border-2 border-gray-300 order-2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Tebus di Luar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "@/utils/axios";
import { io } from "socket.io-client";
import { ref, onMounted, nextTick, computed } from "vue";
import { useRoute } from "vue-router";
import { watch } from "vue";
import Swal from 'sweetalert2'


const route = useRoute();
const id = route.params.id;
const poliId = route.query.dokter
const socket = io("http://localhost:3003");

const pesan = ref("");
const messages = ref([]);
const chatBox = ref(null);
const dokter = ref({ nama: "", foto: "", status: "Online" });
// reseppp
const showResepModal = ref(false);
const resepItems = ref([]);
const resepId = ref(null);
const loading = ref(true)
const statDokter = ref([])
const dokterId = ref(null);
const statusDokter = ref("offline");

const scrollBottom = () => {
  nextTick(() => {
    if (chatBox.value) chatBox.value.scrollTop = chatBox.value.scrollHeight;
  });
};

const handleResepClick = async (id) => {
  try {
    const res = await axios.get(`/api/konsultasi/${id}`);
    resepItems.value = res.data.items;
    resepId.value = id;
    showResepModal.value = true;
  } catch (err) {
    console.error(err);
  }
};

const tebusPuskesmas = async () => {
  try {
    await axios.put(`/api/konsultasi/tebus-puskesmas/${resepId.value}`);

    await Swal.fire({
      icon: 'success',
      title: 'Berhasil',
      text: 'Resep berhasil dikirim ke Apotek Puskesmas',
      confirmButtonText: 'OK',
      confirmButtonColor: '#d34341'
    });

    showResepModal.value = false;

  } catch (err) {
    console.error(err);

    Swal.fire({
      icon: 'error',
      title: 'Gagal',
      text: 'Terjadi kesalahan saat mengirim resep',
      confirmButtonText: 'OK',
      confirmButtonColor: '#d34341'
    });
  }
};


const tebusLuar = async () => {
  try {
    Swal.fire({
      title: 'Menyiapkan Resep',
      text: 'Mohon tunggu...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    const res = await axios.get(
      `/api/konsultasi/tebus-luar/${resepId.value}`,
      { responseType: "blob" }
    );

    const blob = new Blob([res.data], { type: "application/pdf" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = `resep_${resepId.value}.pdf`;
    link.click();

    await Swal.fire({
      icon: 'success',
      title: 'Berhasil',
      text: 'Resep berhasil diunduh',
      timer: 2000,
      showConfirmButton: false
    });

    showResepModal.value = false;

  } catch (err) {
    console.error(err);

    Swal.fire({
      icon: 'error',
      title: 'Gagal',
      text: 'Gagal mengunduh resep',
      confirmButtonText: 'OK',
      confirmButtonColor: '#d34341'
    });
  }
};


const kirimPesan = async () => {
  if (statusDokter.value !== "online") return;
  if (!pesan.value.trim()) return;
  await axios.post("/api/konsultasi/kirim", { konsultasi_id: id, pesan: pesan.value });
  pesan.value = "";
};

onMounted(async () => {
  try {
    const dokterRes = await axios.get(`/api/konsultasi/detail/${id}`);
    dokter.value = dokterRes.data.dokter;
    dokterId.value = dokter.value.id;
    const res = await axios.get(`/api/konsultasi/chat/${id}`);
    messages.value = res.data.data;
    messages.value.forEach(msg => {
      console.log(msg.id, msg.type, msg.resep_id, msg.pesan);
    });
    console.log(messages.value);

  } catch (err) {
    console.error(err);
  }
  scrollBottom();

  socket.emit("join_room", `konsultasi_${id}`);
  socket.on("new_message", (msg) => {
    messages.value.push(msg);
    scrollBottom();
  });
});

onMounted(async () => {
  try {
    const res = await axios.get(`/api/konsultasi/dokter/status/${poliId}`);
    statusDokter.value = res.data.status;
  } catch (err) {
    statusDokter.value = "offline";
  }
});
</script>

<style>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.3s ease-out;
}

[ref="chatBox"] {
  scroll-behavior: smooth;
}

::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #111b21;
}

::-webkit-scrollbar-thumb {
  background: #374045;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #4a5358;
}

@media (max-width: 768px) {
  body {
    overflow: hidden;
  }
}
</style>