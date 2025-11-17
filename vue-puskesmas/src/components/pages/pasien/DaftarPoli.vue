<template>
  <div class="px-4 sm:px-6 md:px-10 min-h-screen h-full">
    <div class="mt-25">
      <h2 class="text-4xl font-semibold">Ambil Antrian Poli</h2>
      <div class="flex gap-5 mt-5">
        <div class="flex flex-1 flex-wrap items-center gap-4">
          <div v-for="p in poliList" :key="p.id"
            class="bg-white p-4 flex-1/3 h-65 rounded-2xl shadow-lg hover:shadow-lg transition flex flex-col justify-between">
            <div class="mb-2 w-12 h-12 flex items-center justify-center rounded-xl"
              :style="{ color: getColorHex(p.nama_poli), backgroundColor: hexToRgba(getColorHex(p.nama_poli), 0.15) }">
              <component :is="getIcon(p.nama_poli)" class="size-6 font-semibold" :stroke-width="2.5" />
            </div>
            <div>
              <h3 class="text-lg font-semibold">{{ p.nama_poli }}</h3>
              <h3 class="text-sm text-[#5c5c5c] mt-1">{{ p.deskripsi }}</h3>
            </div>
            <button @click="tambahAntrian(p)"
              class="mt-3 text-xs font-semibold text-white cursor-pointer px-4 py-3 rounded-lg w-full"
              :style="{ backgroundColor: getColorHex(p.nama_poli) }">
              Ambil Antrian Di {{ p.nama_poli }}
            </button>
          </div>
        </div>
        <div class="w-md bg-white shadow-lg p-5 rounded-xl flex flex-col justify-between border border-gray-200">
          <div class="flex items-center gap-3 mb-5">
            <svg class="size-7 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <h1 class="text-2xl font-bold text-slate-800">Jam Operasional Pelayanan</h1>
          </div>
          <div class="flex flex-col gap-3 mb-3">
            <div class="bg-slate-50 border border-slate-200 px-4 py-3 rounded-lg">
              <p class="text-slate-600 font-medium text-sm mb-1">SENIN - KAMIS</p>
              <p class="text-slate-800 text-lg font-semibold">08:00 - 12:00 WIB</p>
            </div>
            <div class="bg-slate-50 border border-slate-200 px-4 py-3 rounded-lg">
              <p class="text-slate-600 font-medium text-sm mb-1">JUMAT - SABTU</p>
              <p class="text-slate-800 text-lg font-semibold">08:00 - 12:00 WIB</p>
            </div>
            <div class="bg-red-50 border border-red-200 px-4 py-3 rounded-lg">
              <p class="text-red-700 font-semibold text-center">Minggu Libur</p>
            </div>
          </div>
          <div class="h-px bg-gray-200 mb-3"></div>
          <div v-if="antrianList.length > 0" class="grid gap-4" :class="[
            antrianList.length === 1 ? 'grid-cols-1' : '',
            antrianList.length === 2 ? 'grid-cols-2' : '',
            antrianList.length >= 3 ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-2' : ''
          ]">
            <div v-for="(a, i) in antrianList" :key="i"
              class="p-4 bg-blue-600 rounded-xl shadow-md transition hover:scale-[1.02]">
              <div class="text-center">
                <div class="flex items-center justify-center gap-2 mb-3">
                  <svg class="w-5 h-5 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                  </svg>
                  <p class="text-blue-100 text-sm font-medium">Nomor Antrian Anda</p>
                </div>
  
                <h3 class="text-5xl font-bold text-white mb-4">
                  {{ a.nomor_antrian }}
                </h3>
  
                <div class="flex flex-col gap-1.5">
                  <div class="flex items-center justify-center gap-2 bg-blue-500 rounded-lg py-2 px-4">
                    <p class="text-white text-sm font-medium">{{ formatTanggal(a.tanggal) }}</p>
  
                  </div>
                  <div class="flex items-center justify-center gap-2 bg-blue-500 rounded-lg py-2 px-4">
                    <p class="text-white text-sm font-medium">{{ a.nama_poli }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-else class="text-center text-slate-500">
            Belum ada antrian diambil.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import axios from "axios";
import Swal from "sweetalert2";
import {
  HeartIcon,
  ClipboardDocumentCheckIcon,
  UserGroupIcon,
  BuildingLibraryIcon,
} from "@heroicons/vue/24/outline";
import { UserIcon } from "lucide-vue-next";

const api = axios.create({ baseURL: "http://localhost:3003/api" });
const token = localStorage.getItem("token");
const config = { headers: { Authorization: `Bearer ${token}` } };

const poliList = ref([]);
const antrianList = ref([]);

const tanggalHariIni = computed(() => {
  const now = new Date();
  return now.toISOString().split("T")[0];
});

const getPoli = async () => {
  try {
    const res = await api.get("/poli", config);
    poliList.value = res.data.data || [];
  } catch (err) {
    console.error("Gagal memuat poli:", err);
  }
};

const getAntrianSaya = async () => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return;
    const res = await api.get(`/antrian/antrianPoli/${user.id}`, config);
    antrianList.value = res.data.data.filter((a) => a.status === "menunggu");
  } catch (err) {
    console.error("Gagal memuat antrian saya:", err);
  }
};

const tambahAntrian = async (poli) => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      Swal.fire("Gagal", "Silakan login terlebih dahulu", "error");
      return;
    }
    const payload = {
      pasien_id: user.id,
      poli_id: poli.id,
      tanggal: tanggalHariIni.value,
    };
    const res = await api.post("/antrian", payload, config);
    Swal.fire({
      icon: "success",
      title: "Berhasil!",
      text: `Nomor antrian Anda di ${poli.nama_poli}: ${res.data.data.nomor_antrian}`,
    });
    await getAntrianSaya();
  } catch (err) {
    Swal.fire({
      icon: "error",
      title: "Gagal",
      text: err.response?.data?.message || "Terjadi kesalahan",
    });
  }
};

const formatTanggal = (tgl) => {
  const date = new Date(tgl);
  return date.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  });
};


const getIcon = (nama) => {
  const lower = nama.toLowerCase();
  if (lower.includes("umum")) return UserIcon;
  if (lower.includes("gigi")) return HeartIcon;
  if (lower.includes("kandungan")) return ClipboardDocumentCheckIcon;
  if (lower.includes("kia")) return UserGroupIcon;
  return BuildingLibraryIcon;
};

const getColorHex = (nama) => {
  const lower = nama.toLowerCase();
  if (lower.includes("umum")) return "#7C3AED";
  if (lower.includes("gigi")) return "#2563EB";
  if (lower.includes("kandungan")) return "#EC4899";
  if (lower.includes("kia")) return "#16A34A";
  return "#6B7280";
};

const hexToRgba = (hex, alpha = 0.2) => {
  const bigint = parseInt(hex.slice(1), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

onMounted(() => {
  getPoli();
  getAntrianSaya();
  // setInterval(getAntrianSaya, 1000);
});
</script>
